<template>
    <div class="dialog-content">
        <input type="text" class="input"  v-model="subject" placeholder="Bezeichnung" @input="saveContent">
        <input type="text" class="input" v-for="answerKey in Object.keys(answers)" v-model="answers[answerKey]" :placeholder="'Antwort ' + answerKey" @input="saveContent">
        <div class="btn secondary-background" @click="addAnswer">Antwort hinzufügen</div>
        <label class="row flex-start checkbox-container">
            Mehrfachantworten erlauben
            <input type="checkbox" v-model="allowMultiple">
            <span class="checkbox"></span>
        </label>
    </div>
</template>

<script>
import Input from "@/Pages/Input";
import Vue from "vue";
export default {
    name: "dialog-content-poll",
    components: {Input},
    data() {
        return {
            allowMultiple: [],
            subject: "",
            answers: {1: ""},
            results: {1: 0}
        };
    },
    props: {
        bus: Object
    },
    methods: {
        saveContent() {
            if (!Object.values(this.answers).includes("")) {
                this.bus.$emit('validate', {
                    subject: this.subject,
                    answers: this.answers,
                    allowMultiple: !!this.allowMultiple.length
                });
            } else {
                this.bus.$emit('validate', {
                    subject: this.subject,
                    answers: undefined,
                    allowMultiple: !!this.allowMultiple.length
                });
            }
        },
        addAnswer() {
            Vue.set(this.answers, Object.keys(this.answers).length+1, "");
            Vue.set(this.results, Object.keys(this.answers).length, 0);
            this.saveContent();
        }
    }
}
</script>

<style scoped>

</style>
