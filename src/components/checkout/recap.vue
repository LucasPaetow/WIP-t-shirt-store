<template>
  <section
    class="recap"
    :class="[last ? 'last' : '', expanded ? 'expanded' : '']"
    @click="expanded = !expanded"
  >
    <div class="recap--collapsed">
      <h3 class="recap--headline z-index-2">
        {{ headline }}
      </h3>

      <closeIcon
        class="recap--close close-icon z-index-3"
        :activeCloseMenu="expanded"
      />
    </div>
    <pageTransition propTransitionName="fade-delay" propTransitionMode="">
      <div class="recap--expanded" v-if="expanded">
        <slot></slot>
      </div>
    </pageTransition>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import inputField from "@/components/inputs/InputDefault.vue";
import pageTransition from "@/components/transitions/transition.vue";
import closeIcon from "@/components/icons/close.vue";

export default {
  components: {
    inputField,
    buttonSimple,
    pageTransition,
    closeIcon
  },
  //if the basics are being edited, this array contains existing basic information
  props: {
    last: {
      type: Boolean,
      defaul: false
    },
    headline: {
      type: String,
      required: true
    },
    alreadyExpanded: {
      type: Boolean,
      default: false
    }
  },
  name: "checkoutpayment",
  data() {
    return {
      expanded: false,
      prevHeight: 0,
      initalHeight: 0
    };
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = element.getBoundingClientRect().height;
    },
    enter(element, done) {
      const height = element.getBoundingClientRect().height;

      [...element.children].forEach(child => {
        element.style.opacity = 0;
      });

      element.style.height = this.prevHeight + "px";

      this.animate({
        duration: 200,
        timing: function(timeFraction) {
          return timeFraction;
        },
        draw: progress => {
          element.style.height = height * progress + "px";
        }
      });
      done();
      /*requestAnimationFrame(() => {
        element.style.height = height;
    });*/
    },
    afterEnter(element) {
      setTimeout(() => {
        [...element.children].forEach(child => {
          element.style.opacity = 1;
        });
        element.style.height = "auto";
      }, 200);
    },
    animate({ timing, draw, duration }) {
      let start = performance.now();

      return new Promise(function(resolve) {
        requestAnimationFrame(function animate(time) {
          // timeFraction goes from 0 to 1
          let timeFraction = (time - start) / duration;

          if (timeFraction > 1) timeFraction = 1;

          // calculate the current animation state
          let progress = timing(timeFraction);
          draw(progress); // draw it
          timeFraction < 1 ? requestAnimationFrame(animate) : resolve(true);
        });
      });
    },
    timing() {},
    draw(progress) {}
  },
  computed: {
    ...mapGetters({})
  },

  mounted() {
    this.$once("hook:mounted", () => {
      this.expanded = this.alreadyExpanded;
    });

    this.initalHeight = this.$el.getBoundingClientRect().height;
  },

  beforeUpdate() {
    if (this.expanded) {
      this.prevHeight = this.initalHeight;
    } else {
      this.prevHeight = this.$el.getBoundingClientRect().height;
    }
  },

  updated() {
    let height = this.$el.getBoundingClientRect().height;
    //set element height to the previous state
    this.$el.style.height = this.prevHeight + "px";

    //animate heigt from previous to current
    this.animate({
      duration: 200,
      timing: function quad(timeFraction) {
        return Math.pow(timeFraction, 2);
      },
      draw: progress => {
        this.expanded
          ? (this.$el.style.height = height * progress + "px")
          : (this.$el.style.height = height + "px");
      }
    }).then(() => {
      this.$el.style.height = "auto";
    });
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.recap {
  /* Positioning */

  /* Box-model */

  border-bottom: 2px solid var(--grey-600);
  /* Typography */

  /* Visual */

  /* Misc */
}

.recap.last {
  /* Positioning */

  /* Box-model */
  border-bottom: none;
  /* Typography */

  /* Visual */

  /* Misc */
}

.recap--collapsed {
  /* Positioning */
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-auto-flow: column;
  grid-row: min-content;
  position: relative;
  /* Box-model */

  width: 100%;

  /* Typography */

  /* Visual */
  transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  /* Misc */
}

.recap--collapsed::after {
  /* Positioning */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* Box-model */
  content: " ";
  width: 100%;
  height: 100%;

  /* Typography */

  /* Visual */
  background-color: var(--grey-200);
  transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  /* Misc */
  opacity: 0;
}

.recap--collapsed:hover::after,
.expanded .recap--collapsed::after {
  /* Positioning */

  /* Box-model */

  /* Typography */

  /* Visual */

  transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  /* Misc */
  opacity: 1;
}

.recap--headline {
  /* Positioning */
  grid-column: 1/2;
  /* Box-model */
  padding: var(--1base);

  /* Typography */

  /* Visual */

  /* Misc */
}

@media (min-width: 64em) {
  .recap--headline {
    /* Positioning */
    grid-column: 1/2;
    /* Box-model */
    padding: var(--1base);

    /* Typography */
    font-size: var(--2base);
    /* Visual */

    /* Misc */
  }
}

.close-icon {
  /* Positioning */
  grid-column: 2/3;
  justify-self: end;
  align-self: center;
}

.recap--expanded {
  /* Positioning */

  /* Box-model */
  padding: var(--1base);
  /* Typography */

  /* Visual */

  /* Misc */
}
</style>
