<template>
    <div id="navbar">
        <img id="logo" src="../../assets/korgi_red.svg" alt="KORGI">
        <h2 class="title">{{header}}</h2>
    </div>
</template>

<script>
export default {
    name: "navbar",
    props: {
        header: String
    }
}
</script>

<style scoped>

#navbar {
    padding: 16px;
    display: none;
    width: 100%;
    height: 20vw;
    z-index: 5;
    background-color: var(--primary);
    flex-direction: row;
    justify-content: flex-start;
}

#logo {
    display: block;
    flex-grow: 0;
    width: 50px;
}

h2.title {
    color: white;
    margin-left: 10px;
    font-size: 1.5rem;
}

@media (max-width: 576px) {
    #navbar {
        display: flex;
    }
}

</style>
