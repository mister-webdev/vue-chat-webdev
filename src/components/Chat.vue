<template>
  <div class="wrapper">

    <the-sidebar
      :searchUsers="searchUsers"
      :currentUserId="currentUserId"
      :currentPeerUser="currentPeerUser"
      :asideOpen="asideOpen"
      @clicked="letsChat"
      @toggle="asideToggle"
    ></the-sidebar>

    <the-user-modal
      :currentUserName="currentUserName"
      :photoURL="photoURL"
      @profile="onProfileClick"
      @logout="logout"
    ></the-user-modal>

    <main
      id="content"
      class="main-content"
      :class="['main-content', {'main-content-margin': asideOpen}]"
      v-if="currentPeerUser === null"
    >

      <figure class="main-user-pic">
        <img :src="photoURL" />
        <figcaption class="main-user-caption">Welcome, {{currentUserName}}!</figcaption>
      </figure>
    </main>

    <div
      v-else
      :class="['header-width', {'main-content-margin': asideOpen}]"
    >
      <ChatBox :currentPeerUser="currentPeerUser" />
    </div>

  </div>
</template>

<script>
import firebase from '../services/firebase'
import ChatBox from './ChatBox.vue'
import TheSidebar from './TheSidebar.vue'
import TheUserModal from './TheUserModal.vue'

export default {
  name: 'Chat',
  components: {
    ChatBox,
    TheSidebar,
    TheUserModal
  },

  data () {
    return {
      currentUserName: localStorage.getItem('name'),
      currentPeerUser: null,
      currentUserId: localStorage.getItem('id'),
      currentUserPhoto: localStorage.getItem('photoURL'),
      photoURL: localStorage.getItem('photoURL'),
      searchUsers: [],
      asideOpen: true
    }
  },

  methods: {
    asideToggle () {
      this.asideOpen = !this.asideOpen
    },
    onProfileClick () {
      this.$router.push('/profile')
    },
    logout () {
      firebase.auth().signOut()
      this.$router.push('/')
      localStorage.clear()
    },
    letsChat (item) {
      this.currentPeerUser = item
    },
    async getUserList () {
      const result = await firebase
        .firestore()
        .collection('users')
        .get()
      if (result.docs.length > 0) {
        let listUsers = []
        listUsers = [...result.docs]
        listUsers.forEach((item, index) => {
          console.log(listUsers)
          this.searchUsers.push({
            key: index,
            documentKey: item.id,
            id: item.data().id,
            name: item.data().name,
            URL: item.data().URL,
            description: item.data().description
          })
        })
      }
    }
  },

  created () {
    if (!Object.prototype.hasOwnProperty.call(localStorage, 'id')) {
      this.$router.push('/')
    }
    this.getUserList()
  }
}
</script>

<style scoped>
  .wrapper {
    height: 100vh;
  }

  .main-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 3 0px;
    height: 100%;
    transition: 0.2s ease-out;
  }

  .main-content-margin {
    margin-left: 250px;
  }

  @media (max-width: 576px) {
    .main-content-margin {
      margin-left: 0;
    }
  }
  .header-width {
    transition: 0.2s ease-out;
  }

  .logo {
    max-width: 30%;
  }

  .main-user-pic {
    width: 300px;
    height: 300px;
    text-align: center;
  }

  @media (max-width: 576px) {
    .main-user-pic img {
      width: 170px;
      height: 170px;
    }
  }

  .main-user-pic img {
    width: 300px;
    height: 300px;
    border-radius: 72% 28% 49% 51% / 41% 30% 70% 59%;
    object-fit: cover;
  }

  .main-user-caption {
    font-size: 30px;
    font-weight: 700;
  }
</style>