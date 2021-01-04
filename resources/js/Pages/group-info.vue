<template>
    <div id="group-info" :class="{'active': active}">
        <div id="group-info-header">
            <div>Header</div>
            <div class="round-btn secondary-background" @click="toggleActive">
                <i class="fas fa-times"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "group-info",
    props: {
        bus: Object
    },
    data() {
        return {
            active: true
        }
    },
    created() {
        this.bus.$on("toggleGroupInfo", () => {
            this.toggleActive()
        })
    },
    methods: {
        toggleActive() {
            this.active = !this.active;
        }
    }
}
</script>

<style scoped>
    #group-info {
        width: 0;
        overflow: hidden;
        z-index: 100;
        background-color: var(--background-color);
        box-shadow: 1px 0px 15px 3px rgba(92, 86, 86, 0.5);
        -webkit-box-shadow: 1px 0px 15px 3px rgba(92, 86, 86, 0.5);
        -moz-box-shadow: 1px 0px 15px 3px rgba(92, 86, 86, 0.5);

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1% 0 1% 0;

        transition: 0.2s ease;
    }

    #group-info.active {
        width: 20%;
        padding: 1%;
    }

    #group-info-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
</style>
