<template>
  <table class="total-amount">
    <thead class="header">
      <td class="header--headline"><b>Subtotal:</b></td>
    </thead>
    <tbody class="body">
      <tr>
        <td>{{ shoppingCartCalulations.amount }}x T-shirts for 20$ each</td>
        <td>{{ shoppingCartCalulations.price }}$</td>
      </tr>
      <tr :class="[shoppingCartCalulations.freeShipping ? 'crossed-out' : '']">
        <td>Regular Shipping*</td>
        <td>{{ shipping }}$</td>
      </tr>
    </tbody>
    <div class="horizontal-line" />
    <tfoot>
      <tr>
        <td><b>Total:</b></td>
        <td v-if="!shoppingCartCalulations.freeShipping">
          {{ shoppingCartCalulations.price + shipping }}$
        </td>
        <td v-else>{{ shoppingCartCalulations.price }}$</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  //if the basics are being edited, this array contains existing basic information
  props: [],
  name: "componentTemplate",
  data() {
    return {
      shipping: 5
    };
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
    ...mapGetters({
      shoppingCart: "userModule/getShoppingCart",
      shoppingCartCalulations: "userModule/getShoppingCartCalulations"
    })
  },
  mounted() {},
  //same check for route-view keep-alive
  activated() {}
};
</script>

<style scoped>
.total-amount {
  /* Positioning */

  /* Box-model */
  padding: var(--1base) 0;
  /* Typography */

  /* Visual */
  background-color: var(--grey-0);
  /* Misc */
}

.horizontal-line {
  /* Positioning */

  /* Box-model */
  margin: var(--1base) 0;
  width: 115%;
  height: 0.1rem;
  /* Typography */
  background-color: var(--grey-400);
  /* Visual */

  /* Misc */
}
</style>
