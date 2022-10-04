import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/modules/auth/store/index'
import products from '@/modules/products/store/index'
import users from '@/modules/users/store/index'
import transactions from '@/modules/transactions/store/index'
import payouts from '@/modules/payouts/store/index'
import orders from '@/modules/orders/store/index'
import stores from '@/modules/stores/store/index'
import catalogs from '@/modules/catalog/store/index'
import dashboard from '@/modules/dashboard/store/index'

Vue.use(Vuex)

import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        products,
        users,
        transactions,
        payouts,
        orders,
        stores,
        catalogs,
        dashboard
    }
})