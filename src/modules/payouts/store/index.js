// import Vue from 'vue';
import http from '@/config/axios'
// import Axios from '@/plugins/axios'
import createPersistedState from 'vuex-persistedstate';


// import "toastify-js/src/toastify.css"
// import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        payouts: [],
        payout: {},
        loading: false
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        allPayouts: state => {
            return state.payouts;
        },
        singleUser: state => {
            return state.user
        },
        singlePayout: state => {
            return state.payout
        },
        loading: state => {
            return state.loading
        }
    },
    mutations: {
        SET_PAYOUTS: (state, data) => {
            state.payouts = data;
        },
        SET_PAYOUT: (state, data) => {
            state.payout = data
        },
        SET_LOADING: (state, data) => {
            state.loading = data;
        },

    },
    actions: {
        // Get Payouts
        getPayouts({ commit }, payload) {
            commit("SET_LOADING", true)
            http().get(`admin/all-payouts?${payload.q}=${payload.value}`)
                .then((res) => {
                    commit("SET_PAYOUTS", res.data)
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("SET_LOADING", false)
                })
        },

        // Get Single Payout
        getPayoutByID({ commit }, id) {
            commit("SET_LOADING", true)
            http().get(`admin/show-payout/${id}`)
                .then((res) => {
                    commit("SET_PAYOUT", res.data.payout)
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
        updatePayoutStatus({ commit, dispatch }, payload) {
            commit("SET_LOADING", true)
            http().post(`/admin/accept-payout/${payload.id}`, payload)
                .then((res) => {
                    dispatch("getPayoutByID", payload.id)
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