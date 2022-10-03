<template>
  <div>
    <div>
      <div>
        <!-- List -->
        <section class="bg-white p-3 mt-3" style="border-radius: 5px">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h6>Transaction List</h6>
            </div>
            <div>
                <el-radio-group v-model="time_frame" @change="getTransactions">
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
                    <th scope="col">Reference Number</th>
                    <th scope="col">Beneficiary</th>
                    <th scope="col">Transaction Type</th>
                    <th scope="col">Amount</th>
                    <!-- <th scope="col">Type</th>
                    <th scope="col">Status</th> -->
                    <th scope="col">Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in transactions.data" :key="item.id">
                    <td class="text-capitalize">
                      {{ item.ref_no }}
                    </td>
                    <td> <span role="button" @click="goToUser(item)"> {{ item.beneficiary }} </span> </td>
                    <td class="text-capitalize">
                      {{ item.transaction_type }}
                    </td>
                    <td class="text-capitalize">
                      {{ item.amount === null ? "0" : Number(item.amount) }}
                    </td>
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
      time_frame: ""
    };
  },
  methods: {
    goToUser(item) {
      this.$router.push({ name: "user-detail", params: { id: item.user.id } });
    },
    viewMore(item) {
      this.$router.push({ name: "transaction-detail", params: { id: item.id } });
    },
    getTransactions() {
      let payload = {
        q: "time",
        value: this.time_frame,
      };
      this.$store.dispatch("transactions/getTransactions", payload);
    },
  },
  beforeCreate() {
    let payload = {
      q: "time",
      value: this.time_frame,
    };
    this.$store.dispatch("transactions/getTransactions", payload);
  },
  computed: {
    transactions() {
      return this.$store.getters["transactions/allTransactions"];
    },
  },
};
</script>