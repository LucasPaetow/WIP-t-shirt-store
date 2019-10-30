<template>
  <aside class="modal">
    <div class="modal-background" @click="$emit('backgroundmodalevent')"></div>
    <section class="modal-section">
      <i class="close--modal-section" @click="$emit('closemodalevent')"></i>
      <section class="content--modal-section">
        <slot></slot>
      </section>
    </section>
  </aside>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  //if the basics are being edited, this array contains existing basic information
  props: [],
  name: "componentTemplate",
  data() {
    return {};
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
.modal {
  min-height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 5;
  background-color: transparent;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: var(--padding-main) var(--view-main) var(
      --padding-main
    );
  grid-row-gap: var(--padding-rows);
}

.modal-background {
  grid-column: 1/4;
  grid-row: 1/4;
  position: relative;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-section {
  position: relative;
  z-index: 6;
  grid-column: 2/3;
  grid-row: 2/3;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);
  border-radius: var(--fourthbase);
  background-color: white;
  display: grid;
  grid-row-gap: var(--padding-rows);
  grid-template-columns: var(--halfbase) 1fr var(--halfbase);
  padding: var(--2base);
}

.close--modal-section {
  grid-column: 1/2;
  grid-row: 1/2;
  position: relative;
  width: var(--3base);
  height: var(--3base);
  opacity: 0.5;
  transition: opacity 0.3s;
}

.close--modal-section:hover {
  opacity: 1;
}
.close--modal-section:before,
.close--modal-section:after {
  position: absolute;
  content: " ";
  height: var(--3base);
  left: var(--halfbase);
  width: 2px;
  background-color: #333;
}
.close--modal-section:before {
  transform: rotate(45deg);
}
.close--modal-section:after {
  transform: rotate(-45deg);
}

.content--modal-section {
  grid-column: 2/3;
  grid-row: 2/3;
  display: grid;
  grid-row-gap: var(--padding-rows);
}
</style>
