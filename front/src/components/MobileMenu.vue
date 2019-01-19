<template>
  <div>
    <div class="mobile-menu-hamburger-wrapper" @click="opened = !opened">
      <div class="mobile-menu-hamburger">
        <i class="fas fa-bars" />
      </div>
    </div>
    <div ref="eventsHandler">
      <div class="menu-overlay" v-if="opened || dragOn" @click="opened = false" />
      <div ref="menuContainer" class="mobile-menu">
        <div class="light-background">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dragOn: false,
      dragOriginX: 0,
    };
  },

  mounted() {
    let mouseEvents = {
      down: 'mousedown',
      move: 'mousemove',
      up: 'mouseup'
    };

    if('ontouchstart' in window) {
      mouseEvents = {
        down: 'touchstart',
        move: 'touchmove',
        up: 'touchend'
      };
    }

    this.$refs.eventsHandler.addEventListener(mouseEvents.down, (event) => {
      this.dragstart(event);
    });
    this.$refs.eventsHandler.addEventListener(mouseEvents.up, (event) => {
      this.dragstop(event);
    });
    this.$refs.eventsHandler.addEventListener(mouseEvents.move, (event) => {
      this.mousemove(event);
    });
  },
  watch: {
    opened: {
      handler(opened) {
        if (opened) {
          this.$refs.menuContainer.style.left = '0px';
        } else {
          this.$refs.menuContainer.style.left = '-200px';
        }
      },
    },
  },
  computed: {
    opened: {
      get() {
        return this.$store.state.mobileMenuOpened;
      },
      set(value) {
        this.$store.state.mobileMenuOpened = value;
      },
    },
  },

  methods: {
    openMenu() {
      this.opened = true;
    },
    closeMenu() {
      this.opened = false;
    },
    dragstart(event) {
      this.dragOn = true;
      const eventX = event.screenX || event.changedTouches[0].clientX;
      this.dragOriginX = eventX;
    },
    dragstop(event) {
      this.dragOn = false;
      const eventX = event.screenX || event.changedTouches[0].clientX;
      const initialX = this.opened ? 0 : 200;
      const x = Math.min(eventX - initialX - this.dragOriginX, 0);
      if(x > -100) {
        this.opened = true;
        this.$refs.menuContainer.style.left = '0px';
      } else {
        this.opened = false;
        this.$refs.menuContainer.style.left = '-200px';
      }
    },
    mousemove(event) {
      if(this.dragOn) {
        const initialX = this.opened ? 0 : 200;
        const eventX = event.screenX || event.changedTouches[0].clientX;
        const x = Math.min(eventX - initialX - this.dragOriginX, 0);
        this.$refs.menuContainer.style.left = `${x}px`;
      }
    },
  }
};
</script>
<style>
.mobile-menu {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -200px;
  width: 200px;
  padding-right: 30px;
  transition: left 0.08s;
  z-index: 11;
}

.mobile-menu > div {
  height: 100%;
}

.menu-overlay {
  background: rgba(127, 127, 127, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}

.mobile-menu-hamburger-wrapper {
  padding: 20px;
  left: 0;
  top: 0;
  position: absolute;
}

.mobile-menu-hamburger {
  display: block;
  text-align: center;
  font-size: 12px;
  border-radius: 32px;
  padding-top: 10px;
  width: 32px;
  height: 22px;
  background: rgba(200, 200, 200, 0.5);
}

</style>
