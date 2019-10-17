<!--transition wrapper-->
<template>
  <!--transition group-->
  <transition-group
    :name="transitionName"
    :mode="transitionMode"
    v-if="propTransitionGroup"
  >
    <slot />
  </transition-group>
  <!--single transition-->
  <transition :name="transitionName" :mode="transitionMode" v-else>
    <slot />
  </transition>
</template>

<script>
export default {
  name: "TransitionPage",

  //recieved options
  props: ["propTransitionName", "propTransitionMode", "propTransitionGroup"],
  data() {
    return {
      //defaults
      transitionName: "fade",
      transitionMode: "out-in"
    };
  },

  created() {
    if (this.propTransitionName) {
      this.transitionName = this.propTransitionName;
    }
    if (this.propTransitionMode) {
      this.transitionMode = this.propTransitionMode;
    }
    if (this.propTransitionGroup) {
      this.transitionMode = null;
    }
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
      if (targetRoute === "sizeOptions" && fromRoute === "store") {
        this.transitionName = "full-slide";
        next();
      }
      if (targetRoute === "store" && fromRoute === "sizeOptions") {
        this.transitionName = "full-slide";
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
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-leave-active {
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
  position: absolute;
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
  transition: all 0.3s ease;
}
.navigation-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.navigation-enter, .navigation-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-100%);
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
