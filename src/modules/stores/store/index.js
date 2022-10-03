// import Vue from 'vue';
import http from '@/config/axios'
// import Axios from '@/plugins/axios'
import createPersistedState from 'vuex-persistedstate';


// import "toastify-js/src/toastify.css"
// import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        stores: [],
        store: {},
        loading: false
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        allStores: state => {
            return state.stores;
        },
        singleStore: state => {
            return state.store
        },
        loading: state => {
            return state.loading
        }
    },
    mutations: {
        SET_STORES: (state, data) => {
            state.stores = data;
        },
        SET_STORE: (state, data) => {
            state.store = data
        },
        SET_LOADING: (state, data) => {
            state.loading = data;
        },

    },
    actions: {
        // Get Users
        getStores({ commit }, payload) {
            commit("SET_LOADING", true)
            http().get(`admin/get-shops?${payload.q}=${payload.value}`)
                .then((res) => {
                    commit("SET_STORES", res.data)
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
        getStoreByID({ commit }, id) {
            commit("SET_LOADING", true)
            http().get(`admin/find-shop/${id}`)
                .then((res) => {
                    commit("SET_STORE", res.data.shop)
                    console.log(res.data.shop);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("SET_LOADING", false)
                })
        },

        // Update Store Status
        updateStoreStatus({ commit, dispatch }, payload) {
            commit("SET_LOADING", true)
            http().post(`admin/edit-shop-status/${payload.id}`, payload)
                .then((res) => {
                    dispatch('getStoreByID', payload.id)
                    return res
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