<template>
  <div id="chat">
    <div id="messages">
      <message v-for="message in chat.messages" :key="message.timestamp" :message="message"/>
    </div>
    <div id="input-group">
      <dialog-window v-show="isDialogOpen" @close="toggleDialog" @submit="sendFile">
        <send-file-dialog></send-file-dialog>
      </dialog-window>
      <button v-on:click="toggleDialog">Dialog öffnen</button>
      <input id="message-input" type="text" v-model="message" @keypress.enter="publish" placeholder="Nachricht">
      <button :disabled="!message.length" v-on:click="publish">Senden!</button>
    </div>
  </div>
</template>

<script>
import Message from "./message";
import DialogWindow from "./dialog-window";
import SendFileDialog from "./send-file-dialog";

export default {
  name: "chat",
  components: {Message, DialogWindow, SendFileDialog},
  props: {
    type: String,
    url: String
  },
  data() {
    return {
      message: "",
      isDialogOpen: false
    };
  },
  computed: {
    chat() {
      return this.$store.getters.getChannel(this.url, this.type);
    }
  },
  methods: {
    publish() {
      if (this.message.length) {
        this.$store.commit('publish', {
          message: this.message,
          channel: this.chat.uuid,
          chat: this.type,
          group: this.url
        });
        this.message = "";
      }
    },
    sendFile(file) {
      // TODO Upload File
      console.log(file)
      this.$store.commit('publish', {
        message: file.name,
        channel: this.chat.uuid,
        chat: this.type,
        group: this.url,
        fileUrl: ""
      });
      this.toggleDialog();
    },
    toggleDialog() {
      this.isDialogOpen = !this.isDialogOpen;
    }
  }
}
</script>

<style scoped>
#chat {
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
}

#messages {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 2%;
}

#message-input {
  flex-grow: 1;
}

#input-group {
  padding: 2% 4% 2% 4%;
  box-shadow: 1px 0px 15px 3px rgba(92,86,86,0.75);
  -webkit-box-shadow: 1px 0px 15px 3px rgba(92,86,86,0.75);
  -moz-box-shadow: 1px 0px 15px 3px rgba(92,86,86,0.75);
}
</style>
