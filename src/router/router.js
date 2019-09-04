import Vue from "vue";
import Router from "vue-router";
import store from "@/store/store.js";
import { firebase } from "@firebase/app";
import "@firebase/auth";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/About.vue")
    }
    /*{
      path: "/legal",
      name: "legal",
      component: () => import("@/views/Legal.vue")
    },

    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/Signup.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue")
    }*/
  ],
  //saves the scroll position if the user uses the back button
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash, offset: { x: 0, y: 0 } };
    }
    return { x: 0, y: 0 };
  }
});

export default router;
/*
//navigaitonal guard for auth users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  //check if a user has access to a page
  if (requiresAuth && !currentUser) {
    next({ name: "login" });
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});
*/
