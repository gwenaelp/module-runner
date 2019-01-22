<template>
  <div
      class="restart-icon-wrapper light-background"
      @click="$socket.emit('system', { action: 'restart' })">
    <i class="fas fa-sync fa-2x" />
  </div>
</template>
<script>
export default {
};
</script>
<style scoped>
.restart-icon-wrapper {
  position: absolute;
  right: 0;
  top: 100px;
  width: 44px;
  padding: 10px;
  height: 34px;
  color: white;
  cursor: pointer;
}
</style>
