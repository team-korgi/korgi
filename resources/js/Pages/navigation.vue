<template>
    <div id="navigation">
        <div id="top">
            <img class="logo" src="../../assets/korgi_yellow_only.svg" alt="KORGI">
            <p class="greeting">Willkommen zurück, {{ user }}!</p>
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
        <div class="btn secondary-background" @click="toggleDarkmode">Toggle Darkmode WIP</div>
        <div id="bottom">
            <a>Impressum</a>
            <a>Datenschutzerklärung</a>
        </div>
    </div>
</template>

<script>
import Button from "@/Jetstream/Button";
export default {
    name: "navigation",
    components: {Button},
    data() {
        return {
            user: this.$store.getters.getUser.username
        }
    },
    methods: {
        toggleDarkmode() {
            this.$store.commit('toggleDarkmode');
        },
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

.logo {
    width: 100%;
}


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

.greeting {
    font-size: 1.4rem;
    font-weight: bold;
    color: white;
    margin-top: 5%;
    margin-bottom: 5%;
}

.navigation-item i {
    width: 1.2rem;
    font-size: 1.5rem;
}

.navigation-item:hover {
    background-color: #ff8f6e;
}

#top {
    display: flex;
    flex-direction: column;
    padding: 5%;
}

#top a {
    color: white;
    text-decoration: underline;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
}



.navigation-item-active {
    background-color: #ff8f6e;
}

#bottom {
    display: flex;
    flex-direction: column;
    padding: 5%;
}

#bottom a {
    margin-top: 5%;
    color: white;
    text-decoration: underline;
    font-size: 1.2rem;
    font-weight: bold;
}

@media (max-width: 576px) {
    #navigation {
        display: none;
    }
}

</style>
