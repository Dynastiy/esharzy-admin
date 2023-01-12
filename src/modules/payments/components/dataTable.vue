<template>
    <div>
      <div>
        <div>
          <!-- List -->
          <section class="bg-white p-3 mt-3" style="border-radius: 5px">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h6>Payment List</h6>
              </div>
              <div>
                  <el-radio-group v-model="channel" @change="getPayments">
                    <el-radio-button label="">All Payments</el-radio-button>
                      <el-radio-button label="flutterwave">Fiat Payments</el-radio-button>
                      <el-radio-button label="cryptocurrency">Crypto Payments</el-radio-button>
                      <!-- <el-radio-button label="1-month">Monthly</el-radio-button>
                      <el-radio-button label="7-days">Weekly</el-radio-button>
                      <el-radio-button label="today">Daily</el-radio-button> -->
                  </el-radio-group>
              </div>
              
            </div>
            <div class="other--tables">
              <div class="table-responsive">
                <table class="table table-centered table-nowrap mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Reference Number</th>
                      <!-- <th scope="col">Amount</th> -->
                      <th scope="col">Customer Name</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Channel</th>
                      <!-- <th scope="col">Currency</th> -->
                      <th scope="col">Status</th>
                      <th scope="col">Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in payments" :key="item.id">
                      <td class="text-capitalize">
                        {{ item.ref_no }}
                      </td>
                      <!-- <td> <span role="button" @click="goToUser(item)"> {{ item.amount }} </span> </td> -->
                      <td class="text-capitalize">
                        {{ item.name }}
                      </td>
                      <td class="text-capitalize">
                        {{ item.amount === null ? "0" : Number(item.amount) + " " + item.currency }}
                      </td>
                      <td class="text-capitalize">
                        {{ item.channel }}
                      </td>
                      <!-- <td class="text-capitalize">
                        {{ item.currency }}
                      </td> -->
                      <td class="text-capitalize">
                        <span :class="item.status"> {{ item.status }} </span>
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
        channel: ""
      };
    },
    methods: {
    //   goToUser(item) {
    //     this.$router.push({ name: "user-detail", params: { id: item.user.id } });
    //   },
      viewMore(item) {
        this.$router.push({ name: "payment-detail", params: { id: item.id } });
      },
      getPayments() {
        let payload = {
            channel: this.channel,
            name: ""
        }
        console.log(payload);
        this.$store.dispatch("payments/getPayments", payload)
      },
    },
    beforeCreate() {
        let payload = {
            channel: "",
            name: ""
        }
        this.$store.dispatch("payments/getPayments", payload)
    },
    computed: {
      payments() {
        return this.$store.getters["payments/allPayments"];
      },
    },
  };
  </script>