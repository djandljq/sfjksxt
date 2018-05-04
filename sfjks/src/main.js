// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './common/rem';
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
import qs from 'qs';
import axios from 'axios';

Vue.use(YDUI);
Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
});
