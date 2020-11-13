<template>
  <div id="group-view">
    <h1>Gruppenübersicht</h1>
    <div id="groups">
      <router-link :to="{ name: 'chat', params: { url: group.url, type: 'allgemein' }}" v-for="group in groups" :key="group.url">
        {{ group.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "group-view",
  computed: {
    groups: function () {
      return this.$store.getters.getGroups;
    }
  }
}
</script>

<style scoped>
#group-view {
  padding: 2%;
  width: 100%;
}
</style>