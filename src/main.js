import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
Vue.use(VueLazyload, {
  preLoad:1,
  loading: require('@/assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
