<template>
  <article class="navbar-full" id="nav-full">
    <router-link class="navbar-full--logo z-index-3" :to="{ name: 'home' }">
      <logo></logo>
    </router-link>
    <a
      class="navbar-full--button z-index-3"
      href="#"
      v-scroll-to="{
        el: `#${idToScrollTo}`,
        duration: 200,
        easing: 'ease-in-out',
        offset: responsiveOffset
      }"
      >Try another color</a
    >

    <router-link :to="{ name: 'cart' }" class="extended--link desktop-only"
      >Cart</router-link
    >
    <router-link
      :to="{ name: 'signup', params: {} }"
      class="extended--link desktop-only"
      >Signup for free shipping</router-link
    >

    <hamburger
      class="navbar-full--hamburger z-index-3 mobile-only"
      :activeHambuerMenu="activeHambuerMenu"
      @hamburgerevent="toggleMenu()"
    />
    <aside
      class="navbar-full--extended z-index-2 mobile-only"
      id="navbar-full--extended"
    >
      <router-link :to="{ name: 'about' }" class="extended--link"
        >FAQ</router-link
      >
      <router-link :to="{ name: 'signup', params: {} }" class="extended--link"
        >Signup for free shipping</router-link
      >
    </aside>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import logo from "@/components/icons/logo.vue";
import hamburger from "@/components/icons/hamburger.vue";

export default {
  components: { buttonSimple, logo, hamburger },
  name: "navbarFull",
  data() {
    return {
      activeHambuerMenu: false,
      idToScrollTo: "search-wrapper-1"
    };
  },
  methods: {
    goTo(locationName) {
      this.$router.push({
        name: locationName
      });
    },
    toggleMenu() {
      this.activeHambuerMenu = !this.activeHambuerMenu;
      let nav = document.getElementById("navbar-full--extended");
      this.activeHambuerMenu
        ? nav.classList.add("active")
        : nav.classList.remove("active");
    },
    closeMenu() {
      this.activeHambuerMenu = false;
      let nav = document.getElementById("navbar-full--extended");
      nav.classList.remove("active");
    }
  },
  computed: {
    ...mapGetters({}),
    responsiveOffset() {
      return -window.innerHeight / 2;
    }
  }
};
</script>

<style scoped>
.navbar-full {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-auto-columns: min-content;
  grid-auto-flow: column;
}

@media (min-width: 45em) {
  .navbar-full {
    grid-column-gap: var(--2base);
  }
}

.navbar-full--logo {
  align-self: center;
  grid-column: 1/2;
}

.navbar-full--button {
  align-self: center;
  justify-self: end;
  grid-column: 2/3;
  font-weight: bold;
  text-decoration: none;
}

.navbar-full--hamburger {
  align-self: center;
  grid-column: 3/4;
}

.navbar-full--extended {
  position: absolute;
  background-color: var(--grey-0);
  min-height: 10vh;
  width: 100%;
  transform: translateY(calc(-100% - var(--7base)));
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.25);
  padding: var(--7base);
  display: flex;
  flex-direction: column;
  text-align: right;
}

@media (min-width: 30em) {
  .navbar {
    transform: translateY(calc(-100% - var(--8base)));
  }
}

.extended--link {
  margin-top: var(--1base);
  white-space: nowrap;
  text-decoration: none;
}

.active {
  transform: translateY(0%);
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.desktop-only {
  display: none;
}

@media (min-width: 45em) {
  .mobile-only {
    display: none;
  }

  .desktop-only {
    display: block;
  }

  .extended--link {
    align-self: center;
    margin-top: 0;
    justify-self: end;
  }
}
</style>
