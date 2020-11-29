<template>
    <div class="chat-element">
        <message v-if="message.message.messageType === 'message'" :message="message"/>
        <file v-if="message.message.messageType === 'file'" :message="message"/>
    </div>
</template>

<script>
import Message from "@/Pages/message";
import File from "@/Pages/file";

export default {
    name: "chat-element",
    components: {File, Message},
    props: {
        message: Object
    }
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
</style>
