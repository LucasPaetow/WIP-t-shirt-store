<template>
  <article class="home" v-if="!loadingState">
    <section class="lp-section lp-section1">
      <image-overlay
        :image_full="productData[2].urls.full"
        :image_regular="productData[2].urls.regular"
        :image_small="productData[2].urls.small"
        :image_thumb="productData[2].urls.thumb"
        :svg="productData[2].svg"
        :alt_description="productData[2].alt_description"
        :overlay_color="selectedColor || ['white', '#ffffff']"
        :minHeight="90"
        :aspectRatio="productData[2].width / productData[2].height"
        :objectPosition="productPosition"
        class="image-overlay z-index-1"
      />
      <header class="header z-index-2">
        <h2 class="header--topline">
          <span
            class="header--headline__background background__inverted headline__background"
          >
            So you want a
          </span>
        </h2>
        <h1 class="header--headline  ">
          <span class="header--headline__background headline__background"
            >good-looking,<br />
            incredible-feeling,<br />
            hussle-free</span
          >
        </h1>

        <h2 class="header--subline">
          <span
            class="header--headline__background background__inverted headline__background"
          >
            t-shirt?
          </span>
        </h2>
      </header>
      <div class="supporting-information z-index-2">
        <p class="supporting-information--text">
          To lighten your heart only the greatest t-shirt ever made can? <br />
          <b>We got that.</b>
        </p>
      </div>

      <div class="search z-index-2" id="search-wrapper-1">
        <h1 class="search--headline  ">
          <span class="search--headline__background headline__background">
            In what color do you want to leave others breathless?</span
          >
        </h1>

        <search
          class="search--input"
          :input="{
            label: null,
            placeholder: 'mediumspringgreen?',
            id: 'home'
          }"
          align="right"
          :error="errorSearch"
          @searchresultevent="selectResult"
          @searchupdateevent="updateColor"
        />
      </div>
    </section>
    <section class="lp-section lp-section2">
      <!--productData[0] -->
      <image-overlay
        :image_full="productData[0].urls.full"
        :image_regular="productData[0].urls.regular"
        :image_small="productData[0].urls.small"
        :image_thumb="productData[0].urls.thumb"
        :svg="productData[0].svg"
        :alt_description="productData[0].alt_description"
        :overlay_color="selectedColor || ['white', '#ffffff']"
        :minHeight="90"
        :aspectRatio="productData[0].width / productData[0].height"
        class="image-overlay z-index-1"
      />
      <header class="header z-index-2">
        <h1 class="header--headline  ">
          <span class="header--headline__background headline__background">
            Without wasting half a day?
          </span>
        </h1>
      </header>
      <div class="supporting-information z-index-2">
        <p class="supporting-information--text text-border">
          We get it, you are important and have to be somewhere else to show
          them how its done. <br />This is why
          <b>we only sell this one, perfect t-shirt</b> in that color you like
          so much.
        </p>
      </div>
      <div class="search" id="search-wrapper-2">
        <h1 class="search--headline  ">
          <span class="search--headline__background headline__background">
            Name your color and experience how awesome you can look like</span
          >
        </h1>
        <search
          class="search--input"
          :input="{
            label: null,
            placeholder: 'mediumspringgreen?',
            id: 'home'
          }"
          :align="searchAlignment"
          :error="errorSearch"
          @searchresultevent="selectResult"
          @searchupdateevent="updateColor"
        />
      </div>
    </section>
    <section class="lp-section lp-section3">
      <!--productData[3] -->
      <image-overlay
        :image_full="productData[6].urls.full"
        :image_regular="productData[6].urls.regular"
        :image_small="productData[6].urls.small"
        :image_thumb="productData[6].urls.thumb"
        :svg="productData[6].svg"
        :alt_description="productData[6].alt_description"
        :overlay_color="selectedColor || ['white', '#ffffff']"
        :minHeight="90"
        :aspectRatio="productData[6].width / productData[6].height"
        class="image-overlay z-index-1"
      />
      <header class="header z-index-2">
        <h1 class="header--headline  ">
          <span class="header--headline__background headline__background">
            A T-shirt that has astonishing stamina
          </span>
        </h1>
        <h2 class="header--subline">
          <span
            class="header--headline__background background__inverted headline__background"
          >
            - just like you?
          </span>
        </h2>
      </header>
      <div class="supporting-information z-index-2">
        <p class="supporting-information--text text-border">
          We dont just make perfect t-shirts. We train them to become the worlds
          greatest. At the end of their training they could partake in the
          olympics. <br />But that wouldn't be fair to the other athletes. This
          is why they last so long.
        </p>
      </div>
      <div class="search" id="search-wrapper-3">
        <h1 class="search--headline  ">
          <span class="search--headline__background headline__background">
            Choose a color that will baffle future archaeologists</span
          >
        </h1>
        <search
          class="search--input"
          :input="{
            label: null,
            placeholder: 'mediumspringgreen?',
            id: 'home'
          }"
          align="right"
          :error="errorSearch"
          @searchresultevent="selectResult"
          @searchupdateevent="updateColor"
        />
      </div>
    </section>
    <section class="lp-section lp-section4">
      <div class="image-overlay z-index-1"></div>
      <header class="header z-index-2">
        <h1 class="header--headline  ">
          <span class="header--headline__background headline__background">
            You could return it for 90 days, but you won’t give this t-shirt
            away - ever
          </span>
        </h1>
      </header>
      <div class="supporting-information z-index-2">
        <p class="supporting-information--text text-border">
          Ordering takes only 5 minutes of your precious time and you can always
          return it for 90 days. But we both know you wont. We dedicated our
          whole life to crafting the perfect t-shirt
        </p>
      </div>
    </section>
    <storeFooter></storeFooter>
  </article>
  <article class="home" v-else>
    <h1>loading</h1>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import search from "@/components/inputs/InputSearch.vue";
