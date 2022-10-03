<template>
    <div>
        <div>
            <div>
                <div class="mt-3">
                    <div class="d-flex" style="gap:40px">
                        <div class="w-100">
                            <table class="table table-striped table-borderless">
                            <tbody>
                                <!-- {{ product }} -->
                                <tr>
                                    <th scope="row">Price </th>
                                    <td> &#8358; {{ product.price.toLocaleString() }} </td>
                                </tr>
                                <tr>
                                    <th scope="row">Average Rating </th>
                                    <td>{{ product.avg_ratings }} </td>
                                </tr>
                                <tr>
                                    <th scope="row">Shop </th>
                                    <td class="text-capitalize"> {{ product.shop.name }} </td>
                                </tr>
                                <tr>
                                    <th scope="row">Discount</th>
                                    <td class="d-flex" style="gap:20px"> &#8358; {{ product.discount !== null ? product.discount.price.toLocaleString() : "0" }} <span class="cancelled">{{ product.discount !== null ? (product.discount.percentage + "% OFF") : "0%"}}</span> </td>
                                </tr>
                                <tr>
                                    <th scope="row">Categories</th>
                                    <td class="d-flex align-items-center" style="gap:20px"> 
                                        {{ categories }}
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row">Sub-Categories</th>
                                    <td class="d-flex align-items-center" style="gap:20px"> 
                                        {{ subCategories }}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Tags</th>
                                    <td class="d-flex align-items-center text-capitalize" style="gap:20px"> 
                                        {{ tags }}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Views</th>
                                    <td class="d-flex align-items-center text-capitalize" style="gap:20px"> 
                                        {{ product.views }}
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                        </div>

                        <div class="w-100">
                            <h6 class="mb-3 font-weight-bold">Shipping Details</h6>
                            <hr>
                            <div class="" v-if="shippingClass.shipping_zones === null">
                                <el-alert
                                title="No shipping zones added"
                                type="error"
                                :closable="false">
                                </el-alert>
                            </div>
                        <table class="table table-striped table-borderless">
                            <tbody>
                                <!-- {{ shippingClass }} -->
                                <h6 class="mb-3"><span>Shipping Class:</span> {{ shippingClass.name }} </h6>
                                <tr v-for="item in shippingClass.shipping_zones" :key="item.id">
                                    <th scope="row" style="width:150px">{{ item.name }}</th>
                                    <td>&#8358; {{ item.price.toLocaleString() }} </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                       </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '@/config/api'
export default {
    data(){
        return {
           config
        }
    },
    computed: {
        product(){
            return this.$store.getters['products/singleProduct']
        },
        shippingClass(){
            return this.product.shipping_class
        },
        categories(){
      if(this.product.categories.length > 0){
        var val = this.product.categories;
      let i 
      for(i = 0; i < val.length; i++) {
        var data = val[i].category_name
        var result = [];
        result.push(data)
      }
      var product_categories = result.join(",")
      return product_categories
      }
      else {
        return "This product has no category"
      }
    },

    tags(){
      if(this.product.tags.length > 0){
        var val = this.product.tags;
      let i 
      for(i = 0; i < val.length; i++) {
        var data = val[i].name
        var result = [];
        result.push(data)
      }
      var product_tags = result.join(",")
      return product_tags
      }
      else {
        return "This product has no tag"
      }
    },
    subCategories(){
      if(this.product.sub_categories.length > 0){
        var val = this.product.sub_categories;
      let i 
      for(i = 0; i < val.length; i++) {
        var data = val[i].name
        var result = [];
        result.push(data)
      }
      var product_tags = result.join(",")
      return product_tags
      }
      else {
        return "This product has no sub category"
      }
    },
    }
}
</script>