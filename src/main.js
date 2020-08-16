import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Toasted from 'vue-toasted'
import VueChatScroll from 'vue-chat-scroll'

Vue.config.productionTip = false

Vue.use(Toasted)
Vue.use(VueChatScroll)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
