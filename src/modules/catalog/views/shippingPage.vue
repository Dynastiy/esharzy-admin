<template>
    <div>
        <div>
            <div>
                <div class="text-right">
                    <button v-if="!add" class="w-auto py-2 px-3" @click="add = !add" style="font-weight: 600">
                        Add Shipping Class
                    </button>
                    <div class="update" v-if="add">
                        <i class="el-icon-close" role="button" @click="add = !add"></i>
                        <input class="mt-2" v-model="payload.name" type="text" placeholder="Enter Shipping Class Name">
                        <button class="py-2 mt-2" @click="createShippingClass"> Create New Shipping Class </button>
                    </div>
                </div>
                <div class="mt-3">
                    <div class="mt-3" v-if="shipping_classes.length == 0">
                        <el-alert
                        title="No items here"
                        type="error"
                        :closable="false">
                        </el-alert>
                    </div>
                    <div v-for="item in shipping_classes" :key="item.id" class="tag--view mb-3">
                        <div class="d-flex align-items-center justify-content-between" role="button" @click="viewShippingZones(item)">
                            <h3> {{ item.name }} </h3>
                            <div class="d-flex align-items-center" style="gap:12px">
                                <i class="el-icon-delete text-danger" @click="deleteShippingClass(item)" role="button" style="font-size:20px"></i>
                            </div>
                        </div>


                       
                        <div class="view--shipping_zones mt-3 tag--view" v-if="view === item.id">
                            <div class="text-right">
                                <button v-if="!addZone" class="w-auto py-2 px-3" @click="addZone = !addZone" style="font-weight: 600">
                                    Add Shipping Zone
                                </button>
                                <div class="update" v-if="addZone">
                                    <i class="el-icon-close" role="button" @click="addZone = !addZone"></i>
                                    <input class="mt-2" v-model="dataObj.name" type="text" placeholder="Enter Shipping Zone Name">
                                    <input class="mt-2" v-model="dataObj.price" type="number" placeholder="Enter Shipping Zone Price">
                                    <button class="py-2 mt-2" @click="createShippingZone(item)"> Create New Shipping Zone</button>
                                </div>
                            </div>

                            <div class="mt-3" v-if="item.shipping_zones.length == 0">
                                <el-alert
                                title="No items here"
                                type="error"
                                :closable="false">
                                </el-alert>
                            </div>
                            <table class="table table-striped table-borderless mt-3">
                                <tbody>
                                    <tr v-for="item in item.shipping_zones" :key="item.id">
                                        <th scope="row">Name</th>
                                        <td> {{ item.name }} </td>

                                        <th scope="row">Price</th>
                                        <td> &#8358;{{ item.price.toLocaleString() }} </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>


                        <div class="update" v-if="edit === item.id">
                            <input class="mt-2" v-model="tag_name" type="text">
                            <button class="py-1 mt-2" @click="editTag(item)"> Update</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tag_name: '',
            edit: false,
            add: false, 
            payload:{
                name: ''
            },
            dataObj: {
                name: '', 
                price: '',
            },
            view: false,
            addZone: false
        }
    },
    methods: {
        viewShippingZones(item) {
            this.view = this.view === item.id ? null : item.id;
        },
        editTag(item){
            let payload = {
                name: this.tag_name,
                id: item.id
            }
            this.$store.dispatch('catalogs/editTag', payload)
            this.edit = this.edit === item.id ? null : item.id;
        },
        updateTag(item){
            this.edit = this.edit === item.id ? null : item.id;
        },
        deleteShippingClass(item) {
            this.$store.dispatch('catalogs/deleteShippingClass', item.id)
        },
        createShippingClass(){
            this.$store.dispatch('catalogs/createShippingClass', this.payload)
            this.add = false
            this.payload = {}
        },
        createShippingZone(item){
            let payload = {
                shipping_class_id: item.id,
                name: this.dataObj.name,
                price: this.dataObj.price
            }
            this.$store.dispatch('catalogs/createShippingZone', payload)
            this.addZone = false
            this.dataObj = {}
        }
    },
    mounted(){
        // this.tags = this.$store.getters['catalogs/allTags']
    },
    computed: {
        tags(){
            return this.$store.getters['catalogs/allTags']
        },
        shipping_classes(){
            return this.$store.getters['catalogs/allShippingClasses']
        }
    }
}
</script>