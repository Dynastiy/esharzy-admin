<template>
  <div>
    <div>
      <div class="side--bar">
        <div>
          <div class="text-center my-5">
              <img src="@/assets/img/logo.svg" width="50%" alt="" />
            </div>
          <ul>

            <li>
              <router-link to="/dashboard">
                <i class="el-icon-menu"></i>
                <span>Dashboard</span>
              </router-link>
            </li>

            <li>
              <router-link to="/products">
                <i class="el-icon-takeaway-box"></i>
                <span>Products</span>
              </router-link>
            </li>
            
           <li>
              <router-link to="/users">
                  <i class="el-icon-user-solid"></i>
                  <span>Users</span>
              </router-link>
           </li>

            <li>
              <router-link to="/orders">
                <i class="el-icon-setting"></i>
                <span>Orders</span>
              </router-link>
            </li>
            
            <li>
              <router-link to="/transactions">
                <i class="el-icon-shopping-bag-1"></i>
                <span>Transactions</span>
              </router-link>
            </li>

            <li>
              <router-link to="/payouts">
                <i class="el-icon-user-solid"></i>
                <span>Payouts</span>
              </router-link>
            </li>

            <li>
              <router-link to="/stores">
                <i class="el-icon-s-shop"></i>
                <span>Stores</span>
              </router-link>
            </li>

           <li>
              <router-link to="/catalog/tags">
                  <i class="el-icon-files"></i>
                  <span>Catalog</span>
              </router-link>
           </li>

           <li>
              <router-link to="/settings">
                  <i class="el-icon-setting"></i>
                  <span>Settings</span>
              </router-link>
           </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>