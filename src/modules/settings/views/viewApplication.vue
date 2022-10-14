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
                  <div class="update--status" :class="application.status">
                      <input type="text" class="text-capitalize" readonly v-model="application.status">
                      <div class="divider" v-if=' application.status === "pending" '></div>
                      <el-popover
                      v-if=' application.status === "pending" '
                          placement="bottom"
                          width="200"
                          trigger="hover"
                          >
                          <div>
                              <ul class="m-0 kyc--actions">
                                  <li role="button" @click="changeApplicationStatus('approved')">Approve</li>
                                  <li role="button" @click="changeApplicationStatus('rejected')">Decline</li>
                              </ul>
                          </div>
                          <i class="el-icon-arrow-down" role="button" slot="reference"  style="font-size:20px; font-weight: 600; padding-left: 0.4rem;"></i>
                          
                      </el-popover>
                  </div>
                  <div>
                      <span class="text-muted small">Submitted on: </span>
                      <span class="small"> {{timeStamp2(application.created_at)}} </span>
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
                              <td class="text-capitalize"> {{ application.beneficiary }} </td>
                          </tr>
                          <tr>
                              <th scope="row">Business Address</th>
                              <td class="text-capitalize"> {{ application.business_address }} </td>
                          </tr>
                          <tr>
                              <th scope="row">RC/Registration Number </th>
                              <td> {{ application.rc_number || application.registration_number }}  </td>
                          </tr>
                          <tr>
                              <th scope="row"> Tax Identification Number </th>
                              <td class=""> {{ application.tax_number }} </td>
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
                              <th scope="row"> Business Description </th>
                              <td> {{ application.business_description }} </td>
                          </tr>
                          <tr v-if="application.status !== 'pending' ">
                              <th scope="row"> Comment </th>
                              <td> {{ application.admin_comment }} </td>
                          </tr>
                          <tr>
                            <th scope="row">Registration Document</th>
                            <td>
                                <div class="d-flex align-items-center" style="gap:10px">
                                    <div :class="file_extension" style="width:20px; height:20px"></div>
                                    <div class="d-flex" style="gap:30px">
                                        <a target="_blank" :href='config.imgUrl+application.registration_document ' class="small">View Document</a>
                                        <a :href='config.imgUrl+application.registration_document' class="small" download='Hello'>Download Document</a>
                                    </div>
                                </div>
                            </td>
                          </tr>
                          
                      </tbody>
                  </table>
              </div>
  
          </div>

        </div>
      </div>
  
      <!-- Add Comment  -->
      <div v-if="dialogVisible">
          <div class="modal--mask add-comment">
              <div class="modal--content">
                  <div class="text-right">
                      <i class="el-icon-circle-close" style="font-size:25px" role="button" @click="dialogVisible =  !dialogVisible"></i>
                  </div>
                  <div>
  
                  </div>
                  <form action="" @submit.prevent="updateStatus">
                      <div class="mb-3">
                          <label for="" class="small text-muted">Enter Comment</label>
                          <input type="text" required v-model="admin_comment">
                      </div>
                      <div>
                          <button class="py-1 px-3"  :class='status === "Approve" ? "bg-success" : "" '> {{ status }} KYC  </button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
      <!-- End of Add Comment  -->
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
          timeStamp2, config,
          dialogVisible: false, 
          status: "",
          visible: false, 
          admin_comment: "",
          status_update: null
      };
    },
    methods:{
      ...mapActions("settings", ["getApplicationByID", "updateApplicationStatus" ]),
      changeApplicationStatus(value){
          this.dialogVisible = true
          this.visible = !this.visible
          let status_to = value === 'approved' ? "Approve" : "Decline"
          this.status = status_to
          this.status_update = value
      },
      updateStatus(){
          let payload = {
              status: this.status_update,
              admin_comment: this.admin_comment,
              id: this.id
          }
          this.updateApplicationStatus(payload)
          // console.log(payload);
          this.dialogVisible = false
      }
    },
    beforeMount(){
      this.getApplicationByID(this.id)
    },
    computed:{
      ...mapState("settings", ["loading", "application"]),
      user(){
          return this.application.user
      },
      file_extension(){
          return this.application.registration_document.split('.').pop();
      },
    //   photos(){
    //       let photos = [
    //           {
    //               id: 1,
    //               photo: this.kyc.photo_one
    //           },
    //           {
    //               id: 2,
    //               photo: this.kyc.photo_two
    //           },
    //           {
    //               id: 3,
    //               photo: this.kyc.photo_three
    //           },
    //           {
    //               id: 4,
    //               photo: this.kyc.photo_four
    //           }
    //       ]
    //       return photos
    //   }
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