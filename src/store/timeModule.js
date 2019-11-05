/** VUEX time module**/

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
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
    getXDatesFromNow: () => dateFromNow => {
      let resetDate = new Date();
      let newDateUnix = resetDate.setDate(resetDate.getDate() + dateFromNow);
      let newDate = new Date(newDateUnix);
      let year = newDate.getFullYear();
      let month = newDate.getMonth() + 1;
      let preDay = newDate.getDate();
      let day;
      preDay < 10 ? (day = `0${preDay}`) : (day = preDay);

      return `${year}-${month}-${day}`;
    },
    getXDaysFromNow: () => daysFromNow => {
      let resetDate = new Date();
      let newDateUnix = resetDate.setDate(resetDate.getDate() + daysFromNow);
      let newDate = new Date(newDateUnix);
      let preDay = newDate.getDate();
      let day;
      preDay < 10 ? (day = `0${preDay}`) : (day = preDay);

      return day;
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    TIME_update(state) {
      let now = new Date();
      //define today
      let today = now.getDate();
      let month = state.monthNames[now.getMonth()];
      let year = now.getFullYear();
      let todayAt3PM = Date.parse(`${today} ${month} ${year} 15:00:00`);

      //define tomorrow
      let tomorrowUnix = now.setDate(today + 1);
      let newDate = new Date(tomorrowUnix);
      let preTomorrow = newDate.getDate();
      let tomorrow;
      preTomorrow < 9
        ? (tomorrow = `0${preTomorrow}`)
        : (tomorrow = preTomorrow);
      let tomorrowsMonth = state.monthNames[newDate.getMonth()];
      let tomorrowAt3PM = Date.parse(
        `${tomorrow} ${tomorrowsMonth} ${year} 15:00:00`
      );

      //check if 3pm already passed
      let timeTill3PM = Math.trunc((todayAt3PM - Date.now()) / 1000 / 60);
      let timeTill3PMTomorrow = Math.trunc(
        (tomorrowAt3PM - Date.now()) / 1000 / 60
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
    TIME_update: ({ commit }) => {
      commit("TIME_update");
      setInterval(() => {
        commit("TIME_update");
      }, 1000 * 60);
    }
  }
};
