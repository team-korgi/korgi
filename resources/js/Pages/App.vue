<template>
    <div id="app">
<!--        <date-picker :multiple="true"></date-picker>-->
<!--        <date-picker :multiple="false"></date-picker>-->
        <navigation/>
        <router-view/>
    </div>
</template>

<script>
import Navigation from "./navigation"
import DatePicker from "@/Pages/date-picker";

export default {
    name: 'App',
    components: {
        DatePicker,
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

.headline {
    color: #707070;
    font-size: 1.8rem;
    font-weight: 700;
}

.title {
    color: #FFCB8E;
    font-size: 1.8rem;
    font-weight: 700;
}

.round-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
    color: white;
    border-radius: 1.5rem;
    outline: 0;
}

.round-btn.mini {
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.75rem;
}

.btn {
    width: 100%;
    flex-grow: 1;
    height: 3rem;
    font-size: 1rem;
    color: white;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-radius: 1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
}

.btn i {
    font-size: 1.5rem;
}

.input {
    font-size: 1rem;
    outline: 0;
    border-radius: 1.5rem;
    color: #707070;
    font-weight: 600;

    padding-left: 1.5rem;
    padding-right: 1.5rem;
    height: 3rem;
    background-color: #E1E1E1;
}

.input::placeholder {
    color: #707070;
}

.input.disabled {
    cursor: default;
    pointer-events: none;
}

.warn-background {
    background-color: #FC6B6B;
    transition: 0.2s ease;
}

.primary-background {
    background-color: #FFA88E;
    transition: 0.2s ease;
}

.secondary-background {
    background-color: #FFCB8E;
    transition: 0.2s ease;
}

.warn-background.disabled {
    pointer-events: none;
    cursor: default;
    filter: saturate(0.3);
}

.primary-background.disabled {
    pointer-events: none;
    cursor: default;
    filter: saturate(0.3);
}

.secondary-background.disabled {
    pointer-events: none;
    cursor: default;
    filter: saturate(0.3);
}

.warn-background:hover {
    background-color: #ef5252;
}

.primary-background:hover {
    background-color: #ff8f6e;
}

.secondary-background:hover {
    background-color: #ffb561;
}
</style>
