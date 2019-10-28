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
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/Signup.vue")
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("@/views/Cart.vue")
    },
    {
      path: "/your-:color-t-shirt",
      name: "store",
      component: () => import("@/views/Store.vue"),
      children: [
        {
          path: "/your-:color-t-shirt/choose-size",
          name: "sizeOptions",
          props: true,
          component: () => import("@/components/homepage/sizeOptions.vue")
        }
      ]
    },
    {
      path: "/checkout",
      name: "checkout",
      redirect: { name: "address" },
      component: () => import("@/views/Checkout.vue"),
      children: [
        {
          path: "/checkout/address",
          name: "address",
          props: true,
          component: () => import("@/components/checkout/address.vue")
        },
        {
          path: "/checkout/shipping",
          name: "shipping",
          props: true,
          component: () => import("@/components/checkout/shipping.vue")
        },
        {
          path: "/checkout/payment",
          name: "payment",
          props: true,
          component: () => import("@/components/checkout/payment.vue")
        },
        {
          path: "/checkout/confirmation",
          name: "confirmation",
          props: true,
          component: () => import("@/components/checkout/confirmation.vue")
        },
        {
          path: "/checkout/status",
          name: "status",
          props: true,
          component: () => import("@/components/checkout/status.vue")
        }
      ]
    },

    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/Profile.vue")
    },
    {
      path: "/legal",
      name: "legal",
      component: () => import("@/views/Legal.vue")
    },
    {
      path: "/yikes",
      name: "yikes",
      component: () => import("@/views/Yikes.vue")
    },
    {
      path: "*",
      name: "404",
      redirect: { name: "yikes" }
    }
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
