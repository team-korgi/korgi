<template xmlns="http://www.w3.org/1999/html">
    <div id="settings">
        <div class="settings-header">
            <h1 class="title">Einstellungen</h1>
        </div>
        <div id="item-container">
            <div class="item">
                <div class="subject">Benutzer</div>
                <div class="content">
                    <div id="user">
                        <div class="flex-item-container">
                            <span class="small-headline">Name</span>
                            <input class="alternate-input" type="text" name="username" value="username" placeholder="Username" v-model="username">
                            <div class="round-btn primary-background">
                                <i class="fas fa-edit"/>
                            </div>
                        </div>
                        <div class="flex-item-container">
                            <span class="small-headline">E-Mail</span>
                            <input class="alternate-input" type="email" name="email" value="email" placeholder="E-Mail" v-model="usermail">
                            <div class="round-btn primary-background">
                                <i class="fas fa-edit"/>
                            </div>
                        </div>
                        <div class="link-container">
                            <a>Passwort ändern</a>
                            <a class="warn">Account löschen</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="item">
                <div class="subject">Privatsphäre</div>
                <div class="content">
                    <div id="privacy">
                        <span class="small-headline">Alle gesammelten Daten anfordern</span>
                        <br>
                        Chatnachrichten, Nutzerdaten, Verschickte Dateien, ...
                        <br>
                        <br>
                        Der Vorgang kann einzige Zeit in Anspruch nehmen. Nach Abschluss erhältst du eine E-Mail mit den gesammelten Daten.
                        <br>
                    </div>
                    <div class="btn primary-background">Daten anfordern</div>
                </div>
            </div>

            <div class="item">
                <div class="subject">Benachrichtigungen</div>
                <div class="content">
                    <div id="messages">
                        <label class="checkbox-container">
                            E-Mail Benachrichtigungen
                            <input type="checkbox" name="email-msg" value="email-msg">
                            <span class="checkbox"></span>
                        </label>
                        <label class="checkbox-container">
                            Push Benachrichtigungen
                            <input type="checkbox" name="push-msg" value="push-msg">
                            <span class="checkbox"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="item">
                <div class="subject">Darstellung</div>
                <div class="content">
                    <div id="presentation">
                        <label class="checkbox-container">Heller Modus
                            <input type="radio" :checked="!darkmode" @change="toggleDarkmode" name="Farbmodus" value="lightmode">
                            <span class="radio"></span>
                        </label>
                        <label class="checkbox-container">Dunkler Modus
                            <input type="radio" :checked="darkmode" @change="toggleDarkmode" name="Farbmodus" value="darkmode">
                            <span class="radio"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "@/Pages/navbar";
import Label from "@/Jetstream/Label";

export default {
    name: "settings",
    components: {Label, Navbar},
    created() {
        this.$store.commit("setCurrentPage", {page: "Einstellungen"});
        this.$store.commit("setShowArrow", {showArrow: false});

    },
    computed: {
        darkmode: function() {
            return this.$store.state.user.settings.darkmode
        }
    },
    methods: {
        toggleDarkmode() {
            this.$store.commit('toggleDarkmode');
        }
    }
}
</script>

<style scoped>
#settings {
    width: 100%;
    height: 100%;
    background-color: var(--background-color-alternate);
    overflow: auto;
}

.settings-header {
    padding: 2%;
}

::placeholder {
    color: var(--font-color)
}

#item-container {
    margin: auto;
    display: flex;
    position: relative;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 80%;
}

.subject {
    margin: 2%;
    font-weight: 800;
    font-size: 1.3rem;
    color: var(--font-color)
}

.content {
    margin: 2%;
    color: var(--font-color);
    font-size: 1rem;
    height: 100%;
}

.item {
    display: flex;
    flex-direction: column;
    width: 45%;
    border-radius: 1rem;
    background-color: var(--background-color);

    box-shadow: 1px 0px 8px 3px var(--shadow-color);
    -webkit-box-shadow: 1px 0px 8px 3px var(--shadow-color);
    -moz-box-shadow: 1px 0px 8px 3px var(--shadow-color);

    margin-bottom: 6%;
    padding: 1%;
}

.flex-item-container {
    margin-left: 4%;
    margin-bottom: 4%;
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 35px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.checkbox-container {
    margin-left: 4%;
    margin-bottom: 4%;
}

.link-container {
    margin-left: 4%;
    margin-bottom: 4%;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.btn {
    width: 40%;
    justify-content: center;
    margin-top: 4%;
}

#privacy {
    margin-bottom: 4%;
}

.small-headline {
    font-weight: bolder;
    font-size: 1.1rem;
}

a {
    text-decoration: underline;
    margin-right: 4%;
    margin-top: 5%;
}

.warn {
    color: var(--warn)
}

#user .flex-item-container {
    padding: 0;
    justify-content: space-between;
    flex-wrap: wrap;
}

@media (max-width: 576px) {
    .title {
        display: none;
    }

    #item-container {
        flex-direction: column;
        width: 90%;
    }

    .item {
        width: 100%;
        padding: 2%;
    }

    .btn {
        width: 70%;
    }

    #user .small-headline {
        flex-basis: 100%;
    }

    .alternate-input {
        width: 70%;
    }

    a {
        margin-right: 3%;
    }
}

@media (min-width: 576px) {
    #settings::-webkit-scrollbar {
        margin-left: -1rem;
        width: 1rem;
    }

    #settings::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 0.5rem;
    }

    #settings::-webkit-scrollbar-thumb {
        background-color: #FFA88E;
        border-radius: 0.5rem;
    }
}

</style>
