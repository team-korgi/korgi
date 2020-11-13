<template>
  <div @keypress.esc="this.$emit('close')" id="overlay">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "dialog-window"
}
</script>

<style scoped>
#overlay {
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  backdrop-filter: blur(2px) brightness(70%);

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>