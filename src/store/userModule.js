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
  mutations: {
    PRODUCT_addToShoppingCart(state, product) {
      //add product to shopping cart
      state.shoppingCart.push(product);
    }
  },
  // -----------------------------------------------------------------
  actions: {
    PRODUCT_addToShoppingCart: ({ commit }, product) => {
      commit("PRODUCT_addToShoppingCart", product);
      console.log(product);
    }
  }
};
