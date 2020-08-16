<template>

  <div class="page-wrapper">
    <transition name="fade">
      <form class="form-box">

        <the-logo></the-logo>

        <form-input
          type="email"
          placeholder="Email"
          radius-class="radius-top"
          :iconpath="$options.iconemail"
          v-model.trim="email"
        ></form-input>

        <form-input
          type="password"
          placeholder="Password"
          radius-class="radius-bottom"
          :iconpath="$options.iconpassword"
          v-model.trim="password"
          @keyenter="login"
        ></form-input>

        <form-button @action="login">Login</form-button>

        <p>
          No account?
          <router-link
            to="/signup"
            class="link"
          >Signup</router-link>
        </p>
      </form>
    </transition>
  </div>
</template>

<script>
import firebase from '../services/firebase'
import TheLogo from './TheLogo.vue'
import FormInput from './FormInput.vue'
import FormButton from './FormButton.vue'
import iconemail from '@/assets/icon/email.svg'
import iconpassword from '@/assets/icon/key.svg'


export default {
  name: 'Login',
  components: { TheLogo, FormButton, FormInput },
  iconemail,
  iconpassword,

  data () {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    login () {
      const auth = firebase.auth()
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then(async res => {
          console.log('res', res)
          if (res.user) {
            await firebase.firestore().collection('users')
              .where('id', '==', res.user.uid)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  let userData = doc.data()
                  localStorage.setItem('id', userData.id),
                    localStorage.setItem('name', userData.name),
                    localStorage.setItem('email', userData.email),
                    localStorage.setItem('password', userData.password),
                    localStorage.setItem('photoURL', userData.URL),
                    localStorage.setItem('description', userData.description),
                    localStorage.setItem('firebaseDocumentId', doc.id)
                })
              })
            this.$router.push('/chat')
          }
        }).catch(err => {
          console.log('err', err)
          const errorMessage = err.message
          this.$toasted.show(errorMessage).goAway(3000)
        })
    }
  },

  created () {
    if (localStorage.getItem('id')) this.$router.push('/chat')
  }
}
</script>

<style scoped>
  .page-wrapper {
    display: flex;
    width: 100%;
    height: 100vh;
  }
  .form-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    padding: 35px 0px;
    min-width: 300px;
    border-radius: 20px;
    background-image: linear-gradient(
      to top,
      rgb(255, 255, 255),
      rgb(228, 228, 228)
    );
    box-shadow: 5px 3px 10px 0px #d1d1d1c7, -5px 3px 10px 0px #d1d1d1d7;
    perspective: 1000px;
  }

  .link {
    position: relative;
    padding: 3px;
    font-weight: 600;
    color: rgb(49, 49, 49);
  }
  .link:after {
    position: absolute;
    content: '';
    left: 3px;
    bottom: 3px;
    width: 90%;
    height: 1px;
    background: rgb(97, 97, 97);
    transition: 0.3s;
    transform-origin: left;
    transform: scale(0);
  }
  .link:hover:after {
    transform: scale(1);
  }
</style>
