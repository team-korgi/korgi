<template>
    <div id="chat">
        <div id="messages">
            <message v-for="message in Object.values(channel.messages)" :key="message.timestamp" :message="message"/>
        </div>
        <div id="input-group">
            <dialog-window :bus="fileInputBus" title="Datei senden!" @submit="publishFile">
                <dialog-content-send-file :bus="fileInputBus"/>
            </dialog-window>
            <dialog-window :bus="dateAnnouncementBus" title="Termin bekannt geben" @submit="publishDateAnnouncement">
                <dialog-content-date-announcement :bus="dateAnnouncementBus"/>
            </dialog-window>
            <transition name="fade">
                <div v-show="openSpecialMessages" class="special-messages-container" v-on:click="dateAnnouncementBus.$emit('open')">
                    <div class="btn primary-background"><p>Termin bekannt geben</p><i class="far fa-calendar-alt"></i></div>
                </div>
            </transition>
            <div class="round-btn warn-background" :class="hasAccess() ? '' : 'disabled'" v-if="channel.name==='Allgemein'" :disabled="!hasAccess()" v-on:click="fileInputBus.$emit('open')">
                <i class="fas fa-paperclip"/>
            </div>
            <input class="input" :class="hasAccess() ? '' : 'disabled'" id="message-input" type="text" v-model="message" @keypress.enter="publishMessage" :placeholder="hasAccess() ? 'Nachricht' : 'Du darfst in diesem Chat leider keine Nachrichten schreiben!'">
            <div class="round-btn secondary-background" :class="hasAccess() && message.length ? '' : 'disabled'" v-on:click="publishMessage">
                <i class="fas fa-paper-plane"/>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';

import Message from "./message";
import DialogWindow from "./dialog-window";
import DialogContentSendFile from "./dialog-content-send-file";
import DialogContentDateAnnouncement from "./dialog-content-date-announcement";
import DatePicker from "@/Pages/date-picker";

export default {
    name: "chat",
    components: {DatePicker, Message, DialogWindow, DialogContentSendFile, DialogContentDateAnnouncement},
    props: {
        type: String,
        url: String,
        admins: Array
    },
    data() {
        return {
            message: "",
            fileInputBus: new Vue(),
            dateAnnouncementBus: new Vue(),
            dateVotingBus: new Vue(),
            user: this.$store.getters.getUser,
            openSpecialMessages: true
        };
    },
    computed: {
        channel() {
            return this.$store.getters.getChannel(this.url, this.type);
        }
    },
    methods: {
        publishMessage() {
            if (this.message.length) {
                this.$store.commit('publishMessage', {
                    message: this.message,
                    channel: this.channel.uuid,
                    chat: this.type,
                    group: this.url
                });
                this.message = "";
            }
        },
        publishFile(file) {
            // TODO Upload File
            this.$store.commit('publishFile', {
                message: file.name,
                channel: this.channel.uuid,
                chat: this.type,
                group: this.url,
                fileUrl: ""
            });
        },
        publishDateAnnouncement(dateAnnouncement) {
            // TODO add date to group
            this.$store.commit('publishDateAnnouncement', {
                message: dateAnnouncement.subject,
                channel: this.channel.uuid,
                chat: this.type,
                group: this.url,
                date: dateAnnouncement.date
            })
        },
        hasAccess() {
            if (this.channel.name==='Wichtig') {
                return this.admins.includes(this.user.username);
            } else {
                return true
            }
        }
    }
}
</script>

<style scoped>
#chat {
    flex-grow: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
}

#messages {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 2%;
}

#message-input {
    margin-left: 2%;
    margin-right: 2%;
    flex-grow: 1;
}

#input-group {
    display: flex;
    padding: 1% 2% 1% 2%;
    box-shadow: 1px 0 15px 3px rgba(92, 86, 86, 0.75);
    -webkit-box-shadow: 1px 0 15px 3px rgba(92, 86, 86, 0.75);
    -moz-box-shadow: 1px 0 15px 3px rgba(92, 86, 86, 0.75);
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .2s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
    opacity: 0;
}
</style>
