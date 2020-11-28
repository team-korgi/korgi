<template>
    <div id="events">
        <h1 class="headline">Meine Termine</h1>
        <div v-for="event in events">
            <p>{{event.subject}}</p>
            <p>{{event.date.toString()}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "events",
    computed: {
        events() {
            return this.$store.getters.getEvents
        }
    }
}
</script>

<style scoped>
#events {
    padding: 2%;
}
</style>
