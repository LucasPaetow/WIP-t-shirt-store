/** VUEX init module**/

import { pictures } from "@/assets/pictureData.js";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    productData: null,
    supportData: null,
    productColorPalette: null,
    currentColor: null
  },
  // -----------------------------------------------------------------
  getters: {
    getProduct: state => {
      return state.productData;
    },
    getSupport: state => {
      return state.supportData;
    },
    getProduct_random: state => {
      let shuffled = state.productData
        .map(a => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value);

      return shuffled;
    },
    /*getProductData_horizontal: state => {
      let horizontal = this.productData.filter(image => {
        let aspectRation = image.height / image.width;
        if (aspectRation < 1) {
          return image;
        }
      });

      return horizontal;
    },*/
    getColorPalette: state => {
      return state.productColorPalette;
    },
    getCurrentColor: state => {
      return state.currentColor;
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    PRODUCT_setData(state, product) {
      //set the current state to that of the index
      state.productData = product;
    },
    SUPPORT_setData(state, support) {
      //set the current state to that of the index
      state.supportData = support;
    },
    COLORS_setData(state, colors) {
      //set the current state to that of the index
      state.productColorPalette = colors;
    },
    COLORS_setCurrent(state, color) {
      //set the current state to that of the index
      state.currentColor = color;
    }
  },
  // -----------------------------------------------------------------
  actions: {
    PRODUCT_setData: ({ commit }, product) => {
      commit("PRODUCT_setData", product);
      console.log(product);
    },
    SUPPORT_setData: ({ commit }, product) => {
      commit("SUPPORT_setData", product);
    },
    COLORS_setData: ({ commit }, colors) => {
      commit("COLORS_setData", colors);
    },
    COLORS_setCurrent: ({ commit }, color) => {
      commit("COLORS_setCurrent", color);
    }
    //product has to be updated etc
  }
};
