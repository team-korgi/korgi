<template>
    <div class="new-group-card" @click="$emit('click')">
        <i class="fas fa-plus new-group-card-icon"></i>
        <h1 class="new-group-card-text">Neue Gruppe erstellen</h1>
    </div>
</template>

<script>
export default {
    name: "new-group-card"
}
</script>

<style scoped>
.new-group-card {
    cursor: pointer;

    width: 15vw;
    height: 15vw;
    border: #FFA88E dashed 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;

    box-shadow: 1px 0px 15px 3px rgba(92,86,86,0.75);
    -webkit-box-shadow: 1px 0px 15px 3px rgba(92,86,86,0.75);
    -moz-box-shadow: 1px 0px 15px 3px rgba(92,86,86,0.75);

    transition: 0.2s ease;

    margin: 2%;
}

.new-group-card:hover {
    transform: scale(1.05);
}

.new-group-card-icon {
    color: #FFA88E;
    font-size: 3rem;
    font-weight: 600;
}

.new-group-card-text {
    font-size: 1.2rem;
    font-weight: 400;
    color: #FFA88E;
}
</style>
