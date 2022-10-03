// import Vue from 'vue';
import http from '@/config/axios'
// import Axios from '@/plugins/axios'
import createPersistedState from 'vuex-persistedstate';


import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        tags: [],
        categories: [],
        shipping_classes: []
    };
};


export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        allTags: state => {
            return state.tags;
        },
        allCategories: state => {
            return state.categories;
        },
        allShippingClasses: state => {
            return state.shipping_classes
        }
    },
    mutations: {
        SET_TAGS: (state, data) => {
            state.tags = data;
        },
        SET_CATEGORIES: (state, data) => {
            state.categories = data;
        },
        SET_SHIPPING_CLASSES: (state, data) => {
            state.shipping_classes = data
        }

    },
    actions: {

        async getCategories({ commit }) {
            try {
                const res = await http().get(`all-categories`);
                commit("SET_CATEGORIES", res.data.categories);
                console.log(res);
                return res
            } catch (error) {
                return error
            }
        },

        async getShippingClasses({ commit }) {
            try {
                const res = await http().get(`all-shipping-classes`);
                commit("SET_SHIPPING_CLASSES", res.data.shipping_classes.data);
                console.log(res);
                return res
            } catch (error) {
                return error
            }
        },

        // Create Shipping Class
        createShippingClass({ dispatch }, payload) {
            // commit("SET_LOADING", true)
            http().post(`/admin/create-shipping-class`, payload)
                .then((res) => {
                    dispatch("getShippingClasses")
                    console.log(res);
                    Toastify({
                        text: "Shipping Class Created",
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "11px",
                            borderRadius: "3px"
                        }
                    }).showToast();
                })
                .catch((err) => {
                    console.log(err);
                })
                // .finally(() => {
                //     commit("SET_LOADING", false)
                // })
        },

        // Create Shipping Zone
        createShippingZone({ dispatch }, payload) {
            // commit("SET_LOADING", true)
            http().post(`/admin/create-shipping-zone`, payload)
                .then((res) => {
                    dispatch("getShippingClasses")
                    console.log(res);
                    Toastify({
                        text: "Shipping Zone Created",
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "11px",
                            borderRadius: "3px"
                        }
                    }).showToast();
                })
                .catch((err) => {
                    console.log(err);
                })
                // .finally(() => {
                //     commit("SET_LOADING", false)
                // })
        },

        // Delete Shipping Class
        deleteShippingClass({ dispatch }, id) {
            // commit("SET_LOADING", true)
            http().post(`/admin/remove-shipping-class/${id}`)
                .then((res) => {
                    dispatch("getShippingClasses")
                    console.log(res);
                    Toastify({
                        text: "Shipping Deleted",
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "11px",
                            borderRadius: "3px"
                        }
                    }).showToast();
                })
                .catch((err) => {
                    console.log(err);
                })
                // .finally(() => {
                //     commit("SET_LOADING", false)
                // })
        },

        // Create Category
        createCategory({ dispatch }, payload) {
            // commit("SET_LOADING", true)
            http().post(`/admin/create-category`, payload)
                .then((res) => {
                    dispatch("getCategories")
                    console.log(res);
                    Toastify({
                        text: "Category Created",
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "11px",
                            borderRadius: "3px"
                        }
                    }).showToast();
                })
                .catch((err) => {
                    console.log(err);
                })
                // .finally(() => {
                //     commit("SET_LOADING", false)
                // })
        },

        // Edit Sub Category
        editCategory({ dispatch }, dataObj) {
            // commit("SET_LOADING", true)
            http().post(`/admin/edit-subcategory/${dataObj.id}`, dataObj.payload)
                .then((res) => {
                    console.log(dataObj);
                    dispatch("getCategories")
                    console.log(res);
                    Toastify({
                        text: "Category Edited",
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "11px",
                            borderRadius: "3px"
                        }
                    }).showToast();
                })
                .catch((err) => {
                    console.log(err);
                })
                // .finally(() => {
                //     commit("SET_LOADING", false)
                // })
        },

        // Delete Sub Category
        deleteCategory({ dispatch }, id) {
            // commit("SET_LOADING", true)
            http().post(`/admin/delete-category/${id}`)
                .then((res) => {
                    dispatch("getCategories")
                    console.log(res);
                    Toastify({
                        text: "Category Deleted",
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "11px",
                            borderRadius: "3px"
                        }
                    }).showToast();
                })
                .catch((err) => {
                    console.log(err);
                })
                // .finally(() => {
                //     commit("SET_LOADING", false)
                // })
        },

        // Create Sub Category
        createSubCategory({ dispatch }, payload) {
            // commit("SET_LOADING", true)
            http().post(`/admin/create-subcategory`, payload)
                .then((res) => {
                    dispatch("getCategories")
                    console.log(res);
                    Toastify({
                        text: "Sub Category Created",
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "11px",
                            borderRadius: "3px"
                        }
                    }).showToast();
                })
                .catch((err) => {
                    console.log(err);
                })
                // .finally(() => {
                //     commit("SET_LOADING", false)
                // })
        },

        // Edit Sub Category
        editSubCategory({ dispatch }, dataObj) {
            // commit("SET_LOADING", true)
            http().post(`/admin/edit-subcategory/${dataObj.id}`, dataObj.payload)
                .then((res) => {
                    dispatch("getCategories")
                    console.log(res);
                    Toastify({
                        text: "Sub Category Edited",
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "11px",
                            borderRadius: "3px"
                        }
                    }).showToast();
                })
                .catch((err) => {
                    console.log(err);
                })
                // .finally(() => {
                //     commit("SET_LOADING", false)
                // })
        },

        // Delete Sub Category
        deleteSubCategory({ dispatch }, id) {
            // commit("SET_LOADING", true)
            http().post(`/admin/delete-subcategory/${id}`)
                .then((res) => {
                    dispatch("getCategories")
                    console.log(res);
                    Toastify({
                        text: "Sub Category Deleted",
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "11px",
                            borderRadius: "3px"
                        }
                    }).showToast();
                })
                .catch((err) => {
                    console.log(err);
                })
                // .finally(() => {
                //     commit("SET_LOADING", false)
                // })
        },

        async getCategoryById({ commit }, slug) {
            try {
                const res = await http().get(`show-category/${slug}`);
                commit("SET_CATEGORY", res.data.category.products);
                return res
            } catch (error) {
                return error
            }
        },

        async getTags({ commit }) {
            try {
                const res = await http().get(`all-tags`);
                commit("SET_TAGS", res.data.tags);
                console.log(res);
                return res
            } catch (error) {
                return error
            }
        },

        // Edit Tag
        editTag({ dispatch }, payload) {
            // commit("SET_LOADING", true)
            http().post(`/admin/edit-tag/${payload.id}`, payload)
                .then((res) => {
                    dispatch("getTags")
                    console.log(res);
                    Toastify({
                        text: "Tag Updated",
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "11px",
                            borderRadius: "3px"
                        }
                    }).showToast();
                })
                .catch((err) => {
                    console.log(err);
                })
                // .finally(() => {
                //     commit("SET_LOADING", false)
                // })
        },

        // Edit Tag
        deleteTag({ dispatch }, id) {
            // commit("SET_LOADING", true)
            http().post(`/admin/delete-tag/${id}`)
                .then((res) => {
                    dispatch("getTags")
                    console.log(res);
                    Toastify({
                        text: "Tag Deleted",
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "11px",
                            borderRadius: "3px"
                        }
                    }).showToast();
                })
                .catch((err) => {
                    console.log(err);
                })
                // .finally(() => {
                //     commit("SET_LOADING", false)
                // })
        },


        // Create Tag
        createTag({ dispatch }, payload) {
            // commit("SET_LOADING", true)
            http().post(`/admin/create-tag`, payload)
                .then((res) => {
                    dispatch("getTags")
                    console.log(res);
                    Toastify({
                        text: "Tag Created",
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "11px",
                            borderRadius: "3px"
                        }
                    }).showToast();
                })
                .catch((err) => {
                    console.log(err);
                })
                // .finally(() => {
                //     commit("SET_LOADING", false)
                // })
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
    }
};