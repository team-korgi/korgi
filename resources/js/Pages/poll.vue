<template>
    <div class="message" v-bind:class="changeAlignment()">
        <div class="sender" v-if="!isOwn">{{ message.message.user.username }}</div>
        <div class="subject">{{ message.message.subject }}</div>
        <div class="poll">
            <div class="answer" :class="{answered: isAnswered}" v-for="answerKey in Object.keys(message.message.answers)" @click="addResult(answerKey)" :style="{
                background: 'linear-gradient(to right, var(--primary) ' + getPercentage(answerKey) + '%, var(--background-color) ' + 0 + ')'
            }">
                {{message.message.answers[answerKey]}}
                <p v-if="isAnswered">{{getPercentage(answerKey)}}%</p>
            </div>
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
import Vue from 'vue';

export default {

    name: "poll",
    props: {
        message: Object
    },
    computed: {
        isOwn() {
            return this.message.publisher === this.$store.state.pubnub.getUUID()
        },
        totalAnswers() {
            return Object.values(this.message.message.results).reduce((a, b) => {
                return a + b;
            });
        },
        isAnswered() {
            return this.message.message.answeredBy.includes(this.$store.state.user.uuid);
        }
    },
    methods: {
        changeAlignment() {
            if (this.isOwn) {
                return 'right';
            }
        },
        getPercentage(answerKey) {
            return Math.round((this.message.message.results[answerKey] / this.totalAnswers) * 100);
        },
        addResult(answerKey) {
            Vue.set(this.message.message.results, answerKey, this.message.message.results[answerKey] ? this.message.message.results[answerKey]+1 : 1)
            this.message.message.answeredBy.push(this.$store.state.user.uuid);
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

.right {
    background-color: var(--message-right-color);
}

.poll {
    width: 100%;
    transition: 0.2s ease;
}

.answer {
    background-color: var(--background-color);
    height: 2.5rem;
    width: 100%;
    border: 2px solid var(--primary);
    margin-bottom: 0.25rem;
    margin-top: 0.25rem;
    border-radius: 12px;
    padding-left: 12px;
    padding-right: 12px;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    transition: 0.2s ease;
}

.answer:hover {
    border-color: var(--primary-darker);
    background-color: var(--background-color-alternate);
}

@media (max-width: 576px) {
    .message {
        padding: 2.5%;
    }
}
</style>
