<template>
  <modal-base :position="modalPosition">
    <a
      @click="$router.back()"
      class="close-modal z-index-4"
      :class="[addedToCard ? 'success' : '']"
      id="close-modal"
    >
      <p class="close-modal--text z-index-2">Close</p>
      <aside class="close-modal--background z-index-1"></aside>
    </a>
    <section class="forground z-index-4" id="forground">
      <pageTransition
        :propTransitionCustom="{
          custom: true,
          animationTarget: 'forground',
          firstStep: 'content-first',
          lastStep: 'content-last',
          extraTarget: 'close-modal'
        }"
      >
        <content-first
          v-if="!addedToCard"
          id="content-first"
          :key="'beforeAddingToCart'"
          @contentfirstevent="addToCard"
        />

        <content-last :key="'afterAddingToCart'" id="content-last" v-else />
      </pageTransition>
    </section>
  </modal-base>
</template>

<script>
import { mapGetters } from "vuex";
import pageTransition from "@/components/transitions/transition.vue";
import modalBase from "@/components/modal/modalBase.vue";
import contentFirst from "@/components/homepage/sizeContentFirst.vue";
import contentLast from "@/components/homepage/sizeContentLast.vue";

export default {
  components: {
    pageTransition,
    modalBase,
    contentFirst,
    contentLast
  },
  props: {},
  name: "sizeOptions",
  data() {
    return {
      addedToCard: false,
      product: {
        amount: null,
        size: null,
        color: null
      }
    };
  },

  methods: {
    addToCard(productInfo) {
      let product = {
        amount: productInfo.amount,
        size: productInfo.size,
        color: this.currentColor,
        timestamp: Date.now()
      };
      this.product = product;
      this.$store
        .dispatch("userModule/PRODUCT_addToShoppingCart", product)
        .then(() => {
          this.addedToCard = true;
        });
    },
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
    modalPosition() {
      if (window.innerWidth > 700) {
        return [50, 50];
      }
      return [50, 75];
    }
  }
};
</script>

<style scoped>
.close-modal {
  /* Positioning */
  display: grid;
  /* Box-model */
  height: 4rem;
  width: 100%;
  /* Typography */
  text-decoration: none;
  /* Visual */
  background-color: transparent;
  opacity: 1;
  /* Misc */
}

@media (min-width: 45em) {
  .close-modal {
    /* Positioning */
    /* Box-model */
    height: 3rem;
    width: 100%;
    /* Typography */

    /* Visual */
    background-color: hsla(0, 0%, 100%, 0.75);
    /* Misc */
  }
}

.close-modal--text {
  /* Positioning */
  justify-self: center;
  align-self: center;
  grid-column: 1/2;
  grid-row: 1/2;
  /* Box-model */
  /* Typography */
  font-size: var(--1base);
  font-weight: bold;
  /* Visual */
  color: var(--grey-500);

  /* Misc */
}

.success .close-modal--text {
  /* Positioning */
  /* Box-model */
  /* Typography */

  /* Visual */
  color: var(--grey-0);

  /* Misc */
}

.close-modal--background {
  /* Positioning */
  justify-self: center;
  align-self: center;
  grid-column: 1/2;
  grid-row: 1/2;
  /* Box-model */
  width: 100%;
  height: 100%;
  /* Typography */
  /* Visual */
  background-color: var(--green-700);
  opacity: 0;
  /* Misc */
}

.success .close-modal--background {
  /* Positioning */

  /* Box-model */

  /* Typography */
  /* Visual */

  opacity: 1;
  /* Misc */
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1) 0.3s;
}

.forground {
  /* Positioning */
  /* Box-model */
  max-height: calc(100vh - 4rem);
  min-width: 100vw;
  overflow-y: scroll;
  /* Typography */

  /* Visual */
  background-color: hsla(0, 0%, 100%, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
  /* Misc */
}

@media (min-width: 30em) {
  .forground {
    /* Positioning */
    /* Box-model */
    max-height: calc(100vh - 3rem);
    min-width: 90vw;
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

@media (min-width: 37.5em) {
  .forground {
    /* Positioning */
    /* Box-model */
    min-width: 20rem;
    /* Typography */

    /* Visual */

    /* Misc */
  }
}
</style>
