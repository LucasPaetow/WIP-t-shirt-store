<template>
  <button class="button-close" @click="$emit('closebuttonevent')"></button>
</template>

<style scoped>
/*layout*/

.button-close,
.button-close:focus {
  outline: none;
  outline-style: none;
  border: none;
}

.button-close {
  color: var(--grey-600);
  background-color: transparent;
  border: 0.1rem solid var(--grey-600);
  border-radius: 50%;
  position: absolute;
  width: 3rem;
  height: 3rem;
  opacity: 0.6;
}
.button-close:hover {
  opacity: 1;
}
.button-close:before,
.button-close:after {
  position: absolute;
  left: 47%;
  top: 13%;
  content: " ";
  height: 2rem;
  width: 0.1rem;
  background-color: var(--grey-600);
}
.button-close:before {
  transform: rotate(45deg);
}
.button-close:after {
  transform: rotate(-45deg);
}

.button-close:active {
  transform: translateY(0.1rem);
}
</style>
