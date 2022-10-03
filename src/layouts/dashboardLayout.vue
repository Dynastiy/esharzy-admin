<template>
    <div>
        <div>
            <AppDrawer/>
            <div id="main">
                <AppHeader/>
                <div id="">
                    <router-view/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppDrawer from '@/components/static/appDrawer.vue';
import AppHeader from '@/components/static/appHeader.vue';
export default {
    components: { AppDrawer, AppHeader }
}
</script>