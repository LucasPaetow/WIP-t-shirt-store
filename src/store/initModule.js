/** VUEX init module**/

import { pictures } from "@/assets/pictureData.js";
import { colors } from "@/assets/colors.js";
import { colors_simple } from "@/assets/colors_simple.js";

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
      dispatch("INIT_checkForSavedStoreData")
        .then(resultData => {
          if (resultData) {
            console.log(resultData);
            dispatch("productModule/PRODUCT_setDataToStore", resultData, {
              root: true
            });
          }
        })
        .then(() => {
          dispatch("INIT_checkForSavedColorData").then(resultColors => {
            if (resultColors) {
              console.log(resultColors);
              dispatch("productModule/PRODUCT_setAllColors", resultColors, {
                root: true
              });
            }
          });
        })

        .then(() => {
          commit("INIT_loading", false);
        });
    },
    INIT_checkForSavedStoreData: () => {
      let localSave = localStorage.getItem("storeData");
      return localSave ? JSON.parse(localSave) : false;
    },
    INIT_checkForSavedColorData: () => {
      let localSaveColors = localStorage.getItem("storeColors");
      /*let localSaveColors = localStorage.getItem("storeColors_simple");*/
      return localSaveColors ? JSON.parse(localSaveColors) : false;
    }
  }
};
