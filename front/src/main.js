import Vue from 'vue'
import App from './App.vue'
import responsive from 'vue-responsive';
import store from './vuex/store';
import router from './router';
import VueSocketIO from 'vue-socket.io'
import VueCodemirror from 'vue-codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/mode/javascript/javascript';


Vue.use(VueCodemirror, { 
  options: { theme: 'base16-dark' },
});

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:31414',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

Vue.use(responsive);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
