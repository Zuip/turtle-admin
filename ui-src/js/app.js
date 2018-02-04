import Vue from 'vue';
import main from './main.vue';
import 'bootstrap';

var vm = new Vue({
    render: (h) => h(main)
})

vm.$mount('#app')
