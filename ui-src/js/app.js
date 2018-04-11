import Vue from 'vue';
import Vuex from 'vuex';
import main from './components/main.vue';
import store from './store/index';
import 'bootstrap';

Vue.use(Vuex);

window.$store = require('./store/index').default; 

var vm = new Vue({
  store: new Vuex.Store(store),
  render: (h) => h(main)
});

vm.$mount('#app');
