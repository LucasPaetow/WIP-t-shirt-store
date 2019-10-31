import Vue from "vue";
import Vuex from "vuex";

import authModule from "@/store/authModule.js";
import initModule from "@/store/initModule.js";
import productModule from "@/store/productModule.js";
import userModule from "@/store/userModule.js";
import timeModule from "@/store/timeModule.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    initModule,
    authModule,
    productModule,
    userModule,
    timeModule
  }
});