import imageOverlay from "@/components/overlay/ImageOverlay";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import storeFooter from "@/components/footer/footer.vue";

export default {
  components: {
    search,
    imageOverlay,
    buttonSimple,
    storeFooter
  },
  props: [],
  name: "home",
  data() {
    return {
      errorSearch: "",
      selectedColor: "",
      showTransitionMessage: ""
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

      this.$store
        .dispatch("productModule/COLORS_setCurrent", this.selectedColor)
        .then(() => {
          setTimeout(() => {
            this.goTo("store", {
              color: this.selectedColor[0],
              colorArray: this.selectedColor
            });
          }, 2000);
          this.showTransitionMessage = `Well done, lets get you the best ${
            this.selectedColor[0]
          } t-shirts there are`;
        });
    },
    clearInput() {
      this.selectedColor = "";
    },
    updateColor(color) {
      this.selectedColor = color;
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
      supportData: "productModule/getSupport",
      productData: "productModule/getProduct"
    }),
    productPosition() {
      let width = window.innerWidth;
      if (width > 1200) {
        return "50% 50%";
      }
      if (width > 700) {
        return "35% 50%";
      }
      if (width > 340) {
        return "30% 50%";
      }

      return "20% 50%";
    },
    searchAlignment() {
      let width = window.innerWidth;
      if (width > 700) {
        return "left";
      }
      return "right";
    }
  },
  beforeRouteLeave(to, from, next) {
    this.clearInput();
    next();
  },
  created() {},
  //same check for route-view keep-alive
  activated() {}
};
</script>

<style scoped>
.home {
  /* Positioning */

  /* Box-model */
  min-height: 100%;
  /* Typography */

  /* Visual */
  background-color: var(--grey-100);
  /* Misc */
}

