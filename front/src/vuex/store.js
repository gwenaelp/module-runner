import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    mobileMenuOpened: false,
    moduleList: [],
    jobsList: [],
  },
  actions: {
  	SOCKET_setModuleList({ commit }, moduleList) {
      commit('SET_MODULE_LIST', moduleList);
  	},
  	SOCKET_setJobsList({ commit }, jobsList) {
      commit('SET_JOBS_LIST', jobsList);
  	}
  },
  mutations: {
  	SET_MODULE_LIST(state, moduleList) {
  		state.moduleList = moduleList;
  	},
  	SET_JOBS_LIST(state, jobsList) {
  		state.jobsList = jobsList;
  	}
  },
});

export default store;
