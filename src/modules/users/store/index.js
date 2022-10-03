// import Vue from 'vue';
import http from '@/config/axios'
// import Axios from '@/plugins/axios'
import createPersistedState from 'vuex-persistedstate';


// import "toastify-js/src/toastify.css"
// import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        users: [],
        user: {},
        loading: false
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        allUsers: state => {
            return state.users;
        },
        singleUser: state => {
            return state.user
        },
        loading: state => {
            return state.loading
        }
    },
    mutations: {
        SET_USERS: (state, data) => {
            state.users = data;
        },
        SET_USER: (state, data) => {
            state.user = data
        },
        SET_LOADING: (state, data) => {
            state.loading = data;
        },

    },
    actions: {
        // Get Users
        getUsers({ commit }, role) {
            commit("SET_LOADING", true)
            http().get(`admin/get-users?role=${role}`)
                .then((res) => {
                    commit("SET_USERS", res.data)
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
        getUserByID({ commit }, id) {
            commit("SET_LOADING", true)
            http().get(`admin/find-user/${id}`)
                .then((res) => {
                    commit("SET_USER", res.data.user)
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("SET_LOADING", false)
                })
        },

        // Edit User Type
        editUserType({ commit, dispatch }, payload) {
            commit("SET_LOADING", true)
            http().post(`admin/edit-user-type/${payload.id}`, payload)
                .then((res) => {
                    console.log(res);
                    dispatch('getUserByID', payload.id)
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("SET_LOADING", false)

                })
        },

        // Edit User Type
        editUserRole({ commit, dispatch }, payload) {
            commit("SET_LOADING", true)
            http().post(`admin/edit-user-role/${payload.id}`, payload)
                .then((res) => {
                    console.log(res);
                    dispatch('getUserByID', payload.id)
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("SET_LOADING", false)

                })
        },

        // Edit User Status
        editUserStatus({ commit, dispatch }, payload) {
            commit("SET_LOADING", true)
            http().post(`admin/edit-user-status/${payload.id}`, payload)
                .then((res) => {
                    console.log(res);
                    dispatch('getUserByID', payload.id)
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