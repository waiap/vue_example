<template>
    <Pwall/>
</template>

<script>
import Pwall from '@/components/Pwall.vue'
export default {
    name: 'checkout',
    components: {
        Pwall
    },
    props: {
        model: {
            type: Object,
            default: null
        }
    },
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