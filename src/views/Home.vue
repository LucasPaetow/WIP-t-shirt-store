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
        :aspectRation="productData[2].width / productData[2].height"
        :objectPosition="productPosition"
        class="image-overlay z-index-1"
      />
      <header class="header z-index-2">
        <p class="header--topline">
          <span class="header--headline__background background__inverted">
            So you want a
          </span>
        </p>
        <h1 class="header--headline">
          <span class="header--headline__background"
            >good-looking,<br />
            incredible-feeling,<br />
            hussle-free</span
          >
        </h1>

        <p class="header--subline">
          <span class="header--headline__background background__inverted">
            t-shirt?
          </span>
        </p>
      </header>
      <button-simple
        class="button-simple z-index-2"
        buttonText="Choose your dream color"
        @simplebuttonevent="goTo('login')"
      />
      <div class="supporting-information z-index-2">
        <p class="supporting-information--text">
          To lighten your heart only the greatest t-shirt ever made can? <br />
          <b>We got that.</b>
        </p>
      </div>
      <div class="search">
        <search
          class="search--input"
          :input="{
            label: null,
            placeholder: 'mediumspringgreen?',
            id: 'home',
            label: 'In what color do you want to leave others breathless?'
          }"
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
        :aspectRation="productData[0].width / productData[0].height"
        class="image-overlay z-index-1"
      />
      <header class="header z-index-2">
        <h1 class="header--headline">
          <span class="header--headline__background">
            Without wasting half a day?
          </span>
        </h1>
      </header>
      <div class="supporting-information z-index-2">
        <p class="supporting-information--text text-border">
          We get it, you are important and have to be somewhere else to show
          them how its done. This is why we sell only this one, perfect t-shirt
          in that color you like so much.
        </p>
      </div>
      <div class="search">
        <search
          class="search--input"
          :input="{
            label: null,
            placeholder: 'mediumspringgreen?',
            id: 'home',
            label: 'Name your color and experience how cool you will look'
          }"
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
        :aspectRation="productData[6].width / productData[6].height"
        class="image-overlay z-index-1"
      />
      <header class="header z-index-2">
        <h1 class="header--headline">
          <span class="header--headline__background ">
            A T-shirt that has astonishing stamina
          </span>
        </h1>
        <p class="header--subline">
          <span class="header--headline__background background__inverted">
            - just like you?
          </span>
        </p>
      </header>
      <div class="supporting-information z-index-2">
        <p class="supporting-information--text text-border">
          We dont just make perfect t-shirts. We train them to become the worlds
          greatest. At the end of their training they could partake in the
          olympics. But that wouldn't be fair to the other athletes. This is why
          they last so long.
        </p>
      </div>
      <div class="search">
        <search
          class="search--input"
          :input="{
            label: null,
            placeholder: 'mediumspringgreen?',
            id: 'home',
            label: 'Choose a color that will baffle future archaeologists'
          }"
          :error="errorSearch"
          @searchresultevent="selectResult"
          @searchupdateevent="updateColor"
        />
      </div>
    </section>
    <section class="lp-section lp-section4">
      <div class="image-overlay z-index-1"></div>
      <header class="header z-index-2">
        <h1 class="header--headline">
          <span class="header--headline__background ">
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
    <footer class="footer">
      <h2 class="footer--headline">About</h2>
      <div class="footer--section">
        <h3 class="footer--section__headline">About the shirt</h3>
        <router-link :to="{ name: '' }" class="footer--section__link"
          >Sizes</router-link
        >
        <router-link :to="{ name: '' }" class="footer--section__link"
          >Quality</router-link
        >
        <router-link :to="{ name: '' }" class="footer--section__link"
          >Wash and care instructions</router-link
        >
      </div>
      <div class="footer--section">
        <h3 class="footer--section__headline">About shipping</h3>
        <router-link :to="{ name: '' }" class="footer--section__link"
          >Shipping and returns</router-link
        >
        <router-link :to="{ name: '' }" class="footer--section__link"
          >Order Tracking</router-link
        >
      </div>
      <div class="footer--section">
        <h3 class="footer--section__headline">About us</h3>
        <router-link :to="{ name: '' }" class="footer--section__link"
          >Our Story</router-link
        >
        <router-link :to="{ name: '' }" class="footer--section__link"
          >Impressum</router-link
        >
        <router-link :to="{ name: '' }" class="footer--section__link"
          >Privacy</router-link
        >
      </div>
    </footer>
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

