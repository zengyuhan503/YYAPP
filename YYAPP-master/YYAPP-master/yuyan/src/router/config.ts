
import login from "@views/login/index.vue"

import userList from "@views/users/userList.vue"
import userinfo from "@views/users/userInfo.vue"

import exhibition from "@views/reservation/exhibition.vue"
import diagnose from "@views/reservation/diagnose.vue"

import banners from "@views/display/banner.vue"
import bannerInfo from "@views/display/bannerInfo.vue"
import commoditybanner from "@views/display/commodity.vue"
import commodityInfo from "@views/display/commodityInfo.vue"

import commodityList from "@views/commodity/list.vue"
import commodityDetail from "@views/commodity/detail.vue"
import commodityCreate from "@views/commodity/create.vue"

import biography from "@views/about/bio.vue"
import aboutUs from "@views/about/us.vue"


import orders from "@views/order/list.vue"
import orderinfo from "@views/order/info.vue"
let options = [
    {
        path: '/login',
        name: '登录页',
        meta: {
            keepAlive: false,
            showMenu: false
        },
        component: login,
    },
    {
        path: '/user',
        name: '账号管理',
        meta: {
            keepAlive: false,
            showMenu: true
        },
        children: [
            {
                path: '/user/lists',
                name: '注册用户管理',
                redirect: null,
                component: userList,
                meta: {
                    showMenu: true,
                    keepAlive: true,
                }
            },
            {
                path: '/user/info',
                name: '用户详情',
                redirect: null,
                component: userinfo,
                meta: {
                    showMenu: false,
                    keepAlive: false,
                }
            },
        ]
    },
    {
        path: '/display',
        name: '运营管理',
        meta: {
            keepAlive: false,
            showMenu: true
        },
        children: [
            {
                path: '/display/banners',
                name: '首页banner配置',
                redirect: null,
                component: banners,
                meta: {
                    showMenu: true,
                    keepAlive: true,
                }
            },
            {
                path: '/display/bannerInfo',
                name: '首页banner配置详情',
                redirect: null,
                component: bannerInfo,
                meta: {
                    showMenu: false,
                    keepAlive: true,
                }
            },
            {
                path: '/display/commodity',
                name: '商品banner配置',
                redirect: null,
                component: commoditybanner,
                meta: {
                    showMenu: true,
                    keepAlive: true,
                }
            },
            {
                path: '/display/commodityInfo',
                name: '商品banner配置详情',
                redirect: null,
                component: commodityInfo,
                meta: {
                    showMenu: false,
                    keepAlive: true,
                }
            },
        ]
    },
    {
        path: '/reservation',
        name: '预约',
        meta: {
            keepAlive: false,
            showMenu: true
        },
        children: [
            {
                path: '/reservation/diagnose',
                name: '看诊预约管理',
                redirect: null,
                component: diagnose,
                meta: {
                    showMenu: true,
                    keepAlive: false,
                }
            },
            {
                path: '/reservation/exhibition',
                name: '展馆预约管理',
                redirect: null,
                component: exhibition,
                meta: {
                    showMenu: true,
                    keepAlive: true,
                }
            },

        ]
    },

    {
        path: '/commodity',
        name: '商店',
        meta: {
            keepAlive: false,
            showMenu: true
        },
        children: [
            {
                path: '/commodity/list',
                name: '商品管理',
                redirect: null,
                component: commodityList,
                meta: {
                    showMenu: true,
                    keepAlive: true,
                }
            },
            {
                path: '/commodity/detail',
                name: '商品详情',
                redirect: null,
                component: commodityDetail,
                meta: {
                    showMenu: false,
                    keepAlive: true,
                }
            },
            {
                path: '/commodity/create',
                name: '添加商品',
                redirect: null,
                component: commodityCreate,
                meta: {
                    showMenu: false,
                    keepAlive: true,
                }
            },
        ]
    },
    {
        path: '/order',
        name: '订单',
        meta: {
            keepAlive: false,
            showMenu: true
        },
        children: [
            {
                path: '/order/orders',
                name: '订单管理',
                redirect: null,
                component: orders,
                meta: {
                    showMenu: true,
                    keepAlive: true,
                }
            },
            {
                path: '/order/info',
                name: '订单详情',
                redirect: null,
                component: orderinfo,
                meta: {
                    showMenu: true,
                    keepAlive: true,
                }
            },
        ]
    },
    {
        path: '/config',
        name: '介绍配置',
        meta: {
            keepAlive: false,
            showMenu: true
        },
        children: [
            {
                path: '/config/biography',
                name: '医生介绍',
                redirect: null,
                component: biography,
                meta: {
                    showMenu: true,
                    keepAlive: true,
                }
            },
            {
                path: '/config/aboutus',
                name: '关于我们',
                redirect: null,
                component: aboutUs,
                meta: {
                    showMenu: true,
                    keepAlive: true,
                }
            },
        ]
    },
];

export default options;