<template>
  <div id="dialog-window">
    <h2>Datei senden</h2>
    <input id="send-file-input" type="file" @change="saveFile">
    <div id="buttons">
      <button @click="$parent.$emit('close')">Abbrechen</button>
      <button :disabled="!file" @click="$parent.$emit('submit', file)">Senden</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "send-file-dialog",
  data() {
    return {
      file: undefined
    }
  },
  methods: {
    saveFile(event) {
      this.file = event.target.files[0];
    }
  }
}
</script>

<style scoped>
#send-file-input {
  border-radius: 2em;
  background-color: lightgray;
  border: gray dashed 5px;
  height: 40vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  margin-top: 2em;
  margin-bottom: 2em;
}

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

button {
    flex-grow: 1;
    height: 2rem;
    font-size: 1rem;
    color: white;
    background-color: #FFA88E;
}
</style>
