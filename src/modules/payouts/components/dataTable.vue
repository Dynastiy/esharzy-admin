<template>
  <div>
    <div>
      <div>
        <!-- List -->
        <section class="bg-white p-4 mt-3">
          <div class="users">
              <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="All Payouts" name="">All Payouts</el-tab-pane>
              <el-tab-pane label="Pending Payouts" name="pending">Pending Payouts</el-tab-pane>
              <el-tab-pane label="Completed Payouts" name="completed">Completed Payouts</el-tab-pane>
              <el-tab-pane label="Rejected Payouts" name="rejected">Rejected Payouts</el-tab-pane>
            </el-tabs>
          </div>
          <div class=" mb-3">
            <div class="d-flex align-items-center justify-content-end">
                <el-radio-group v-model="time_frame" @change="getPayouts">
                    <el-radio-button label="all">All</el-radio-button>
                    <el-radio-button label="1-year">Last Year</el-radio-button>
                    <el-radio-button label="1-month">Monthly</el-radio-button>
                    <el-radio-button label="7-days">Weekly</el-radio-button>
                    <el-radio-button label="today">Daily</el-radio-button>
                </el-radio-group>
            </div>
            
          </div>
          <div class="other--tables">
            <div class="table-responsive">
              <table class="table table-centered table-nowrap mb-0">
                <thead>
                  <tr>
                    <!-- <th scope="col">Reference Number</th> -->
                    <th scope="col">Beneficiary</th>
                    <!-- <th scope="col">Transaction Type</th> -->
                    <th scope="col">Amount</th>
                    <!-- <th scope="col">Type</th> -->
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <div class="mt-3" v-if="payouts.data.length == 0">
                    <el-alert
                      title="No items here"
                      type="error"
                      :closable="false">
                    </el-alert>
                  </div>
                  <tr v-for="item in payouts.data" :key="item.id">
                    <!-- <td class="text-capitalize">
                      {{ item.ref_no }}
                    </td> -->
                    <td> <span role="button" @click="goToUser(item)"> {{ item.beneficiary }} </span> </td>
                    <!-- <td class="text-capitalize">
                      {{ item.transaction_type }}
                    </td> -->
                    <td class="text-capitalize">
                      &#8358;{{ item.amount === null ? "0" : Number(item.amount).toLocaleString() }}
                    </td>
                    <td> <span :class="item.status"> {{ item.status }} </span> </td>
                    <td> {{ timeStamp(item.created_at) }} </td>
                    <td class="" style="color: var(--primary-color)">
                      <div role="button" @click="viewMore(item)">
                        <span>More</span>
                        <span> &gt; </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
  
  
  <script>
import config from "@/config/api";
import { timeStamp } from "@/plugins/filter";
export default {
  data() {
    return {
      config,
      timeStamp,
      delete_confirm: false,
      product_id: "",
      time_frame: "",
      activeName: "",
    };
  },
  methods: {
    goToUser(item) {
      this.$router.push({ name: "user-detail", params: { id: item.user.id } });
    },
    viewMore(item) {
      this.$router.push({ name: "payout-detail", params: { id: item.id } });
    },
    handleClick(){
      let payload = {
        q: "status",
        value: this.activeName,
      };
      this.$store.dispatch("payouts/getPayouts", payload);
    },
    getPayouts() {
      let payload = {
        q: "time",
        value: this.time_frame,
      };
      this.$store.dispatch("payouts/getPayouts", payload);
    },
  },
  beforeCreate() {
    let payload = {
      q: "time",
      value: this.time_frame,
    };
    this.$store.dispatch("payouts/getPayouts", payload);
  },
  computed: {
    payouts() {
      return this.$store.getters["payouts/allPayouts"];
    },
  },
};
</script>