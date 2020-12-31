<template>
    <div class="chat-element">
        <message v-if="message.message.messageType === 'message' && message.message.chat === 'allgemein'" :message="message"/>
        <less-important-message v-if="message.message.messageType === 'message' && message.message.chat === 'wichtig'" :message="message"/>
        <file v-if="message.message.messageType === 'file'" :message="message"/>
        <event-announcement v-if="message.message.messageType === 'eventAnnouncement'" :message="message"/>
    </div>
</template>

<script>
import Message from "@/Pages/message";
import File from "@/Pages/file";
import EventAnnouncement from "@/Pages/event-announcement";
import LessImportantMessage from "@/Pages/less-important-message";

export default {
    name: "chat-element",
    components: {LessImportantMessage, EventAnnouncement, File, Message},
    props: {
        message: Object
    },
}
</script>

<style scoped>
.chat-element {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    padding-left: 10%;
    padding-right: 10%;
}

@media (max-width: 576px) {
    .chat-element {
        padding-left: 4%;
        padding-right: 2%;
        margin-top: 4px;
        margin-bottom: 4px;
    }
}
</style>
