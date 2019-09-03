<template>
  <div class="field">
    <ul class="results">
      <li
        class="result"
        v-for="result in results"
        @click="$emit('searchresultevent', result)"
      >
        <div class="colored-dot" :style="`background-color: ${result}`"></div>
        <p>{{ result }}</p>
      </li>
    </ul>
    <input
      class="input"
      :class="[error ? 'error' : '']"
      type="text"
      :id="'search' + input.id"
      :placeholder="input.placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('searchfocusevent')"
    />
    <label class="label" :for="'search' + input.id">
      <searchIcon />{{ input.label }}</label
    >
  </div>
</template>

<script>
import searchIcon from "@/components/icons/search.vue";

export default {
  components: {
    searchIcon
  },
  name: "inputField",
  props: ["value", "input", "error", "results"],
  methods: {}
};
</script>

<style scoped>
.field {
  display: flex;
  flex-flow: column-reverse;
  position: relative;
  z-index: 5;
  background-color: white;
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
  display: flex;
  flex-direction: row;
  margin: var(--thirdbase) 0;
}

.result:hover {
  background-color: var(--grey-100);
}

.label,
.input {
  transition: all 0.2s;
  touch-action: manipulation;
}

.input {
  font-size: var(--4base);
  color: var(--grey-900);
  line-height: 125%;
  font-weight: bold;
  border: 1px solid transparent;
  border-bottom: 1px solid var(--grey-500);
  color: var(--grey-800);
  width: 100%;
}

.input:focus {
  outline: 0;
  border-bottom: 1px solid #666;
}

.label {
  width: 8rem;
  font-size: var(--halfbase);
  font-weight: bold;
  color: var(--grey-700);
}

.input:placeholder-shown + .label {
  overflow: hidden;
  transform-origin: left top;
  transform: translate(0, 1rem) scale(2.5);
}

::-webkit-input-placeholder {
  opacity: 0;
  transition: inherit;
}

.input:focus::-webkit-input-placeholder {
  opacity: 1;
}

.input:not(:placeholder-shown) + .label,
.input:focus + .label {
  transform: translate(0, 0) scale(1);
  cursor: pointer;
}
</style>
