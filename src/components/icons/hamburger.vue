<template>
  <!-- hamburger icon with animation -->
  <section
    class="hamburger"
    :class="{ open: activeHambuerMenu }"
    @click="$emit('hamburgerevent')"
  >
    <div class="line start"></div>
    <div class="line"></div>
    <div class="line end"></div>
  </section>
</template>

<script>
export default {
  name: "hamburger",
  props: {
    activeHambuerMenu: Boolean
  }
};
</script>

<style scoped>
.hamburger {
  width: var(--7base);
  height: var(--7base);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 0.2s ease-out;
  padding: calc(var(--1base) * 1.15);
}

@media (min-width: 30em) {
  .hamburger {
    width: var(--8base);
    height: var(--8base);
    padding: var(--3base);
  }
}

.hamburger.open {
  transform: rotate(-45deg);
}

.line {
  background-color: var(--grey-800);
  border-radius: 0.2rem;
  width: 100%;
  height: 0.25rem;
}

.start {
  width: 50%;
  transition: transform 0.2s cubic-bezier(0.54, -0.81, 0.57, 0.57);
  transform-origin: right;
}

.open .start {
  transform: rotate(-90deg) translateX(0.15rem);
}

.end {
  width: 50%;
  align-self: flex-end;
  transition: transform 0.2s cubic-bezier(0.54, -0.81, 0.57, 0.57);
  transform-origin: left;
}

.open .end {
  transform: rotate(-90deg) translateX(-0.15rem);
}
</style>
