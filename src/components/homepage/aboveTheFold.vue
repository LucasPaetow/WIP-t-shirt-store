<template>
  <section class="above-the-fold" v-if="!loadingState">
    <div class="images">
      <div class="coathanger">
        <p class="description--coathanger description">This is what you have</p>
        <picture class="picture--coathanger picture">
          <img
            class="image--coathanger"
            src="@/assets/images/CCuLLUNz91n.png"
            alt=""
          />
        </picture>
      </div>
      <div class="tshirt">
        <p class="description--tshirt description">This is what you want</p>
        <image-overlay
          :image_full="require('@/assets/images/kA9asUxmVka.png')"
          :image_regular="require('@/assets/images/kA9asUxmVka.png')"
          :image_small="require('@/assets/images/kA9asUxmVka.png')"
          :image_thumb="require('@/assets/images/kA9asUxmVka.png')"
          :svg="supportData[3].svg"
          :alt_description="supportData[3].alt_description"
          :overlay_color="selectedColor || ['mediumspringgreen', '#00FA9A']"
          class="image-overlay"
        />
      </div>
    </div>
    <div class="search-color">
      <header class="header">
        <h1 class="headline">I just want a t-shirt in my favourite color:</h1>
        <search
          class="search-layout"
          :input="{
            label: null,
            placeholder: 'mediumspringgreen?',
            id: 'home'
          }"
          :error="errorSearch"
          @searchresultevent="selectResult"
          @searchupdateevent="updateColor"
        />
      </header>
      <p v-if="showTransitionMessage">{{ showTransitionMessage }}</p>
    </div>
  </section>
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
  name: "aboveTheFold",
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
      supportData: "productModule/getSupport"
    })
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
/* Positioning */
/* Box-model */
/* Typography */
/* Visual */
/* Misc */

.above-the-fold {
  /* Positioning */
  display: grid;
  grid-auto-rows: min-content 0.5fr 1fr 0.5fr;
  grid-template-columns: var(--padding-main) var(--view-main) var(
      --padding-main
    );
  grid-row-gap: var(--padding-rows);
  /* Box-model */
  height: 100%;
  /* Typography */
  /* Visual */
  /* Misc */
}

/*Images*/
.images {
  /* Positioning */
  grid-column: 2/3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.coathanger {
  /* Positioning */
  /* Box-model */
  padding: var(--2base);
  /* Typography */
  /* Visual */
  /* Misc */
}

.tshirt {
  /* Positioning */
  /* Box-model */
  padding: var(--2base);
  /* Typography */
  /* Visual */
  /* Misc */
}

.overlay-layout {
  /* Positioning */
  /* Box-model */
  min-height: 8rem;
  /* Typography */
  /* Visual */
  /* Misc */
}

.picture {
  /* Positioning */
  /* Box-model */
  height: auto;
  width: 100%;
  /* Typography */
  /* Visual */
  /* Misc */
}
.description {
  /* Positioning */
  /* Box-model */
  padding-bottom: var(--2base);
  /* Typography */
  text-align: center;
  /* Visual */
  /* Misc */
}

.image--coathanger {
  /* Positioning */
  /* Box-model */
  height: 3rem;
  width: 100%;
  object-fit: contain;
  /* Typography */
  /* Visual */
  /* Misc */
}

/*search*/

.search-color {
  /* Positioning */
  grid-column: 2/3;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.header {
  /* Positioning */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.headline {
  /* Positioning */
  /* Box-model */
  /* Typography */
  line-height: 125%;
  /* Visual */
  /* Misc */
}

/* previous searches*/

.previous-color {
  /* Positioning */
  grid-column: 2/3;
  /* Box-model */
  /* Typography */
  /* Visual */
  /* Misc */
}

.user-color {
  /* Positioning */
  /* Box-model */
  padding: var(--halfbase) 0;
  /* Typography */
  /* Visual */
  /* Misc */
}

.community-color {
  /* Positioning */
  /* Box-model */
  padding: var(--halfbase) 0;
  /* Typography */
  /* Visual */
  /* Misc */
}

.scroll-down {
  /* Positioning */
  grid-column: 2/3;
  justify-self: center;
  align-self: end;
  /* Box-model */
  /* Typography */
  font-weight: bold;
  /* Visual */
  /* Misc */
}
</style>
