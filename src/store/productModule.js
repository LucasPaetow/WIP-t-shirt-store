/** VUEX init module**/

import { pictures } from "@/assets/pictureData.js";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    productData: []
  },
  // -----------------------------------------------------------------
  getters: {
    getProduct: state => {
      return state.productData;
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    PRODUCT_setToStore(state, product) {
      //set the current state to that of the index
      state.productData = product;
    }
  },
  // -----------------------------------------------------------------
  actions: {
    PRODUCT_setToStore: ({ commit }, product) => {
      commit("PRODUCT_setToStore", product);
    }
    //product has to be updated etc
  }
};
