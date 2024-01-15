import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import Antd, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css';
import '@/assets/css/init.less'
import '@/assets/css/style.less'
import "animate.css/animate.min.css";
import { createPinia } from 'pinia'

const pinia = createPinia()

message.config({
    duration: 1,
    maxCount: 1
})

createApp(App).use(router).use(pinia).use(Antd).mount('#app')
