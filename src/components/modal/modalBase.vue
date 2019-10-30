<template>
  <section role="dialog" class="modal">
    <aside class="modal__background" @click="$router.back()"></aside>
    <section
      class="modal__content"
      id="modal-content"
      :style="{
        left: `${position[0]}%`,
        top: `${position[1]}%`,
        transform: `translate(-${position[0]}%, -${position[1]}%)`
      }"
    >
      <slot />
    </section>
  </section>
</template>

<script>
export default {
  name: "modal",
  props: {
    focusElement: {
      default: null,
      type: Object
    },
    position: {
      type: Array,
      default: () => [50, 50]
    }
  },
  data() {
    return {
      scrollPosition: 0
    };
  },

  mounted() {
    const close = e => {
      const ESC = 27;
      if (e.keyCode !== ESC) return;
      this.$emit("close");
    };
    // Close the modal when the
    // user presses the ESC key.
    document.addEventListener("keyup", close);
    // Activate the modal when the component is mounted.
    this.activate();
  },
  destroyed() {
    document.removeEventListener("keyup", close);
    this.deactivate();
  },
  methods: {
    activate() {
      // Save the current active element
      // so we can restore it when closing
      // the popup overlay.
      this.previousActiveElement = document.activeElement;

      // Prevent the background to be scrollable.
      this.disableScrolling();
      // Make it impossible to focus elements in
      // the background when using the TAB key.
      this.inert();
      // Focus the first focusable element in the dialog.
      this.focusFirstDescendant();
    },
    async deactivate() {
      this.enableScrolling();
      await this.inert(false);
      this.restoreFocus();
    },
    // Disable scrolling on all devices (including iOS).
    disableScrolling() {
      this.scrollPosition = window.pageYOffset;

      let store = document.getElementById("store");
      store.style.overflowY = "scroll";
      store.style.position = "fixed";
      store.style.top = `-${this.scrollPosition}px`;
      store.style.left = "0";
      store.style.right = "0";
    },
    enableScrolling() {
      let store = document.getElementById("store");
      store.style.overflowY = "";
      store.style.position = "";
      store.style.left = "";
      store.style.right = "";

      window.scrollTo(0, this.scrollPosition);
    },
    // Make all elements except the overlay inert.
    async inert(status = true) {
      await this.$nextTick();
      [...this.$root.$el.children].forEach(child => {
        if (child === this.$el || child.contains(this.$el)) return;
        child.inert = status;
      });
    },
    focusFirstDescendant(element) {
      const focusable = this.$el.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable[0] && focusable[0].focus) focusable[0].focus();
    },
    restoreFocus() {
      const element = this.focusElement || this.previousActiveElement;

      if (element && element.focus) element.focus();
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  width: 100vw;
  height: 100vh;
}

.modal__background {
  /* Positioning */
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* Box-model */
  width: 100vw;
  height: 100vh;
  /* Typography */
  background-color: hsla(0, 0%, 100%, 0.9);
  /* Visual */
}

.modal__content {
  /* Positioning */
  position: absolute;
  /* Box-model */
  /* Visual */
}
</style>
