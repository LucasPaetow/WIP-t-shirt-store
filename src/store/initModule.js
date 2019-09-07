/** VUEX init module**/

import { pictures, support } from "@/assets/pictureData.js";
import { colors } from "@/assets/colors.js";
import { colors_simple } from "@/assets/colors_simple.js";
const fb = require("@/api/firebaseConfig.js");

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
    INIT_store: async ({ dispatch, commit }) => {
      console.log("init store");
      commit("INIT_loading", true);

      let loadSupportData = await dispatch("INIT_restoreData", "support");
      let setSupportData = await dispatch(
        "productModule/SUPPORT_setData",
        loadSupportData,
        {
          root: true
        }
      );

      let loadColorData = await dispatch("INIT_restoreData", "colors");
      let setColorData = await dispatch(
        "productModule/COLORS_setData",
        loadColorData,
        {
          root: true
        }
      );

      let finishSave = await commit("INIT_loading", false);

      let loadProductData = await dispatch("INIT_restoreData", "product");
      let setProductData = await dispatch(
        "productModule/PRODUCT_setData",
        loadProductData,
        {
          root: true
        }
      );

      return finishSave;
    },

    INIT_restoreData: async ({ dispatch }, section) => {
      let localSave = localStorage.getItem(`t-shirt-store_${section}`);
      if (localSave) {
        console.log(`restored ${section} data from local save`);
        return JSON.parse(localSave);
      }
      let remoteSave = await dispatch("INIT_queryFirebase", section);
      let saveLocaly = dispatch("INIT_saveLocaly", {
        type: section,
        data: remoteSave
      });

      return remoteSave;
    },
    INIT_queryFirebase: ({}, section) => {
      console.log(`retrieving ${section} remotly`);
      return fb.storeCollection
        .doc(section)
        .get()
        .then(result => {
          return result.data()[section];
        });
    },
    INIT_saveLocaly: ({}, section) => {
      console.log(`saving ${section.type} localy`);
      localStorage.setItem(
        `t-shirt-store_${section.type}`,
        JSON.stringify(section.data)
      );
    }
  }
};
