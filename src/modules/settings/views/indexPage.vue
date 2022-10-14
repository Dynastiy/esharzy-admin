<template>
    <div>
        <div id="main--content" v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.7)"
      style="width: 100%">
            <h4 class="mb-2" style="font-weight:700"> Settings</h4>
            <div class="users p-4 bg-white">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="Vendor Type Requests" name="first">
                        <VendorRequests/>
                    </el-tab-pane>
                    <el-tab-pane label="Vendor KYC" name="second">
                        <VerifyVendor/>
                    </el-tab-pane>
                    <el-tab-pane label="Manufacturer Applications" name="third">
                        <ManufacturerApplication/>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
  </template>
  <script>
  import { mapActions, mapState } from 'vuex'
import VendorRequests from '../components/vendorRequests.vue';
import VerifyVendor from '../components/verifyVendor.vue';
import ManufacturerApplication from '../components/manufacturerApplication.vue';
    export default {
    data() {
        return {
            activeName: "first"
        };
    },
    beforeMount(){
        let payload = {
            q: "status",
            value: ""
        }
        this.getVendorRequests(payload), this.getVendorKYCs(payload)
    },
    methods: {
        ...mapActions("settings", ["getVendorRequests", "getVendorKYCs", "getManufacturerApplications"]),
        handleClick(){
            let payload = {
                q: "status",
                value: ""
            }
            if(this.activeName === 'first' ){
                this.getVendorRequests(payload)
            }
            else if(this.activeName === 'second') {
                this.getVendorKYCs(payload)
            }
            else {
                this.getManufacturerApplications(payload)
            }
        }
    },
    components: { VendorRequests, VerifyVendor, ManufacturerApplication },
    computed: {
        ...mapState("settings", ["loading"])
    }
};
  </script>