export default {
  components: {
    search,
    imageOverlay,
    buttonSimple
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
        return "50% 50%";
      }
      if (width > 340) {
        return "30% 50%";
      }

      return "20% 50%";
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
  background-color: #f6f6f6;
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
  grid-template-columns: 5vw 1fr 5vw;
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
  background-color: var(--grey-100);
  /* Visual */

  /* Misc */
}

@media (min-width: 37.5em) {
  .lp-section {
    /* Positioning */
    display: grid;
    grid-template-columns: 1fr 8fr 1fr;
    grid-row-gap: 5vh;
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
    display: grid;
    grid-template-columns: 0.25fr repeat(4, 1fr) 0.25fr;
    grid-row-gap: 0vh;
    grid-template-rows: min-content;
    /* Box-model */
    padding: 0 0 10vh 0;
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

@media (min-width: 70em) {
  .lp-section {
    /* Positioning */
    display: grid;
    grid-template-columns: 0.66fr repeat(4, 1fr) 0.66fr;
    grid-row-gap: 0vh;
    grid-template-rows: min-content;
    /* Box-model */
    padding: 0 0 10vh 0;
    /* Typography */

    /* Visual */

    /* Misc */
  }
  .lp-section:nth-of-type(even) {
    /* Positioning */
    grid-template-columns: 0.66fr 1.5fr 0.5fr 0.5fr 1.5fr 0.66fr;
    /* Box-model */

    /* Typography */
    background-color: var(--grey-100);
    /* Visual */

    /* Misc */
  }
}

@media (min-width: 90em) {
  .lp-section {
    /* Positioning */
    display: grid;
    grid-template-columns: 1fr repeat(4, 1fr) 1fr;
    grid-row-gap: 0vh;
    grid-template-rows: min-content;
    /* Box-model */
    padding: 0 0 10vh 0;
    /* Typography */

    /* Visual */

    /* Misc */
  }
  .lp-section:nth-of-type(even) {
    /* Positioning */
    grid-template-columns: 1fr 1.5fr 0.5fr 0.5fr 1.5fr 1fr;
    /* Box-model */

    /* Typography */
    background-color: var(--grey-100);
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
    padding: 5vh 0;
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

  /* Typography */

  /* Visual */

  /* Misc */
}

.header--headline {
  /* Positioning */
  /* Box-model */
  padding: var(--fourthbase) 0;
  /* Typography */
  line-height: calc(7vw + var(--fourthbase) * 2 + 2.5vw);
  font-size: 7vw;

  /* Visual */

  /* Misc */
}

.header--topline,
.header--subline {
  /* Positioning */

  /* Box-model */

  /* Typography */
  font-size: 6vw;
  /* Visual */
  /* Misc */
}

.header--headline__background {
  /* Positioning */

  /* Box-model */
  padding: var(--fourthbase) var(--halfbase);
  /* Typography */

  /* Visual */
  background-color: white;

  /* Misc */
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

.background__inverted {
  /* Positioning */

  /* Box-model */

  /* Typography */
  font-weight: bold;
  /* Visual */
  background-color: var(--grey-800);
  color: white;
  /* Misc */
}

@media (min-width: 22.5em) {
  .header--headline {
    /* Positioning */
    /* Box-model */
    padding: var(--thirdbase) 0;
    /* Typography */
    line-height: calc(7vw + var(--thirdbase) * 2 + 2.5vw);

    /* Visual */

    /* Misc */
  }
}

@media (min-width: 26em) {
  .header--headline {
    /* Positioning */
    /* Box-model */
    /* Typography */
    font-size: 6vw;
    line-height: calc(6vw + var(--thirdbase) * 2 + 2.5vw);
    /* Visual */

    /* Misc */
  }

  .header--topline,
  .header--subline {
    /* Positioning */
    /* Box-model */
    /* Typography */
    font-size: 5vw;
    /* Visual */
    /* Misc */
  }
}

@media (min-width: 37.5em) {
  .lp-section2 .header,
  .lp-section3 .header {
    /* Positioning */

    /* Box-model */
    padding-bottom: 5vh;
    /* Typography */

    /* Visual */

    /* Misc */
  }

  .header--headline {
    /* Positioning */
    /* Box-model */
    /* Typography */
    font-size: 5.5vw;
    line-height: calc(5vw + var(--fourthbase) * 2 + 2.5vw);
    /* Visual */

    /* Misc */
  }

  .header--topline,
  .header--subline {
    /* Positioning */
    /* Box-model */
    /* Typography */
    font-size: 4vw;
    /* Visual */
    /* Misc */
  }
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

  .header--headline {
    /* Positioning */
    /* Box-model */
    padding: var(--fourthbase) 0;
    /* Typography */
    line-height: calc(5vw + var(--fourthbase) * 2 + 2.5vw);
    font-size: 5vw;

    /* Visual */

    /* Misc */
  }

  .header--topline,
  .header--subline {
    /* Positioning */

    /* Box-model */

    /* Typography */
    font-size: 3vw;
    /* Visual */
    /* Misc */
  }
}

@media (min-width: 70em) {
  .header {
    /* Positioning */
    grid-column: 2/5;
    grid-row: 2/3;
    /* Box-model */
    width: 100%;
    /* Typography */

    /* Visual */
    /* Misc */
  }
  .header--headline {
    /* Positioning */
    /* Box-model */
    padding: var(--fourthbase) 0;

    /* Typography */
    line-height: calc(4vw + var(--fourthbase) * 2 + 2vw);
    font-size: 4vw;

    /* Visual */

    /* Misc */
  }

  .header--topline,
  .header--subline {
    /* Positioning */

    /* Box-model */

    /* Typography */
    font-size: 2vw;
    /* Visual */
    /* Misc */
  }
}

@media (min-width: 90em) {
  .header--headline {
    /* Positioning */
    /* Box-model */
    padding: var(--halfbase) 0;
    /* Typography */
    line-height: calc(3.25vw + var(--halfbase) * 2 + 1.5vw);
    font-size: 3.25vw;

    /* Visual */

    /* Misc */
  }

  .header--topline,
  .header--subline {
    /* Positioning */

    /* Box-model */

    /* Typography */
    font-size: 1.5vw;
    /* Visual */
    /* Misc */
  }

  .header--headline__background {
    /* Positioning */

    /* Box-model */
    padding: var(--halfbase) var(--4base);
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.button-simple {
  /* Positioning */
  grid-column: 2/3;
  grid-row: 3/4;
  justify-self: center;
  transform: translateY(50%);
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

@media (min-width: 45em) {
  .button-simple {
    /* Positioning */
    display: none;
    /* Box-model */

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
  max-width: 35rem;
  /* Typography */

  /* Visual */

  /* Misc */
}

.lp-section1 .supporting-information {
  /* Positioning */

  /* Box-model */
  margin-top: 5vh;
  /* Typography */

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
    background-color: white;
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
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

@media (min-width: 45em) {
  .search {
    /* Positioning */
    grid-column: 2/4;
    grid-row: 5/6;
    /* Box-model */
    margin: var(--4base) 5vh 0 5vh;
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.lp-section4 .image-overlay {
  height: 90vh;
  background-color: grey;
}

.footer {
  /* Positioning */
  display: grid;
  grid-template-columns: var(--1base) 1fr var(--1base);
  grid-template-rows: 1fr;
  grid-auto-rows: min-content;
  grid-row-gap: var(--4base);
  /* Box-model */
  padding: 10vh 0;
  /* Typography */

  /* Visual */
  background-color: grey;
  /* Misc */
}

.footer--headline {
  /* Positioning */
  grid-column: 2/3;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.footer--section {
  /* Positioning */
  grid-column: 2/3;
  display: flex;
  flex-direction: column;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.footer--section__headline {
  /* Positioning */

  /* Box-model */
  margin-bottom: var(--halfbase);
  /* Typography */

  /* Visual */

  /* Misc */
}

.footer--section__link {
  /* Positioning */

  /* Box-model */
  margin-bottom: var(--fourthbase);
  /* Typography */

  /* Visual */

  /* Misc */
}
</style>
