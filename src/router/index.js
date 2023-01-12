import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import DashboardLayout from '../layouts/dashboardLayout'

Vue.use(VueRouter)

const routes = [
    // {
    //       path: '/',
    //       name: 'home',
    //       component: HomeView
    //   },
    {
        path: '/dashboard',
        name: 'dahboard',
        component: DashboardLayout,
        async beforeEnter(to, from, next) {
            var loggedIn
            loggedIn = localStorage.getItem("token")
            console.log(loggedIn);
            if (!loggedIn) {
                next({
                    name: "sign-in",
                    query: { redirectFrom: to.fullPath },
                });
            } else {
                next();
            }
        },
        children: [{
                path: '/dashboard',
                name: 'dashboard',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../modules/dashboard/views/indexPage.vue')
            },
            {
                path: '/products',
                name: 'products',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>

                    import ( /* webpackChunkName: "about" */ '../modules/products/views/indexPage.vue')
            },
            {
                path: '/add-product',
                name: 'add-product',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>

                    import ( /* webpackChunkName: "about" */ '../modules/products/views/addProduct.vue')
            },
            {
                path: '/product/:slug',
                name: 'product-detail',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../modules/products/views/_id.vue')
            },

            {
                path: '/settings',
                name: 'settings',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../modules/settings/views/indexPage.vue')
            },
            {
                path: '/kyc/:id',
                name: 'kyc-details',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../modules/settings/views/viewKYC.vue')
            },
            {
                path: '/manufacturer-applications/:id',
                name: 'application-details',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../modules/settings/views/viewApplication.vue')
            },

            // Catalog
            {
                path: '/catalog/tags',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../modules/catalog/views/indexPage.vue'),
                children: [{
                        path: '/catalog/tags',
                        name: 'tags',
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../modules/catalog/views/tagsPage.vue')
                    },
                    {
                        path: '/catalog/categories',
                        name: 'categories',
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../modules/catalog/views/categoriesPage.vue')
                    },
                    {
                        path: '/catalog/shipping',
                        name: 'shipping',
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../modules/catalog/views/shippingPage.vue')
                    },
                ]
            },

            {
                path: '/users',
                name: 'users-list',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../modules/users/views/indexPage.vue')
            },
            {
                path: '/users/:id',
                name: 'user-detail',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../modules/users/views/_id.vue')
            },


            // Payments 
            {
                path: '/payments',
                name: 'payments',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../modules/payments/views/indexPage.vue')
            },
            {
                path: '/payments/:id',
                name: 'payment-detail',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../modules/payments/views/_id.vue')
            },

            {
                path: '/orders',
                name: 'orders-list',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>

                    import ( /* webpackChunkName: "about" */ '../modules/orders/views/indexPage.vue')
            },
            {
                path: '/orders/:id',
                name: 'order-detail',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>

                    import ( /* webpackChunkName: "about" */ '../modules/orders/views/_id.vue')
            },
            {
                path: '/transactions',
                name: 'transactions-list',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>

                    import ( /* webpackChunkName: "about" */ '../modules/transactions/views/indexPage.vue')
            },
            {
                path: '/transaction/:id',
                name: 'transaction-detail',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>

                    import ( /* webpackChunkName: "about" */ '../modules/transactions/views/_id.vue')
            },
            {
                path: '/payouts',
                name: 'payouts-list',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>

                    import ( /* webpackChunkName: "about" */ '../modules/payouts/views/indexPage.vue')
            },
            {
                path: '/payout/:id',
                name: 'payout-detail',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>

                    import ( /* webpackChunkName: "about" */ '../modules/payouts/views/_id.vue')
            },
            {
                path: '/stores',
                name: 'stores-list',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>

                    import ( /* webpackChunkName: "about" */ '../modules/stores/views/indexPage.vue')
            },
            {
                path: '/store/:id',
                name: 'store-detail',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>

                    import ( /* webpackChunkName: "about" */ '../modules/stores/views/_id.vue')
            },
        ]
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/AboutView.vue')
    }, {
        path: '/',
        name: 'sign-in',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../modules/auth/views/loginPage.vue')
    }
]



const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})



export default router