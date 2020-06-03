import Vue from "vue";
import VueRouter from "vue-router";
// import Opinion from "../components/Opinion.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Chat from "../components/Chat.vue";
import Home from "../components/Home.vue";
import Reset from "../components/Reset.vue";

import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/reset",
    name: "Reset",
    component: Reset
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    meta: {requiresAuth: true}
  },
  {
    path: "/",
    name: "Home",
    component: Home
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) =>  {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else { 
    next();
  }
})

export default router;
