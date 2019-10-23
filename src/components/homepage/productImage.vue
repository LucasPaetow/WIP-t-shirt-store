<template>
  <section class="product-image overlay-wrapper">
    <div class="soundbite z-index-2">
      <styled-headline :headlineText="product.description.headline" />

      <styled-headline
        v-if="product.description.subline"
        :headlineText="product.description.subline"
        headlineType="h2"
        :invertedColor="true"
      />
    </div>

    <div class="supporting-information" v-if="index >= 1">
      <div class="information-wrapper" v-if="index < features.length">
        <h4 class="information--headline">
          {{ features[index].headline }}
        </h4>
        <ul
          class="information--list"
          v-if="Array.isArray(features[index].body)"
        >
          <li
            class="information--list-item"
            v-for="(list, index) in features[index].body"
            :key="'listItem' + index"
          >
            {{ list }}
          </li>
        </ul>
        <p v-else class="information--body">
          {{ features[index].body }}
        </p>
      </div>

      <buttonSimple
        class="button-layout z-index-2"
        buttonText="Choose size"
        buttonType="choose-size"
        @simplebuttonevent="$emit('productimageevent')"
      />
    </div>

    <image-overlay
      :image_full="product.urls.full"
      :image_regular="product.urls.regular"
      :image_small="product.urls.small"
      :image_thumb="product.urls.thumb"
      :svg="product.svg"
      :alt_description="product.alt_description"
      :overlay_color="currentColor || ['white', '#ffffff']"
      :fullHeight="responsiveImageHeight"
      :aspectRatio="product.width / product.height"
      class="overlay-layout z-index-1"
    />
  </section>
</template>

<script>
import imageOverlay from "@/components/overlay/ImageOverlay";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import styledHeadline from "@/components/headline/headline.vue";

export default {
  components: {
    imageOverlay,
    buttonSimple,
    styledHeadline
  },
  //if the basics are being edited, this array contains existing basic information
  props: {
    product: Object,
    index: Number,
    features: Array,
    currentColor: Array
  },
  name: "productImage",
  data() {
    return {};
  },
  methods: {},
  computed: {
    responsiveImageHeight() {
      let width = window.innerWidth;
      if (width > 1200) {
        return 80;
      }
      if (width > 700) {
        return 85;
      }

      return 90;
    }
  },
  created() {}
};
</script>

<style scoped>
.overlay-wrapper {
  /* Positioning */
  grid-column: 1/4;
  display: grid;
  grid-template-rows: 2vh min-content 1fr 2vh;
  grid-template-columns: var(--column-spacing) 1fr var(--column-spacing);

  /* Box-model */
  /* Typography */

  /* Visual */

  /* Misc */
}

.overlay-layout {
  /* Positioning */
  grid-column: 1/4;
  grid-row: 1/5;
  /* Box-model */

  /* Typography */
  /* Visual */
  /* Misc */
}

.soundbite {
  /* Positioning */
  grid-column: 2/3;
  grid-row: 2/3;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.supporting-information {
  /* Positioning */
  display: none;
  /* Box-model */
  padding: 0 var(--1base);
  /* Typography */
  /* Visual */
  /* Misc */
}

@media (min-width: 45em) {
  .product-images {
    /* Positioning */
    grid-row-gap: 5vh;
    /* Box-model */

    /* Typography */
    /* Visual */
    /* Misc */
  }
  .overlay-wrapper {
    /* Positioning */
    display: grid;
    grid-template-rows: 2vh min-content 1fr;
    grid-template-columns: 1fr 1.5fr 1fr;
    grid-auto-rows: min-content;
    /* Box-model */
    margin-bottom: 10vw;
    /* Typography */

    /* Visual */

    /* Misc */
  }

  .overlay-wrapper:nth-of-type(odd) .overlay-layout {
    /* Positioning */
    grid-column: 1/3;
    /* Box-model */

    /* Typography */

    /* Visual */

    /* Misc */
  }

  .overlay-wrapper:nth-of-type(odd) .soundbite {
    /* Positioning */
    grid-column: 2/4;
    justify-self: right;
    /* Box-model */

    /* Typography */
    text-align: right;
    /* Visual */

    /* Misc */
  }

  .overlay-wrapper .soundbite {
    /* Positioning */

    /* Box-model */

    /* Typography */
    /* Visual */

    /* Misc */
  }

  .overlay-wrapper:nth-of-type(odd) .supporting-information {
    /* Positioning */
    grid-row: 3/4;
    grid-column: 3/4;
    align-self: end;
    justify-self: start;
    display: grid;
    /* Box-model */

    /* Typography */
    /* Visual */
    /* Misc */
  }

  .overlay-wrapper:nth-of-type(even) .overlay-layout {
    /* Positioning */
    grid-column: 2/4;
    /* Box-model */

    /* Typography */

    /* Visual */

    /* Misc */
  }
  .overlay-wrapper:nth-of-type(even) .soundbite {
    /* Positioning */
    grid-column: 1/3;
    /* Box-model */

    /* Typography */

    /* Visual */

    /* Misc */
  }

  .overlay-wrapper:nth-of-type(even) .supporting-information {
    /* Positioning */
    grid-row: 3/4;
    grid-column: 1/2;
    align-self: end;
    justify-self: end;
    display: grid;
    /* Box-model */
    /* Typography */
    /* Visual */
    /* Misc */
  }

  .overlay-wrapper:nth-of-type(1) .overlay-layout {
    /* Positioning */
    grid-column: 1/4;
    /* Box-model */

    /* Typography */

    /* Visual */
    /* Misc */
  }
}

@media (min-width: 60em) {
  .overlay-wrapper {
    /* Positioning */
    grid-column: 2/3;

    /* Box-model */

    /* Typography */

    /* Visual */

    /* Misc */
  }

  .product-images {
    /* Positioning */
    grid-row-gap: 20vh;
    /* Box-model */

    /* Typography */
    /* Visual */
    /* Misc */
  }
}

.information-wrapper {
  /* Positioning */
  display: grid;
  grid-column-gap: var(--2base);
  /* Box-model */
  padding-bottom: var(--1base);
  /* Typography */
  /* Visual */

  /* Misc */
}

@media (min-width: 45em) {
  .overlay-wrapper:nth-of-type(even) .information-wrapper {
    /* Positioning */

    /* Box-model */

    /* Typography */
    text-align: right;
    /* Visual */

    /* Misc */
  }
  .overlay-wrapper:nth-of-type(odd) .button-layout {
    /* Positioning */
    justify-self: start;
    /* Box-model */
    /* Typography */
    /* Visual */
    /* Misc */
  }
  .overlay-wrapper:nth-of-type(even) .button-layout {
    /* Positioning */
    justify-self: end;
    /* Box-model */
    /* Typography */
    /* Visual */
    /* Misc */
  }
}
</style>
