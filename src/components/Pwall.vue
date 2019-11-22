<template>
  <div>
    <div id="app"></div>
    <table id="result" class="table table-dark" style="display: none">
      <tr>
        <td>Tarjeta</td>
        <td id="masked_card"></td>
      </tr>
      <tr>
        <td>Ticket</td>
        <td id="order"></td>
      </tr>
      <tr>
        <td>Banco</td>
        <td id="authorizator"></td>
      </tr>
      <tr>
        <td>Moneda</td>
        <td id="currency"></td>
      </tr>
      <tr>
        <td>ID Interno</td>
        <td id="transaction_id"></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Pwall",
  mounted() {
    let vm = this;
    document.dispatchEvent(new Event("payment_wall_load_app"));
    // THIS IS REQUIRED for all integrations.
    // This makes all redirect-based methods to finish its operation
    document
      .getElementById("app")
      .addEventListener("payment_wall_drawn", function() {
        if (vm.$route.query.request_id || vm.$route.query.reference_id) {
          document.getElementById("app").dispatchEvent(
            new CustomEvent("payment_wall_process_redirect", {
              detail: {
                request_id:
                  vm.$route.query.request_id || vm.$route.query.reference_id,
                method: vm.$route.query.method,
                error: vm.$route.query.error || null
              }
            })
          );
        }
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
