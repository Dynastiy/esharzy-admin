<template>
  <div>
    <div>
      <div>
        <!-- List -->
        <section class="bg-white p-3 mt-3" style="border-radius: 5px">
          <div class="users">
              <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="All Orders" name=""></el-tab-pane>
              <el-tab-pane label="Pending Orders" name="pending"></el-tab-pane>
              <el-tab-pane label="In Progress Orders" name="in-progress"></el-tab-pane>
              <el-tab-pane label="Completed Orders" name="completed"></el-tab-pane>
              <el-tab-pane label="Cancelled Orders" name="canceled"></el-tab-pane>
              <el-tab-pane label="Delivered Orders" name="delivered"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="d-flex align-items-center justify-content-end mb-3">
            <div>
                <el-radio-group v-model="time_frame" @change="getOrders">
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
                    <th scope="col">Date</th>
                    <!-- <th scope="col">Transaction Type</th> -->
                    <th scope="col">Order ID</th>
                    <!-- <th scope="col">Type</th> -->
                    <th scope="col">User Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- {{ orders.data }} -->
                  <div class="mt-3" v-if="orders.data.length == 0">
                    <el-alert
                      title="No items here"
                      type="error"
                      :closable="false">
                    </el-alert>
                  </div>
                  <tr v-for="item in orders.data" :key="item.id">
                    <td> <span role="button" @click="goToUser(item)"> {{ timeStamp(item.created_at) }} </span> </td>
                    <td class="text-uppercase"> {{ createRef(item.id) }} </td>
                    <td class="text-capitalize">
                      {{ item.user.first_name + " " + item.user.last_name }}
                    </td>
                    <td> <span :class="item.status"> {{ item.status }} </span> </td>
                    <td> {{ item.total_quantity || "0" }} </td>
                    <td> &#8358;{{ item.total_amount.toLocaleString() }} </td>
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
import { timeStamp, createRef  } from "@/plugins/filter";
export default {
  data() {
    return {
      config,
      timeStamp, createRef,
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
      this.$router.push({ name: "order-detail", params: { id: item.id } });
    },
    handleClick(){
      let payload = {
        q: "status",
        value: this.activeName,
      };
      this.$store.dispatch("orders/getOrders", payload);
    },
    getOrders() {
      let payload = {
        q: "time",
        value: this.time_frame,
      };
      this.$store.dispatch("orders/getOrders", payload);
    },
  },
  beforeCreate() {
    let payload = {
      q: "time",
      value: this.time_frame,
    };
    this.$store.dispatch("orders/getOrders", payload);
  },
  computed: {
    orders() {
      return this.$store.getters["orders/allOrders"];
    },
  },
};
</script>