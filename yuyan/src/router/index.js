import { createRouter, createWebHashHistory } from 'vue-router';
import config from './config'

const routes = [...config];
console.log(routes)
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;