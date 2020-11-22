<template>
    <div id="group-view">

        <dialog-window :bus="groupInputBus" title="Gruppe erstellen!" @submit="createGroup">
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

export default {
    name: "group-view",
    components: {DialogContentCreateGroup, DialogWindow, NewGroupCard, GroupCard},
    data() {
        return {
            groupInputBus: new Vue()
        }
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
    width: 100%;
}

.group-view-header {
    padding: 2%;
}

#groups {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
}
</style>
