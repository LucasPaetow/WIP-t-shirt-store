/** VUEX auth module**/
const fb = require("@/api/firebaseConfig.js");
import router from "@/router/router.js";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    wishlist: [],
    shoppingCart: [{ amount: 3, size: "M", color: ["white", "#FFFFFF"] }],
    addresses: [],
    payment: [],
    orderHistory: [],
    price: 20
  },
  // -----------------------------------------------------------------
  getters: {
    getShoppingCart: state => {
      return state.shoppingCart;
    },
    getShoppingCartCalulations: state => {
      let total = { amount: 0, price: 0, freeShipping: false };

      if (!state.shoppingCart.length) {
        return total;
      }

      let amount = state.shoppingCart.map(item => {
        return item.amount;
      });
      let totalAmount = amount.reduce((acc, cur) => {
        return acc + cur;
      });

      total.amount = totalAmount;
      total.price = totalAmount * state.price;
      total.freeShipping = totalAmount >= 3 ? true : false;

      return total;
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
