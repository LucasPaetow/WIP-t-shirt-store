<template>
  <article class="store">
    <!--  <section class="search" id="search-store">
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
    </section> -->
    <header class="header" id="looks-great">
      <h1 class="headline" v-if="today">
        This is how cool you will look tomorrow
      </h1>
      <h1 class="headline" v-else>This is how cool you will look in 2 days</h1>
      <p class="subline">
        If you order in the next
        <span v-if="Math.floor(now / 60) > 0">
          <b>{{ Math.floor(now / 60) }}h</b> and</span
        >
        <b> {{ Math.floor(((now / 60) % 1) * 60) }} min</b>
      </p>
    </header>
    <section class="product-images" v-if="randomProductData">
      <div class="product-info">
        <p class="info info--price"><b>For 20$</b></p>
        <buttonSimple
          class="info info--wishlist"
          buttonText="add color to wishlist"
          buttonType="no-styling"
        />
      </div>
      <div class="overlay-wrapper" v-for="product in randomProductData">
        <image-overlay
          :image_full="product.urls.full"
          :image_regular="product.urls.regular"
          :image_small="product.urls.small"
          :image_thumb="product.urls.thumb"
          :svg="product.svg"
          :alt_description="product.alt_description"
          :overlay_color="currentColor.color || ['white', '#ffffff']"
          :soundbite="product.description"
          :minHeight="50"
          :aspectRation="product.width / product.height"
          @overlaybuttonevent="chooseSize(product)"
          class="overlay-layout"
        />
      </div>
    </section>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import search from "@/components/inputs/InputSearch.vue";
import imageOverlay from "@/components/overlay/ImageOverlay";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";

export default {
  components: {
    search,
    imageOverlay,
    buttonSimple
  },
  props: [],
  name: "store",
  data() {
    return {
      date: new Date(),
      today: true
    };
  },
  methods: {
    chooseSize(product) {
      this.goTo("product", { color: this.currentColor, data: product });
    },

    //navigation
    goTo(locationName, paramObject) {
      this.$router.push({
        name: locationName,
        params: paramObject
      });
    }
  },
  computed: {
    ...mapGetters({
      loadingState: "initModule/getLoadingState",
      randomProductData: "productModule/getProduct_random",
      currentColor: "productModule/getCurrentColor",
      productColors: "productModule/getColorPalette"
    }),
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
  created() {
    if (this.currentColor) {
      return;
    }

    if (this.$route.params.colorArray) {
      this.$store.dispatch(
        "productModule/COLORS_setCurrent",
        this.$route.params.colorArray
      );
      return;
    }
    let route = this.$route.fullPath;
    let colorName = route.split("-")[1];
    let colorHex = this.productColors[colorName];
    let colorArray = [colorName, colorHex];
    this.$store.dispatch("productModule/COLORS_setCurrent", colorArray);
  },
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
  grid-auto-rows: min-content;
  grid-template-rows: min-content min-content 1fr;
  grid-template-columns: var(--padding-main) var(--view-main) var(
      --padding-main
    );
  grid-row-gap: var(--padding-rows);
  /* Box-model */
  padding: var(--padding-top) 0 var(--2base) 0;
  min-height: 200%;
  /* Typography */

  /* Visual */

  /* Misc */
}

.search,
.header,
.product-images {
  /* Positioning */
  grid-column: 2/3;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.product-images {
  /* Positioning */
  display: grid;
  grid-auto-flow: row;

  /* Box-model */
  min-height: 100%;
  /* Typography */
  /* Visual */
  /* Misc */
}

.product-info {
  /* Positioning */
  display: flex;
  flex-direction: row;
  /* Box-model */
  justify-content: space-between;
  /* Typography */
  /* Visual */
  /* Misc */
}

.overlay-layout {
  /* Positioning */

  /* Box-model */
  margin-bottom: var(--halfbase);
  /* Typography */
  /* Visual */
  border-radius: var(--fourthbase);
  /* Misc */
}
</style>
