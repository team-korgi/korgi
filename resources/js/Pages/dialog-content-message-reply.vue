<template>
    <div class="dialog-content">
        <textarea id="message-reply-text-input" placeholder="Nachricht" v-model="text" @input="saveContent"
                  class="textarea" @keypress.enter="bus.$emit('submit')"/>
    </div>
</template>

<script>
export default {
    name: "dialog-content-message-reply",
    data() {
        return {
            subject: "",
            text: ""
        }
    },
    props: {
        bus: Object
    },
    methods: {
        saveContent() {
            this.bus.$emit('validate', {"text": this.text});
        },
    }
}
</script>

<style scoped>
.dialog-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/*TODO @Jakob Scrollbar bitte schön machen*/
#message-reply-text-input {
    height: 20vh;
    overflow: auto;
}

#message-reply-text-input::-webkit-scrollbar {
    margin-left: -1rem;
    width: 1rem;
}

#message-reply-text-input::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 0.5rem;
}

#message-reply-text-input::-webkit-scrollbar-thumb {
    background-color: #FFA88E;
    border-radius: 0.5rem;
}
</style>
