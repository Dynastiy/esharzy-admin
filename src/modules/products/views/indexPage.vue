<template>
    <div>
      <div>
        
        <div v-loading="loading"
        element-loading-background="rgba(255, 255, 255, 0.7)" style="width: 100%">
        <div id="main--content">
          <div class="d-flex justify-content-between flex-wrap" style="gap: 20px">
            <div>
              <h4 class="text-dark font-weight-bold">All Products</h4>
              <p class="small">
                All products you have uploaded. You can delete or edit them
              </p>
            </div>
            <!-- <div>
              <router-link to="/add-product" class="text-white">
              <button>
                  Add product
              </button>
              </router-link>
            </div> -->
          </div>
          <!-- List Products-->
          <section class="mt-4 bg-white p-4">
            <h5 class="font-weight-bold"> Product List </h5>
            <div class="mt-4 other--tables">
              <div class="table-responsive">
                <table class="table table-centered table-nowrap mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Product Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Availability</th>
                      <th scope="col">Status</th>
                      <th scope="col">Date Created</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                      <!-- {{ products }} -->
                    <tr
                      v-for="data in products"
                      :key="data.id"
                    >
                      <td class="text-capitalize d-flex align-items-center" style="gap:5px">
                        <span> <img :src='config.imgUrl === "" || config.imgUrl === null ? "/icon.svg" : config.imgUrl+data.app_icon ' 
                          width="40px" height="40px" style="border-radius: 50%; object-position:center; object-fit:cover" alt=""> </span>
                        <span>{{ data.name }}</span>
                      </td>
                      <td>&#8358;{{ data.price }}</td>
                      <td>  <span :class="data.availability"> {{ data.availability }} </span> </td>
                      <td>
                        <span :class="data.status"> {{ data.status }} </span>
                      </td>
                      <td>{{ timeStamp2(data.created_at) }}</td>
                      <td class="d-lg-flex" style="gap:10px">
                          <button @click="viewProduct(data)" class="py-1 px-2 w-auto small bg-success">View More</button>
                          <button @click="deleteProduct(data)" class="py-1 px-2 small w-auto">Delete Product</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <!-- <ConfirmDelete v-show="delete_confirm" @close="close" @done=" deleteThisProduct"/> -->

        </div>
         
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import { timeStamp2 } from "@/plugins/filter";
  import config from "@/config/api"
//   import ConfirmDelete from "../../modals/confirmDelete.vue";
  export default {
      data() {
          return {
              timeStamp2, config,
              delete_confirm: false,
              product_id: ""
          };
      },
      methods: {
          viewProduct(data) {
              this.$router.push({ name: "product-detail", params: { slug: data.slug } });
          },
          close(){
        this.delete_confirm = !this.delete_confirm
        },
        deleteProduct(data){
          this.product_id = data.id
          this.delete_confirm = !this.delete_confirm
          console.log(this.product_id);
        },
        deleteThisProduct(){
          this.$store.dispatch("products/deleteProduct", this.product_id)
          this.close()
        }
      },
      beforeMount() {
          this.$store.dispatch("products/getProducts");
      },
      computed: {
          products() {
              return this.$store.getters["products/allProducts"];
          },
          loading() {
              return this.$store.getters["products/loading"];
          },
      },
  };
  </script>