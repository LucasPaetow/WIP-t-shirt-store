/** VUEX init module**/

import { pictures, support } from "@/assets/pictureData.js";
import { colors } from "@/assets/colors.js";
const fb = require("@/api/firebaseConfig.js");

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    now: new Date(),
    monthNames: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    shippingTomorrow: null,
    timeTill3PM: 1
  },
  // -----------------------------------------------------------------
  getters: {
    getItTomorrow: state => {
      return state.shippingTomorrow;
    },
    getShippingDeadline: state => {
      return {
        hours: Math.floor(state.timeTill3PM / 60),
        minutes: Math.floor(((state.timeTill3PM / 60) % 1) * 60)
      };
    },
    getXDatesFromNow: state => dateFromNow => {
      let resetDate = new Date();
      let inAWeekUnix = resetDate.setDate(resetDate.getDate() + dateFromNow);
      let newDate = new Date(inAWeekUnix);
      let year = newDate.getFullYear();
      let month = newDate.getMonth() + 1;
      let preDay = newDate.getDate();
      let day;
      preDay < 9 ? (day = `0${preDay}`) : (day = preDay);

      return `${year}-${month}-${day}`;
    },
    getXDaysFromNow: state => daysFromNow => {
      let resetDate = new Date();
      let inAWeekUnix = resetDate.setDate(resetDate.getDate() + daysFromNow);
      let newDate = new Date(inAWeekUnix);
      let year = newDate.getFullYear();
      let month = newDate.getMonth() + 1;
      let preDay = newDate.getDate();
      let day;
      preDay < 9 ? (day = `0${preDay}`) : (day = preDay);

      return day;
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    TIME_update(state) {
      state.now = new Date();

      let today = state.now.getDate();
      let tomorrow = "0" + (state.now.getDate() + 1);
      let month = state.monthNames[state.now.getMonth()];
      let year = state.now.getFullYear();

      let todayAt3PM = Date.parse(`${today} ${month} ${year} 15:00:00`);
      let tomorrowAt3PM = Date.parse(`${tomorrow} ${month} ${year} 15:00:00`);
      let timeTill3PM = Math.trunc((todayAt3PM - state.now) / 1000 / 60);
      let timeTill3PMTomorrow = Math.trunc(
        (tomorrowAt3PM - state.now) / 1000 / 60
      );

      timeTill3PM > 0
        ? (state.shippingTomorrow = true)
        : (state.shippingTomorrow = false);

      timeTill3PM > 0
        ? (state.timeTill3PM = timeTill3PM)
        : (state.timeTill3PM = timeTill3PMTomorrow);
    }
  },
  // -----------------------------------------------------------------
  actions: {
    TIME_init: ({ dispatch }) => {
      dispatch("TIME_update");
    },
    TIME_update: ({ commit, state }) => {
      commit("TIME_update");
      setInterval(() => {
        commit("TIME_update");
      }, 1000 * 60);
    }
  }
};
