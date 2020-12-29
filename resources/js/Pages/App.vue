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
    },
    computed: {
        darkmode: function() {
            return this.$store.state.user.settings.darkmode
        }
    },
    watch: {
        darkmode: function(darkmode) {
            let root = document.documentElement;
            let isDarkmode = root.classList.contains('darkmode');
            if (isDarkmode && !darkmode) {
                root.classList.remove('darkmode');
            } else if (!isDarkmode && darkmode) {
                root.classList.add('darkmode');
            }
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: all 0.2s ease;
}

:root {
    --primary: #FFA88E;
    --primary-darker: #ff8f6e;

    --secondary-lighter: #FFDBB1;
    --secondary: #FFCB8E;
    --secondary-darker: #ffb561;

    --warn: #FC6B6B;
    --warn-darker: #ef5252;

    --black: #000000;
    --dark-grey: #2C2F33;
    --mid-grey: #E1E1E1;
    --light-grey: #F3F3F3;
    --white: #ffffff;
}

html {
    --background-color: var(--white);
    --background-color-alternate: var(--light-grey);
    --font-color: var(--black);
    --header-color: var(--dark-grey);
}

html.darkmode {
    --background-color: var(--dark-grey);
    --background-color-alternate: var(--mid-grey);
    --font-color: var(--white);
    --header-color: var(--white);
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

    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
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
    /*flex-grow: 1;*/
    height: 3rem;
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    user-select: none;
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
    background-color: var(--warn);
    transition: 0.2s ease;
    cursor: pointer;
    color: white;
}

.primary-background {
    background-color: var(--primary);
    transition: 0.2s ease;
    cursor: pointer;
    color: white;
}

.secondary-background {
    background-color: var(--secondary);
    transition: 0.2s ease;
    cursor: pointer;
    color: white;
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
    background-color: var(--warn-darker);
}

.primary-background:hover {
    background-color: var(--primary-darker);
}

.secondary-background:hover {
    background-color: var(--secondary-darker);
}
</style>
