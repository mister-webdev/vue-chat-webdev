<template>
  <ul class="user-list">
    <li
      class="aside-user-item"
      @click="$emit('letChat')"
      v-show="item.id != currentUserId"
    >
      <span>
        <img
          class="user-item-img"
          :src="item.URL"
        />
      </span>

      <span>{{item.name}}</span>

    </li>
  </ul>
</template>

<script>
export default {
  name: 'TheSidebarList',
  props: ['item', 'currentUserId', 'currentPeerUser'],

  methods: {
    letsChat (item) {
      this.currentPeerUser = item
    }
  }
}

</script>

<style>
  .aside-user-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 15px 10px;
    transition: 0.2s ease-in-out;
    cursor: pointer;
  }
  .aside-user-item:hover {
    background-image: linear-gradient(
      to right,
      rgb(243, 243, 243),
      rgba(228, 228, 228, 0)
    );
  }

  .user-item-img {
    width: 45px;
    height: 45px;
    margin-right: 10px;
    border-radius: 50%;
    object-fit: cover;
  }
</style>