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
    border: #FFA88E solid 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 1.5rem;

    box-shadow: 0 0 15px 3px rgba(92,86,86,0.5);
    -webkit-box-shadow: 0 0 15px 3px rgba(92,86,86,0.5);
    -moz-box-shadow: 0 0 15px 3px rgba(92,86,86,0.5);

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
</style>
