<template>
  <div class="page-wrapper">
    <form class="form-box">

      <the-logo></the-logo>

      <form-input
        type="text"
        placeholder="Name"
        :minlength="2"
        :maxlength="25"
        radius-class="radius-top"
        :iconpath="$options.iconuser"
        v-model.trim="name"
      ></form-input>

      <form-input
        type="email"
        placeholder="Email"
        :maxlength="30"
        radius-class="input-middle"
        :iconpath="$options.iconemail"
        v-model.trim="email"
      ></form-input>

      <form-input
        type="password"
        placeholder="Password"
        :minlength="5"
        radius-class="radius-bottom"
        :iconpath="$options.iconpassword"
        v-model.trim="password"
        @keyenter="signup"
      ></form-input>

      <form-button @action="signup">Signup</form-button>

      <p>
        Back to
        <router-link
          to="/"
          class="link"
        >Login</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import firebase from '../services/firebase'
import TheLogo from './TheLogo.vue'
import FormButton from './FormButton.vue'
import FormInput from './FormInput.vue'
import iconemail from '@/assets/icon/email.svg'
import iconpassword from '@/assets/icon/key.svg'
import iconuser from '@/assets/icon/user.svg'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Signup',
  components: { TheLogo, FormButton, FormInput },
  iconemail,
  iconpassword,
  iconuser,

  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },

  validations: {
    name: {
      required,
      minLength: minLength(4)
    }
  },

  methods: {
    signup () {
      const auth = firebase.auth()
      const name = this.name
      const email = this.email
      const password = this.password
      auth.createUserWithEmailAndPassword(this.email, this.password)
        .then(async res => {
          console.log('res', res)
          await firebase.firestore().collection('users')
            .add({
              name,
              id: res.user.uid,
              email,
              password,
              URL: '',
              description: ''
            }).then(ref => {
              console.log('ref', ref)
              localStorage.setItem('id', res.user.uid),
                localStorage.setItem('name', name),
                localStorage.setItem('email', email),
                localStorage.setItem('password', password),
                localStorage.setItem('photoURL', ''),
                localStorage.setItem('description', ''),
                localStorage.setItem('firebaseDocumentId', ref.id),
                this.name = '',
                this.email = '',
                this.password = '',
                this.$router.push('/profile')
            }).catch(err => console.log(err))
        }).catch(err => {
          console.log('err', err)
          const errorMessage = err.message
          this.$toasted.show(errorMessage).goAway(3000)
        })
    }
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
    min-width: 300px;
    margin: auto;
    padding: 35px 0px;
    border-radius: 20px;
    background-image: linear-gradient(
      to top,
      rgb(255, 255, 255),
      rgb(228, 228, 228)
    );
    box-shadow: 5px 3px 10px 0px #d1d1d1c7, -5px 3px 10px 0px #d1d1d1d7;
    perspective: 1000px;
  }

  @media (max-width: 576px) {
    .form-box {
      padding: 25px 0px;
    }
  }

  .link {
    position: relative;
    padding: 3px;
    color: rgb(49, 49, 49);
    font-weight: 600;
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