import { RouteRecordRaw } from "vue-router";
import login from "@views/login/index.vue"
import userList from "@views/users/userList.vue"
import userinfo from "@views/users/userInfo.vue"
let options: Array<RouteRecordRaw> = [
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
        path: '/user/lists',
        name: '注册用户管理',
        meta: {
            keepAlive: false,
            showMenu: false
        },
        component: userList,
    },
    {
        path: '/user/info',
        name: '注册用户管理',
        meta: {
            keepAlive: false,
            showMenu: false
        },
        component: userinfo,
    },
];

export default options;