@media (min-width: 37.5em) {
  .home {
    /* Positioning */

    /* Box-model */
    padding-top: var(--7base);
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.lp-section {
  /* Positioning */
  display: grid;
  grid-template-columns: var(--column-spacing) 1fr var(--column-spacing);
  grid-template-rows: 1fr;
  grid-auto-rows: min-content;
  grid-row-gap: 5vh;
  /* Box-model */
  padding: 0 0 10vh 0;
  /* Typography */

  /* Visual */

  /* Misc */
}

.lp-section:nth-of-type(even) {
  /* Positioning */

  /* Box-model */

  /* Typography */
  background-color: var(--grey-200);
  /* Visual */

  /* Misc */
}

@media (min-width: 37.5em) {
  .lp-section {
    /* Positioning */
    /* Box-model */
    padding: 0 0 15vh 0;
    /* Typography */

    /* Visual */

    /* Misc */
  }
}
@media (min-width: 45em) {
  .lp-section {
    /* Positioning */
    grid-template-columns: var(--column-spacing) repeat(4, 1fr) var(
        --column-spacing
      );
    grid-row-gap: 0vh;
    grid-template-rows: 8rem repeat(4, min-content);
    /* Box-model */
    padding: 0 0 10vh 0;
    /* Typography */

    /* Visual */

    /* Misc */
  }
  .lp-section:nth-of-type(even) {
    /* Positioning */
    grid-template-columns: var(--column-spacing) 1.5fr 0.5fr 0.5fr 1.5fr var(
        --column-spacing
      );

    /* Box-model */

    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.image-overlay {
  /* Positioning */
  grid-column: 1/4;
  grid-row: 1/4;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

@media (min-width: 37.5em) {
  .image-overlay {
    /* Positioning */

    /* Box-model */
    padding: 5vh 5vw 0 5vw;
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

@media (min-width: 45em) {
  .image-overlay {
    /* Positioning */

    grid-column: 4/6;
    grid-row: 1/5;
    /* Box-model */
    padding: 5vh 0 0 0;
    /* Typography */

    /* Visual */

    /* Misc */
  }
  .lp-section:nth-of-type(even) .image-overlay {
    /* Positioning */
    grid-column: 2/4;
    /* Box-model */

    /* Typography */

    /* Visual */

    /* Misc */
  }

  .lp-section1 .image-overlay {
    /* Positioning */
    grid-column: 3/6;
    /* Box-model */

    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.header {
  /* Positioning */
  grid-column: 2/3;
  grid-row: 2/3;
  /* Box-model */
  padding-bottom: 5vh;
  /* Typography */

  /* Visual */

  /* Misc */
}

.header--headline {
  /* Positioning */
  /* Box-model */
  padding: var(--h1__padding) 0;
  /* Typography */
  line-height: var(--h1__lineHeight);
  font-size: var(--h1__fontSize);

  /* Visual */

  /* Misc */
}

.header--topline,
.header--subline {
  /* Positioning */

  /* Box-model */
  padding: 0;
  /* Typography */
  font-size: var(--h2__fontSize);
  /* Visual */
  /* Misc */
}

.headline__background {
  /* Positioning */

  /* Box-model */
  padding: var(--fourthbase) var(--halfbase);
  /* Typography */

  /* Visual */
  background-color: var(--grey-0);

  /* Misc */
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

.background__inverted {
  /* Positioning */
  /* Box-model */
  /* Typography */
  /* Visual */
  background-color: var(--grey-800);
  color: var(--grey-0);
  /* Misc */
}

@media (min-width: 45em) {
  .header {
    /* Positioning */
    grid-column: 2/5;
    grid-row: 2/3;
    /* Box-model */
    width: 80%;
    /* Typography */

    /* Visual */
    /* Misc */
  }
  .lp-section:nth-of-type(even) .header {
    /* Positioning */
    grid-column: 3/6;
    grid-row: 2/3;
    /* Box-model */

    /* Typography */

    /* Visual */

    /* Misc */
  }
}

@media (min-width: 70em) {
  .header {
    /* Positioning */

    /* Box-model */
    width: 100%;
    /* Typography */

    /* Visual */
    /* Misc */
  }
}

@media (min-width: 90em) {
  .headline__background {
    /* Positioning */

    /* Box-model */
    padding: var(--halfbase) var(--4base);
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.supporting-information {
  /* Positioning */
  grid-column: 2/3;
  grid-row: 4/5;
  /* Box-model */
  max-width: 25rem;
  /* Typography */
  /* Visual */
  /* Misc */
}

.supporting-information--text {
  /* Positioning */

  /* Box-model */

  /* Typography */
  font-size: var(--2base);
  /* Visual */

  /* Misc */
}

@media (min-width: 37.5em) {
  .supporting-information--text {
    /* Positioning */

    /* Box-model */

    /* Typography */
    font-size: var(--3base);
    /* Visual */

    /* Misc */
  }
}

@media (min-width: 45em) {
  .supporting-information {
    /* Positioning */
    grid-column: 2/5;
    grid-row: 3/4;
    /* Box-model */
    padding: var(--2base);
    /* Typography */

    /* Visual */
    background-color: var(--grey-0);
    /* Misc */
  }
  .lp-section:nth-of-type(even) .supporting-information {
    /* Positioning */

    grid-column: 3/6;
    grid-row: 3/4;
    /* Box-model */
    /* Typography */

    /* Visual */

    /* Misc */
  }

  .supporting-information--text {
    /* Positioning */

    /* Box-model */

    /* Typography */
    font-size: var(--2base);
    /* Visual */

    /* Misc */
  }
}

@media (min-width: 70em) {
  .supporting-information {
    /* Positioning */

    /* Box-model */
    padding: var(--3base);
    max-width: 40rem;
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

@media (min-width: 90em) {
  .supporting-information {
    /* Positioning */

    /* Box-model */
    padding: var(--4base);
    max-width: 45rem;
    /* Typography */

    /* Visual */

    /* Misc */
  }

  .supporting-information--text {
    /* Positioning */

    /* Box-model */

    /* Typography */
    font-size: var(--3base);
    /* Visual */

    /* Misc */
  }
}

.search {
  /* Positioning */
  grid-column: 2/3;
  grid-row: 5/6;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  /* Box-model */
  margin: 5vh 0;
  /* Typography */
  text-align: right;
  /* Visual */
  /* Misc */
}

.search--headline {
  /* Positioning */
  transform: translateX(calc(var(--halfbase) * -1));
  /* Box-model */

  padding: var(--h1__padding) 0;
  /* Typography */
  line-height: var(--h1__lineHeight);
  font-size: var(--h1__fontSize);
  /* Visual */
  color: var(--grey-0);
  /* Misc */
}

.search--headline__background {
  /* Positioning */

  /* Box-model */

  /* Typography */

  /* Visual */
  background-color: var(--grey-800);

  /* Misc */
}

.search--input {
  width: 100%;
}

@media (min-width: 26em) {
  .search--input {
    width: 80%;
  }
}

@media (min-width: 37.5em) {
  .search--input {
    width: 50%;
  }
}

@media (min-width: 45em) {
  .search {
    /* Positioning */
    grid-column: 2/6;
    grid-row: 5/6;

    /* Box-model */

    /* Typography */

    /* Visual */
    /* Misc */
  }

  .lp-section:nth-of-type(even) .search {
    /* Positioning */
    align-items: flex-start;
    /* Box-model */
    /* Typography */
    text-align: left;
    /* Visual */
    /* Misc */
  }
  .lp-section:nth-of-type(even) .search--headline {
    /* Positioning */
    transform: translateX(0);
    /* Box-model */

    /* Typography */

    /* Visual */

    /* Misc */
  }
}

@media (min-width: 90em) {
  .search {
    /* Positioning */
    /* Box-model */
    margin: 5vh 0 20vh 0;
    /* Typography */

    /* Visual */
    /* Misc */
  }

  .search--headline {
    /* Positioning */
    transform: translateX(calc(var(--4base) * -1));
    /* Box-model */
    width: 80%;
    /* Visual */
    /* Misc */
  }
}

.lp-section4 .image-overlay {
  margin-top: 5vh;
  height: 90vh;
  background-color: grey;
}
</style>
