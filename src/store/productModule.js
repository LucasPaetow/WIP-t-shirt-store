/** VUEX init module**/

import { pictures } from "@/assets/pictureData.js";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    productData: null,
    ProductColor: null
  },
  // -----------------------------------------------------------------
  getters: {
    getProduct: state => {
      return state.productData;
    },
    getColor: state => {
      return state.ProductColor;
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    PRODUCT_setDataToStore(state, product) {
      //set the current state to that of the index
      state.productData = product;
    },
    PRODUCT_setColorToStore(state, product) {
      //set the current state to that of the index
      state.ProductColor = product;
    }
  },
  // -----------------------------------------------------------------
  actions: {
    PRODUCT_setDataToStore: ({ commit }, product) => {
      commit("PRODUCT_setDataToStore", product);
    },
    PRODUCT_setColorToStore: ({ commit }, product) => {
      commit("PRODUCT_setColorToStore", product);
    }
    //product has to be updated etc
  }
};
