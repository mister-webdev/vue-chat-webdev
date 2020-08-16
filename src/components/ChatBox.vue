<template>
  <section class="chatbox-wrapper">

    <header class="header">
      <figure class="header-user">
        <img
          :src="currentPeerUser.URL"
          class="header-user-img"
        />
        <figcaption class="header-user-name">{{currentPeerUser.name}}</figcaption>
      </figure>
    </header>

    <main
      class="messages-box"
      v-chat-scroll
    >
      <div class="messages-outer">
        <article
          :class="item.idFrom === currentUserId ? 'textFrom' : 'textTo'"
          class="message"
          v-for="item in listMessage"
          :key="item.id"
        >
          {{item.content}}
        </article>
      </div>
    </main>

    <footer class="footer">
      <form
        @submit.prevent
        class="message-form"
      >
        <input
          type="text"
          placeholder="Type your message"
          class="message-input"
          v-model="inputValue"
          @keyup.enter="sendMessage(inputValue)"
        />
        <img
          class="send-message-icon"
          src="@/assets/icon/send.svg"
          alt="Send message"
          @click="sendMessage(inputValue)"
        />
      </form>
    </footer>
  </section>
</template>

<script>
import firebase from '../services/firebase'
import moment from 'moment'

export default {
  app: 'ChatBox',
  props: ['currentPeerUser'],

  data () {
    return {
      currentUserName: localStorage.getItem('name'),
      currentUserId: localStorage.getItem('id'),
      currentUserPhoto: localStorage.getItem('photoURL'),
      currentUserDocumentId: localStorage.getItem('firebaseDocumentId'),
      inputValue: '',
      groupChatId: null,
      currentPeerUserMessages: [],
      removeListener: null,
      currentPhotoFile: null,
      listMessage: [],
      viewMessages: []
    }
  },

  watch: {
    currentPeerUser: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getListHistory()
      }
    }
  },

  methods: {
    sendMessage (content) {
      if (content.trim() === '') {
        return
      }
      const timestamp = moment()
        .valueOf()
        .toString();
      const itemMessage = {
        idFrom: this.currentUserId,
        idTo: this.currentPeerUser.id,
        content: content.trim()
      }
      firebase
        .firestore()
        .collection('Messages')
        .doc(this.groupChatId)
        .collection(this.groupChatId)
        .doc(timestamp)
        .set(itemMessage)
        .then(() => {
          this.inputValue = ''
        })
    },
    getListHistory () {
      this.listMessage = []
      let groupChatId = `${this.currentPeerUser.id} + ${this.currentUserId}`
      firebase
        .firestore()
        .collection('Messages')
        .doc(groupChatId)
        .collection(groupChatId)
        .onSnapshot(Snapshot => {
          if (Snapshot.docChanges().length > 0) {
            this.groupChatId = groupChatId
            Snapshot.docChanges().forEach(change => {
              this.listMessage.push(change.doc.data())
            })
          } else {
            this.groupChatId = `${this.currentUserId} + ${this.currentPeerUser.id}`
            this.removeListener = firebase
              .firestore()
              .collection('Messages')
              .doc(this.groupChatId)
              .collection(this.groupChatId)
              .onSnapshot(Snapshot => {
                Snapshot.docChanges().forEach(change => {
                  if (change.type === 'added') {
                    this.listMessage.push(change.doc.data())
                  }
                })
              })
          }
        })
    }
  },

  mounted () {
    this.getListHistory()
  }
}
</script>

<style scoped>
  .chatbox-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .header {
    height: 62px;
    background: rgba(0, 0, 0, 0.062);
  }
  .header-user {
    position: relative;
    top: 14px;
    left: 25%;
    display: flex;
    justify-content: center;
    width: 50%;
  }
  .header-user-img {
    width: 30px;
    border-radius: 100px;
  }
  .header-user-name {
    padding-left: 5px;
    font-size: 20px;
    white-space: nowrap;
  }
  .messages-box {
    flex: 1;
    overflow-y: auto;
    background: transparent;
  }

  .messages-box::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #f5f5f5;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  .messages-box::-webkit-scrollbar {
    width: 8px;
    background-color: #f5f5f5;
  }

  .messages-box::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #483c6377;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  .messages-outer {
    display: flex;
    flex-direction: column;
    margin: 10px 20px;
  }
  @media (max-width: 576px) {
    .messages-outer {
      margin: 10px 0px;
    }
  }
  .message {
    max-width: 45%;
    padding: 10px 10px;
    border-radius: 10px;
    word-break: break-all;
  }

  .textFrom {
    position: relative;
    right: -53%;
    margin: 10px 10px;
    color: rgb(0, 0, 0);
    background: rgb(168, 255, 212);
    box-shadow: 1px 1px 3px 1px hsla(120, 0%, 70%, 50%);
  }

  .textTo {
    position: relative;
    right: -15px;
    margin: 10px 10px;
    color: black;
    background: rgb(210, 184, 245);
    box-shadow: -1px 1px 3px 1px hsla(120, 0%, 70%, 50%);
  }
  @media (max-width: 576px) {
    .textFrom {
      right: -46%;
      margin: 10px 0px;
    }
    .textTo {
      margin: 10px 0px;
    }
  }
  .footer {
    position: relative;
    z-index: 3;
    height: 60px;
    background-image: linear-gradient(
      to top,
      rgb(177, 176, 176),
      rgb(235, 235, 235)
    );
    box-shadow: 0px -2px 7px 1px hsla(120, 0%, 70%, 50%);
  }
  .message-form {
    display: flex;
    justify-content: center;
    padding: 15px;
  }
  .message-input {
    width: 90%;
    margin-left: 30px;
    padding: 5px 10px;
    border: 1px solid transparent;
    border-radius: 4px;
  }
  .message-input:focus {
    outline: 2px solid rgba(4, 0, 255, 0.349);
  }
  .send-message-icon {
    width: 30px;
    height: 30px;
    margin-left: 20px;
    transition: 0.2s;
    cursor: pointer;
  }
  .send-message-icon:hover {
    filter: invert(0.4) sepia(1) saturate(20) hue-rotate(220deg) brightness(1);
  }
</style>