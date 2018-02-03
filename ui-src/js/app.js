import Vue from 'vue';
import main from './main.vue';

var vm = new Vue({
    render: (h) => h(main)
})

vm.$mount('#app')
