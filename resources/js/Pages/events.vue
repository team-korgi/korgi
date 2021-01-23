<template>
    <div id="events">
        <div id="events-content">
            <!--        <div v-for="event in events">-->
            <!--            <p>{{event.subject}}</p>-->
            <!--            <p>{{event.date.toString()}}</p>-->
            <!--        </div>-->
            <div class="events-header">
                <h1 class="title">Termine</h1>
                <div class="btn primary-background" @click="toggleFilters">Filter</div>
            </div>
            <div id="events-container">
                <event v-for="event in events" :event="event"/>
            </div>
        </div>
        <event-filters :bus="bus"/>
    </div>
</template>

<script>
import Navbar from "@/Pages/navbar";
import Event from "@/Pages/event";
import Vue from "vue";
import EventFilters from "@/Pages/event-filters";

export default {
    name: "events",
    components: {EventFilters, Event, Navbar},
    computed: {
        events() {
            return this.$store.getters.getEvents
        }
    },
    data() {
        return {
            bus: new Vue()
        }
    },
    created() {
        this.$store.commit("setCurrentPage", {page: "Termine"});
        this.$store.commit("setShowArrow", {showArrow: false});
    },
    methods: {
        toggleFilters() {
            this.bus.$emit("toggleFilters");
        },
    }
}
</script>

<style scoped>
#events {
    display: flex;
    flex-direction: row;
    width: 100%;
}

#events-content {
    height: 100%;
    width: 100%;
    background-color: var(--background-color-alternate);
    overflow: auto;
}

#events-container {
    margin-top: 2%;
    display: flex;
    position: relative;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.events-header {
    padding: 4vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.btn {
    width: fit-content;
}

@media (max-width: 576px) {
    .title {
        display: none;
    }
}

@media (min-width: 576px) {
    #events-content::-webkit-scrollbar {
        margin-left: -1rem;
        width: 1rem;
    }

    #events-content::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 0.5rem;
    }

    #events-content::-webkit-scrollbar-thumb {
        background-color: #FFA88E;
        border-radius: 0.5rem;
    }
}

</style>
