// import Vue from 'vue';
import http from '@/config/axios'
// import Axios from '@/plugins/axios'
import createPersistedState from 'vuex-persistedstate';

import router from '@/router'

import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        token: '',
        user: {},
        loggedIn: false,
        loading: false
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        isAuthenticated: state => {
            return state.token;
        },
        isLoggedIn: state => {
            return state.loggedIn
        },
        getUser: state => {
            return state.user;
        },
        isLoading: state => {
            return state.loading
        }
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_LOGGED_IN: state => {
            state.loggedIn = true;
        },
        SET_USER: (state, user) => {
            state.user = user;
        },
        SET_LOADING: (state) => {
            state.loading = true
        },
        END_LOADING: (state) => {
            state.loading = false
        },
        RESET: state => {
            Object.assign(state, getDefaultState());
        }
    },
    actions: {
        // Get Countries
        userLogin({ commit }, payload) {
            commit('SET_LOADING')
            http().post('/auth/signin', payload)
                .then((res) => {
                    commit('SET_TOKEN', res.data.token);
                    commit('SET_USER', res.data.user);
                    let token = res.data.token
                    localStorage.setItem('token', token)
                    console.log(res);
                    router.push('/dashboard')
                    Toastify({
                        text: "Logged In Succesfully",
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "11px",
                            borderRadius: "3px"
                        }
                    }).showToast();
                    let url = window.location.search
                    console.log(url);
                    const params = new URLSearchParams(url);
                    // const q = params.get("return_url");
                    const d = params.get("redirectFrom")
                        // console.log(q);
                    router.push(d)

                    // if (q == "/cart") {
                    //     let data = JSON.parse(localStorage.getItem("cart_details"))
                    //     dispatch("addToCart", data);
                    //     dispatch("setUser")
                    //     router.push(q)
                    // } else {
                    //     router.push(q || d)
                    // }
                })
                .catch((err) => {
                    console.log(err);
                    Toastify({
                        text: "Password or Email Incorrect",
                        className: "red",
                        style: {
                            background: "#333",
                            fontSize: "11px",
                            borderRadius: "3px"
                        }
                    }).showToast();
                })
                .finally(() => {
                    commit('END_LOADING')
                })

        },
        async logout({ commit }) {
            // const res = await Axios.post('/auth/logout')
            // console.log(res);
            commit('RESET', '');
            localStorage.removeItem('token')
            router.push('/')
        },
    }
};