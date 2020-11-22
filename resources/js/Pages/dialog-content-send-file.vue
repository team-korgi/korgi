<template>
    <div class="dialog-content">
        <input class="send-file-input" type="file" @change="saveContent">
    </div>
</template>

<script>
export default {
    name: "new-send-file-dialog",
    props: {
        bus: Object
    },
    data() {
        return {
            file: undefined
        }
    },
    methods: {
        saveContent(event) {
            this.file = event.target.files[0];
            this.bus.$emit('validate', this.file);
        }
    }
}
</script>

<style scoped>
.dialog-content {
    width: 100%;
}

.send-file-input {
    border-radius: 2rem;
    background-color: lightgray;
    border: gray dashed 5px;
    height: 40vh;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
