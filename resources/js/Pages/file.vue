<template>
    <div class="file-element" v-bind:class="changeAlignment()">
        <div class="message-header">
            <div class="sender">{{ message.message.user.username }}</div>
            <i class="fas fa-reply" @click="$emit('open')"></i>
        </div>
        <p class="text">{{message.message.text}}</p>
        <div class="file-container primary-background">
            <i class="file-icon far fa-file-pdf"></i>
            <p class="text">{{message.message.fileName}}</p>
        </div>
        <div class="timetoken">{{
                new Date(message.timetoken / 10000).toLocaleTimeString('de', {
                    hour: "2-digit",
                    minute: "2-digit"
                })
            }}
        </div>
    </div>
</template>

<script>
export default {
    name: "file",
    props: {
        message: Object
    },
    computed: {
        isOwn() {
            return this.message.publisher === this.$store.state.pubnub.getUUID()
        }
    },
    methods: {
        changeAlignment() {
            if (this.isOwn) {
                return 'right';
            }
        }
    }
}
</script>

<style scoped>
.file-element {
    max-width: 80%;
    min-width: 30%;
    background-color: var(--message-color);
    color: var(--font-color);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 1vh;
    margin: 0.5vh;
    border-radius: 1rem;
}

.right {
    text-align: right;
    align-self: flex-end;
    background-color: var(--message-right-color);
}

.file-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem;
    margin-top: 0.4rem;
    margin-bottom: 0.2rem;
    padding: 1rem;
}

.file-icon {
    font-size: 2rem;
    color: #ef5252;
    margin-right: 1rem;
    text-align: center;
}

.sender {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 0.5vh;
}

.timetoken {
    align-self: flex-end;
    color: var(--font-color-light);
    font-size: 0.8rem;
}

.text {
    word-break: break-word;
}

.message-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.fa-reply {
    color: var(--header-color);
    cursor: pointer;
}

.fa-reply:hover {
    color: var(--primary);
}

@media (max-width: 576px) {
    .file-element {
        padding: 2.5%;
    }
}
</style>
