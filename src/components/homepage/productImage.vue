<template>
  <section class="product-image">
    <div class="soundbite z-index-2">
      <styled-headline
        :headlineText="product.description.headline"
        :headlineType="responsiveHeadline"
      />

      <styled-headline
        v-if="product.description.subline"
        :headlineText="product.description.subline"
        :headlineType="responsiveSubline"
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
      :fullHeight="80"
      class="overlay-layout z-index-1"
    />
  </section>
</template>

<script>
import imageOverlay from "@/components/overlay/ImageOverlay";
import styledHeadline from "@/components/headline/headline.vue";
//import recap from "@/components/checkout/recap.vue";

export default {
  components: {
    imageOverlay,
    styledHeadline
    //recap
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
        return 85;
      }
      if (width > 700) {
        return 85;
      }

      return 90;
    },
    responsiveHeadline() {
      let width = window.innerWidth;
      if (width > 1200) {
        return "h2";
      }

      return "h1";
    },
    responsiveSubline() {
      let width = window.innerWidth;
      if (width > 1200) {
        return "h3";
      }

      return "h2";
    }
  },
  created() {}
};
</script>

<style scoped>
.product-image {
  /* Positioning */
  display: grid;
  grid-template-columns: var(--paddingX) 1fr var(--paddingX);
  grid-auto-rows: min-content;

  /* Box-model */
  overflow: hidden;
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
</style>
