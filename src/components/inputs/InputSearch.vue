<template>
  <form @submit.prevent class="form">
    <label class="label--form" :for="input.id" v-if="input.label">
      {{ input.label }}
    </label>
    <span class="input-wrapper input--shadow">
      <input
        class="input--form"
        :class="[error ? 'error' : '']"
        :placeholder="input.placeholder"
        :id="'search' + input.id"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @focus="$emit('searchfocusevent')"
    /></span>

    <button class="button-search" @click="$emit('searchevent')">
      <search-icon />
    </button>
    <p v-if="error" class="error--form">{{ error }}</p>
  </form>
</template>

<script>
import searchIcon from "@/components/icons/search.vue";

export default {
  components: { searchIcon },
  name: "inputField",
  props: ["value", "input", "error"]
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
}

.input--form {
  width: 100%;
  padding: var(--1base);
  line-height: 150%;
  font-size: var(--2base);
  border-radius: var(--fourthbase);
  border: 1px solid var(--grey-500);
  color: var(--grey-800);
  position: relative;
  z-index: 2;
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

.error {
  border: 1px solid var(--red-700);
}

.error--form {
  color: var(--red-700);
  padding: var(--fourthbase) var(--fourthbase) 0 var(--fourthbase);
  grid-row: 3/4;
  grid-column: 1/3;
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
