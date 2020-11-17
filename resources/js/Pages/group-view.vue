<template>
    <div id="group-view">
        <dialog-window v-show="isAddGroupDialogOpen" @close="toggleAddGroupDialog" @submit="addGroup">
            <add-group-dialog></add-group-dialog>
        </dialog-window>

        <div class="group-view-header">
            <h1 class="title">Gruppenübersicht</h1>
        </div>
        <div id="groups">
            <group-card v-for="group in groups" :group="group" :key="group.url"/>
            <new-group-card @click="toggleAddGroupDialog"/>
        </div>
    </div>
</template>

<script>
import GroupCard from "@/Pages/group-card";
import NewGroupCard from "@/Pages/new-group-card";
import DialogWindow from "@/Pages/dialog-window";
import AddGroupDialog from "@/Pages/add-group-dialog";

export default {
    name: "group-view",
    components: {AddGroupDialog, DialogWindow, NewGroupCard, GroupCard},
    data() {
        return {
            isAddGroupDialogOpen: false
        }
    },
    computed: {
        groups: function () {
            return this.$store.getters.getGroups;
        }
    },
    methods: {
        toggleAddGroupDialog() {
            this.isAddGroupDialogOpen = !this.isAddGroupDialogOpen;
        },
        addGroup(name) {
            this.$store.commit('addGroup', {name: name})
            this.toggleAddGroupDialog()
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
