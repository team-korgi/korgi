<template>
    <div id="settings">
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
}
</style>
