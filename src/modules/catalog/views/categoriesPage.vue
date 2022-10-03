<template>
    <div>
        <div>
            <div>
                <div class="text-right">
                    <button v-if="!add" class="w-auto py-2 px-3" @click="add = !add" style="font-weight: 600">
                        Create Category
                    </button>
                    <div class="update" v-if="add">
                        <i class="el-icon-close" role="button" @click="add = !add"></i>
                        <input type="file" @change="appIcon($event)">
                        <input class="mt-2" v-model="dataObj.category_name" type="text">
                        <button class="py-2 mt-2" @click="addCategory"> Create New Category </button>
                    </div>
                </div>
                <div class="mt-4">
                    <div class="mt-3" v-if="categories.length == 0">
                        <el-alert
                        title="No items here"
                        type="error"
                        :closable="false">
                        </el-alert>
                    </div>

                    <el-collapse accordion>
                        <el-collapse-item :name="index+1" v-for="(item, index) in categories" :key="index">
                            <template slot="title">
                               <div class="d-flex align-items-center" style="gap:40px">
                                    <div class="d-flex align-items-center" style="gap:10px"> 
                                        <img :src="config.imgUrl + item.icon_image" 
                                        style="height:25px; width: 25px; border-radius: 50%; object-fit: cover; object-position: center;"  alt="">
                                        <h6 class="text-capitalize">{{ item.category_name }}</h6>
                                    </div>
                                    <div class="d-flex align-items-center" style="gap:12px">
                                        <!-- <i class="el-icon-edit" @click="updateSubCategory(item)" role="button" style="font-size:20px"></i> -->
                                        <i class="el-icon-delete text-danger" @click="deleteCategory(item)" role="button" style="font-size:20px"></i>
                                    </div>
                               </div>
                            </template>
                            <div>
                                <div class="text-right">
                                    <button v-if="!addSub" class="w-auto py-2 px-3" @click="addSub = !addSub" style="font-weight: 600">
                                        Create Sub Category
                                    </button>
                                    <div class="update" v-if="addSub">
                                        <i class="el-icon-close" role="button" @click="addSub = !addSub"></i>
                                        <input type="file" @change="appImage($event)">
                                        <input class="mt-2" v-model="payload.name" type="text">
                                        <button class="py-2 mt-2" @click="addSubCategory(item)"> Create New Sub Category </button>
                                    </div>
                                </div>

                                <div class="mt-3" v-if="item.sub_categories.length == 0">
                                    <el-alert
                                    title="No items here"
                                    type="error"
                                    :closable="false">
                                    </el-alert>
                                </div>
                               
                                <div class="list--sub_categories mt-3">
                                    <div v-for="item in item.sub_categories" :key="item.id" class="tag--view">
                                        <div class="d-flex align-items-center justify-content-between">
                                           <div class="d-flex align-items-center" style="gap:10px">
                                            <img :src="config.imgUrl + item.icon_image" 
                                            style="height:25px; width: 25px; border-radius: 50%; object-fit: cover; 
                                            object-position: center;"  alt="">
                                            <h3> {{ item.sub_category_name }} </h3>
                                           </div>

                                            <div class="d-flex align-items-center" style="gap:12px">
                                                <i class="el-icon-edit" @click="updateSubCategory(item)" role="button" style="font-size:20px"></i>
                                                <i class="el-icon-delete text-danger" @click="deletSubCategory(item)" role="button" style="font-size:20px"></i>
                                            </div>
                                        </div>

                                        <div class="update mt-3" v-if="edit === item.id">
                                            <input type="file" @change="appImage($event)">
                                            <input class="mt-2" v-model="newObj.subcategory_name" type="text">
                                            <button class="py-1 mt-2" @click="editSubCategory(item)"> Update</button>
                                        </div>
                                
                                    </div>
                                </div>
                            </div>
                            
                        </el-collapse-item>
                    </el-collapse>
                        <!-- <div v-for="item in categories" :key="item.id" class="tag--view">
                            <div class="d-flex align-items-center justify-content-between">
                                <h3> {{ item.category_name }} </h3>

                                <div class="d-flex align-items-center" style="gap:12px">
                                    <i class="el-icon-edit" @click="updateTag(item)" role="button" style="font-size:20px"></i>
                                    <i class="el-icon-delete text-danger" role="button" style="font-size:20px"></i>
                                </div>
                            </div>


                            <div class="update" v-if="edit === item.id">
                                <input class="mt-2" v-model="tag_name" type="text">
                                <button class="py-1 mt-2" @click="editTag(item)"> Update</button>
                            </div>
                            
                        </div> -->
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
            config,
            dataObj:{
                category_name: '',
                icon_image: null
            },
            newObj:{
                subcategory_name: '',
            },
            
            edit: false,
            add: false, 
            addSub: false,
            payload:{
                name: null,
                icon_image: null
            }
        }
    },
    methods: {
        appIcon() {
            var input = event.target;
            this.dataObj.icon_image = input.files[0];
            console.log(this.dataObj.icon_image);
        },

        appImage(){
            var input = event.target;
            this.payload.icon_image = input.files[0];
            console.log(this.payload.icon_image);
        },

        editSubCategory(item){
            var payload = new FormData()
            payload.append("icon_image", this.payload.icon_image || config.imgUrl+item.icon_image )
            payload.append("sub_category_name", this.newObj.subcategory_name || item.sub_category_name )
            let dataObj = {
                id: item.id,
                payload: payload
            }
            this.$store.dispatch('catalogs/editSubCategory', dataObj)
            this.edit = this.edit === item.id ? null : item.id;
        },

        deletSubCategory(item){
            this.$store.dispatch('catalogs/deleteSubCategory', item.id)
        },

        deleteCategory(item){
            this.$store.dispatch('catalogs/deleteCategory', item.id)
        },

        updateSubCategory(item){
            this.edit = this.edit === item.id ? null : item.id;
        },

        addCategory(){
            let payload = new FormData()
            payload.append("icon_image", this.dataObj.icon_image)
            payload.append("category_name", this.dataObj.category_name)
            this.$store.dispatch('catalogs/createCategory', payload)
            this.add = false
        },

        addSubCategory(item){
            let payload = new FormData()
            payload.append("icon_image", this.payload.icon_image)
            payload.append("sub_category_name", this.payload.name)
            payload.append("category_id", item.id)
            this.$store.dispatch('catalogs/createSubCategory', payload)
            this.addSub = false
        },

        
    },
    mounted(){
        // this.tags = this.$store.getters['catalogs/allTags']
    },
    computed: {
        categories(){
            return this.$store.getters['catalogs/allCategories']
        }
    }
}
</script>