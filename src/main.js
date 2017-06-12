// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import Mint from 'mint-ui'
// import 'mint-ui/lib/style.css'
import store from './store/store' //封装vuex
import api from './api/index'   //封装api

// Vue.use(Mint)
Vue.use(api)
// Vue.use(VueAxios,axios)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
