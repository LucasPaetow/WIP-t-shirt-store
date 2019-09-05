<template>
  <article class="store">
    <section class="search" id="search-store">
      <search
        :input="{
          label: 'search for a different color',
          placeholder: 'lightgoldenrodyellow?',
          id: 'store'
        }"
        :error="errorSearch"
        @searchresultevent="selectResult"
        @searchupdateevent="updateColor"
      />
    </section>
    <header class="header" id="looks-best-on-you">
      <h1 class="headline" v-if="today">
        This is how cool you will look tomorrow
      </h1>
      <h1 class="headline" v-else>This is how cool you will look in 2 days</h1>
      <p class="subline">
        If you order in the next
        <span v-if="Math.floor(now / 60) > 0">
          <b>{{ Math.floor(now / 60) }}h</b> and</span
        >
        <b> {{ Math.floor(now - now / 60) }} min</b>
      </p>
    </header>
    <section class="product-images"></section>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import search from "@/components/inputs/InputSearch.vue";
import imageOverlay from "@/components/overlay/ImageOverlay";

export default {
  components: {
    search,
    imageOverlay
  },
  props: [],
  name: "store",
  data() {
    return {
      errorSearch: "",
      selectedColor: "",
      showTransitionMessage: "",
      date: new Date(),
      today: true
    };
  },
  methods: {
    selectResult(result) {
      console.log(result);
      if (!result) {
        setTimeout(() => {
          this.errorSearch = "";
        }, 5000);
        this.errorSearch = "Sadly, we dont have this color";
        this.clearInput();
        return;
      }
      this.selectedColor = result;

      /*this.$store
        .dispatch("productModule/PRODUCT_setCurrentColor", this.selectedColor)
        .then(() => {
          setTimeout(() => {
            this.goTo(
              "store",
              { color: this.selectedColor },
              "#looks-best-on-you"
            );
          }, 2000);
          this.showTransitionMessage = `Well done, lets get you the best ${this.selectedColor} t-shirts there are`;
        });*/
    },
    clearInput() {
      this.selectedColor = "";
    },
    updateColor(color) {
      this.selectedColor = color;
    },
    //navigation
    goTo(locationName, paramObject, locationHash) {
      this.$router.push({
        name: locationName,
        params: paramObject,
        hash: locationHash
      });
    }
  },
  computed: {
    ...mapGetters({}),
    now() {
      let monthNames = [
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
      ];

      let today = this.date.getDate();
      let tomorrow = "0" + (this.date.getDate() + 1);
      let month = monthNames[this.date.getMonth()];
      let year = this.date.getFullYear();

      let todayAt3PM = Date.parse(`${today} ${month} ${year} 15:00:00`);
      let tomorrowAt3PM = Date.parse(`${tomorrow} ${month} ${year} 15:00:00`);
      let timeTill3PM = Math.trunc((todayAt3PM - this.date) / 1000 / 60);
      let timeTill3PMTomorrow = Math.trunc(
        (tomorrowAt3PM - this.date) / 1000 / 60
      );

      timeTill3PM > 0 ? (this.today = true) : (this.today = false);

      return timeTill3PM > 0 ? timeTill3PM : timeTill3PMTomorrow;
    }
  },
  mounted() {
    window.setInterval(() => {
      this.date = new Date();
    }, 60000);
  },
  created() {},
  //same check for route-view keep-alive
  activated() {}
};
</script>

<style scoped>
/* Positioning */
/* Box-model */
/* Typography */
/* Visual */
/* Misc */

.store {
  /* Positioning */
  display: grid;
  padding: var(--padding-top) 0 var(--2base) 0;
  grid-auto-rows: min-content;
  grid-template-rows: 7rem;
  grid-template-columns: var(--padding-main) var(--view-main) var(
      --padding-main
    );
  grid-row-gap: var(--padding-rows);
  /* Box-model */
  min-height: 100%;
  /* Typography */

  /* Visual */

  /* Misc */
}

.search {
  /* Positioning */
  grid-column: 2/3;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.header {
  /* Positioning */
  grid-column: 2/3;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}
</style>
