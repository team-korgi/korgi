<template>
    <div class="group-card" @click="linkToGroup">
        <div class="group-card-icon">{{group.name.substring(0, 1)}}</div>
        <h1 class="group-card-name">{{group.name}}</h1>
    </div>
</template>

<script>
export default {
    name: "group-card",
    props: {
        group: Object
    },
    methods: {
        linkToGroup() {
            this.$router.push({ name: 'chat', params: { url: this.group.url, type: 'allgemein' }});
        }
    }
}
</script>

<style scoped>
.group-card {
    cursor: pointer;

    background-color: var(--background-color);

    width: 15vw;
    height: 15vw;
    border: #FFA88E solid 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 1.5rem;

    box-shadow: 1px 0px 15px 3px rgba(92,86,86,0.3);
    -webkit-box-shadow: 1px 0px 15px 3px rgba(92,86,86,0.3);
    -moz-box-shadow: 1px 0px 15px 3px rgba(92,86,86,0.3);

    transition: 0.2s ease;

    margin: 2%;
}

.group-card:hover {
    transform: scale(1.05);
}

.group-card-icon {
    width: 50%;
    height: 50%;
    background-color: var(--primary);
    color: white;
    font-size: 3rem;
    font-weight: 600;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
}

.group-card-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--header-color);
}

@media (max-width: 576px) {
    .group-card {
        width: 90vw;
        height: 20vw;
        flex-direction: row;
        justify-content: flex-start;

        box-shadow: 1px 0px 8px 3px rgba(92,86,86,0.3);
        -webkit-box-shadow: 1px 0px 8px 3px rgba(92,86,86,0.3);
        -moz-box-shadow: 1px 0px 8px 3px rgba(92,86,86,0.3);

    }
    .group-card-icon {
        width: 16.66%;
        height: 80%;
        font-size: 2rem;
        margin: 10px;
    }
    .group-card-name {
        font-size: 1.3rem;
    }
}
</style>
