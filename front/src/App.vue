<template>
  <div id="app">
    <Menu />
    <div class="content-wrapper">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'

export default {
  name: 'app',
  components: {
    Menu,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background: white;
  user-select: none;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.content-wrapper {
  overflow-y: auto;
  width: calc(100% - 450px);
}

.content {
  padding: 20px;
  max-width: 500px;
}

@media screen and (max-width: 1024px) {
  .content-wrapper {
    width: calc(100% - 200px);
  }
}

@media screen and (max-width: 768px) {
  .content-wrapper {
    width: 100%;
    padding-top: 40px;
  }
  .content {
    max-width: calc(100% - 40px);
  }
}

.light-background, .menu-desktop {
  background: #0098CE;
}

.semi-transparent-background {
  background: rgba(0.5, 0.5, 0.5, 0.5);
}
</style>
