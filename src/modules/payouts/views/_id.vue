<template>
    <div>
        <div id="main--content" v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.7)"
      style="width: 100%; height:100vh;">
            <div class="bg-white p-4">
                <h4 class="mb-4 font-weight-bold">Payout Details</h4>

                <div>
                    <div class="left--side">
                        <h6 class=""> {{ timeStamp3(payout.created_at) }} </h6>
                        <hr>

                       <div class="d-flex" style="gap:40px">
                        <div class="w-100">
                            <table class="table table-striped table-borderless">
                            <tbody>
                                <tr>
                                    <th scope="row">Charge</th>
                                    <td> {{ payout.charge }} </td>
                                </tr>
                                <tr>
                                    <th scope="row">Amount</th>
                                    <td> &#8358;{{ payout.amount.toLocaleString() }} </td>
                                </tr>
                                <tr>
                                    <th scope="row">Beneficiary</th>
                                    <td> {{ payout.beneficiary }} </td>
                                </tr>
                                <tr>
                                    <th scope="row">Status</th>
                                    <td class="d-flex align-items-center" style="gap:20px"> 
                                        <span :class="payout.status">{{ payout.status }}</span>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                        </div>

                        <div class="w-100">
                            <h6 class="mb-3 font-weight-bold">Bank Details</h6>
                            <div class="" v-if="bank_details === null">
                                <el-alert
                                title="No Bank Details  registered"
                                type="error"
                                :closable="false">
                                </el-alert>
                            </div>
                        <table class="table table-striped table-borderless">
                            <tbody>
                                <tr>
                                    <th scope="row">Bank Name</th>
                                    <td> {{ bank_details.bank_name }} </td>
                                </tr>
                                <tr>
                                    <th scope="row">Account Name</th>
                                    <td> {{ bank_details.account_name }} </td>
                                </tr>
                                <tr>
                                    <th scope="row">Account Number</th>
                                    <td class="d-flex align-items-center" style="gap:10px"> {{ bank_details.account_no }} 
                                        <span role="button" @click="copyAccountNumber"> <i class="el-icon-copy-document"></i> 
                                        </span> 
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                        </div>
                       </div>

                       <hr v-if='payout.status === "pending" '>
                       <div  v-if='payout.status === "pending" ' class="d-flex justify-content-end" style="gap:20px">
                            <button class="py-2 bg-success w-auto" @click="updatePayoutStatus('completed')">Accept Payout</button>
                            <button class="py-2 w-auto" @click="updatePayoutStatus('rejected')">Reject Payout</button>
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
    methods: {
        updatePayoutStatus(value){
            let payload = {
                id: this.$route.params.id,
                status: value
            }
            console.log(payload);
            this.$store.dispatch('payouts/updatePayoutStatus',  payload)
        },
        copyAccountNumber() {
            navigator.clipboard.writeText(this.bank_details.account_no).then(
                (success) => {
                (this.action = "copied!"), console.log(success);
                },
                (err) => console.log("error", err)
            );
        },
    },
    beforeMount(){
        let id = this.$route.params.id
        this.$store.dispatch('payouts/getPayoutByID',  id)
    },
    computed:{
        loading(){
            return this.$store.getters['payouts/loading']
        }, 
        payout(){
            return this.$store.getters["payouts/singlePayout"]
        },
        bank_details(){
            return this.$store.getters["payouts/singlePayout"].user.bank_details
        }
    }
}
</script>