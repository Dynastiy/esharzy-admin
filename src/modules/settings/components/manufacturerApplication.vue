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
                        <th scope="col">Business Name</th>
                        <th scope="col">RC/Registration Number</th>
                        <th scope="col">Tax Identification Number</th>
                        <th scope="col">Date Submitted</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <div class="mt-3" v-if="applications.length == 0">
                    <el-alert
                      title="No items here"
                      type="error"
                      :closable="false">
                    </el-alert>
                  </div>
                    <tr
                      v-for="item in applications"
                      :key="item.id"
                    >
                      <!-- <td> <img style="border-radius:50%; width:30px; height:30px; object-fit: cover; object-position: center;" :src=' item.photo == null ? "/no-user.png" : config.imgUrl +item.photo ' alt=""> </td> -->
                      <td class="text-capitalize">{{ item.beneficiary }}</td>
                      <td class="text-capitalize">
                        {{ item.business_name  }}
                      </td>
                      <td> {{ item.rc_number || item.registration_number }} </td>
                      
                      <td> {{ item.tax_number }} </td>
                      <td>{{ timeStamp2(item.created_at) }}</td>
                      <td>
                        <span :class="item.status">{{ item.status }}</span>
                      </td>
                      
                      <td class="" style="color:var(--primary-color)" > 
                            <div role="button" @click="goToApplication(item)">
                                <span>View</span> 
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
        ...mapActions("settings", ["updateRequestStatus", "getManufacturerApplications"]),
        goToApplication(item) {
              this.$router.push({ name: "application-details", params: { id: item.id } });
          },
          filter(){
            let payload = {
                q: "status",
                value: this.status,
            }
            this.getManufacturerApplications(payload)
          }
      },
      computed: {
          ...mapState("settings", ["requests", "kycs", "applications"])
      },
  };
  </script>