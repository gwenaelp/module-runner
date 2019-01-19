<template>
  <div>
    <div class="menu-desktop" v-responsive.md.lg.xl>
      <MenuContent/>
    </div>
    <MobileMenu :opened="$store.state.mobileMenuOpened" v-responsive.sm.xs>
      <MenuContent/>
    </MobileMenu>
  </div>
</template>
<script>
import MenuContent from './MenuContent';
import MobileMenu from './MobileMenu';

export default {
  components: {
    MenuContent,
    MobileMenu,
  },
};
</script>
<style scoped>

.menu-desktop {
  width: 450px;
  height: 100%;
}

@media screen and (max-width: 1024px) {
  .menu-desktop {
    width: 200px;
  }
}

</style>
