// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import VueCookie from 'vue-cookie'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from './store'

// import 'vue-material-design-icons/styles.css'
import 'mdi/css/materialdesignicons.css'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Vuetify)
Vue.use(VueCookie)
Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
