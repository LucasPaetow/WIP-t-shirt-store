<template>
  <div class="option-selection">
    <input-size
      :propSizes="sizes"
      :propValue="size"
      @change="changeSize"
      class="input-size--layout"
    ></input-size>
    <input-amount
      :amount="amount"
      @inputamountevent="changeAmount"
      class="input-amount--layout"
    ></input-amount>
    <p class="promotion" v-if="amount < 3">
      If you buy 3 t-shirts or more, you will get free shipping
    </p>
    <p class="promotion success" v-else>
      Noice! Free shippping for you!
    </p>
    <buttonSimple
      class="option-selection--cta"
      :buttonText="`Add ${amount} to card for ${amount * 20}$`"
      @simplebuttonevent="
        $emit('contentfirstevent', { amount, size, nextStep: 'review' })
      "
    />
  </div>
</template>

<script>
import inputAmount from "@/components/inputs/inputAmount.vue";
import inputSize from "@/components/inputs/inputSize.vue";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";

export default {
  components: {
    inputSize,
    inputAmount,
    buttonSimple
  },
  props: {},
  name: "sizeAmount",
  data() {
    return {
      amount: 1,
      size: "M",
      sizes: ["S", "M", "L", "XL"]
    };
  },

  methods: {
    changeSize(newValue) {
      this.size = newValue;
    },

    changeAmount(mode) {
      if (mode === "decrease") {
        if (this.amount > 1) {
          this.amount -= 1;
          return;
        }
        return;
      }

      this.amount += 1;
    }
  },
  computed: {},

  mounted() {},
  //same check for route-view keep-alive
  activated() {}
};
</script>

<style scoped>
.option-selection {
  /* Positioning */

  display: grid;
  grid-row-gap: 5vh;
  /* Box-model */
  max-width: 30rem;
  /* Typography */

  /* Visual */

  /* Misc */
}

.promotion {
  color: var(--red-700);
}

.promotion.success {
  color: var(--green-700);
}
</style>
