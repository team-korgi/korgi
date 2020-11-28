<template>
    <div id="chat">
        <div id="messages">
            <message v-for="message in Object.values(channel.messages)" :key="message.timestamp" :message="message"/>
        </div>
        <div id="input-group">
            <dialog-window :bus="fileInputBus" title="Datei senden!" @submit="publishFile">
                <dialog-content-send-file :bus="fileInputBus"/>
            </dialog-window>
            <dialog-window :bus="eventAnnouncementBus" title="Termin bekannt geben" @submit="publishEventAnnouncement">
                <dialog-content-event-announcement :bus="eventAnnouncementBus"/>
            </dialog-window>
            <transition name="fade">
                <div v-show="openSpecialMessages" class="special-messages-container" @click="toggleSpecialMessages">
                    <div class="btn primary-background"><p>Umfrage starten</p><i class="far fa-calendar-alt"></i></div>
                    <div class="btn primary-background" v-on:click="eventAnnouncementBus.$emit('open')"><p>Termin bekannt geben</p><i class="far fa-calendar-alt"></i></div>
                    <div class="btn primary-background" v-on:click="dateVotingBus.$emit('open')"><p>Terminumfrage starten</p><i class="far fa-calendar-alt"></i></div>
                    <div class="btn primary-background"><p>Wichtige Nachricht schreiben</p><i class="far fa-calendar-alt"/></div>
                    <div class="btn primary-background" v-on:click="fileInputBus.$emit('open')"><p>Wichtige Datei senden</p><i class="fas fa-paperclip"/></div>
                </div>
            </transition>
            <div class="round-btn warn-background" :class="hasAccess() ? '' : 'disabled'" v-if="channel.name==='Allgemein'" :disabled="!hasAccess()" v-on:click="fileInputBus.$emit('open')">
                <i class="fas fa-paperclip"/>
            </div>
            <div class="round-btn warn-background" :class="hasAccess() ? '' : 'disabled'" v-if="channel.name==='Wichtig'" :disabled="!hasAccess()" v-on:click="toggleSpecialMessages">
                <i class="fas fa-plus"/>
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
import DialogContentEventAnnouncement from "./dialog-content-event-announcement";
import DatePicker from "@/Pages/date-picker";

export default {
    name: "chat",
    components: {DatePicker, Message, DialogWindow, DialogContentSendFile, DialogContentEventAnnouncement},
    props: {
        type: String,
        url: String
    },
    data() {
        return {
            message: "",
            fileInputBus: new Vue(),
            eventAnnouncementBus: new Vue(),
            dateVotingBus: new Vue(),
            user: this.$store.getters.getUser,
            openSpecialMessages: false
        };
    },
    computed: {
        channel() {
            return this.$store.getters.getChannel(this.url, this.type);
        },
        admins() {
            return this.$store.getters.getGroup(this.url).admins;
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
        publishEventAnnouncement(eventAnnouncement) {
            // TODO add event to group in database
            this.$store.commit('publishEventAnnouncement', {
                message: eventAnnouncement.subject,
                channel: this.channel.uuid,
                chat: this.type,
                group: this.url,
                date: eventAnnouncement.date
            })
        },
        hasAccess() {
            if (this.channel.name==='Wichtig') {
                return this.admins.filter(admin => {
                    return admin.uuid === this.user.uuid;
                }).length;
            } else {
                return true
            }
        },
        toggleSpecialMessages() {
            this.openSpecialMessages = !this.openSpecialMessages;
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
    position: relative;
    display: flex;
    padding: 1% 2% 1% 2%;
    box-shadow: 1px 0 15px 3px rgba(92, 86, 86, 0.75);
    -webkit-box-shadow: 1px 0 15px 3px rgba(92, 86, 86, 0.75);
    -moz-box-shadow: 1px 0 15px 3px rgba(92, 86, 86, 0.75);
}

.special-messages-container {
    margin-bottom: 2%;
    background-color: white;
    padding: 1%;
    height: 19rem;
    position: absolute;
    bottom: 100%;
    border-radius: 1rem;
    box-shadow: 1px 0 15px 3px rgba(92, 86, 86, 0.75);
    -webkit-box-shadow: 1px 0 15px 3px rgba(92, 86, 86, 0.75);
    -moz-box-shadow: 1px 0 15px 3px rgba(92, 86, 86, 0.75);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .2s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
    opacity: 0;
}
</style>
