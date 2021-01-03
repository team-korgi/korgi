<template>
    <div id="settings">
        <div class="settings-header">
            <h1 class="title">Einstellungen</h1>
        </div>
        <div id="item-container">
            <div class="item">
                <div class="subject">Benutzer</div>
                <div class="content">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                </div>
            </div>

            <div class="item">
                <div class="subject">Benachrichtigungen</div>
                <div class="content">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                </div>
            </div>

            <div class="item">
                <div class="subject">Privatsphäre</div>
                <div class="content">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                </div>
            </div>

            <div class="item">
                <div class="subject">Darstellung</div>
                <div class="content">
                    <form id="presentation">
<!--                        <div class="radio-container">-->
                            <label class="radio-container">Heller Modus
                                <input type="radio" @change="toggleDarkmode" name="Farbmodus" value="lightmode" checked>
                                <span class="radio"></span>
                            </label>
<!--                        </div>-->
<!--                        <div class="radio-container">-->
                            <label class="radio-container">Dunkler Modus
                                <input type="radio" @change="toggleDarkmode" name="Farbmodus" value="darkmode">
                                <span class="radio"></span>
                            </label>
<!--                        </div>-->
                    </form>
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
}

.settings-header {
    padding: 2%;
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
    color: var(--font-color)
}

.item {
    display: flex;
    flex-direction: column;
    width: 45%;
    border-radius: 1rem;
    background-color: var(--background-color);

    box-shadow: 1px 0px 8px 3px rgba(92, 86, 86, 0.1);
    -webkit-box-shadow: 1px 0px 8px 3px rgba(92, 86, 86, 0.1);
    -moz-box-shadow: 1px 0px 8px 3px rgba(92, 86, 86, 0.1);

    margin-bottom: 6%;
    padding: 1%;
}

.radio-container {
    margin-left: 4%;
    margin-bottom: 4%;
    display: block;
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.radio-container input {
    opacity: 0;
    position: absolute;
    cursor: pointer;
    height: 0;
    width: 0;
}

.radio {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: var(--white);
    border: 2px solid var(--semi-dark-grey);
    border-radius: 50%;
}

.radio-container input:checked ~ .radio {
    background-color: var(--white);
}

.radio:after {
    content: "";
    position: absolute;
    display: none;
}

.radio-container input:checked ~ .radio:after {
    display: block;
}

.radio-container .radio:after {
    top: 3px;
    left: 3px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--semi-dark-grey);
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
}

</style>
