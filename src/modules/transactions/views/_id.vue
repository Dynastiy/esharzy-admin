<template>
    <div>
        <div id="main--content" v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.7)"
      style="width: 100%; height:100vh;">
            <div class="bg-white p-4">
                <h4 class="mb-4 font-weight-bold">Transaction Details</h4>

                <div>
                    <div class="left--side">
                        <!-- <h6 class="text-capitalize mb-3"> {{ transaction.details + " from " +  transaction.beneficiary }} </h6> -->
                        <h6 class=""> {{ timeStamp3(transaction.created_at) }} </h6>
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
                                    <th scope="row">Beneficiary</th>
                                    <td class="text-capitalize"> {{ transaction.beneficiary }} </td>
                                </tr>
                                <tr>
                                    <th scope="row">Transaction Details</th>
                                    <td class="text-capitalize"> {{ transaction.details }} </td>
                                </tr>
                                <tr>
                                    <th scope="row"> Reference No </th>
                                    <td> {{ transaction.ref_no }} </td>
                                </tr>
                                <tr>
                                    <th scope="row"> Transaction Type </th>
                                    <td class="text-capitalize"> {{ transaction.transaction_type }} </td>
                                </tr>
                                <tr>
                                    <th scope="row"> Order Id </th>
                                    <td> {{ transaction.order_id || "null" }} </td>
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
            this.$store.dispatch('transactions/getTransactionByID',  id)
    },
    computed:{
        loading(){
            return this.$store.getters['transactions/loading']
        }, 
        transaction(){
            return this.$store.getters["transactions/singleTransaction"]
        }
    }
}
</script>