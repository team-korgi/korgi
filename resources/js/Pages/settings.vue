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
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "@/Pages/navbar";
export default {
    name: "settings",
    components: {Navbar},
    created() {
        this.$store.commit("setCurrentPage", {page: "Einstellungen"});
        this.$store.commit("setShowArrow", {showArrow: false});
    },
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
    margin-left: 2%;
    margin-top: 2%;
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
    }
}

</style>
