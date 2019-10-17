<template>
  <article class="store" id="store">
    <header class="header" id="looks-great">
      <h1 class="header--headline" v-if="today">
        This is how cool you will look tomorrow
      </h1>
      <h1 class="header--headline" v-else>
        This is how cool you will look in 2 days
      </h1>
      <p class="header--subline">
        If you order in the next
        <span v-if="Math.floor(now / 60) > 0">
          <b>{{ Math.floor(now / 60) }}h</b> and</span
        >
        <b> {{ Math.floor(((now / 60) % 1) * 60) }} min</b>
      </p>
    </header>
    <section class="product-info">
      <p class="info info--price">
        <span class="headline__background ">For 20$</span>
      </p>
      <buttonSimple
        class="info info--wishlist"
        buttonText="add color to wishlist"
        buttonType="no-styling"
      />
    </section>
    <section class="product-images" v-if="randomProductData">
      <productImage
        v-for="(product, index) in randomProductData"
        :key="'randomProductImage' + index"
        :product="product"
        :index="index"
        :features="features"
        :currentColor="currentColor"
        @productimageevent="chooseSize()"
      >
      </productImage>
    </section>

    <storeFooter />

    <router-link
      :to="{
        name: 'sizeOptions',
        params: {}
      }"
      class="size-options z-index-3"
    >
      <p class="size-options--text">Choose Size</p>
    </router-link>
    <page-transition><router-view /></page-transition>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import storeFooter from "@/components/footer/footer.vue";
import pageTransition from "@/components/transitions/transition.vue";
import productImage from "@/components/homepage/productImage.vue";

export default {
  components: {
    buttonSimple,
    storeFooter,
    pageTransition,
    productImage
  },
  props: [],
  name: "store",
  data() {
    return {
      date: new Date(),
      today: true,
      features: [
        {
          headline: " ",
          body: " "
        },
        {
          headline: "Shipping",
          body:
            "Ordering takes only 5 minutes of your precious time and you can always return it for 90 days. But we both know you wont. We dedicated our whole life to crafting the perfect t-shirt"
        },
        {
          headline: "Materials",
          body: [
            "10% luck, 20% skill",
            "15% concentrated power of will",
            "5%pleasure, 50% percent cotton",
            "And a 100% reason to remember the tshirt (actually 100% cotton, too)"
          ]
        }
      ],
      scrollPosition: 0
    };
  },
  methods: {
    chooseSize() {
      this.goTo("sizeOptions");
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
  activated() {},
  beforeRouteUpdate(to, from, next) {
    let store = document.getElementById("store");
    if (to.name === "sizeOptions") {
      this.scrollPosition = window.pageYOffset;
      store.style.top = -this.scrollPosition + "px";
      store.classList.add("fixed-scroll");
    }
    if (to.name === "store") {
      store.classList.remove("fixed-scroll");
      store.style.top = "";
      setTimeout(() => {
        window.scrollTo(0, this.scrollPosition);
      }, 10);
    }

    next();
  }
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
  /* Box-model */
  padding: var(--7base) 0 0 0;
  min-height: 100%;
  /* Typography */

  /* Visual */
  background-color: var(--grey-100);
  /* Misc */
}

.header {
  /* Positioning */
  display: grid;
  grid-auto-rows: min-content;
  grid-template-columns: var(--column-spacing) 1fr var(--column-spacing);
  /* Box-model */
  padding: 3vh 0 5vh 0;
  /* Typography */

  /* Visual */

  /* Misc */
}

.header--headline {
  /* Positioning */
  grid-column: 2/3;
  /* Box-model */
  padding: var(--h1__padding) 0;
  /* Typography */
  line-height: 125%;
  font-size: calc(var(--h1__fontSize) * 1.25);

  /* Visual */

  /* Misc */
}

.header--subline {
  /* Positioning */
  grid-column: 2/3;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.product-info {
  /* Positioning */
  display: flex;
  flex-direction: row;
  /* Box-model */
  padding: 1vh var(--column-spacing);
  justify-content: space-between;
  /* Typography */
  /* Visual */
  /* Misc */
}

.product-images {
  /* Positioning */
  display: grid;
  grid-auto-rows: min-content;
  grid-template-columns: var(--column-spacing) 1fr var(--column-spacing);
  grid-row-gap: 2vh;
  /* Box-model */
  min-height: 100%;
  /* Typography */
  /* Visual */
  /* Misc */
}

.fixed-scroll {
  position: fixed;
  left: 0;
  right: 0;
  overflow-y: scroll; /* render disabled scroll bar to keep the same width */
}
</style>
