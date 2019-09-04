<template>
  <form @submit.prevent class="form">
    <label class="label--form" :for="input.id" v-if="input.label">
      {{ input.label }}
    </label>
    <span class="input-wrapper input--shadow">
      <input
        class="input--form"
        :class="[error || searchError.length ? 'error' : '']"
        :placeholder="input.placeholder"
        :id="'search' + input.id"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @focus="$emit('searchfocusevent')"
        @blur="$emit('searchblurevent')"
        @keydown.up="previousItem()"
        @keydown.down="nextItem()"
        @keydown.enter.prevent="searchEnterEvent()"
        @keydown.delete="$emit('searchdeleteevent')"
        @keydown.esc="$emit('searchescevent')"
      />
      <ul class="results" id="searchResults" v-if="showSearchResults">
        <li
          class="result"
          v-for="(result, index) in results"
          @click="$emit('searchresultevent', result)"
          :class="[highlightResult(index) ? 'active-element' : '']"
        >
          <div class="colored-dot" :style="`background-color: ${result}`"></div>
          <p>{{ result }}</p>
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
import arrowIcon from "@/components/icons/arrow.vue";

export default {
  components: { arrowIcon },
  name: "inputField",
  props: {
    value: String,
    input: Object,
    error: String,
    results: Array,
    selectedColor: String
  }, //["value", "input", "error", "results"],
  data() {
    return {
      currentResult: null,
      searchError: ""
    };
  },
  methods: {
    nextItem() {
      let results = document.getElementById("searchResults");
      let result = results.querySelectorAll(".result");
      if (
        this.currentResult === null ||
        this.currentResult >= result.length - 1
      ) {
        this.currentResult = 0;
        return;
      }
      this.currentResult += 1;
    },
    previousItem() {
      if (this.currentResult === null || this.currentResult === 0) {
        return;
      }
      this.currentResult -= 1;
    },
    highlightResult(index) {
      let results = document.getElementById("searchResults");
      let result = results.querySelectorAll(".result");
      return this.currentResult === index ? true : false;
    },
    searchEnterEvent() {
      let manualColor = this.results.find(color => {
        return color === this.value;
      });
      if (manualColor) {
        console.log(manualColor);
        this.$emit("searchenterevent", manualColor);
        return;
      }

      if (this.currentResult === null) {
        setTimeout(() => {
          this.searchError = "";
        }, 5000);
        this.searchError = "You need to select one of the shown colors";
        this.$emit("searcherrorevent");
        return;
      }

      this.$emit("searchenterevent", this.results[this.currentResult]);
    }
  },
  computed: {
    showSearchResults() {
      return this.selectedColor ? false : true;
    }
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
  border-radius: var(--fourthbase);
}

.input--form {
  width: 100%;
  padding: var(--1base);
  line-height: 150%;
  font-size: var(--2base);
  border-radius: var(--fourthbase);
  border: 1px solid transparent;
  color: var(--grey-800);
  position: relative;
  z-index: 2;
  transition: all 0.2s ease-in;
}

.input--form::placeholder {
  font-size: var(--2base);
  color: var(--grey-600);
}

.button-search {
  grid-column: 2/3;
  grid-row: 2/3;
  position: relative;
  z-index: 3;
  background-color: white;
  border-top-right-radius: var(--fourthbase);
  border-bottom-right-radius: var(--fourthbase);
  border: 1px solid var(--grey-500);
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-search:active {
  transform: scale(1.01);
}

/**/

.results {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 5;
  max-height: 15rem;
  overflow-y: scroll;
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
  margin: var(--thirdbase);
  padding: 0 var(--thirdbase);
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
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: var(--fourthbase);
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
