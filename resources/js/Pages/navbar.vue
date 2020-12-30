<template>
    <div id="navbar">
        <img id="logo" src="../../assets/korgi_red.svg" alt="KORGI">
        <div class="title">{{header}}</div>
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
    padding: 14px;
    display: none;
    width: 100%;
    height: 20vw;
    z-index: 5;
    background-color: var(--primary);
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

#logo {
    display: block;
    flex-grow: 0;
    width: 16%;
    height: 100%;
}

div.title {
    color: white;
    margin-left: 10px;
    font-size: 1.3rem;
}

@media (max-width: 576px) {
    #navbar {
        display: flex;
    }
}

</style>
