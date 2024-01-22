import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import config from './config'

const routes: Array<RouteRecordRaw> = [...config];
console.log(routes)
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;