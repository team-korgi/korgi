<template>
    <div id="events">
        <div v-for="event in events">
            <p>{{event.subject}}</p>
            <p>{{event.date.toString()}}</p>
        </div>
    </div>
</template>

<script>
import Navbar from "@/Pages/navbar";
export default {
    name: "events",
    components: {Navbar},
    computed: {
        events() {
            return this.$store.getters.getEvents
        }
    },
    created() {
        this.$store.commit("setCurrentPage", {page: "Termine"});
        this.$store.commit("setShowArrow", {showArrow: false});
    },
}
</script>

<style scoped>
#events {
    width: 100%;
}
</style>
