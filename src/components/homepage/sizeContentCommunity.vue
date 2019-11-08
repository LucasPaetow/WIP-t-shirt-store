<template>
  <section>
    <h4 class="more-shirts--headline">
      Here are some community favourites, you might be interested in
    </h4>
    <div class="more-shirts--shirts">
      <div
        class="shirt-wrapper"
        v-for="(color, index) in communityColors"
        :key="color + index + 'sizeContentLast'"
        @click="changeToCommunityColor(color)"
      >
        <image-overlay
          :image_full="require('@/assets/images/kA9asUxmVka.png')"
          :image_regular="require('@/assets/images/kA9asUxmVka.png')"
          :image_small="require('@/assets/images/kA9asUxmVka.png')"
          :image_thumb="require('@/assets/images/kA9asUxmVka.png')"
          :svg="supportData[3].svg"
          :alt_description="supportData[3].alt_description"
          :overlay_color="color || ['white', '#ffffff']"
          class="image-overlay more-shirts--image"
        />
        <h4 class="shirt--headline ">{{ color[0] }}</h4>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import imageOverlay from "@/components/overlay/ImageOverlay.vue";

export default {
  components: {
    imageOverlay
  },
  props: {},
  name: "sizeOptions",
  data() {
    return {
      communityColors: [["darkslategray", "#2F4F4F"], ["lavender", "#E6E6FA"]]
    };
  },

  methods: {
    changeToCommunityColor(color) {
      this.$store
        .dispatch("productModule/COLORS_setCurrent", color)
        .then(() => {
          this.goTo("store", {
            color: color[0],
            colorArray: color
          });
        });
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
      supportData: "productModule/getSupport",
      currentColor: "productModule/getCurrentColor",
      allColors: "productModule/getColorPalette"
    }),
    responsiveHeadline() {
      return window.innerWidth > 700 ? "h2" : "h1";
    },
    randomColor() {
      const colorValues = Object.getOwnPropertyNames(this.allColors);
      const randomValue =
        colorValues[Math.floor(Math.random() * colorValues.length)];
      const color = this.allColors[randomValue];

      return [randomValue, color];
    }
  }
};
</script>

<style scoped>
@media (min-width: 64em) {
  .option-completion {
    /* Positioning */
    /* Box-model */
    max-width: 36rem;
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.header--headline {
  /* Positioning */

  /* Box-model */
  padding: 0;
  /* Typography */
  font-size: var(--h2__fontSize);
  /* Visual */

  /* Misc */
}

.option-completion--product__layout {
  /* Positioning */
  display: grid;
  grid-template-columns: 1fr 0.61fr;
  grid-template-rows: min-content min-content;
  grid-gap: var(--1base);
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.product--image {
  /* Positioning */
  grid-column: 1/2;
  grid-row: 1/2;
  /* Box-model */
  max-width: 12rem;
  /* Typography */

  /* Visual */

  /* Misc */
}

.product--price {
  /* Positioning */
  grid-column: 2/3;
  grid-row: 1/2;
  align-self: center;
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.product--info {
  /* Positioning */
  grid-column: 1/3;
  grid-row: 2/3;
  display: grid;
  grid-template-columns: 0.61fr 1fr;
  grid-auto-rows: min-content;
  grid-column-gap: var(--1base);
  /* Box-model */
  padding: var(--1base);
  /* Typography */

  /* Visual */
  border: 1px solid var(--grey-800);
  /* Misc */
}

@media (min-width: 45em) {
  .product--image {
    /* Positioning */
    grid-column: 1/2;
    grid-row: 1/3;
    /* Box-model */
    min-width: 15rem;
    max-width: 15rem;
    /* Typography */

    /* Visual */

    /* Misc */
  }

  .product--price {
    /* Positioning */
    grid-column: 2/3;
    grid-row: 1/2;
    /* Box-model */
    /* Typography */

    /* Visual */

    /* Misc */
  }

  .product--info {
    /* Positioning */
    grid-column: 2/3;
    grid-row: 2/3;

    /* Box-model */
    height: min-content;
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.more-shirts--shirts {
  /* Positioning */
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-flow: column;
  grid-column-gap: var(--1base);
  /* Box-model */
  max-width: 90vw;
  height: 10rem;
  /* Typography */

  /* Visual */
  /* Misc */
}

.shirt-wrapper {
  /* Positioning */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* Box-model */
  min-width: 7rem;
  height: 10rem;
  /* Typography */
  text-align: center;

  /* Visual */

  /* Misc */
}

@media (min-width: 45em) {
  .more-shirts--shirts {
    /* Positioning */

    /* Box-model */
    max-width: 20rem;
    /* Typography */

    /* Visual */

    /* Misc */
  }
  .shirt-wrapper {
    /* Positioning */

    /* Box-model */
    min-width: 8rem;
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.default-input-style {
  /* Positioning */

  /* Box-model */
  width: var(--5base);
  height: var(--5base);
  padding: var(--thirdbase) 0;
  text-align: center;
  margin: 0 var(--fourthbase);
  /* Typography */
  font-weight: bold;
  /* Visual */
  border-radius: var(--fourthbase);
  color: var(--grey-800);
  /* Misc */
}

@media (min-width: 22.5em) {
  .default-input-style {
    /* Positioning */

    /* Box-model */
    width: var(--6base);
    height: var(--6base);
    padding: var(--halfbase) 0;
    text-align: center;
    margin: 0 var(--fourthbase);
    /* Typography */
    /* Visual */
    border-radius: var(--fourthbase);
    color: var(--grey-800);
    /* Misc */
  }
  .sizes--inputs__label::after {
    /* Positioning */
    /* Box-model */

    width: var(--6base);
    height: var(--6base);
    /* Typography */

    /* Visual */

    /* Misc */
  }
}
</style>
