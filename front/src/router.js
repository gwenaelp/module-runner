import Vue from 'vue';
import Router from 'vue-router';
import ModulesList from './components/pages/ModulesList';
import ModuleInfo from './components/pages/ModuleInfo';
import InstallModule from './components/pages/InstallModule';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ModulesList',
      component: ModulesList,
    }, {
      path: '/install-module',
      name: 'InstallModule',
      component: InstallModule,
    }, {
      path: '/module-info/:moduleName',
      name: 'ModuleInfo',
      component: ModuleInfo,
    }
  ],
});
