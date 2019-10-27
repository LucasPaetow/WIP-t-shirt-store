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
  display: grid;
  grid-template-rows: 5vh min-content 1fr;
  grid-template-columns: 5vw 1fr 5vw;

  /* Box-model */
  /* Typography */

  /* Visual */

  /* Misc */
}

.overlay-layout {
  /* Positioning */
  grid-column: 1/4;
  grid-row: 1/4;
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

@media (min-width: 45em) {
  .overlay-layout {
    /* Positioning */
    grid-column: 2/4;
    grid-row: 1/4;
    /* Box-model */

    /* Typography */
    /* Visual */
    /* Misc */
  }

  .soundbite {
    /* Positioning */
    grid-column: 1/3;
    grid-row: 2/3;
    /* Box-model */
    /* Typography */
    /* Visual */
    /* Misc */
  }
}
</style>
