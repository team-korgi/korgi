<template>
  <div id="navigation">
    <div id="top">
      <h1>KORGI</h1>
      <p id="greeting">Willkommen zurück, {{name}}!</p>
      <a>Abmelden</a>
    </div>
    <div id="center">
      <router-link :to="{ name: 'groups'}" class="navigation-item">
        <p>Gruppenübersicht</p>
        <i class="fas fa-th-large"></i>
      </router-link>
      <router-link to="/termine" class="navigation-item">
        <p>Termine</p>
        <i class="fas fa-th-large"></i>
      </router-link>
      <router-link to="/einstellungen" class="navigation-item">
        <p>Einstellungen</p>
        <i class="fas fa-th-large"></i>
      </router-link>
      <div class="navigation-item">
        <p>Tutorial starten</p>
        <i class="fas fa-th-large"></i>
      </div>
    </div>
    <div id="bottom">
      <div></div>
      <a>Impressum</a>
      <a>Datenschutzerklärung</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "navigation",
  data() {
    return {
      name: "Jakob"
    }
  }
}
</script>

<style scoped>


#navigation {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: space-between;
  z-index: 20;

  width: 20vw;
  height: 100%;
  padding: 1%;

  background-color: #FFA88E;
}

.navigation-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 1em;
  margin-bottom: 1em;
}

#bottom {
  display: flex;
  flex-direction: column;
}
</style>