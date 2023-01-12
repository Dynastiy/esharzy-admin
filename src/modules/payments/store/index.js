// import Vue from 'vue';
import http from '@/config/axios'
// import Axios from '@/plugins/axios'
import createPersistedState from 'vuex-persistedstate';


// import "toastify-js/src/toastify.css"
// import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        payments: [],
        payment: {},
        loading: false
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        allPayments: state => {
            return state.payments;
        },
        singleUser: state => {
            return state.user
        },
        singlePayment: state => {
            return state.payment
        },
        loading: state => {
            return state.loading
        }
    },
    mutations: {
        SET_PAYMENTS: (state, data) => {
            state.payments = data;
        },
        SET_PAYMENT: (state, data) => {
            state.payment = data
        },
        SET_LOADING: (state, data) => {
            state.loading = data;
        },

    },
    actions: {
        // Get Users
        getPayments({ commit }, payload) {
            commit("SET_LOADING", true)
            http().get(`admin/get-payments?channel=${payload.channel}`)
                .then((res) => {
                    commit("SET_PAYMENTS", res.data.data)
                    console.log(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("SET_LOADING", false)
                })
        },

        // Get Single User
        getPaymentByID({ commit }, id) {
            commit("SET_LOADING", true)
            http().get(`admin/find-payment/${id}`)
                .then((res) => {
                    commit("SET_PAYMENT", res.data.payment)
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