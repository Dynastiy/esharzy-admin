<template>
  <div>
    <div
      class=""
      id="main--content"
      v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.7)"
      style="width: 100%;"
    >
      <div>
        <div class="d-flex justify-content-between flex-wrap" style="gap: 20px">
          <div>
            <h4 class="text-dark font-weight-bold">Dashboard</h4>
            <p class="small">Analytics of data</p>
          </div>
        </div>
        <div>
            <div class="mt-3">
                <h6 class="text-dark font-weight-bold mb-2">
                    Product Analytics
                </h6>
                <div class="analytics">
                    <div class="pending--bg">
                        <h1 class="font-weight-bold"> {{ analytics.pending_products_total }} </h1>
                        <h6 class="small"> Total Pending products </h6>
                    </div>
                    <div class="rejected--bg">
                        <h1 class="font-weight-bold"> {{ analytics.rejected_products_total }} </h1>
                        <h6 class="small"> Total Rejected products </h6>
                    </div>
                    <div class="approved--bg">
                        <h1 class="font-weight-bold"> {{ analytics.approved_products_total }} </h1>
                        <h6 class="small"> Total Approved products </h6>
                    </div>
                    <div class="total--bg">
                        <h1 class="font-weight-bold"> {{ analytics.products_total }} </h1>
                        <h6 class="small"> Total products </h6>
                    </div>
                </div>
            </div>

            <div class="mt-3">
                <h6 class="text-dark font-weight-bold mb-2">
                    Orders Analytics
                </h6>
                <div class="analytics">
                    <div class="pending--bg">
                        <h1 class="font-weight-bold"> {{ analytics.pending_orders_total }} </h1>
                        <h6 class="small"> Total Pending Orders </h6>
                    </div>
                    <div class="rejected--bg">
                        <h1 class="font-weight-bold"> {{ analytics.canceled_orders_total }} </h1>
                        <h6 class="small"> Total Cancelled orders </h6>
                    </div>
                    <div class="in--progress_bg">
                        <h1 class="font-weight-bold"> {{ analytics.inprogress_orders_total }} </h1>
                        <h6 class="small"> Total In-Progress orders </h6>
                    </div>
                    <div class="total--bg">
                        <h1 class="font-weight-bold"> {{ analytics.delivered_orders_total }} </h1>
                        <h6 class="small"> Total Delivered orders </h6>
                    </div>
                    <div class="completed--bg">
                        <h1 class="font-weight-bold"> {{ analytics.completed_orders_total }} </h1>
                        <h6 class="small"> Total Completed Orders </h6>
                    </div>
                    <div class="total--bg">
                        <h1 class="font-weight-bold"> {{ analytics.orders_total }} </h1>
                        <h6 class="small"> Total Orders </h6>
                    </div>
                    
                </div>
            </div>

            <div class="mt-3">
                <h6 class="text-dark font-weight-bold mb-2">
                    Transactions Analytics
                </h6>
                <div class="analytics">
                    <div class="pending--bg">
                        <h1 class="font-weight-bold"> {{ analytics.pending_payouts_total }} </h1>
                        <h6 class="small"> Total Pending payouts </h6>
                    </div>
                    <div class="rejected--bg">
                        <h1 class="font-weight-bold"> {{ analytics.rejected_payouts_total }} </h1>
                        <h6 class="small"> Total Rejected payouts </h6>
                    </div>
                    <div class="approved--bg">
                        <h1 class="font-weight-bold"> {{ analytics.approved_payouts_total }} </h1>
                        <h6 class="small"> Total Approved payouts </h6>
                    </div>
                    <div class="total--bg">
                        <h1 class="font-weight-bold"> {{ analytics.payouts_total }} </h1>
                        <h6 class="small"> Total payouts </h6>
                    </div>
                    <div class="total--bg">
                        <h1 class="font-weight-bold"> {{ analytics.transactions_total }} </h1>
                        <h6 class="small"> Total transactions </h6>
                    </div>
                </div>
            </div>

            <div class="mt-3">
                <h6 class="text-dark font-weight-bold mb-2">
                    Users Analytics
                </h6>
                <div class="analytics">
                    <div class="pending--bg">
                        <h1 class="font-weight-bold"> {{ analytics.active_users_total }} </h1>
                        <h6 class="small"> Total Active Users </h6>
                    </div>
                    <div class="rejected--bg">
                        <h1 class="font-weight-bold"> {{ analytics.banned_users_total }} </h1>
                        <h6 class="small"> Total Banned Users </h6>
                    </div>
                    <div class="in--progress_bg">
                        <h1 class="font-weight-bold"> {{ analytics.buyers_total }} </h1>
                        <h6 class="small"> Total Buyers </h6>
                    </div>
                    <div class="total--bg">
                        <h1 class="font-weight-bold"> {{ analytics.vendors_total }} </h1>
                        <h6 class="small"> Total Vendors </h6>
                    </div>
                    <div class="completed--bg">
                        <h1 class="font-weight-bold"> {{ analytics.wholesalers_total }} </h1>
                        <h6 class="small"> Total Wholesalers </h6>
                    </div>
                    <div class="total--bg">
                        <h1 class="font-weight-bold"> {{ analytics.retailers_total }} </h1>
                        <h6 class="small"> Total Retailers </h6>
                    </div>
                    <div class="total--bg">
                        <h1 class="font-weight-bold"> {{ analytics.users_total }} </h1>
                        <h6 class="small"> Total Users </h6>
                    </div>
                    
                </div>
            </div>

            <div class="mt-3">
                <h6 class="text-dark font-weight-bold mb-2">
                    Shops Analytics
                </h6>
                <div class="analytics">
                    <div class="pending--bg">
                        <h1 class="font-weight-bold"> {{ analytics.activated_shops_total }} </h1>
                        <h6 class="small"> Total Activated Shops </h6>
                    </div>
                    <div class="rejected--bg">
                        <h1 class="font-weight-bold"> {{ analytics.deactivated_shops_total }} </h1>
                        <h6 class="small"> Total Deactivated Shops </h6>
                    </div>
                    <div class="in--progress_bg">
                        <h1 class="font-weight-bold"> {{ analytics.shops_total }} </h1>
                        <h6 class="small"> Total Shops </h6>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
  <script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions("dashboard", ["getAnalytics"]),
  },
  beforeMount() {
    this.getAnalytics();
  },
  computed: {
    ...mapState("dashboard", ["loading"]),
    ...mapState("dashboard", ["analytics"]),
  },
};
</script>