// import Vue from 'vue';
import http from '@/config/axios'
// import Axios from '@/plugins/axios'
import createPersistedState from 'vuex-persistedstate';


import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        products: [],
        loading: false,
        tags: [],
        categories: [],
        sub_categories: [],
        shipping_classes: [],
        errors: [],
        product: {}
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        allProducts: state => {
            return state.products;
        },
        singleProduct: state => {
            return state.product;
        },
        loading: state => {
            return state.loading
        },
        subCategories: state => {
            return state.sub_categories
        },
        categories: state => {
            return state.categories
        },
        tags: state => {
            return state.tags
        },
        shippingClasses: state => {
            return state.shipping_classes
        },
        isLoading: state => {
            return state.isLoading
        },
        isErrors: state => {
            return state.errors
        }
    },
    mutations: {
        SET_PRODUCTS: (state, data) => {
            state.products = data;
        },
        SET_PRODUCT: (state, data) => {
            state.product = data
        },
        SET_CATEGORIES: (state, data) => {
            state.categories = data
        },
        SET_SUB_CATEGORIES: (state, data) => {
            state.sub_categories = data
        },
        SET_TAGS: (state, data) => {
            state.tags = data
        },
        SET_LOADING: (state, data) => {
            state.loading = data;
        },
        SET_ERRORS: (state, data) => {
            state.errors = data;
        },
        SET_SHIPPING_CLASSES: (state, data) => {
            state.shipping_classes = data
        }

    },
    actions: {
        // Get Countries
        getProducts({ commit }) {
            commit("SET_LOADING", true)
            http().get(`admin/get-products`)
                .then((res) => {
                    commit("SET_PRODUCTS", res.data.data)
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("SET_LOADING", false)
                })
        },

        async getProductByID({ commit }, slug) {
            try {
                const res = await http().get(`admin/show-product/${slug}`);
                console.log(res.data.product);
                commit("SET_PRODUCT", res.data.product);
                return res
            } catch (error) {
                return error
            }
        },

        // Edit Product Status 
        async updateProductStatus({ dispatch, commit }, payload) {
            // commit('SET_LOADING')
            try {
                const res = await http().post(`admin/edit-product-status/${payload.id}`, payload);
                Toastify({
                    text: `Product Status updated`,
                    className: "info",
                    style: {
                        background: "green",
                        fontSize: "12px",
                        borderRadius: "3px"
                    }
                }).showToast();
                console.log(res);
                dispatch('getProductByID', payload.slug)
            } catch (error) {
                console.log(error.response.data.errors);
                Toastify({
                    text: `Error!`,
                    className: "info",
                    style: {
                        background: "red",
                        fontSize: "12px",
                        borderRadius: "3px"
                    }
                }).showToast();
                commit("SET_ERRORS", error.response.data.errors)
            } finally {
                // commit('END_LOADING')
            }
        },

        async getCategories({ commit }) {
            try {
                const res = await http().get(`all-categories`);
                commit("SET_CATEGORIES", res.data);
                return res
            } catch (error) {
                return error
            }
        },

        async getTags({ commit }) {
            try {
                const res = await http().get(`all-tags`);
                commit("SET_TAGS", res.data);
                return res
            } catch (error) {
                return error
            }
        },

        async getSubCategories({ commit }) {
            try {
                const res = await http().get(`all-subcategories`);
                commit("SET_SUB_CATEGORIES", res.data.sub_categories);
                return res
            } catch (error) {
                return error
            }
        },

        async getShippingClasses({ commit }) {
            try {
                const res = await http().get(`all-shipping-classes`);
                commit("SET_SHIPPING_CLASSES", res.data.shipping_classes.data);
                console.log(res)
                return res
            } catch (error) {
                return error
            }
        },

        async createProduct({ dispatch, commit }, payload) {
            // commit('SET_LOADING')
            try {
                const res = await http().post(`create-product`, payload);
                Toastify({
                    text: `Product Created Succesfully`,
                    className: "info",
                    style: {
                        background: "green",
                        fontSize: "12px",
                        borderRadius: "3px"
                    }
                }).showToast();
                console.log(res);
                dispatch('getProducts')
            } catch (error) {
                console.log(error.response.data.errors);
                Toastify({
                    text: `Error!`,
                    className: "info",
                    style: {
                        background: "red",
                        fontSize: "12px",
                        borderRadius: "3px"
                    }
                }).showToast();
                commit("SET_ERRORS", error.response.data.errors)
            } finally {
                // commit('END_LOADING')
            }
        },
    }
};