<template>
  <form @submit.prevent class="form">
    <label class="label--form" :for="input.id" v-if="input.label">
      {{ input.label }}
    </label>
    <span class="input-wrapper input--shadow">
      <input
        class="input--form"
        :class="[error || searchError.length ? 'error' : '']"
        :style="{ textAlign: align }"
        :placeholder="input.placeholder"
        :id="'search' + input.id"
        v-model="searchInput"
        @input="updateColorOnType()"
        @keydown.up="previousItem()"
        @keydown.down="nextItem()"
        @keydown.enter.prevent="searchEnterEvent()"
        @keydown.esc="clearInput()"
        @keydown.delete="enableSearchAgain()"
        @focus="$emit('searchfocusevent')"
        @blur="$emit('searchblurevent')"
        autocomplete="off"
      />
      <ul class="results" id="searchResults" v-if="showSearchResults">
        <li
          class="result"
          v-for="(result, index) in filteredList"
          @click="addResultFromFilteredList(result)"
          :class="[highlightResult(index) ? 'active-element' : '']"
        >
          <div
            class="colored-dot"
            :style="`background-color: ${result[1]}`"
          ></div>
          <p>{{ result[0] }}</p>
          <arrow-icon></arrow-icon>
        </li>
      </ul>
    </span>

    <p v-if="error || searchError.length" class="error--form">
      {{ error || searchError }}
    </p>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import arrowIcon from "@/components/icons/arrow.vue";
import searchIcon from "@/components/icons/search.vue";

export default {
  components: { arrowIcon, searchIcon },
  name: "inputSearch",
  props: {
    input: Object,
    error: String,
    align: {
      type: String,
      default: "left"
    }
  },
  data() {
    return {
      highlightedResult: null,
      searchError: "",
      searchInput: "",
      searchResult: ""
    };
  },
  methods: {
    nextItem() {
      let results = document.getElementById("searchResults");
      let result = results.querySelectorAll(".result");
      if (
        this.highlightedResult === null ||
        this.highlightedResult >= result.length - 1
      ) {
        this.highlightedResult = 0;
        this.$emit(
          "searchupdateevent",
          this.filteredList[this.highlightedResult]
        );
        return;
      }
      this.highlightedResult += 1;
      this.$emit(
        "searchupdateevent",
        this.filteredList[this.highlightedResult]
      );
    },
    previousItem() {
      if (this.highlightedResult === null) {
        return;
      }
      if (this.highlightedResult === 0) {
        this.highlightedResult = null;
        return;
      }
      this.highlightedResult -= 1;
      this.$emit(
        "searchupdateevent",
        this.filteredList[this.highlightedResult]
      );
    },
    highlightResult(index) {
      return this.highlightedResult === index ? true : false;
    },
    searchEnterEvent() {
      let manualColor = this.filteredList.find(color => {
        return color === this.searchInput;
      });
      if (manualColor && this.highlightedResult === null) {
        this.addResultFromFilteredList(manualColor);
        return;
      }

      if (this.highlightedResult === null) {
        setTimeout(() => {
          this.searchError = "";
        }, 5000);
        this.searchError = "You need to select one of the shown colors";
        this.$emit("searcherrorevent");
        return;
      }
      this.addResultFromFilteredList(this.filteredList[this.highlightedResult]);
    },
    addResultFromFilteredList(result) {
      this.searchInput = result[0];
      this.searchResult = result;
      console.log(result);
      this.$emit("searchresultevent", result);
    },
    enableSearchAgain() {
      this.searchResult = "";
    },
    clearInput() {
      this.searchInput = this.searchResult = "";
    },
    updateColorOnType() {
      let manualColor = this.filteredList.find(color => {
        return color === this.searchInput;
      });
      if (manualColor) {
        this.$emit("searchupdateevent", manualColor);
      }
    }
  },
  computed: {
    ...mapGetters({
      productColors: "productModule/getColorPalette"
    }),
    filteredList() {
      if (!this.searchInput) {
        return [];
      }
      let searchColors = Object.entries(this.productColors).filter(color => {
        //return color.toLowerCase().includes(this.searchInput.toLowerCase());
        return color[0].toLowerCase().includes(this.searchInput.toLowerCase());
      });
      return searchColors;
    },

    showSearchResults() {
      if (!this.searchInput) {
        return false;
      }
      if (this.searchResult) {
        return false;
      }
      return true;
    }
  },
  beforeRouteLeave(to, from, next) {
    this.searchError = "";
    this.searchInput = "";
    this.searchResult = "";
    next();
  }
};
</script>

<style scoped>
.form {
  display: grid;
  grid-auto-rows: min-content;
  grid-template-columns: 1fr var(--6base);
  width: 100%;
  position: relative;
  background-color: inherit;
}

.label--form {
  font-size: var(--1base);
  margin-bottom: var(--halfbase);
  font-weight: bold;
  grid-column: 1/2;
  grid-row: 1/2;
  color: var(--grey-800);
}

.input-wrapper {
  grid-column: 1/3;
  grid-row: 2/3;
  position: relative;
  border: 1px solid var(--grey-500);
  background-color: inherit;
}

.input--form {
  width: 100%;
  padding: var(--1base);
  line-height: 150%;
  font-size: var(--2base);
  border: 1px solid transparent;
  color: var(--grey-800);
  position: relative;
  z-index: 2;
  transition: all 0.2s ease-in;
  background-color: white;
}

.input--form::placeholder {
  font-size: var(--2base);
  color: var(--grey-600);
}

.searchicon-layout {
  position: absolute;
}

@media (min-width: 90em) {
  .input--form {
    padding: var(--2base);
    height: 5rem;
  }

  .input--form::placeholder {
    /* Positioning */

    /* Box-model */

    /* Typography */
    font-size: 1.75vw;
    font-weight: bold;
    /* Visual */
    /* Misc */
  }
}

/**/

.results {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 5;
  max-height: 15rem;
  overflow-y: scroll;
  background-color: var(--grey-0);
  border: 1px solid var(--grey-500);
  border-top-color: transparent;
}

.colored-dot {
  content: " ";
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  margin-right: var(--thirdbase);
}

.result {
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  padding: var(--thirdbase) var(--halfbase);
  align-items: center;
}

.result:hover,
.active-element {
  background-color: var(--grey-300);
}

/**/

.error {
  border: 1px solid var(--red-700);
  transition: all 0.2s ease-in;
}

.error--form {
  color: var(--red-700);
  padding: var(--fourthbase) var(--fourthbase) 0 var(--fourthbase);
  grid-row: 3/4;
  grid-column: 1/3;
  transition: all 0.5s ease-in;
}

/*shadow hover effect*/

.input--shadow::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s;
}

.input--shadow:hover::before {
  opacity: 1;
}

.input--shadow:focus-within::before {
  opacity: 1;
}

.input--form,
.input--form:focus,
.button-search,
.button-search:focus {
  outline: none;
  outline-style: none;
}
</style>
