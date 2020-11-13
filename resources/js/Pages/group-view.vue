<template>
  <div id="group-view">
      <div class="group-view-header">
          <h1>Gruppenübersicht</h1>
      </div>
    <div id="groups">
      <group-card v-for="group in groups" :group="group" :key="group.url"/>
    </div>
  </div>
</template>

<script>
import GroupCard from "@/Pages/group-card";
export default {
  name: "group-view",
    components: {GroupCard},
    computed: {
    groups: function () {
      return this.$store.getters.getGroups;
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
