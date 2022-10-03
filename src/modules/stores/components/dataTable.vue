<template>
  <div>
    <div>
      <div>
        <!-- List -->
        <section class="bg-white p-3 mt-3" style="border-radius: 5px">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h6>Store List</h6>
            </div>
          </div>
          <div class="other--tables">
            <div class="table-responsive">
              <table class="table table-centered table-nowrap mb-0">
                <thead>
                  <tr>
                    <!-- <th scope="col">Reference Number</th> -->
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <!-- <th scope="col">Amount</th> -->
                    <!-- <th scope="col">Type</th>
                    <th scope="col">Status</th> -->
                    <th scope="col">Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <div class="mt-3" v-if="stores.data.length == 0">
                    <el-alert
                      title="No items here"
                      type="error"
                      :closable="false">
                    </el-alert>
                  </div>

                  <tr v-for="item in stores.data" :key="item.id">
                    <td class="text-capitalize">
                      {{ item.name }}
                    </td>
                    <!-- <td> <span role="button" @click="goToUser(item)"> {{ item.beneficiary }} </span> </td> -->
                    <td class="text-capitalize">
                      <span :class="item.status">
                        {{ item.status }}
                      </span>
                    </td>
                    <!-- <td class="text-capitalize">
                      {{ item.amount === null ? "0" : Number(item.amount) }}
                    </td> -->
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
      this.$router.push({ name: "store-detail", params: { id: item.id } });
    },
    getTransactions() {
      let payload = {
        q: "time",
        value: this.time_frame,
      };
      this.$store.dispatch("stores/getStores", payload);
    },
  },
  beforeCreate() {
    let payload = {
      q: "time",
      value: this.time_frame,
    };
    this.$store.dispatch("stores/getStores", payload);
  },
  computed: {
    stores() {
      return this.$store.getters["stores/allStores"];
    },
  },
};
</script>