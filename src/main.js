import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes    from './routes';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import {dateUtils} from '@/utils/dateUtils'

Vue.prototype.$dateUtils               = dateUtils

Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")


import '@/assets/css/tema_camaranet.css';
import '@/assets/css/tema_basico.css';
