// import Vue from 'vue';
import http from '@/config/axios'
// import Axios from '@/plugins/axios'
import createPersistedState from 'vuex-persistedstate';


// import "toastify-js/src/toastify.css"
// import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        orders: [],
        order: {},
        loading: false
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        allOrders: state => {
            return state.orders;
        },
        singleOrder: state => {
            return state.order
        },
        loading: state => {
            return state.loading
        }
    },
    mutations: {
        SET_ORDERS: (state, data) => {
            state.orders = data;
        },
        SET_ORDER: (state, data) => {
            state.order = data
        },
        SET_LOADING: (state, data) => {
            state.loading = data;
        },

    },
    actions: {
        // Get Orders
        getOrders({ commit }, payload) {
            commit("SET_LOADING", true)
            http().get(`admin/all-orders?${payload.q}=${payload.value}`)
                .then((res) => {
                    commit("SET_ORDERS", res)
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("SET_LOADING", false)
                })
        },

        // Get Single Order
        getOrderByID({ commit }, id) {
            commit("SET_LOADING", true)
            http().get(`admin/find-order/${id}`)
                .then((res) => {
                    commit("SET_ORDER", res.data.order)
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("SET_LOADING", false)
                })
        },



        // Change Payout Status
        updateOrderStatus({ commit, dispatch }, payload) {
            commit("SET_LOADING", true)
            http().post(`/admin/update-order/${payload.id}`, payload)
                .then((res) => {
                    dispatch("getOrderByID", payload.id)
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("SET_LOADING", false)
                })
        }

    }
};