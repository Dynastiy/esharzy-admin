<template>
  <div>
    <div
      class="users"
      v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.7)"
      style="width: 100%"
    >
      <div id="main--content">
        <h4 class="font-weight-bold mb-3">Product Details</h4>
        <div class="bg-white p-4">
          <div class="d-flex align-items-center mb-3" style="gap:10px">
            <h2 class="font-weight-bold text-capitalize"> {{ product.name }} </h2>
            <span :class="product.status"> {{ product.status }} </span>
          </div>
          <el-tabs v-model="activeName">
            <el-tab-pane label="Overview">
              <OverView />
            </el-tab-pane>
            <el-tab-pane label="Description">
              <ProductDescription />
            </el-tab-pane>
            <el-tab-pane label="Media">
              <ProductMedia />
            </el-tab-pane>
            <el-tab-pane label="Reviews and Ratings">
            <ReviewsPage/>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="mt-3" v-if="product.status === 'pending'">
            <div class="d-flex justify-content-end" style="gap:20px">
                <button class="py-2 bg-success w-auto small" @click='approveProduct("approved")'>Approve Product </button>
                <button class="py-2 w-auto small"  @click='rejectProduct("rejected")'> Reject Product </button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
    
    <script>
import OverView from "../components/overView.vue";
import ProductDescription from "../components/productDescription.vue";
import ProductMedia from "../components/productMedia.vue";
import ReviewsPage from "../components/reviewsPage.vue";
export default {
  data() {
    return {
      activeName: "",
    };
  },
  methods: {
    approveProduct(value) {
        let payload = {
            id: this.product.id,
            status: value,
            slug: this.product.slug,
        }
        console.log(payload);
        this.$store.dispatch('products/updateProductStatus', payload)
    },
    rejectProduct(value) {
        let payload = {
            id: this.product.id,
            status: value,
            slug: this.product.slug,
        }
        console.log(payload);
        this.$store.dispatch('products/updateProductStatus', payload)
    }
    //   handleClick() {
    //     let role = this.activeName;
    //     this.$store.dispatch("users/getUsers", role);
    //   },
  },
  beforeMount() {
    let slug = this.$route.params.slug;
    this.$store.dispatch("products/getProductByID", slug);
  },
  computed: {
    loading() {
      return this.$store.getters["products/loading"];
    },
    product(){
        return this.$store.getters['products/singleProduct']
    }
  },
  components: { OverView, ProductDescription, ProductMedia, ReviewsPage },
};
</script>