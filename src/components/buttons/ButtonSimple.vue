<template>
  <button
    v-if="error"
    class="button button-error"
    @click="$emit('simplebuttonevent')"
  >
    error
  </button>
  <button
    v-else
    class="button"
    :class="[
      !secondary && !tertiary ? 'primary' : '',
      secondary ? 'secondary' : '',
      tertiary ? 'tertiary' : ''
    ]"
    @click="$emit('simplebuttonevent')"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  name: "buttonSimple",
  props: ["buttonText", "error", "secondary", "tertiary"]
};
</script>

<style scoped>
/*layout*/

.primary {
  color: white;
  background-color: var(--grey-800);
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);
}

.secondary {
  color: var(--grey-800);
  background-color: var(--grey-300);
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);
}

.tertiary {
  color: var(--grey-800);
  background-color: transparent;
}

.button-error {
  color: white;
  background-color: var(--red-700);
}

.button {
  width: 100%;
  min-width: 8rem;
  height: 100%;
  padding: var(--halfbase) var(--1base);
  margin: var(--halfbase) 0;
  border-radius: var(--fourthbase);
  position: relative;
  cursor: pointer;
  font-size: var(--halfbase);
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
}

.button::before {
  content: " ";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 500ms;
  border-radius: var(--thirdbase);
}

.button:hover::before {
  opacity: 1;
}

.button,
.button:focus {
  outline: none;
  outline-style: none;
  border: none;
}

.button:active {
  transform: translateY(0.1rem);
}
</style>
