<template>
  <div class="wrapper">
    <h1>Profile</h1>
    <div class="profile-wrapper">
      <section class="profile-img">

        <figure class="user-img">
          <img :src="photoURL" />
        </figure>

        <input
          type="file"
          name="file"
          id="file"
          class="inputfile"
          accept="image/png, image/jpeg"
          @change="changeAvatar"
        />
        <label
          for="file"
          class="file-label"
        >
          <span>Upload avatar</span>
          <img
            class="file-icon"
            src="../assets/icon/upload.svg"
            alt="Upload avatar"
          >
        </label>
      </section>

      <div class="form-group">
        <label class="profile-label">Username</label>
        <input
          type="text"
          name="name"
          class="profile-input"
          maxlength="20"
          v-model="name"
        />

        <label class="profile-label">Profile description</label>
        <input
          type="text"
          name="aboutMe"
          class="profile-input"
          maxlength="100"
          v-model="aboutMe"
        />
        <div class="buttons-box">
          <button
            type="button"
            class="btn"
            @click="uploadAvatar"
          >Save</button>
          <button
            type="button"
            class="btn"
            @click="goBack"
          >Go to Chat</button>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import firebase from '../services/firebase'

export default {
  app: 'Profile',

  data () {
    return {
      firebaseDocId: localStorage.getItem('firebaseDocumentId'),
      id: localStorage.getItem('id'),
      name: Object.prototype.hasOwnProperty.call(localStorage, 'name') ? localStorage.getItem('name') : '',
      aboutMe: Object.prototype.hasOwnProperty.call(localStorage, 'description') ? localStorage.getItem('description') : '',
      photoURL: localStorage.getItem('photoURL'),
      newPhoto: null
    }
  },

  methods: {
    goBack () {
      this.$router.push('/chat')
    },
    changeAvatar (event) {
      if (event.target.files && event.target.files[0]) {
        const fileType = event.target.files[0].type.toString()

        if (fileType.indexOf('image') != 0) {
          this.$toasted.show('Choose an image').goAway(3000)
          return
        }
        this.newPhoto = event.target.files[0]
        this.photoURL = URL.createObjectURL(event.target.files[0])
      } else {
        this.$toasted.show('Something went wrong').goAway(3000)
      }
    },
    uploadAvatar () {
      if (this.newPhoto) {
        const upload = firebase
          .storage()
          .ref()
          .child(this.id)
          .put(this.newPhoto)
        upload.on(
          'state_changed',
          null,
          err => {
            console.log('error', err.message)
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(url => {
              console.log(url)
              this.updateUserInfo(true, url)
            })
          }
        )
      } else {
        this.updateUserInfo(false, null)
      }
    },
    updateUserInfo (isUrlPresent, downloadURL) {
      let newInfo = {}
      if (isUrlPresent) {
        newInfo = {
          name: this.name,
          description: this.aboutMe,
          URL: downloadURL
        }
      } else {
        newInfo = {
          name: this.name,
        }
      }
      firebase
        .firestore()
        .collection('users')
        .doc(this.firebaseDocId)
        .update(newInfo).then(res => {
          console.log(res)
          localStorage.setItem('name', this.name)
          localStorage.setItem('description', this.aboutMe)
          if (isUrlPresent) {
            localStorage.setItem('photoURL', downloadURL)
          }
        })
    }
  },
  created () {
    if (!Object.prototype.hasOwnProperty.call(localStorage, 'id')) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 100vh;
  }
  .profile-wrapper {
    display: flex;
    flex-direction: row;
  }
  @media (max-width: 576px) {
    .profile-wrapper {
      flex-direction: column;
    }
  }
  .profile-img {
    text-align: center;
  }
  .user-img {
    margin: 0;
  }
  .user-img > img {
    width: 280px;
    height: 280px;
    border-radius: 300px;
    object-fit: cover;
  }
  @media (max-width: 576px) {
    .user-img > img {
      width: 180px;
      height: 180px;
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-top: 22px;
    margin-left: 25px;
  }

  @media (max-width: 576px) {
    .form-group {
      margin-top: 4px;
    }
  }

  .inputfile {
    position: absolute;
    z-index: -1;
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
  }
  .inputfile + label {
    display: inline-block;
    font-size: 28px;
    font-weight: 700;
    color: rgb(90, 90, 90);
    cursor: pointer;
  }
  .inputfile:focus + label {
    outline: 1px dotted #000;
  }
  .inputfile + label * {
    pointer-events: none;
  }
  .file-label {
    position: relative;
    width: 100%;
    transform: translateX(-10px);
  }

  @media (max-width: 576px) {
    .file-label {
      transform: translateX(-15px);
    }
  }
  .file-icon {
    position: absolute;
    top: 10px;
    max-width: 30px;
    margin-left: 5px;
  }
  .file-label:hover > .file-icon {
    filter: invert(0.4) sepia(1) saturate(20) hue-rotate(220deg) brightness(1);
    outline: none;
  }
  .profile-img {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .profile-label {
    margin: 10px 0px 3px;
    font-size: 20px;
    font-weight: 600;
  }
  .profile-input {
    padding: 10px;
    width: 250px;
    font-size: 18px;
    color: rgb(143, 143, 143);
    border: none;
    border-radius: 5px;
    background: rgb(245, 245, 245);
  }
  .profile-input:focus {
    outline: none;
    box-shadow: inset 0px 0px 3px 1px hsl(240, 100%, 50%);
  }
  .buttons-box {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 22px;
    perspective: 1000;
  }
  .btn {
    width: 100%;
    padding: 15px 10px;
    font-size: 16px;
    font-weight: 500;
    color: rgb(85, 85, 85);
    border: none;
    border-radius: 10px;
    background: rgb(241, 241, 241);
    transition: 0.5s ease;
  }
  .btn:hover {
    color: rgb(255, 255, 255);
    background: rgb(68, 0, 255);
    box-shadow: 0px 2px 7px 1px hsl(240, 100%, 50%);
  }
  .btn:focus {
    outline: 1px dotted rgb(99, 99, 99);
  }
  .btn:nth-child(2) {
    margin-left: 10px;
  }
</style>
