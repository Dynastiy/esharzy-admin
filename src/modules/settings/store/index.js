// import Vue from 'vue';
import http from '@/config/axios'
// import Axios from '@/plugins/axios'
import createPersistedState from 'vuex-persistedstate';


import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        requests: [],
        request: {},
        loading: false,
        kycs: [],
        kyc: {},
        applications: [],
        application: {}
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        allRequests: state => {
            return state.requests;
        },
        singleRequest: state => {
            return state.request
        },
        allKYCs: state => {
            return state.kycs
        },
        singleKYC: state => {
            return state.kyc
        },
        manufacturerApplications: state => {
            return state.applications
        },
        singleApplication: state => {
            return state.application
        },
        loading: state => {
            return state.loading
        }
    },
    mutations: {
        SET_REQUESTS: (state, data) => {
            state.requests = data;
        },
        SET_REQUEST: (state, data) => {
            state.request = data
        },
        SET_KYCS: (state, data) => {
            state.kycs = data
        },
        SET_KYC: (state, data) => {
            state.kyc = data
        },
        SET_MANUFACTURER_APPLICATIONS: (state, data) => {
            state.applications = data
        },
        SET_MANUFACTURER_APPLICATION: (state, data) => {
            state.application = data
        },
        SET_LOADING: (state, data) => {
            state.loading = data;
        },

    },
    actions: {
        // Get Vendor requests
        getVendorRequests({ commit }, payload) {
            commit("SET_LOADING", true)
            http().get(`admin/vendor-type-requests?${payload.q}=${payload.value}`)
                .then((res) => {
                    commit("SET_REQUESTS", res.data.data)
                    console.log(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("SET_LOADING", false)
                })
        },

        updateRequestStatus({ commit, dispatch }, payload) {
            commit("SET_LOADING", true)
            http().post(`admin/update-vendor-type-request/${payload.id}`, payload)
                .then((res) => {
                    Toastify({
                        text: `Vendor request ${payload.status}`,
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "11px",
                            borderRadius: "3px"
                        }
                    }).showToast();
                    dispatch('getVendorRequests', payload)
                    return res
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("SET_LOADING", false)
                })
        },

        // Get Single Vendor Request
        getRequestByID({ commit }, id) {
            commit("SET_LOADING", true)
            http().get(`admin/find-vendor-application//${id}`)
                .then((res) => {
                    commit("SET_REQUEST", res.data.transaction)
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("SET_LOADING", false)
                })
        },

        // Get Vendor KYCs
        getVendorKYCs({ commit }, payload) {
            commit("SET_LOADING", true)
            http().get(`admin/get-vendor-applications?${payload.q}=${payload.value}`)
                .then((res) => {
                    commit("SET_KYCS", res.data.data)
                    console.log(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("SET_LOADING", false)
                })
        },

        updateKYCStatus({ commit, dispatch }, payload) {
            commit("SET_LOADING", true)
            http().post(`admin/update-vendor-application/${payload.id}`, payload)
                .then((res) => {
                    Toastify({
                        text: `Vendor application ${payload.status}`,
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "11px",
                            borderRadius: "3px"
                        }
                    }).showToast();
                    dispatch('getVendorKYCs', payload)
                    dispatch('getKYCByID', payload.id)
                    return res
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("SET_LOADING", false)
                })
        },

        // Get Single Vendor KYC
        getKYCByID({ commit }, id) {
            commit("SET_LOADING", true)
            http().get(`admin/find-vendor-application/${id}`)
                .then((res) => {
                    commit("SET_KYC", res.data.vendorApplication)
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("SET_LOADING", false)
                })
        },

        // Get Manufacturer Applications
        getManufacturerApplications({ commit }, payload) {
            commit("SET_LOADING", true)
            http().get(`admin/get-manufacturer-applications?${payload.q}=${payload.value}`)
                .then((res) => {
                    commit("SET_MANUFACTURER_APPLICATIONS", res.data.data)
                    console.log(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("SET_LOADING", false)
                })
        },

        updateApplicationStatus({ commit, dispatch }, payload) {
            commit("SET_LOADING", true)
            http().post(`admin/update-manufacturer-application/${payload.id}`, payload)
                .then((res) => {
                    Toastify({
                        text: `Manufacturer application ${payload.status}`,
                        className: "info",
                        style: {
                            background: "#333",
                            fontSize: "11px",
                            borderRadius: "3px"
                        }
                    }).showToast();
                    dispatch('getManufacturerApplications', payload)
                    dispatch('getApplicationByID', payload.id)
                    return res
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    commit("SET_LOADING", false)
                })
        },

        // Get Single Vendor KYC
        getApplicationByID({ commit }, id) {
            commit("SET_LOADING", true)
            http().get(`admin/find-manufacturer-application/${id}`)
                .then((res) => {
                    commit("SET_MANUFACTURER_APPLICATION", res.data.manufacturerApplication)
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