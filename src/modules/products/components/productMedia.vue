<template>
    <div>
        <div>
            <div>
                <div class="mt-3">
                    <div class="d-flex align-items-center" style="gap:30px">
                        <div class="video w-100">
                            <video controls :src='config.imgUrl + product.video' style="width:100%; height: 330px;"></video>
                        </div>

                        <div class="images row w-1000">
                           <img :src='config.imgUrl + product.app_icon' alt="" class="col-4 mb-4">
                           <img :src='config.imgUrl + product.photo_one' alt="" class="col-4 mb-4">
                           <img :src='config.imgUrl + product.photo_two' alt="" class="col-4 mb-4">
                           <img :src='config.imgUrl + product.photo_three' alt="" class="col-4 mb-4">
                           <img :src='config.imgUrl + product.photo_four' alt="" class="col-4 mb-4">
                           <img :src='config.imgUrl + product.photo_five' alt="" class="col-4 mb-4">
                        </div>
                    </div>
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
           config
        }
    },
    computed: {
        product(){
            return this.$store.getters['products/singleProduct']
        }
    }
}
</script>