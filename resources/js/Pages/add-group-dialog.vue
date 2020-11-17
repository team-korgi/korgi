<template>
    <div id="dialog-window">
        <h2 class="title">Gruppe erstellen</h2>
        <input id="add-group-dialog-input" class="input" type="text" v-model="name" placeholder="Gruppenname">
        <div id="buttons">
            <div style="flex-grow: 1" class="btn warn-background" @click="$parent.$emit('close')"><p>Abbrechen</p><i class="fas fa-times"></i>
            </div>
            <div style="flex-grow: 1"></div>
            <div style="flex-grow: 1" class="btn secondary-background" :disabled="!name" @click="addGroup"><p>Speichern</p><i class="fas fa-check"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "add-group-dialog",
    data() {
        return {
            name: ""
        }
    },
    methods: {
        addGroup() {
            if (this.name.length) {
                let nameBuffer = this.name;
                this.name = "";
                this.$parent.$emit('submit', nameBuffer)
            }
        }
    }
}
</script>

<style scoped>

#dialog-window {
    background-color: white;
    width: 30vw;
    padding: 2.5%;
    border-radius: 3em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

#buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

#add-group-dialog-input {
    margin-top: 10%;
    margin-bottom: 10%;
    width: 100%;
}

</style>
