<template>

  <button
    type="button"
    class="btn-round"
    @click="$emit('toggle')"
  ><img
      v-bind="$attrs"
      class="btn-round-icon"
      :src="iconpath"
      aria-hidden="true"
      role="presentation"
    >
  </button>

</template>

<script>
export default {
  name: 'BaseButtonRound',
  inheritAttrs: false,
  props: {
    iconpath: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .btn-round {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 50px;
    height: 50px;
    text-align: center;
    border: none;
    border-radius: 100px;
    background-image: linear-gradient(
      to top,
      rgb(255, 255, 255),
      rgb(228, 228, 228)
    );
    box-shadow: 7px 5px 10px -9px #7f8280;
    outline: none;
  }
  .btn-round-icon {
    position: relative;
    left: 1px;
    width: 65%;
    transition: 0.5s ease;
  }
  .btn-round:hover > .btn-round-icon {
    filter: invert(0.4) sepia(1) saturate(20) hue-rotate(220deg) brightness(1);
  }
</style>