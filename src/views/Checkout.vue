<template>
  <div id="pwall-container">
    Payment container
    <div id="app"></div>
  </div>
</template>
<script>
export default {
  name: "checkout",
  props: {
    model: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    request_id: null,
    method: null,
    transactionData: null
  }),
  mounted() {
    /* eslint-disable */
    this.transactionData = this.model;

    /**
     * if method and request_id are received them verify transaction with the event payment_wall_process_redirect
     * and listen for the events  payment_wall_payment_ok or payment_wall_payment_ko
     * */
    if (this.$route.query.request_id && this.$route.query.method) {
        //**ON REDIRECT SECTION */
        // currency and amount can be stored at localStorage or anywhere else for correct load on redirect
        if(!localStorage.getItem('currency') || !localStorage.getItem('amount')) {
          alert('the currency should be consistent and amount, should be stored anywhere or passed by notify url');
          //if user get here, the user should not be in this view. REDIRECT because there is nothing to pay yet.
        } else {
          this.transactionData = {
            currency: localStorage.getItem('currency'),
            amount: localStorage.getItem('amount')
          };
          //update dataset on initial script
          let sipayScript = document.getElementById("pwall_script");
          sipayScript.setAttribute('data-url', 'http://localhost:3000/actions/' + this.transactionData.amount);
          sipayScript.setAttribute('data-amount', this.transactionData.amount);
          sipayScript.setAttribute('data-currency', this.transactionData.currency);

          document.dispatchEvent(new Event("payment_wall_load_app"));
          //here is where the front finds out that the transaction was succesfull or not
          document
            .getElementById("app")
            .addEventListener("payment_wall_drawn", function(data) {
              document
                .getElementById("app")
                .addEventListener("payment_wall_payment_ok", ev => {
                  console.log("payment_wall_payment_ok", ev);
                });
              document
                .getElementById("app")
                .addEventListener("payment_wall_payment_ko", ev => {
                  console.log("payment_wall_payment_ko", ev.detail);
                });
              //here we let pwall know that this was a redirect, so it needs to confirm the payment
              document.dispatchEvent(new Event("payment_wall_process_redirect"));
            });
        }
    } else {
      //**NORMAL FUNCTIONALITY*/

      // if transactionData not found (because the page was reloaded) look at localStorage in this case (can use url or cookie or anything)
      // to be able to render the pwall and continue.
      // If amount and currency not found need to redirect.
      if(!this.transactionData){
        this.transactionData = {
          currency: localStorage.getItem('currency') ? localStorage.getItem('currency') : 0,
          amount: localStorage.getItem('amount') ? localStorage.getItem('amount') : 0
        };
      }
      if(this.transactionData.amount == 0 || this.transactionData.currency == 0){
        alert('Error, amount and currency not set. redirect');
      } else {
        //Update dataset
        let sipayScript = document.getElementById("pwall_script");
        sipayScript.setAttribute('data-url', 'http://localhost:3000/actions/' + this.transactionData.amount);
        sipayScript.setAttribute('data-amount', this.transactionData.amount);
        sipayScript.setAttribute('data-currency', this.transactionData.currency);

        // in this case I am using localStorage to preserve the data, you can use your own method.
        localStorage.setItem('currency', this.transactionData.currency);
        localStorage.setItem('amount', this.transactionData.amount);

        document.addEventListener("payment_wall_load", function() {
          document
            .getElementById("app")
            .addEventListener("payment_wall_loaded", ev => {
              console.log('src/views/Checkout.vue', "got - payment_wall_loaded", ev.detail);
            });
        });
        //render pwall
        document.dispatchEvent(new Event("payment_wall_load_app"));
      }
    }

    //this block catch after pwall draw if there is a request_id or reference_id to verify the transaction and redirect .
    document
      .getElementById("app")
      .addEventListener("payment_wall_drawn", () => {
        if (this.$route.query.request_id || this.$route.query.reference_id) {
          document.getElementById("app").dispatchEvent(
            new CustomEvent("payment_wall_process_redirect", {
              detail: {
                request_id:
                  this.$route.query.request_id || this.$route.query.reference_id,
                method: this.$route.query.method,
                error: this.$route.query.error || null
              }
            })
          );
        }
      });
  }
};
</script>
