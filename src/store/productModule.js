/** VUEX init module**/

import { pictures } from "@/assets/pictureData.js";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    productDataSet: null,
    ProductColorPalette: null,
    currentColor: null
  },
  // -----------------------------------------------------------------
  getters: {
    getProduct: state => {
      return state.productDataSet;
    },
    getColorPalette: state => {
      return state.ProductColorPalette;
    },
    getcurrentColor: state => {
      return state.currentColor;
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    PRODUCT_setDataToStore(state, product) {
      //set the current state to that of the index
      state.productDataSet = product;
    },
    PRODUCT_setAllColors(state, colors) {
      //set the current state to that of the index
      state.ProductColorPalette = colors;
    },
    PRODUCT_setCurrentColor(state, color) {
      //set the current state to that of the index
      state.currentColor = color;
    }
  },
  // -----------------------------------------------------------------
  actions: {
    PRODUCT_setDataToStore: ({ commit }, product) => {
      commit("PRODUCT_setDataToStore", product);
    },
    PRODUCT_setAllColors: ({ commit }, colors) => {
      commit("PRODUCT_setAllColors", colors);
    },
    PRODUCT_setCurrentColor: ({ commit }, color) => {
      commit("PRODUCT_setCurrentColor", color);
    }
    //product has to be updated etc
  }
};
