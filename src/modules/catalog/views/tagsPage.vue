<template>
    <div>
        <div>
            <div>
                <div class="text-right">
                    <button v-if="!add" class="w-auto py-2 px-3" @click="add = !add" style="font-weight: 600">
                        Add Tag
                    </button>
                    <div class="update" v-if="add">
                        <i class="el-icon-close" role="button" @click="add = !add"></i>
                        <input class="mt-2" v-model="payload.name" type="text">
                        <button class="py-2 mt-2" @click="addTag"> Create New Tag </button>
                    </div>
                </div>
                <div class="mt-3 list--tags">
                    <div class="mt-3" v-if="tags.length == 0">
                        <el-alert
                        title="No items here"
                        type="error"
                        :closable="false">
                        </el-alert>
                    </div>
                    <div v-for="item in tags" :key="item.id" class="tag--view">
                        <div class="d-flex align-items-center justify-content-between">
                            <h3> {{ item.name }} </h3>

                            <div class="d-flex align-items-center" style="gap:12px">
                                <i class="el-icon-edit" @click="updateTag(item)" role="button" style="font-size:20px"></i>
                                <i class="el-icon-delete text-danger" @click="deleteTag(item)" role="button" style="font-size:20px"></i>
                            </div>
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
            }
        }
    },
    methods: {
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
        deleteTag(item) {
            this.$store.dispatch('catalogs/deleteTag', item.id)
        },
        addTag(){
            this.$store.dispatch('catalogs/createTag', this.payload)
            this.add = false
        }
    },
    mounted(){
        // this.tags = this.$store.getters['catalogs/allTags']
    },
    computed: {
        tags(){
            return this.$store.getters['catalogs/allTags']
        }
    }
}
</script>