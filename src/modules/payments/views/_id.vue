<template>
    <div>
        <div id="main--content" v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.7)"
      style="width: 100%; height:100vh;">
            <div class="bg-white p-4">
                <h4 class="mb-4 font-weight-bold">Payment Details</h4>

                <div>
                    <div class="left--side">
                        <!-- <h6 class="text-capitalize mb-3"> {{ payment.details + " from " +  payment.beneficiary }} </h6> -->
                        <h6 class=""> {{ timeStamp3(payment.created_at) }} </h6>
                        <hr>
                    </div>

                    <div class="right--side">
                        <div>
                    <div class="left--side">
                       <div class="d-flex" style="gap:40px">
                        <div class="w-100">
                            <table class="table table-striped table-borderless">
                            <tbody>
                                <tr>
                                    <th scope="row">Customer Name</th>
                                    <td class="text-capitalize"> {{ payment.name }} </td>
                                </tr>

                                <tr>
                                    <th scope="row">Channel</th>
                                    <td class="text-capitalize"> {{ payment.channel }} </td>
                                </tr>

                                <tr>
                                    <th scope="row">Amount</th>
                                    <td class="text-capitalize"> {{ payment.amount === null ? "0" : Number(payment.amount) + " " + payment.currency }} </td>
                                </tr>


                                <!-- <tr>
                                    <th scope="row">payment Details</th>
                                    <td class="text-capitalize"> {{ payment.details }} </td>
                                </tr> -->
                                <tr>
                                    <th scope="row"> Reference No </th>
                                    <td> {{ payment.ref_no }} </td>
                                </tr>

                                <tr v-if="payment.channel === 'cryptocurrency'">
                                    <th scope="row"> Wallet Address</th>
                                    <td class="text-capitalize"> {{ payment.wallet_address }} </td>
                                </tr>

                                <tr v-else>
                                    <th scope="row"> Transaction Reference </th>
                                    <td class="text-capitalize"> {{ payment.tx_ref }} </td>
                                </tr>

                                

                                <tr>
                                    <th scope="row"> Order Id </th>
                                    <td> {{ payment.order_id || "null" }} </td>
                                </tr>

                                <tr>
                                    <th scope="row">Status</th>
                                    <td class="text-capitalize"><span :class="payment.status"> {{ payment.status }}</span> </td>
                                </tr>

                                <tr>
                                    <th scope="row">Description</th>
                                    <td class="text-capitalize"> {{ payment.description }} </td>
                                </tr>
                                
                            </tbody>
                            </table>
                        </div>                        
                       </div>
                    </div>
                </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { timeStamp3 } from '@/plugins/filter'
export default {
    data(){
        return {
            timeStamp3
        }
    },
    beforeMount(){
        let id = this.$route.params.id
            this.$store.dispatch('payments/getPaymentByID',  id)
    },
    computed:{
        loading(){
            return this.$store.getters['payments/loading']
        }, 
        payment(){
            return this.$store.getters["payments/singlePayment"]
        }
    }
}
</script>