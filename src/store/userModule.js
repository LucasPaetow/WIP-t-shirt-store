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
  getters: {
    getShoppingCart: state => {
      return state.shoppingCart;
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    PRODUCT_addToShoppingCart(state, product) {
      //add product to shopping cart
      state.shoppingCart.push(product);
    },
    PRODUCT_deleteFromShoppingCart(state, index) {
      //add product to shopping cart
      state.shoppingCart.splice(index, 1);
    },
    PRODUCT_editShoppingCart(state, combinedProduct) {
      state.shoppingCart.splice(
        combinedProduct.index,
        1,
        combinedProduct.product
      );
    }
  },
  // -----------------------------------------------------------------
  actions: {
    PRODUCT_addToShoppingCart: ({ commit }, product) => {
      commit("PRODUCT_addToShoppingCart", product);
    },
    PRODUCT_deleteFromShoppingCart: ({ commit }, index) => {
      commit("PRODUCT_deleteFromShoppingCart", index);
    },
    PRODUCT_editShoppingCart: ({ commit }, combinedProduct) => {
      commit("PRODUCT_editShoppingCart", combinedProduct);
    }
  }
};
