<template>
  <button
    type="button"
    class="btn"
    @click="$emit('action')"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
  .btn {
    z-index: 1;
    width: 75%;
    margin-top: 30px;
    padding: 16px;
    font-size: 18px;
    color: rgb(150, 150, 150);
    border: 1px solid rgb(235, 235, 235);
    border-radius: 10px;
    background: linear-gradient(to top, rgb(219, 219, 219), white);
    box-shadow: 1px 1px 5px -1px #c7c7c7;
    transition: 0.2s ease;
    transform-style: preserve-3d;
    cursor: pointer;
  }
  @media (max-width: 576px) {
    .btn {
      width: 80%;
    }
  }
  .btn:hover {
    transform: translateZ(-10px);
  }
  .btn:focus {
    outline-color: rgb(212, 212, 212);
  }
</style>