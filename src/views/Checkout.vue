<template>
  <div id="pwall-container" style="display: none">
    Payment container
    <Pwall />
  </div>
</template>

<script>
import Pwall from "@/components/Pwall.vue";
export default {
  name: "checkout",
  components: {
    Pwall
  },
  props: {
    model: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    request_id: null,
    method: null,
    loaded: false
  }),
  mounted() {
    /* eslint-disable */
    /* If method and request_id are received them verify transaction with
     * the event payment_wall_process_redirect
     * and listen for the events  payment_wall_payment_ok or
     * payment_wall_payment_ko
     */
    window.PaymentWall.start();
    if (this.$route.query.request_id && this.$route.query.method) {
      let placeholder = document.getElementById("app");
      window.PaymentWall.listenTo("app", "drawn", function(data) {
        window.PaymentWall.listenTo("app", "payment_ok", ev => {
          alert("Payment Approved");
          console.log("payment_wall_payment_ok", ev);
        });
        window.PaymentWall.listenTo("app", "payment_ko", ev => {
          alert("Payment Denied");
          console.log("payment_wall_payment_ko", ev.detail);
        });
        window.PaymentWall.dispatch("process_redirect", {
          request_id: this.$route.query.request_id,
          method: this.$route.query.method
        });
      });
    } else {
      window.PaymentWall.listenTo(placeholder, "load", function() {
        console.log("payment_wall_load");
        window.PaymentWall.listenTo(placeholder, "loaded", ev => {
          console.log("payment_wall_loaded", ev.detail);
        });
      });
    }
    container.style.display = "";
  }
};
</script>
