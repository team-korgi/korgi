<template>
  <div class="message" v-bind:class="changeAlignment()">{{message.message.user}}: {{message.message.text}}</div>
</template>

<script>
export default {
  name: "Message",
  props: {
    message: Object
  },
  methods: {
    changeAlignment() {
      if (this.message.publisher === this.$store.state.pubnub.getUUID()) {
        return 'right';
      }
    }
  }
}
</script>

<style scoped>
.message {

}

.right {
  align-self: flex-end;
}
</style>