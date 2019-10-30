<template>
  <article class="navbar-minimal" id="nav-minimal">
    <router-link class="navbar-minimal--logo" :to="{ name: 'home' }">
      <logo></logo>
    </router-link>
  </article>
</template>

<script>
import logo from "@/components/icons/logo.vue";

export default {
  components: { logo },
  name: "navbarMinimal",
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>

<style scoped>
.navbar-minimal {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 4rem 1fr;
  grid-auto-flow: column;
}

.navbar-minimal--logo {
  align-self: center;
  justify-self: center;
  grid-column: 2/3;
  height: var(--2base);
}
</style>
