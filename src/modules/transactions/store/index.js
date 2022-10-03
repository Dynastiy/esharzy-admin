// import Vue from 'vue';
import http from '@/config/axios'
// import Axios from '@/plugins/axios'
import createPersistedState from 'vuex-persistedstate';


// import "toastify-js/src/toastify.css"
// import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        transactions: [],
        transaction: {},
        loading: false
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        allTransactions: state => {
            return state.transactions;
        },
        singleUser: state => {
            return state.user
        },
        singleTransaction: state => {
            return state.transaction
        },
        loading: state => {
            return state.loading
        }
    },
    mutations: {
        SET_TRANSACTIONS: (state, data) => {
            state.transactions = data;
        },
        SET_TRANSACTION: (state, data) => {
            state.transaction = data
        },
        SET_LOADING: (state, data) => {
            state.loading = data;
        },

    },
    actions: {
        // Get Users
        getTransactions({ commit }, payload) {
            commit("SET_LOADING", true)
            http().get(`admin/all-transactions?${payload.q}=${payload.value}`)
                .then((res) => {
                    commit("SET_TRANSACTIONS", res.data)
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("SET_LOADING", false)
                })
        },

        // Get Single User
        getTransactionByID({ commit }, id) {
            commit("SET_LOADING", true)
            http().get(`admin/show-transaction/${id}`)
                .then((res) => {
                    commit("SET_TRANSACTION", res.data.transaction)
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