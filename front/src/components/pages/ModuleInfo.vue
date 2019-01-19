<template>
  <div>
    <h1>
      ModuleInfo {{$route.params.moduleName}}
    </h1>
    <div v-if="currentModule">
      <h2>
        Environment variables
      </h2>
      <codemirror v-model="env" :options="{}" />
      {{currentModule.env}}
      <a @click="saveEnv()">Save env</a>
      <br/>
      <label for="moduleinfo-autostart">Autostart</label>
      <input id="moduleinfo-autostart" type="checkbox" v-model="currentModule.config.autostart" name="">
      <br/>
      {{currentModule.config}}
      <br/>
      <a @click="saveConfig()">Save config</a>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      config: {},
      env: '',
    };
  },
  computed: {
    ...mapState({
      moduleList: state => state.moduleList,
    }),
    currentModule() {
      if(this.moduleList && this.moduleList[this.$route.params.moduleName]) {
        return this.moduleList[this.$route.params.moduleName];
      }
      return undefined;
    },
    configCP() {
      if(this.moduleList && this.moduleList[this.$route.params.moduleName]) {
        return {...this.$store.state.moduleList[this.$route.params.moduleName].config};
      }
      return undefined;      
    },
    envCP() {
      if(this.moduleList && this.moduleList[this.$route.params.moduleName]) {
        return JSON.stringify(this.$store.state.moduleList[this.$route.params.moduleName].env, null, 2);
      }
      return undefined;
    },
  },
  watch: {
    envCP: {
      handler() {
        this.env = this.envCP;
      },
      immediate: true,
    },
    configCP: {
      handler() {
        this.config = this.configCP;
      },
      immediate: true,
    },
  },
  methods: {
    saveEnv() {
      this.$socket.emit('action', {
        action: 'saveEnv',
        name: this.$route.params.moduleName,
        env: this.env,
      });
    },
    saveConfig() {
      this.$socket.emit('action', {
        action: 'saveModuleConfig',
        name: this.$route.params.moduleName,
        config: this.config,
      });
    },
  },
};
</script>
<style scoped>
</style>