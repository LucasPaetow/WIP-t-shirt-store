/** VUEX auth module**/
const fb = require("@/api/firebaseConfig.js");
import router from "@/router/router.js";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    wishlist: [],
    shoppingCart: [],
    addresses: [],
    payment: [],
    orderHistory: []
  },
  // -----------------------------------------------------------------
  getters: {},
  // -----------------------------------------------------------------
  mutations: {},
  // -----------------------------------------------------------------
  actions: {}
};
