<template>
    <div id="group-view">
        <dialog-window :bus="groupInputBus" title="Gruppe erstellen" @submit="createGroup">
            <dialog-content-create-group :bus="groupInputBus"/>
        </dialog-window>

        <div class="group-view-header">
            <h1 class="title">Gruppenübersicht</h1>
        </div>
        <div id="groups">
            <group-card v-for="group in groups" :group="group" :key="group.url"/>
            <new-group-card @click="groupInputBus.$emit('open')"/>
        </div>
    </div>
</template>

<script>
import GroupCard from "@/Pages/group-card";
import NewGroupCard from "@/Pages/new-group-card";
import DialogWindow from "@/Pages/dialog-window";
import Vue from "vue";
import DialogContentCreateGroup from "@/Pages/dialog-content-create-group";
import Navbar from "@/Pages/navbar";

export default {
    name: "group-view",
    components: {Navbar, DialogContentCreateGroup, DialogWindow, NewGroupCard, GroupCard},
    data() {
        return {
            groupInputBus: new Vue()
        }
    },
    created() {
        this.$store.commit("setCurrentPage", {page: "Gruppenübersicht"});
        this.$store.commit("setShowArrow", {showArrow: false});
    },
    computed: {
        groups: function () {
            return this.$store.getters.getGroups;
        }
    },
    methods: {
        createGroup(name) {
            this.$store.commit('addGroup', {name: name})
        }
    }
}
</script>

<style scoped>
#group-view {
    height: 100%;
    width: 100%;
    background-color: var(--background-color-alternate);
    overflow: auto;
}

.group-view-header {
    padding: 2%;
}

#groups {
    margin-top: 2%;
    display: flex;
    position: relative;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
}

@media (max-width: 576px) {
    #groups {
        /*margin-top: 25%;*/
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;
    }

    .group-view-header {
        display: none;
    }
}

@media (min-width: 576px) {
    #group-view::-webkit-scrollbar {
        margin-left: -1rem;
        width: 1rem;
    }

    #group-view::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 0.5rem;
    }

    #group-view::-webkit-scrollbar-thumb {
        background-color: #FFA88E;
        border-radius: 0.5rem;
    }
}

</style>
