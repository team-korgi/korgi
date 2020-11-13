<template>
    <div id="app">
        <navigation/>
        <router-view/>
    </div>
</template>

<script>
import Navigation from "./navigation"

export default {
    name: 'App',
    components: {
        Navigation
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

#app {
    display: flex;
    flex-direction: row;

    width: 100vw;
    height: 100vh;

    font-family: 'Montserrat', sans-serif;
}
</style>
