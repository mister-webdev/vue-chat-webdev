<template>
  <aside :class="['aside', {'aside-closed': !asideOpen }]">
    <h1 class="aside-title">.webdevchat</h1>

    <ul class="user-list">
      <li
        v-for="item in searchUsers"
        :key="item.id"
        :item="item"
        :currentUserId="currentUserId"
        :currentPeerUser="currentPeerUser"
        class="aside-user-item"
        @click="$emit('clicked', item)"
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
    <button
      type="button"
      class="btn-aside-toggler"
      @click="$emit('toggle')"
    ><img
        :class="['aside-toggler-svg', {'aside-toggler-reverse' : asideOpen}]"
        :src="$options.iconarrow"
        alt="Toggle Aside"
        aria-hidden="true"
      >
    </button>
  </aside>
</template>

<script>
import iconarrow from '@/assets/icon/aside-arrow.svg'

export default {
  name: 'TheSidebar',
  props: ['item', 'searchUsers', 'currentUserId', 'currentPeerUser', 'asideOpen'],
  iconarrow,
}

</script>

<style>
  .aside {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    display: flex;
    flex-direction: column;
    flex: 0 1 250px;
    min-width: 280px;
    height: 100%;
    border-radius: 0px 50px 0px 0px;
    background-image: linear-gradient(
      to top,
      rgb(238, 238, 238),
      rgb(255, 255, 255)
    );
    box-shadow: 3px 0px 10px -5px #a0a0a0;
    transform: translateX(0);
    transition: 0.2s ease-out;
  }

  .aside-closed {
    transform: translateX(-280px);
  }

  @media (max-width: 576px) {
    .aside {
      min-width: 260px;
    }
    .aside-closed {
      transform: translateX(-260px);
    }
  }
  .btn-aside-toggler {
    position: absolute;
    top: 5px;
    right: -57px;
    z-index: 8;
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

  @media (max-width: 768px) {
    .btn-aside-toggler {
      display: block;
    }
  }
  .aside-toggler-svg {
    position: relative;
    left: 1px;
    width: 65%;
    transition: 0.5s ease;
  }
  .aside-toggler-reverse {
    left: -1px;
    transform: rotateY(-180deg);
  }
  .btn-aside-toggler:hover > .aside-toggler-svg {
    filter: invert(0.4) sepia(1) saturate(20) hue-rotate(220deg) brightness(1);
  }
  .aside-title {
    position: relative;
    left: 30px;
    margin: 10px 5px 10px;
    font-family: 'Titillium Web', sans-serif;
    font-size: 26px;
    font-weight: 200;
    color: hsl(120 0% 75%);
    letter-spacing: 1px;
    text-transform: lowercase;
  }

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

  .user-list {
    overflow-y: scroll;
  }

  .user-list::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #f5f5f500;
  }

  .user-list::-webkit-scrollbar {
    width: 10px;
  }

  .user-list::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #483c6338;
  }

  .user-item-img {
    width: 45px;
    height: 45px;
    margin-right: 10px;
    border-radius: 50%;
    object-fit: cover;
  }

  .aside-user-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px 10px;
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