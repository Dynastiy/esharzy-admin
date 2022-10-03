<template>
    <div>
        <div>
            <div class="d-flex" id="main--content" style="gap:30px">
                <div class="w-25 bg-white p-4">
                    <SideBar/>
                </div>
                <div class="w-100 bg-white p-4">
                    <router-view/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from '../components/sideBar.vue';
export default {
    components: { SideBar },
    beforeMount(){
        this.$store.dispatch('catalogs/getTags')
        this.$store.dispatch('catalogs/getCategories')
        this.$store.dispatch('catalogs/getShippingClasses')
    }
}
</script>