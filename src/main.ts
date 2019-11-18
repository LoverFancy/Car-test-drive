import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import util from '@/lib/util';
import validate from '@/lib/validate';

Vue.config.productionTip = false;
Vue.prototype.$util = util;
Vue.prototype.$validate = validate;

Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');



