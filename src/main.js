import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/App.css";
import axios from "axios";
import firebase from "firebase/app";

import { library } from '@fortawesome/fontawesome-svg-core';
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt, faEye, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Vuex from 'vuex';

import { store } from '../src/store';

library.add(faSignOutAlt, faEye, faCircle);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(Vuex);

require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyB6Pv97RnFEoY9T10K0kdFOOMLSuDmk1yU",
  authDomain: "opinion-5ca61.firebaseapp.com",
  databaseURL: "https://opinion-5ca61.firebaseio.com",
  projectId: "opinion-5ca61",
  storageBucket: "opinion-5ca61.appspot.com",
  messagingSenderId: "106034343747",
  appId: "1:106034343747:web:169a44ce204409c2cf89f6"
};
firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();

export const db = firebase.firestore();

let app;

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    console.log(user)
  
    app =  new Vue({
            router,
            store,
            render: h => h(App)
          }).$mount("#app");
  }
})


