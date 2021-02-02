<template>
    <div class="answer" :style="cssVars"  :class="{answered: isAnswered, selected: isSelected}" @click="$emit('click')">
        <p>{{message.message.answers[answerKey]}}</p>
        <transition name="fade" mode="out-in">
            <p v-if="isAnswered || isOwn">{{percentage || 0}}%</p>
        </transition>
    </div>
</template>

<script>
export default {
    name: "poll-answer",
    props: {
        answerKey: String,
        message: Object
    },
    computed: {
        totalAnswers() {
            return Object.keys(this.message.message.results).length
        },
        isAnswered() {
            return Object.keys(this.message.message.results).includes(this.$store.state.user.uuid);
        },
        isSelected() {
            return Object.keys(this.message.message.results).includes(this.$store.state.user.uuid) ? this.message.message.results[this.$store.state.user.uuid] === this.answerKey : false;
        },
        percentage() {
            return Math.round((Object.values(this.message.message.results).filter(value => value === this.answerKey).length / this.totalAnswers) * 100);
        },
        cssVars () {
            return this.isSelected ? {'--percentage': this.percentage + '%', '--fill-color': 'var(--primary-darker)'} : {'--percentage': this.percentage + '%', '--fill-color': 'var(--primary)'}
        },
        isOwn() {
            return this.message.publisher === this.$store.state.pubnub.getUUID()
        },
    }
}
</script>

<style scoped>
.right .answer {
    background-color: var(--background-color);
}

.message .answer {
    height: 2.5rem;
    width: 100%;
    border: 2px solid var(--fill-color);
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

.answer.answered {
    cursor: default;
    pointer-events: none;

    background: linear-gradient(to right, var(--fill-color) var(--percentage), var(--background-color) 0);
}

.own .answer {
    background: linear-gradient(to right, var(--fill-color) var(--percentage), var(--background-color) 0);
}

.answer:hover {
    border-color: var(--primary-darker);
    background-color: var(--background-color-alternate);
}
</style>
