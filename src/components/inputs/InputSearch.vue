<template>
  <div class="field">
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
      <searchIcon />

      {{ input.label }}</label
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
  props: ["value", "input", "error"]
};
</script>

<style scoped>
.field {
  display: flex;
  flex-flow: column;
  width: 100%;
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
  transform-origin: left bottom;
  transform: translate(0, -1rem) scale(2.5);
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
