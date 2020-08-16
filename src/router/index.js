import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import Chat from '../components/Chat.vue'
import Profile from '../components/Profile.vue'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
