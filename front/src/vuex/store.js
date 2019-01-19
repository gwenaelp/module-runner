import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    mobileMenuOpened: false,
    moduleList: [],
  },
  actions: {
  	SOCKET_setModuleList({ commit }, moduleList) {
      commit('SET_MODULE_LIST', moduleList);
  	}
  },
  mutations: {
  	SET_MODULE_LIST(state, moduleList) {
  		state.moduleList = moduleList;
  	}
  },
});

export default store;
