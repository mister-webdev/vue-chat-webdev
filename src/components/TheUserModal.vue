<template>
  <div class="user-modal">

    <base-button-round
      :iconpath="$options.usericon"
      @toggle="toggleClass"
    ></base-button-round>

    <div
      :class="['overlay', {'visible-overlay': toggled }]"
      @click="toggleClass"
    ></div>

    <div :class="['user-modal-box', { 'visible': toggled }]">
      <figure class="user-pic">
        <img
          class="user-pic-img"
          :src="photoURL"
          alt="user"
        />
      </figure>

      <p class="user-modal__heading">{{currentUserName}}</p>

      <button
        class="user-modal__link"
        type="button"
        aria-label="Profile Settings"
        @click="$emit('profile')"
      >Profile</button>

      <button
        class="user-modal__link"
        type="button"
        aria-label="Logout"
        @click="$emit('logout')"
      >Logout</button>
    </div>
  </div>
</template>

<script>
import BaseButtonRound from './BaseButtonRound.vue'
import usericon from '@/assets/icon/user.svg'

export default {
  name: 'TheUserModal',
  components: { BaseButtonRound },
  usericon,

  props: {
    currentUserName: {
      type: String,
      required: true
    },
    photoURL: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      toggled: false
    }
  },

  methods: {
    toggleClass () {
      this.toggled = !this.toggled
    },
  }
}
</script>

<style scoped>
  .user-modal {
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .user-modal-box {
    position: relative;
    z-index: 7;
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    padding: 25px;
    border-radius: 10px;
    text-align: center;
    background: hsl(120 0% 100%);
    box-shadow: 1px 1px 9px 1px hsla(120 0% 60%);
    transform: translate(-45px, 40px) scale(0);
    transform-origin: top right;
    transition: 0.3s ease;
  }
  .overlay {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 5;
    width: 100vw;
    height: 100vh;
    background: transparent;
    transform: scale(0);
  }
  .visible {
    transform: translate(-45px, 40px) scale(1);
  }
  .visible-overlay {
    transform: translate(0, -5px) scale(1);
  }
  .user-modal__heading {
    margin: 0px 0px 15px;
    font-size: 20px;
    font-weight: 700;
  }
  .user-modal__link {
    margin: 7px 0;
    padding: 15px 50px;
    font-size: 16px;
    letter-spacing: 1px;
    border: 1px solid hsl(120 0% 100%);
    background: rgb(247, 247, 247);
  }
  .user-modal__link:hover {
    border: 1px solid hsl(240 100% 50%);
    color: hsl(240 100% 50%);
    background: rgb(255, 255, 255);
  }
  .user-modal-btn {
    position: relative;
    z-index: 7;
    display: block;
    margin-left: auto;
    padding: 10px;
    border: 1px dotted hsl(120 0% 70%);
    border-radius: 100px;
    background-image: linear-gradient(
      to top,
      rgb(255, 255, 255),
      rgb(228, 228, 228)
    );
    box-shadow: 2px 1px 5px 1px hsl(120 0% 70%);
    cursor: pointer;
    outline: none;
  }
  .icon-svg {
    width: 25px;
    transition: 0.3s ease;
  }

  .user-pic-img {
    width: 70px;
    height: 70px;
    margin: 0 auto;
    border-radius: 100px;
    object-fit: cover;
  }
  .user-modal-btn:hover > .icon-svg {
    filter: invert(0.4) sepia(1) saturate(20) hue-rotate(220deg) brightness(1);
  }
</style>