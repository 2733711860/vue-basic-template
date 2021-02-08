import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
// import './perssion.js';
import Navigation from 'vue-navigation'
Vue.use(Navigation, {router})
import "@/assets/style/index.less";

import "@/components/Vant";
// rem
import "amfe-flexible";

import './assets/Iconfont/css/iconfont.css'

import store from './store'; // vuex

import 'swiper/dist/css/swiper.css';

import echarts from "echarts";
Vue.prototype.$echarts = echarts;

import '@/assets/css/animation.css';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
