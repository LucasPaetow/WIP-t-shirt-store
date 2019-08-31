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
        <div class="image-overlay-wrapper">
          <picture class="picture-svg--tshirt picture">
            <img
              class="svg--tshirt"
              src="@/assets/overlays/kA9asUxmVka.svg"
              alt=""
            />
          </picture>
          <picture class="picture--tshirt picture">
            <img
              class="image--tshirt"
              src="@/assets/images/kA9asUxmVka.png"
              alt=""
            />
          </picture>
        </div>
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
        />
      </header>
    </div>
    <div class="previous-color">
      <p class="user-color">Your latest colors</p>
      <p class="community-color">Favourite community colors</p>
    </div>
    <p class="scroll-down">Scroll down if you are unsure</p>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import search from "@/components/inputs/InputSearch.vue";

export default {
  components: {
    search
  },
  props: [],
  name: "aboveTheFold",
  data() {
    return {
      inputSearch: "",
      errorSearch: ""
    };
  },
  methods: {
    //navigation
    goTo(locationName) {
      this.$router.push({
        name: locationName
      });
    }
  },
  computed: {
    ...mapGetters({})
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
  grid-auto-rows: min-content 1fr 1.5fr 1fr;
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

.image-overlay-wrapper {
  height: auto;
  min-height: 8rem;
  width: 100%;
  position: relative;
}

.picture {
  height: auto;
  width: 100%;
}
.description {
  text-align: center;
  padding-bottom: var(--2base);
}

.picture-svg--tshirt {
  position: absolute;
  z-index: 3;
  mix-blend-mode: multiply;
}

.picture--tshirt {
  position: absolute;
  z-index: 2;
}

.image--tshirt {
  height: auto;
  width: 100%;
  object-fit: contain;
}

.svg--tshirt {
  height: auto;
  width: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
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
