<template>
    <div id="pwall-container" style="display: none">
        Payment container
        <Pwall/>
    </div>
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
    data: () => ({
        request_id: null,
        method: null,
        loaded: false
    }),
    mounted() {
        /* eslint-disable */
        /**
         * if method and request_id are received them verify transaction with the event payment_wall_process_redirect
         * and listen for the events  payment_wall_payment_ok or payment_wall_payment_ko
         * */
        if(this.$route.query.request_id && this.$route.query.method) {
            document.getElementById('app').addEventListener("payment_wall_drawn", function(data) {
                document.getElementById('app').addEventListener('payment_wall_payment_ok', ev => {
                    alert('Payment Approved');
                    console.log('payment_wall_payment_ok', ev);
                });
                document.getElementById('app').addEventListener('payment_wall_payment_ko', ev => {
                    alert('Payment Denied');
                    console.log('payment_wall_payment_ko', ev.detail);
                });
                document.dispatchEvent(new Event('payment_wall_process_redirect'));
            });
        } else {
            document.addEventListener('payment_wall_load', function(){
                console.log('payment_wall_load');
                document.getElementById('app').addEventListener("payment_wall_loaded", ev => {
                    console.log('payment_wall_loaded',ev.detail);
                });
            });
        }
        var container = document.getElementById('pwall-container');
        container.style.display = '';
    }
}
</script>