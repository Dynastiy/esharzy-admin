<template>
    <div>
      <div>
        <div>
          <!-- List -->
          <section class="">
            <div class="filter text-right">
                <select name="" @change="filter" v-model="status" id="">
                    <option value="Filter by" selected disabled>Filter By</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                    <option value="approved">Approved</option>
                    <option value="">View All</option>
                </select>
            </div>
            <div class="mt-3 other--tables">
              <div class="table-responsive">
                <table class="table table-centered table-nowrap mb-0">
                  <thead>
                    <tr>
                        <th scope="col">Beneficiary</th>
                        <th scope="col">Business Registration</th>
                        <th scope="col">Business/Company Type</th>
                        <th scope="col">Date Submitted</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <div class="mt-3" v-if="kycs.length == 0">
                    <el-alert
                      title="No items here"
                      type="error"
                      :closable="false">
                    </el-alert>
                  </div>
                    <tr
                      v-for="item in kycs"
                      :key="item.id"
                    >
                      <!-- <td> <img style="border-radius:50%; width:30px; height:30px; object-fit: cover; object-position: center;" :src=' item.photo == null ? "/no-user.png" : config.imgUrl +item.photo ' alt=""> </td> -->
                      <td class="text-capitalize">{{ item.beneficiary }}</td>
                      <td class="text-capitalize" >
                        <span :class="item.is_registered === 0 ? ' not-registered' : 'registered'">
                            {{ item.is_registered === 0 ? ' not registered' : 'registered'  }}
                        </span>
                      </td>
                      <td> {{ item.company_type }} </td>
                      <td>{{ timeStamp2(item.created_at) }}</td>
                     
                      <td>
                        <span :class="item.status">{{ item.status }}</span>
                      </td>
                      <td class="" style="color:var(--primary-color)" > 
                            <div role="button" @click="goToKYC(item)">
                                <span>View KYCS</span> 
                                <span> &gt; </span>
                            </div>
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import { mapState, mapActions } from 'vuex'
    import config from "@/config/api"
  import { timeStamp2 } from "@/plugins/filter";
  export default {
      data() {
          return {
                config,
                timeStamp2,
                delete_confirm: false,
                status: ""
          };
      },
      methods: {
        ...mapActions("settings", ["getVendorKYCs"]),
        goToKYC(item) {
              this.$router.push({ name: "kyc-details", params: { id: item.id } });
          },
          filter(){
            let payload = {
                q: "status",
                value: this.status,
            }
            this.getVendorKYCs(payload)
          }
      },
      computed: {
          ...mapState("settings", ["requests", "kycs"])
      },
  };
  </script>