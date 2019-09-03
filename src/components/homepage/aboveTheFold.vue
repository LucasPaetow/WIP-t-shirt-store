<template>
  <section class="above-the-fold">
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
          :image_max="require('@/assets/images/kA9asUxmVka.png')"
          :svg="productData[11].svg"
          :alt_description="productData[11].alt_description"
          :overlay_color="color"
          class="overlay-layout"
        />
      </div>
    </div>
    <div class="search-color">
      <header class="header">
        <h1 class="headline">I just want a t-shirt in</h1>
        <search
          class="search-layout"
          v-model="inputSearch"
          :input="{
            label: 'my favourite color',
            placeholder: 'mediumspringgreen?',
            id: 'home'
          }"
          :error="errorSearch"
          :results="filteredList"
          @searchresultevent="selectResult"
        />
      </header>
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
      inputSearch: "",
      errorSearch: "",
      color: ""
    };
  },
  methods: {
    selectResult(result) {
      console.log(result);
      this.inputSearch = result;
      this.color = result;
    },

    //navigation
    goTo(locationName) {
      this.$router.push({
        name: locationName
      });
    }
  },
  computed: {
    ...mapGetters({
      loadingState: "initModule/getLoadingState",
      productData: "productModule/getProduct",
      productColor: "productModule/getColor"
    }),
    filteredList() {
      if (!this.inputSearch && !this.color) {
        return;
      }
      return Object.keys(this.productColor).filter(color => {
        return color.toLowerCase().includes(this.inputSearch.toLowerCase());
      });
    }
  },
  created() {},
  //same check for route-view keep-alive
  activated() {}
};
</script>

<style scoped>
.above-the-fold {
  height: 100%;
  display: grid;
  grid-auto-rows: min-content 0.5fr 1fr 0.5fr;
  grid-template-columns: var(--padding-main) var(--view-main) var(
      --padding-main
    );
  grid-row-gap: var(--padding-rows);
}

/*Images*/
.images {
  grid-column: 2/3;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.coathanger {
  padding: var(--2base);
}

.tshirt {
  padding: var(--2base);
}

.overlay-layout {
  min-height: 8rem;
}

.picture {
  height: auto;
  width: 100%;
}
.description {
  text-align: center;
  padding-bottom: var(--2base);
}

.image--coathanger {
  height: 3rem;
  width: 100%;
  object-fit: contain;
}

/*search*/

.search-color {
  grid-column: 2/3;
}

.header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.headline {
  line-height: 100%;
}

/* previous searches*/

.previous-color {
  grid-column: 2/3;
}

.user-color {
  padding: var(--halfbase) 0;
}

.community-color {
  padding: var(--halfbase) 0;
}

.scroll-down {
  grid-column: 2/3;
  justify-self: center;
  align-self: end;
  font-weight: bold;
}
</style>
