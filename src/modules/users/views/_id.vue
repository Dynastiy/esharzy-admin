<template>
    <div>
        <div id="main--content" v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.7)"
      style="width: 100%; height:100vh;">
            <div class="mb-3">
                <h4 class="font-weight-bold">User Details</h4>
            </div>
            <div class="bg-white p-4">
                <div class="top d-flex justify-content-between">
                    <div class="d-flex align-items-center" style="gap:20px">
                        <i class="el-icon-back" role="button" @click="$router.go(-1)"></i>
                        <img class="shadow-lg" style="border-radius:50%; width:40px; height:40px; object-fit: cover; object-position: center;" :src=' user.photo == null ? "/no-user.png" : config.imgUrl +user.photo ' alt=""> 
                        <h5 style="font-weight:600" class="text-capitalize"> {{ user.first_name + " " + user.last_name }} </h5>
                    </div>
                    <div class="d-flex align-items-center" style="gap:20px">
                        <span class="text-secondary" style="font-size:12px">
                            {{ "Joined on " + timeStamp(user.created_at) }}
                        </span>
                        <span :class="user.status"> {{ user.status }} </span>
                    </div>
                </div>
                <hr>

                <div class="user--data d-flex" style="gap:40px">
                    <div class="">
                        <div>
                            <h6 class="text-uppercase text-secondary mb-2" style="font-size:12px">profile photo</h6>
                            <img class="" style="border-radius:20px; width: 100px; height:100px; object-fit: cover; 
                            object-position: center;" :src=' user.photo == null ? "/no-user.png" : config.imgUrl +user.photo ' alt=""> 
                        </div>
                        <div class="mt-3">
                            <h6 class="text-uppercase text-secondary mb-2" style="font-size:12px">COVER photo</h6>
                            <img class="" style="border-radius:20px; width: 100px; height:100px; object-fit: cover; 
                            object-position: center;" :src=' user.photo == null ? "/no-user.png" : config.imgUrl +user.cover_photo ' alt=""> 
                        </div>
                    </div>

                    <div class="w-100">
                        <div class="">
                            <h6 class="text-uppercase text-secondary mb-2" style="font-size:12px">personal details</h6>
                           <div class="user--info">
                            <h6 class="" style="font-size:10px"> First Name </h6>
                            <h6 class="font-weight-bold small text-capitalize mt-1"> {{ user.first_name }}  </h6>
                           </div>
                           <div class="user--info">
                            <h6 class="" style="font-size:10px"> Last Name </h6>
                            <h6 class="font-weight-bold small text-capitalize mt-1"> {{ user.last_name }}  </h6>
                           </div>
                           <div class="user--info">
                            <h6 class="" style="font-size:10px"> Email Address </h6>
                            <h6 class="font-weight-bold small"> {{ user.email }}  </h6>
                           </div>
                           <div class="user--info">
                            <h6 class="" style="font-size:10px"> Date of Birth </h6>
                            <h6 class="font-weight-bold small"> {{ user.dob === null ? "null" : user.dob  }}  </h6>
                           </div>
                           <div class="user--info">
                            <h6 class="" style="font-size:10px"> Address </h6>
                            <h6 class="font-weight-bold small"> {{ user.address === null ? "null" : user.dob  }}  </h6>
                           </div>
                        </div>
                    </div>

                    <div class="w-100">
                        <div class="">
                            <h6 class="text-uppercase text-secondary mb-2" style="font-size:12px">other data</h6>
                           <div class="user--info">
                            <h6 class="" style="font-size:10px"> Phone Number </h6>
                            <h6 class="font-weight-bold small text-capitalize mt-1"> {{ user.phone_no }}  </h6>
                           </div>
                           <div class="user--info">
                            <h6 class="" style="font-size:10px"> Country </h6>
                            <h6 class="font-weight-bold small text-capitalize mt-1"> {{ user.country }}  </h6>
                           </div>
                           <div class="user--info">
                            <h6 class="" style="font-size:10px"> Role </h6>
                            <h6 class="font-weight-bold small text-capitalize mt-1"> {{ user.role }}  </h6>
                           </div>
                           <div class="user--info" v-if="user.role !== 'buyer' ">
                            <h6 class="" style="font-size:10px" > Type </h6>
                            <h6 class="font-weight-bold small text-capitalize mt-1"> {{ user.type  }}  </h6>
                           </div>
                           <div class="user--info" v-if="user.role !== 'buyer' ">
                            <h6 class="" style="font-size:10px" > Is Vendor a Manufacturer? </h6>
                            <h6 class="font-weight-bold small text-capitalize mt-1"> {{ user.is_manufacturer  }}  </h6>
                           </div>
                        </div>
                    </div>
                </div>

                <div class="actions mt-4 d-flex align-items-center justify-content-end" style="gap:20px">
                    <button class="w-auto"  
                    @click="updateUserStatus(user.status === 'active'? 'banned' : 'active')" >
                        {{ user.status === 'active' ? 'Ban' : 'Activate' }}</button>
                    <button class="w-auto bg-warning"  
                    @click="updateUserRole(user.role === 'buyer'? 'vendor' : 'buyer')" >
                        Make {{ user.role === 'buyer' ? 'Vendor' : 'Buyer' }}</button>
                    <button class="w-auto bg-info" v-if="user.role !== 'buyer' "  
                    @click="updateUserType(user.type === 'retailer'? 'wholesaler' : 'retailer')" >
                        Make {{ user.type === 'retailer' ? 'Wholesaler' : 'Retailer' }}</button>
                </div>
                <!-- {{ user }} -->
            </div>
        </div>
    </div>
</template>


<script>
    import config from '@/config/api'
    import { timeStamp } from '@/plugins/filter'
export default {
    data(){
        return {
            timeStamp,
            config
        }
    },
    methods: {
        updateUserType(value) {
            console.log(value);
            let payload = {
                id: this.$route.params.id,
                type: value
            }
            this.$store.dispatch('users/editUserType', payload)
        },
        updateUserRole(value) {
            console.log(value);
            let payload = {
                id: this.$route.params.id,
                role: value
            }
            this.$store.dispatch('users/editUserRole', payload)
        },
        updateUserStatus(value) {
            console.log(value);
            let payload = {
                id: this.$route.params.id,
                status: value
            }
            this.$store.dispatch('users/editUserStatus', payload)
        }
    },
    beforeMount(){
        let id = this.$route.params.id
        this.$store.dispatch("users/getUserByID", id)
    },
    computed:{
        loading(){
            return this.$store.getters["users/loading"]
        },
        user(){
            return this.$store.getters["users/singleUser"]
        }
    }
}
</script>