<!--transition wrapper-->
<template>
  <!--transition group-->
  <transition-group
    :name="transitionName || propTransitionName"
    :mode="transitionMode || propTransitionMode"
    v-if="propTransitionGroup"
  >
    <slot />
  </transition-group>

  <!--custom transition-->
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    :css="false"
    v-else-if="propTransitionCustom.custom"
  >
    <slot />
  </transition>

  <!--single transition-->
  <transition
    :name="transitionName || propTransitionName"
    :mode="transitionMode || propTransitionMode"
    v-else
  >
    <slot />
  </transition>
</template>

<script>
export default {
  name: "TransitionPage",

  //recieved options
  props: {
    propTransitionName: {
      type: String,
      default: "fade"
    },
    propTransitionMode: {
      type: String,
      default: "out-in"
    },
    propTransitionGroup: {
      type: Boolean,
      default: false
    },
    propTransitionCustom: {
      type: Object,
      default: () => ({
        custom: false,
        animationTarget: null,
        firstStep: null,
        lastStep: null,
        extraTarget: null
      })
    }
  },
  data() {
    return {
      //defaults
      transitionName: null,
      transitionMode: null,
      transitionRect: null,
      customTransiton: {
        transitionRect: null,
        direction: null,
        transitionIn: {
          time: 300,
          cubicBezier: "0.55, 0, 0.1, 1"
        },
        transitionOut: {
          time: 300,
          cubicBezier: "0,0,0.58,1"
        }
      }
    };
  },

  methods: {
    beforeLeave(el) {
      if (!this.customTransiton.transitionRect) {
        console.log("there are no numbers for the first stepp");
        this.customTransiton.transitionRect = el.getBoundingClientRect();
        return;
      }
    },
    leave(el) {},
    afterLeave(el) {},
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transition = `all 0.3s cubic-bezier(0,0,0.58,1)`;

      if (this.propTransitionCustom.extraTarget) {
        let extraTarget = document.getElementById(
          this.propTransitionCustom.extraTarget
        );
        extraTarget.style.opacity = 0;
      }

      let firstStep = document.getElementById(
        this.propTransitionCustom.firstStep
      );
      let lastStep = document.getElementById(
        this.propTransitionCustom.lastStep
      );

      if (firstStep && !lastStep) {
        //forwards direction
        this.customTransiton.direction = "forwards";
        this.customTransiton.transitionRect = firstStep.getBoundingClientRect();
      } else if (!firstStep && lastStep) {
        //backwards direction
        this.customTransiton.direction = "backwards";
        this.customTransiton.transitionRect = lastStep.getBoundingClientRect();
      } else {
        this.customTransiton.transitionRect = el.getBoundingClientRect();
      }
    },
    enter(el) {
      let target = document.getElementById(
        `${this.propTransitionCustom.animationTarget}`
      );

      let first = this.customTransiton.transitionRect;
      let last = el.getBoundingClientRect();
      let deltaW = first.width / last.width;
      let deltaH = first.height / last.height;

      target.animate(
        [{ transform: `scale(${deltaW}, ${deltaH})` }, { transform: "none" }],
        {
          duration: this.customTransiton.transitionIn.time,
          easing: "ease-out"
        }
      );
    },
    afterEnter(el) {
      setTimeout(() => {
        requestAnimationFrame(function() {
          el.style.opacity = 1;
          el.style.transform = "translate(0, 0)";
        });

        el.style.opacity = 1;
        el.style.transform = "translate(0, 0)";

        if (this.propTransitionCustom.extraTarget) {
          let extraTarget = document.getElementById(
            this.propTransitionCustom.extraTarget
          );
          extraTarget.style.transition = `all 0.1s cubic-bezier(0,0,0.58,1)`;
          extraTarget.style.opacity = 1;
          requestAnimationFrame(function() {
            extraTarget.style.opacity = 1;
          });
        }
      }, this.customTransiton.transitionIn.time);
    }
  },

  created() {
    this.$router.beforeEach((to, from, next) => {
      const targetRoute = to.name;
      const fromRoute = from.name;
      if (targetRoute === "store" && fromRoute === "home") {
        this.transitionName = "slide-top";
        next();
      }
      if (targetRoute === "home" && fromRoute === "store") {
        this.transitionName = "slide-bottom";
        next();
      }
      next();
    });
  }
};
</script>

<style scoped>
/* --------fade---------*/
.fade-enter-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  opacity: 1;
}

.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  opacity: 1;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* --------slide---------*/
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active,
.slide-top-enter-active,
.slide-top-leave-active,
.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition-duration: 0.25s;
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(1em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-1em, 0);
}

.slide-top-enter,
.slide-bottom-leave-active {
  opacity: 0;
  transform: translate(0, 2em);
}

.slide-top-leave-active,
.slide-bottom-enter {
  opacity: 0;
  transform: translate(0, -2em);
}

/* --------slide in and out from the same side---------*/
.full-slide-enter-active {
  transition: transform 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}
.full-slide-leave-active {
  transition: transform 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.full-slide-enter, .full-slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translate(0, 100%);
}

/* --------slide in and out from the same side---------*/
.navigation-enter-active {
  transition: transform 0.3s ease;
}
.navigation-leave-active {
  transition: transform 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.navigation-enter, .navigation-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translate(0, -100%);
}

/* --------group transitions---------*/

.list-enter-active,
.list-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(1rem);
}

.list-move {
  transition: transform 0.3s;
}
</style>
