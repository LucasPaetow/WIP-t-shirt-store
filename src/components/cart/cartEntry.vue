<template>
  <section class="cart-entry" v-if="entry" id="cart-entry">
    <pageTransition
      :propTransitionCustom="{
        custom: true,
        animationTarget: 'cart-entry',
        firstStep: 'entry-first',
        lastStep: 'entry-last',
        transformOrigin: 'top center'
      }"
    >
      <entryFirst
        v-if="!editEntry"
        :entry="entry"
        id="entry-first"
        @entryfirstdeleteevent="deleteEntry"
        @entryfirsteditevent="editEntry = !editEntry"
      />
      <entryLast
        v-else
        :entry="entry"
        id="entry-last"
        @entrylastevent="entryEdited"
      />
    </pageTransition>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import pageTransition from "@/components/transitions/transition.vue";
import modalBase from "@/components/modal/modalBase.vue";
import entryFirst from "@/components/cart/cartEntryFirst.vue";
import entryLast from "@/components/cart/cartEntryLast.vue";
export default {
  components: {
    pageTransition,
    modalBase,
    entryFirst,
    entryLast
  },
  //if the basics are being edited, this array contains existing basic information
  props: {
    entry: {
      type: Object,
      required: true
    },
    index: Number
  },
  name: "cartEntry",
  data() {
    return {
      editEntry: false
    };
  },
  methods: {
    //navigation
    goTo(locationName) {
      this.$router.push({
        name: locationName
      });
    },
    deleteEntry() {
      this.$store.dispatch(
        "userModule/PRODUCT_deleteFromShoppingCart",
        this.index
      );
    },
    entryEdited(product) {
      this.$store
        .dispatch("userModule/PRODUCT_editShoppingCart", {
          index: this.index,
          product: {
            amount: product.amount,
            size: product.size,
            color: this.entry.color,
            timestamp: Date.now()
          }
        })
        .then(() => {
          this.editEntry = !this.editEntry;
        });
    }
  },
  computed: {
    ...mapGetters({
      supportData: "productModule/getSupport"
    })
  },
  mounted() {
    console.log("entry: " + this.entry);
  },
  //same check for route-view keep-alive
  activated() {}
};
</script>

<style scoped>
.cart-entry {
  /* Positioning */
  display: grid;
  /* Box-model */
  width: 100%;
  /* Typography */

  /* Visual */
  background-color: var(--grey-300);
  /* Misc */
}

/* Positioning */

/* Box-model */

/* Typography */

/* Visual */

/* Misc */
</style>
