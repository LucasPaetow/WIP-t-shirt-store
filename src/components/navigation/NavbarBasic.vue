<template>
  <article class="navbar-basic" id="nav-basic">
    <router-link class="navbar-basic--logo z-index-3" :to="{ name: 'home' }">
      <logo></logo>
    </router-link>
    <a
      class="navbar-basic--button z-index-3"
      @click="chooseColor()"
      href="#"
      v-scroll-to="{
        el: `#${idToScrollTo}`,
        duration: 200,
        easing: 'ease-in-out',
        offset: responsiveOffset
      }"
      >Pick a color</a
    >

    <router-link :to="{ name: 'about' }" class="extended--link desktop-only"
      >FAQ</router-link
    >
    <router-link
      :to="{ name: 'signup', params: {} }"
      class="extended--link desktop-only"
      >Signup for free shipping</router-link
    >

    <hamburger
      class="navbar-basic--hamburger z-index-3 mobile-only"
      :activeHambuerMenu="activeHambuerMenu"
      @hamburgerevent="toggleMenu()"
    />
    <aside
      class="navbar-basic--extended z-index-2 mobile-only"
      id="navbar-basic--extended"
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
  name: "navbarBasic",
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
      let nav = document.getElementById("navbar-basic--extended");
      this.activeHambuerMenu
        ? nav.classList.add("active")
        : nav.classList.remove("active");
    },
    closeMenu() {
      this.activeHambuerMenu = false;
      let nav = document.getElementById("navbar-basic--extended");
      nav.classList.remove("active");
    },
    chooseColor() {
      let search1 = document.getElementById("search-wrapper-1");
      let search2 = document.getElementById("search-wrapper-2");
      let search3 = document.getElementById("search-wrapper-3");

      let searchArray = [search1, search2, search3];
      let closestSearch = false;
      let closestSearchDistance = null;

      searchArray.forEach(search => {
        let searchTop = search.getBoundingClientRect().top;
        let absoluteDistance = Math.abs(searchTop);

        if (closestSearchDistance === null) {
          closestSearchDistance = absoluteDistance;
          closestSearch = search;
          return;
        }

        if (closestSearchDistance > absoluteDistance) {
          closestSearchDistance = absoluteDistance;
          closestSearch = search;
          return;
        }
      });
      this.idToScrollTo = closestSearch.id;
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
.navbar-basic {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-auto-columns: min-content;
  grid-auto-flow: column;
}

@media (min-width: 45em) {
  .navbar-basic {
    grid-column-gap: var(--2base);
  }
}

.navbar-basic--logo {
  align-self: center;
  grid-column: 1/2;
}

.navbar-basic--button {
  align-self: center;
  justify-self: end;
  grid-column: 2/3;
  font-weight: bold;
  text-decoration: none;
}

.navbar-basic--hamburger {
  align-self: center;
  grid-column: 3/4;
}

.navbar-basic--extended {
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
