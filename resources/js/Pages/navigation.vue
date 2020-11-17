<template>
    <div id="navigation">
        <div id="top">
            <h1>KORGI</h1>
            <p id="greeting">Willkommen zurück, {{ name }}!</p>
            <a>Abmelden</a>
        </div>
        <div id="center">
            <router-link :class="groupsIsCurrent()" :to="{ name: 'groups'}" class="navigation-item">
                <p>Gruppenübersicht</p>
                <i class="fas fa-th-large"></i>
            </router-link>
            <router-link :class="eventsIsCurrent()" to="/termine" class="navigation-item">
                <p>Termine</p>
                <i class="far fa-calendar-alt"></i>
            </router-link>
            <router-link :class="settingsIsCurrent()" to="/einstellungen" class="navigation-item">
                <p>Einstellungen</p>
                <i class="fas fa-cog"></i>
            </router-link>
            <div :class="tutorialIsCurrent()" class="navigation-item">
                <p>Tutorial starten</p>
                <i class="far fa-question-circle"></i>
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
    },
    methods: {
        groupsIsCurrent() {
            if (this.$route.fullPath.match("/gruppen.*")) {
                return "navigation-item-active";
            }
        },
        eventsIsCurrent() {
            if (this.$route.fullPath==="/termine") {
                return "navigation-item-active";
            }
        },
        settingsIsCurrent() {
            if (this.$route.fullPath==="/einstellungen") {
                return "navigation-item-active";
            }
        },
        tutorialIsCurrent() {
            if (this.$route.fullPath==="/tutorial") {
                return "navigation-item-active";
            }
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

    background-color: #FFA88E;
}

.navigation-item {
    padding: 5%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 1.2rem;
    font-weight: 600;

    margin-top: 1em;
    margin-bottom: 1em;
    background-color: #FFA88E;
    transition: 0.2s ease;
    margin: 0;
}

.navigation-item i {
    width: 1.2rem;
    font-size: 1.5rem;
}

.navigation-item:hover {
    background-color: #ff8f6e;
}

.navigation-item-active {
    background-color: #ff8f6e;
}

#bottom {
    display: flex;
    flex-direction: column;
}
</style>
