<template>
    <div id="dialog-window">
        <h2 class="title">Gruppe erstellen</h2>
        <input class="input" id="add-group-input" type="text" v-model="name" placeholder="Gruppenname">
        <div id="buttons">
            <div class="button cancel" @click="$parent.$emit('close')"><p>Abbrechen</p><i class="fas fa-times"></i>
            </div>
            <div class="button accept" :disabled="!name" @click="addGroup"><p>Speichern</p><i class="fas fa-check"></i>
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

.button {
    flex-grow: 1;
    height: 3rem;
    font-size: 1.2rem;
    color: white;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-radius: 1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    transition: 0.2s ease;
}

.button:hover {
    filter: brightness(90%);
}

i {
    font-size: 1.5rem;
}

.cancel {
    background-color: #FC6B6B;
    margin-right: 20%;
}

.title {
    font-weight: 700;
    font-size: 1.5rem;
}

.input {
    height: 3rem;
    width: 100%;
    font-size: 1.2rem;
    font-weight: 600;
    color: white;
    border-radius: 1.5rem;
    margin-top: 10%;
    margin-bottom: 10%;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    outline: 0;
    background-color: #E1E1E1;
}

::placeholder {
    color: white;
}

.accept {
    background-color: #FFCB8E;
}
</style>
