<template>
    <message v-if="message.message.messageType === 'message'" :message="message"/>
</template>

<script>
import Message from "@/Pages/message";

export default {
    name: "chat-element",
    components: {Message},
    props: {
        message: Object
    },
    created() {
        console.log(this.message)
    }
}
</script>

<style scoped>

</style>
