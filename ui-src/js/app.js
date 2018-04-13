import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import main from './components/main.vue';
import store from './store/index';
import routes from './routes';
import 'bootstrap';

Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
  store: new Vuex.Store(store),
  router: new VueRouter(routes),
  render: (h) => h(main)
}).$mount('#app');
