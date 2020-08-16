import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBbfkGnNfFeJTjHBPAcLoagh2J_ZJeH8Tc",
    authDomain: "vue-chat-d4699.firebaseapp.com",
    databaseURL: "https://vue-chat-d4699.firebaseio.com",
    projectId: "vue-chat-d4699",
    storageBucket: "vue-chat-d4699.appspot.com",
    messagingSenderId: "276842677627",
    appId: "1:276842677627:web:a9e88ba00c801fbd5f29de"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase