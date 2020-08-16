<template>
  <div class="input-box">

    <input
      :type="type"
      :class="['input-item', radiusClass]"
      :placeholder="placeholder"
      :value="value"
      :minlength="minlength"
      :maxlength="maxlength"
      @input="$emit('input', $event.target.value)"
      @keyup.enter="$emit('keyenter')"
    />

    <span class="input-icon">
      <img
        :src="iconpath"
        class="input-icon-svg"
        role="presentation"
      />
    </span>
  </div>
</template>

<script>

export default {
  name: 'FormInput',
  props: {
    radiusClass: String,
    type: String,
    value: String,
    placeholder: String,
    maxlength: Number,
    minlength: Number,
    iconpath: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
  .input-box {
    position: relative;
    display: flex;
    align-items: center;
    width: 75%;
  }
  @media (max-width: 576px) {
    .input-box {
      width: 80%;
    }
  }
  .input-box::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: rgb(231, 231, 231);
  }
  .input-item {
    width: 100%;
    height: 54px;
    padding-left: 60px;
    font-size: 16px;
    border: 0px solid rgb(165, 165, 165);
    background: rgb(255, 255, 255);
    transition: 0.3s ease-out;
  }
  ::placeholder {
    color: rgb(163, 163, 163);
  }

  .input-box:last-of-type::after {
    content: none;
  }

  .radius-top {
    border-radius: 10px 10px 0px 0px;
  }
  .radius-top:focus {
    outline: none;
    box-shadow: -3px -3px 7px -4px #a3a3a3de, 3px -3px 7px -4px #a1a1a1e1;
  }
  .radius-bottom {
    border-radius: 0px 0px 15px 15px;
  }
  .radius-bottom:focus {
    outline: none;
    box-shadow: -3px 3px 7px -4px #a1a1a1, 3px 3px 7px -4px #a1a1a1;
  }
  .input-middle:focus {
    outline: none;
    box-shadow: 0px 0px 7px 0px #a1a1a1;
  }
  .input-icon {
    position: absolute;
    padding-left: 20px;
    transition: 0.3s ease-out;
  }
  .input-item:focus + .input-icon > .input-icon-svg {
    filter: invert(0.4) sepia(1) saturate(20) hue-rotate(220deg) brightness(1);
  }
  .input-icon-svg {
    width: 22px;
  }
</style>