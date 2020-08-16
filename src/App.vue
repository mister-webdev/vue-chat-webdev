<template>
  <div
    id="app"
    class="page-wrapper"
  >
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    font-family: 'Titillium Web', sans-serif;
    font-size: 16px;
    color: rgb(77, 77, 77);
  }
  .page-wrapper {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(
        rgba(231, 231, 231, 0.774),
        rgb(235, 235, 235)
      ),
      url('./assets/wallpaper.jpg');
    background-size: cover;
  }
  a {
    text-decoration: none;
  }
  button {
    cursor: pointer;
  }
  li {
    list-style: none;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  figure {
    margin: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
