<template>
    <div>
        <div>
            <div class="" id="main--content">
                <!-- <h5 class="mb-3">Order Details</h5> -->
               <div class="p-4 bg-white">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h3 class="my-2 d-flex align-items-center " style="gap:10px; font-weight:700">Order ID: <span class="text-uppercase">{{ createRef(order.id) }}</span> 
                            <span :class="order.status"> {{ order.status }} </span> </h3>
                            <h6> <span>Order Date:</span> {{ timeStamp2(order.created_at) }}  </h6>
                        </div>


                        <h3 style="font-weight:700">&#8358; {{ order.total_amount.toLocaleString() }}</h3>
                    </div>
                    <hr>
                    <div class="products">
                        <h4 class="text-secondary font-weight-bold mb-3">Products</h4>
                        <div v-for="product in products" :key="product.id">
                            <div class="d-flex align-items-center" style="gap:20px"> 
                                <div>
                                    <img class="productID_img" :src='config.imgUrl + product.app_icon' alt="">
                                </div>
                                <div>
                                    <h5> {{ product.name }} </h5>
                                    <h6> <span>Quantity:</span> <span> {{ product.pivot.quantity }} </span> </h6>
                                    <router-link class="small" :to='"/product/"+ product.slug'>View Product</router-link>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>

                    <hr>

                    <div class="delivery">
                        <h4 class="text-secondary font-weight-bold mb-2">Delivery Address</h4>
                        <div class="d-flex flex-column" style="gap:5px">
                            <h6> {{ order.delivery_address }} </h6>
                            <h6> {{ order.city }} </h6>
                            <h6> {{ order.country }} </h6>
                        </div>
                    </div>

                    <hr>
                    
                    <div class="order--summary">
                        <h4 class="text-secondary font-weight-bold mb-2">Order Summary</h4>
                        <div class="d-flex flex-column" style="gap:5px">
                            <h6> <span class="text-secondary">Total Amount:</span> &#8358;{{ order.total_amount.toLocaleString() }} </h6>
                            <h6> <span class="text-secondary">Total Quantity:</span> {{ order.total_quantity}} </h6>
                        </div>
                    </div>

                    <hr>
                    <div class="d-flex justify-content-end" style="gap:20px">
                        <button class="bg-success w-auto" v-if='order.status === "pending" ' @click="updateOrder('in-progress')">Accept Order</button>
                        <button class="w-auto" v-if='order.status === "pending" ' @click="updateOrder('canceled')">Reject Order</button>
                        <button class="bg-success w-auto" v-if="order.status === 'in-progress'  " @click="updateOrder('completed')">Complete Order</button>
                        <button class="bg-info w-auto" v-if='order.status === "completed" ' @click="updateOrder('delivered')">Deliver Order</button>
                    </div>
               </div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '@/config/api'
    import { createRef, timeStamp2 } from '@/plugins/filter'
export default {
    data(){
        return {
            config,
            createRef, timeStamp2
        }
    },
    methods:{
        updateOrder(value) {
            let payload = {
                id: this.$route.params.id,
                status: value
            }
            this.$store.dispatch('orders/updateOrderStatus', payload)
            // console.log(value);
        }
    },
    beforeMount(){
        let id = this.$route.params.id
        this.$store.dispatch('orders/getOrderByID', id)
    },
    computed:{
        order(){
            return this.$store.getters['orders/singleOrder']
        },
        products() {
            return this.$store.getters['orders/singleOrder'].products
        }
    }
}
</script>