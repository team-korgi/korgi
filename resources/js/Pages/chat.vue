<template>
    <div id="chat">
        <div id="messages">
            <message v-for="message in Object.values(chat.messages)" :key="message.timestamp" :message="message"/>
        </div>
        <div id="input-group">
            <dialog-window :bus="fileInputBus" title="Datei senden!" @submit="sendFile">
                <dialog-content-send-file :bus="fileInputBus"/>
            </dialog-window>

            <div class="round-btn warn-background" v-on:click="fileInputBus.$emit('open')">
                <i class="fas fa-paperclip"/>
            </div>
            <input class="input" id="message-input" type="text" v-model="message" @keypress.enter="publish" placeholder="Nachricht">
            <div class="round-btn secondary-background" :disabled="!message.length" v-on:click="publish">
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

export default {
    name: "chat",
    components: {Message, DialogWindow, DialogContentSendFile},
    props: {
        type: String,
        url: String
    },
    data() {
        return {
            message: "",
            fileInputBus: new Vue()
        };
    },
    computed: {
        chat() {
            return this.$store.getters.getChannel(this.url, this.type);
        }
    },
    methods: {
        publish() {
            if (this.message.length) {
                this.$store.commit('publish', {
                    message: this.message,
                    channel: this.chat.uuid,
                    chat: this.type,
                    group: this.url
                });
                this.message = "";
            }
        },
        sendFile(file) {
            // TODO Upload File
            this.$store.commit('publish', {
                message: file.name,
                channel: this.chat.uuid,
                chat: this.type,
                group: this.url,
                fileUrl: ""
            });
            this.toggleDialog();
        },
        toggleDialog() {
            this.isDialogOpen = !this.isDialogOpen;
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
</style>
