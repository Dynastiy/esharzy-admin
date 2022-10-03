<template>
  <div>
    <div
      class="users"
      v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.7)"
      style="width: 100%"
    >
      <div id="main--content">
        <div class="bg-white p-4">
          <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="All Users" name="">
            <AllUsers />
          </el-tab-pane>
          <el-tab-pane label="Customers" name="buyer">
            <CustomersPage />
          </el-tab-pane>
          <el-tab-pane label="Vendors" name="vendor">
            <VendorPage />
          </el-tab-pane>
        </el-tabs>

        <div class="table--data">
          <TableData/>
        </div>
        </div>
       
      </div>
    </div>
  </div>
</template>
  
  
  <script>
import CustomersPage from "./customersPage.vue";
import VendorPage from "./vendorPage.vue";
import AllUsers from "./allUsers.vue";
import TableData from "../components/tableData.vue";
export default {
  data() {
    return {
      activeName: "",
    };
  },
  methods: {
    handleClick() {
      let role = this.activeName;
      this.$store.dispatch("users/getUsers", role);
    },
  },
  beforeMount() {
    let role = this.activeName;
    this.$store.dispatch("users/getUsers", role);
  },
  computed: {
    loading() {
      return this.$store.getters["users/loading"];
    },
  },
  components: { CustomersPage, VendorPage, AllUsers, TableData },
};
</script>