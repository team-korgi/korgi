<template>
    <div class="message" :class="{own : isOwn}">
        <div class="sender" v-if="!isOwn">{{ message.message.user.username }}</div>
        <div class="subject">{{ message.message.subject }}</div>
        <div class="poll">
            <poll-answer v-for="answerKey in Object.keys(message.message.answers)" :answerKey="answerKey" :message="message" @click="addResult(answerKey)"/>
        </div>
        <div class="timetoken">
            {{
                new Date(message.timetoken / 10000).toLocaleTimeString('de', {
                    hour: "2-digit",
                    minute: "2-digit"
                })
            }}
        </div>
    </div>
</template>

<script>
import PollAnswer from "@/Pages/poll-answer";

export default {

    name: "poll",
    components: {PollAnswer},
    props: {
        message: Object
    },
    computed: {
        isOwn() {
            return this.message.publisher === this.$store.state.pubnub.getUUID()
        },
    },
    methods: {
        addResult(answerKey) {
            console.log("Add result")
            this.$store.commit('publishMessageAction', {
                type: 'poll',
                message: this.message,
                answerKey: answerKey
            })
            // Vue.set(this.message.message.results, this.$store.state.user.uuid, answerKey);
        }
    }
}

</script>

<style scoped>
.message {
    width: 80%;
    background-color: var(--message-color);
    color: var(--font-color);
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    padding: 1vh;
    margin: 0.5vh;
    border-radius: 1rem;
    align-self: center;
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

.own {
    background-color: var(--message-right-color);
}



.poll {
    width: 100%;
    transition: 0.2s ease;
}

@media (max-width: 576px) {
    .message {
        padding: 2.5%;
    }
}
</style>
