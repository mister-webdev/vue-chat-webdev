<template>
  <figure class="logo-box">
    <img
      src="../assets/webdev-chat.png"
      class="logo"
      alt="Webdev Chat"
      aria-hidden="true"
    >
    <figcaption class="logo-heading">WEBDEV CHAT</figcaption>
  </figure>
</template>

<script>
export default {
  name: 'TheLogo'
}
</script>

<style scoped>
  .logo-box {
    text-align: center;
    margin-bottom: 40px;
  }
  .logo {
    max-width: 50%;
  }
  .logo-heading {
    font-family: 'Lexend Zetta', sans-serif;
    position: relative;
    margin-top: 0;
    font-size: 22px;
    font-weight: 400;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: rgba(58, 58, 58, 0.425);
  }
  .logo-heading:after {
    position: absolute;
    content: '';
    left: 40%;
    bottom: -16px;
    width: 20%;
    height: 7%;
    background: rgba(128, 128, 128, 0.212);
  }
</style>