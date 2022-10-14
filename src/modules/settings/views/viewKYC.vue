<template>
  <div>
    <div>
      <div
        id="main--content"
        v-loading="loading"
        element-loading-background="rgba(255, 255, 255, 0.7)"
        style="width: 100%"
      >
        <div class="mb-3">
            <h4 style="font-weight:600"> {{ user.first_name + "  " + user.last_name }} </h4>
            <div class="mt-3 d-flex align-items-center justify-content-between">
                <div class="update--status">
                    <input type="text" class="text-capitalize" readonly v-model="kyc.status">
                    <div class="divider"></div>
                    <el-popover
                        placement="bottom"
                        width="200"
                        trigger="click"
                        >
                        <div>Content</div>
                        <i class="el-icon-arrow-down" role="button" slot="reference"  style="font-size:20px; font-weight: 600; padding-left: 0.4rem;"></i>
                        
                    </el-popover>
                </div>
                <div>
                    <span class="text-muted small">Submitted on: </span>
                    <span class="small"> {{timeStamp2(kyc.created_at)}} </span>
                </div>
            </div>
        </div>
        <div class="bg-white p-4">
            <div>
                <h5 class="mb-2" style="font-weight:600">Information</h5>
                <table class="table table-striped table-borderless" style="width:600px">
                    <tbody>
                        <tr>
                            <th scope="row">Beneficiary</th>
                            <td class="text-capitalize"> {{ kyc.beneficiary }} </td>
                        </tr>
                        <tr>
                            <th scope="row">Business Registration</th>
                            <td class="text-capitalize"> {{ kyc.is_registered === 0 ? 'Business not registered' : 'Business Registered' }} </td>
                        </tr>
                        <tr>
                            <th scope="row"> Company/Business Type </th>
                            <td> {{ kyc.company_type }} </td>
                        </tr>
                        <tr>
                            <th scope="row"> Email </th>
                            <td class=""> {{ user.email }} </td>
                        </tr>
                        <tr>
                            <th scope="row"> Phone Number </th>
                            <td> {{ user.phone_no }} </td>
                        </tr>
                        <tr>
                            <th scope="row"> Description </th>
                            <td> {{ kyc.business_description }} </td>
                        </tr>
                        <tr v-if="kyc.status !== 'pending' ">
                            <th scope="row"> Comment </th>
                            <td> {{ kyc.admin_comment }} </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>

        </div>

        <div class="bg-white p-4 mt-3">
            <h5 class="mb-2" style="font-weight:600">Documents/Photos</h5>
            <div>
                <div>
                    <label class="text-muted small" for="">Registration Document</label>
                    <div>
                        <div :class="file_extension"></div>
                        <div class="d-flex" style="gap:30px">
                            <a target="_blank" :href='config.imgUrl+kyc.registration_document ' class="small">View Document</a>
                            <a :href='config.imgUrl+kyc.registration_document' class="small" download='Hello'>Download Document</a>
                        </div>
                    </div>
                </div>

                <div class="mt-3">
                    <label class="text-muted small" for="">Business/Company Photos</label>
                    <div class="d-flex" style="gap:30px">
                        <div  v-for="item in photos" :key="item.id" class="business--photo">
                            <a :href='config.imgUrl+item.photo'>
                                <img :src="config.imgUrl+item.photo" alt="">
                            </a>
                            <div class="etxt-center">
                                <a target="_blank" :href='config.imgUrl+item.photo ' class="small">View Photo</a>
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
import { mapState, mapActions } from 'vuex'
import { timeStamp2 } from '@/plugins/filter'
export default {
  data() {
    return {
        id: this.$route.params.id,
        select: '',
        timeStamp2, config
    };
  },
  methods:{
    ...mapActions("settings", ["getKYCByID"])
  },
  beforeMount(){
    this.getKYCByID(this.id)
  },
  computed:{
    ...mapState("settings", ["loading", "kyc"]),
    user(){
        return this.kyc.user
    },
    file_extension(){
        return this.kyc.registration_document.split('.').pop();
    },
    photos(){
        let photos = [
            {
                id: 1,
                photo: this.kyc.photo_one
            },
            {
                id: 2,
                photo: this.kyc.photo_two
            },
            {
                id: 3,
                photo: this.kyc.photo_three
            },
            {
                id: 4,
                photo: this.kyc.photo_four
            }
        ]
        return photos
    }
  }
};
</script>

<style>
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>