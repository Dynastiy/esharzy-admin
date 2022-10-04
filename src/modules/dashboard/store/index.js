// import Vue from 'vue';
import http from '@/config/axios'
// import Axios from '@/plugins/axios'
import createPersistedState from 'vuex-persistedstate';


// import "toastify-js/src/toastify.css"
// import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        analytics: null,
        loading: false
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        analytics: state => {
            return state.analytics;
        },
        loading: state => {
            return state.loading;
        },
    },
    mutations: {
        SET_ANALYTICS: (state, data) => {
            state.analytics = data;
        },
        SET_LOADING: (state, data) => {
            state.loading = data;
        },

    },
    actions: {
        // Get Orders
        getAnalytics({ commit }) {
            commit("SET_LOADING", true)
            http().get(`admin/dashboard`)
                .then((res) => {
                    commit("SET_ANALYTICS", res.data)
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("SET_LOADING", false)
                })
        },

    }
};