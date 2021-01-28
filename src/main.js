import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import Navigation from 'vue-navigation'
Vue.use(Navigation, {router})
import "@/assets/style/index.less";

import "@/components/Vant";
// rem
import "amfe-flexible";

import './assets/Iconfont/css/iconfont.css'

import store from './store'; // vuex

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
