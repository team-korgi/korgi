<template>
  <div id="group">
    <div id="group-header">
      <h1 class="headline">{{group.name}}</h1>
      <div id="chat-selection">
        <router-link :to="{ name: 'chat', params: { url: url, type: 'allgemein' }}">Allgemein</router-link>
        <router-link :to="{ name: 'chat', params: { url: url, type: 'wichtig' }}">Wichtig</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "group",
  props: {
    url: String
  },
  computed: {
    group() {
      return this.$store.getters.getGroup(this.url);
    }
  }
}
</script>

<style scoped>
#group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

#group-header {
  display: flex;
  flex-direction: column;
  box-shadow: 1px 0px 15px 3px rgba(92,86,86,0.75);
  -webkit-box-shadow: 1px 0px 15px 3px rgba(92,86,86,0.75);
  -moz-box-shadow: 1px 0px 15px 3px rgba(92,86,86,0.75);
  padding: 2%;
}

#chat-selection {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
