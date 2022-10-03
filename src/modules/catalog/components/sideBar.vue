<template>
    <div>
        <div>
            <div class="settings--sidebar">
                <ul class="m-0 d-flex flex-column" style="gap:30px"> 
                    <li>
                        <router-link to="/catalog/tags" class="d-flex align-items-center"  style="gap:10px">
                            <i class="el-icon-price-tag"></i>
                            <span>Tags</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/catalog/categories" class="d-flex align-items-center"  style="gap:10px"> 
                                <i class="el-icon-takeaway-box"></i>
                            <span>Categories</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/catalog/shipping" class="d-flex align-items-center"  style="gap:10px">
                            <i class="el-icon-ship"></i>
                            <span>Shipping</span>
                        </router-link>
                    </li>
                    
                </ul>
            </div>
        </div>
    </div>
</template>