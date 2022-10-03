<template>
    <div>
        <div>
            <div class="app--header d-flex align-items-center justify-content-between">
                <div class="search--area w-50 d-flex align-items-center" style="gap:5px">
                    <span> <i class="el-icon-search"></i> </span>
                    <input type="text" placeholder="Search bookings">
                </div>

                <!-- <div class="view--admin">
                    <span><i class="el-icon-s-custom"></i></span>
                    <span>Hello, Admin</span>
                </div> -->

                <el-popover
                    placement="bottom"
                    width=""
                    trigger="click">
                    <div class="d-flex align-items-center menu--item" style="gap:5px" role="button" @click="logout">
                        <span> <i class="el-icon-switch-button"></i> </span>
                        <span>Logout</span>
                    </div>
                    <div role="button" class="view--admin" slot="reference">
                        <span><i class="el-icon-s-custom"></i></span>
                        <span>Hello, Admin</span>
                    </div>
                    </el-popover>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        logout(){
            this.$store.dispatch('auth/logout')
        }
    }
}
</script>