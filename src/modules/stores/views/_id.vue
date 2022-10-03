<template>
    <div>
        <div>
            <div id="main--content" v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.7)"
      style="width: 100%">
               <div class="p-4 bg-white">
                <div class="d-flex align-items-center" style="gap:10px">
                    <h3 class="font-weight-bold text-capitalize"> {{ store.name }} </h3>
                    <span :class="store.status"> {{ store.status }} </span>
                </div>

                <hr>

                <!-- Vendor  -->
                <div>
                    <h5 class="my-3" style="font-weight:700">Vendor</h5>
                    <table class="table table-striped table-borderless">
                            <tbody>
                                <tr>
                                    <th scope="row">Name</th>
                                    <td class="text-capitalize"> {{ store.user.first_name + " "  + store.user.last_name }} </td>
                                </tr>
                                <tr>
                                    <th scope="row">Email</th>
                                    <td class=""> {{ store.user.email }} </td>
                                </tr>
                                <tr>
                                    <th scope="row">Type </th>
                                    <td class="text-capitalize"> {{ store.user.type }} </td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="text-right">
                            <button class="w-auto" 
                                @click="updateStoreStatus(store.status === 'activated' ? 'activated' : 'deactivated' )"
                                :class="store.status === 'activated' ? 'bg-success' : '' "> 
                                {{ store.status === 'activated' ? 'Deactivate' : 'Activate' }}
                            </button>
                        </div>
                </div>

                <hr>

                <!-- Products -->
                <div>
                    <h5 class="my-3" style="font-weight:700">Products</h5>
                    <div class="mt-3" v-if="store.products.length == 0">
                        <el-alert
                        title="No items here"
                        type="error"
                        :closable="false">
                        </el-alert>
                    </div>

                    <div>
                        <div>
                            <div v-for="item in store.products" :key="item.id">
                                <div class="d-flex justify-content-between mb-2" >
                                    <div class="d-flex align-items-center" style="gap:20px">
                                        <img class="app--icon" :src="config.imgUrl + item.app_icon" alt="">
                                        <div>
                                            <div class="d-flex" style="gap:10px">
                                                <h5 class="" style="font-weight: bold"> {{ item.name }} </h5>
                                                <router-link class="small" :to='"/product/"+ item.slug'>View Product</router-link>
                                            </div>
                                            <div class="other--images mt-2">
                                                <img :src="config.imgUrl + item.photo_one" alt="">
                                                <img :src="config.imgUrl + item.photo_two" alt="">
                                                <img :src="config.imgUrl + item.photo_three" alt="">
                                                <img :src="config.imgUrl + item.photo_four" alt="">
                                                <img :src="config.imgUrl + item.photo_five" alt="">
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 class="font-weight-bold">  &#8358; {{ item.price.toLocaleString() }} </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
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
    methods: {
        updateStoreStatus(value) {
            let payload = {
                id: this.$route.params.id,
                status: value
            }
            console.log(value);
            this.$store.dispatch('stores/updateStoreStatus', payload)
            
        }
    },
    beforeMount(){
        let id = this.$route.params.id
        this.$store.dispatch("stores/getStoreByID", id)
    },
    computed:{
        store(){
            return this.$store.getters['stores/singleStore']
        },
        loading(){
            return this.$store.getters['stores/loading']
        }
    }
}
</script>