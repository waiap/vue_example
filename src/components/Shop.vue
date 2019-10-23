<template>
  <div class="shop">
    <Integration
      v-if="!checkout"
      :amount="amount"
      :currency="currency"
      @checkout="checkout = !checkout"
      @amount="e => amount = e"
      @currency="e => currency = e"
    />
    <Pwall v-else/>
  </div>
</template>

<script>
import Pwall from '@/components/Pwall.vue'
import Integration from '@/components/Integration.vue'
export default {
  name: 'Shop',
  components: {
    Pwall,
    Integration
  },
  data:() => ({
      currency: '',
      amount: 1,
      checkout: false
  }),
  mounted() {
      document.addEventListener('payment_wall_load', function(){
          document.getElementById('app').addEventListener("payment_wall_loaded", function(){
            // This is NOT required by normal integrations.
            // This enables real-time (ajax-like) on-screen rendering of the
            // operation results.
            document.getElementById('app').addEventListener(
              'payment_wall_payment_ok',
              function(ev) {
                  document.getElementById('result').style.display = "block";
                  document.getElementById('masked_card').innerHTML = ev.detail.payload.masked_card;
                  document.getElementById('order').innerHTML = ev.detail.payload.order;
                  document.getElementById('authorizator').innerHTML = ev.detail.payload.authorizator;
                  document.getElementById('transaction_id').innerHTML = ev.detail.payload.transaction_id;
                  document.getElementById('currency').innerHTML = ev.detail.payload.currency;
              });
            });
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
