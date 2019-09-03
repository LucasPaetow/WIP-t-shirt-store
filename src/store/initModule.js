/** VUEX init module**/

import { pictures } from "@/assets/pictureData.js";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    loading: false
  },
  // -----------------------------------------------------------------
  getters: {
    getLoadingState: state => {
      return state.loading;
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    INIT_loading(state, boolean) {
      //set the current state to that of the index
      state.loading = boolean;
    }
  },
  // -----------------------------------------------------------------
  actions: {
    INIT_store: ({ dispatch, commit }) => {
      console.log("init store");
      commit("INIT_loading", true);
      dispatch("INIT_checkForSavedData")
        .then(result => {
          if (result) {
            console.log(result);
            dispatch("productModule/PRODUCT_setToStore", result, {
              root: true
            });
          }
        })
        .then(() => {
          commit("INIT_loading", false);
        });
    },
    INIT_checkForSavedData: () => {
      let localSave = localStorage.getItem("storeData");
      return localSave ? JSON.parse(localSave) : false;
    }
  }
};
