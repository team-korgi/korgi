<template>
    <div id="chat">
        <div id="messages">
            <chat-element v-for="message in Object.values(messages)" :key="message.timestamp" :message="message"/>
        </div>
        <div id="input-group">

            <!--Dialog Fenster-->
            <dialog-window :bus="fileInputBus" title="Datei senden!" @submit="publishFile">
                <dialog-content-send-file :bus="fileInputBus"/>
            </dialog-window>
            <dialog-window :bus="eventAnnouncementBus" title="Termin bekannt geben" @submit="publishEventAnnouncement">
                <dialog-content-event-announcement :bus="eventAnnouncementBus"/>
            </dialog-window>
            <dialog-window :bus="importantMessageBus" title="Wichtige Nachricht senden" @submit="publishImportantMessage">
                <dialog-content-important-message :bus="importantMessageBus"/>
            </dialog-window>

            <transition name="fade">
                <div v-show="openSpecialMessages" class="special-messages-container" @click="toggleSpecialMessages">
                    <div class="btn primary-background"><p>Umfrage starten</p><i class="far fa-calendar-alt"></i></div>
                    <div class="btn primary-background" v-on:click="eventAnnouncementBus.$emit('open')"><p>Termin
                        bekannt geben</p><i class="far fa-calendar-alt"></i></div>
                    <div class="btn primary-background" v-on:click="dateVotingBus.$emit('open')"><p>Terminumfrage
                        starten</p><i class="far fa-calendar-alt"></i></div>
                    <div class="btn primary-background" v-on:click="importantMessageBus.$emit('open')"><p>Wichtige Nachricht schreiben</p><i
                        class="far fa-calendar-alt"/></div>
                    <div class="btn primary-background" v-on:click="fileInputBus.$emit('open')"><p>Wichtige Datei
                        senden</p><i class="fas fa-paperclip"/></div>
                </div>
            </transition>

            <div class="round-btn warn-background" :class="hasAccess() ? '' : 'disabled'"
                 v-if="channel.name==='Allgemein'" :disabled="!hasAccess()" v-on:click="fileInputBus.$emit('open')">
                <i class="fas fa-paperclip"/>
            </div>
            <div class="round-btn warn-background" :class="hasAccess() ? '' : 'disabled'"
                 v-if="channel.name==='Wichtig'" :disabled="!hasAccess()" v-on:click="toggleSpecialMessages">
                <i class="fas fa-plus"/>
            </div>
            <input class="input" :class="hasAccess() ? '' : 'disabled'" id="message-input" type="text" v-model="message"
                   @keypress.enter="publishMessage"
                   :placeholder="hasAccess() ? 'Nachricht' : 'Du darfst in diesem Chat leider keine Nachrichten schreiben!'">
            <div class="round-btn secondary-background" :class="hasAccess() && message.length ? '' : 'disabled'"
                 v-on:click="publishMessage">
                <i class="fas fa-paper-plane"/>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';

import DialogWindow from "./dialog-window";
import DialogContentSendFile from "./dialog-content-send-file";
import DialogContentEventAnnouncement from "./dialog-content-event-announcement";
import DatePicker from "@/Pages/date-picker";
import ChatElement from "@/Pages/chat-element";
import Navbar from "@/Pages/navbar";
import DialogContentImportantMessage from "@/Pages/dialog-content-important-message";

export default {
    name: "chat",
    components: {
        DialogContentImportantMessage,
        Navbar, ChatElement, DatePicker, DialogWindow, DialogContentSendFile, DialogContentEventAnnouncement},
    props: {
        type: String,
        url: String
    },
    data() {
        return {
            message: "",
            fileInputBus: new Vue(),
            eventAnnouncementBus: new Vue(),
            importantMessageBus: new Vue(),
            dateVotingBus: new Vue(),
            user: this.$store.getters.getUser,
            openSpecialMessages: false,
            hasAdminPermissions: this.$store.getters.getGroup(this.url).hasAdminPermissions
        };
    },
    computed: {
        channel() {
            return this.$store.getters.getChannel(this.url, this.type);
        },
        messages() {
            return this.channel.messages
        }
    },
    watch: {
        messages() {
            let messagesElement = document.getElementById('messages');
            let scrollPercentage = Math.ceil(100 * messagesElement.scrollTop / (messagesElement.scrollHeight - messagesElement.clientHeight));
            if (scrollPercentage >= 100 || isNaN(scrollPercentage)) {
                setTimeout(() => {messagesElement.scrollTop = messagesElement.scrollHeight}, 1);
            }
        }
    },
    mounted() {
        this.scrollToBottom()
    },
    methods: {
        scrollToBottom() {
            let messagesElement = document.getElementById('messages');
            messagesElement.scrollTo(0, messagesElement.scrollHeight);
        },
        publishMessage() {
            if (this.message.length) {
                this.$store.commit('publishMessage', {
                    message: this.message,
                    channel: this.channel.uuid,
                    chat: this.type,
                    group: this.url
                });
                this.message = "";
                this.scrollToBottom();
            }
        },
        publishImportantMessage(content) {
            this.$store.commit('publishImportantMessage', {
                subject: content.subject,
                message: content.text,
                channel: this.channel.uuid,
                chat: this.type,
                group: this.url,
            });
            this.scrollToBottom();
        },
        publishFile(content) {
            // TODO Upload File
            this.$store.commit('publishFile', {
                message: content.message,
                channel: this.channel.uuid,
                chat: this.type,
                group: this.url,
                fileName: content.file.name,
                fileType: content.file.type,
                fileUrl: ""
            });
            this.scrollToBottom();
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
            this.scrollToBottom();
        },
        hasAccess() {
            if (this.channel.name === 'Wichtig') {
                return this.hasAdminPermissions;
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
    background-color: var(--background-color-alternate);
    flex-grow: 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

#messages {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 2%;
    overflow-y: auto;
}

#messages::-webkit-scrollbar {
    margin-left: -1rem;
    width: 1rem;
}

#messages::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 0.5rem;
}

#messages::-webkit-scrollbar-thumb {
    background-color: #FFA88E;
    border-radius: 0.5rem;
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
    box-shadow: 1px 0 15px 3px rgba(92, 86, 86, 0.3);
    -webkit-box-shadow: 1px 0 15px 3px rgba(92, 86, 86, 0.3);
    -moz-box-shadow: 1px 0 15px 3px rgba(92, 86, 86, 0.3);
    justify-content: space-between;
}

.special-messages-container {
    background-color: var(--background-color);
    margin-bottom: 2%;
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

@media (max-width: 576px) {
    #message-input {
        max-width: 68%; /*Irgendwie dumm, aber sonst funktioniert nix*/
    }
    #input-group {
        padding: 2% 2% 4% 2%; /*Unten mehr, damit bei Handys mit abgerundeten Ecken nix abgeschnitten wird*/
    }
    #messages::-webkit-scrollbar {
        width: 0.5rem;
    }
    .special-messages-container {
        padding: 4%;
    }
}

</style>
