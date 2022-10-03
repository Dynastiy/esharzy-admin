<template>
    <div>
      <div class="" id="main--content" v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.7)"
      style="width: 100%">
        <div>
          <div class="d-flex justify-content-between flex-wrap" style="gap: 20px">
            <div>
              <h4 class="text-dark font-weight-bold">Stores</h4>
              <p class="small">
                View all Stores
              </p>
            </div>
          </div>
          <div>
                <DataTable/>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
import DataTable from "../components/dataTable.vue";
  export default {
    data() {
        return {
            delete_confirm: false,
            product_id: ""
        };
    },
    methods: {
        viewProduct(data) {
            this.$router.push({ name: "vendor-product-detail", params: { slug: data.slug } });
        },
    },
    beforeMount(){
        let payload = {
            q: "time",
            value: ""
        }
        this.$store.dispatch("stores/getStores", payload)
    },
    computed: {
        loading(){
            return this.$store.getters["stores/loading"]
        }
    },
    components: { DataTable }
};
  </script>