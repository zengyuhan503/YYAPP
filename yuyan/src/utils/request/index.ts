//跨域代理前缀
// const API_PROXY_PREFIX = ''
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
// // const BASE_URL = process.env.VUE_APP_API_BASE_URL
// // console.log(BASE_URL)

/* jshint esversion: 6 */
/**
 * api接口统一管理
 */
import axios from 'axios'
import { message } from 'ant-design-vue';
import { logout } from '@/utils/user/index'

message.config({
    top: `150px`,
    duration: 3,
    maxCount: 3
    ,
});
const deleteApi = axios.delete // delete 关键词

// axios.defaults.baseURL = 'http://82.156.23.181/';
axios.defaults.timeout = 1000 * 600;
axios.interceptors.request.use(
    config => {
        config.withCredentials = false;
        let token = localStorage.getItem("yuyan.token");
        console.log(config.headers)
        if (token) {
            config.headers.Token = token
        }
        return config;
    },
    error => {
        // Do something with request error
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => {
        console.log(response.data)
        if (response.data.code == 301) {
            localStorage.removeItem('userInfo');
            message.error('登陆信息过期或失效，请重新登陆！');
        }
        if (response.data.code == undefined) return response;
        if (response.data.code !== 200) {
            message.error(response.data.msg);
        }
        return response.data;
    },
    err => {
        console.log(err)
        if (err.response == undefined) {
            message.error('网络错误，请刷新重试或者检查网络');
        }
        var statusCode = err.response.status;
        switch (statusCode) {
            case 400:
                message.error('请求错误');
                break;
            case 401:
                message.error('未授权，请登录');
                logout()
                break;
            case 403:
                message.error('拒绝访问');
                break;

            case 404:
                message.error(`请求地址出错，请重试`);
                break;

            case 408:
                message.error('请求超时');
                break;

            case 500:
                message.error('服务器内部错误');
                break;

            case 501:
                message.error('服务未实现');
                break;

            case 502:
                message.error('网关错误');
                break;

            case 503:
                message.error('服务不可用');
                break;

            case 504:
                message.error('网关超时,');
                break;

            case 505:
                err.Message = 'HTTP版本不受支持';
                break;

            default:
        }
        return Promise.reject(err);
    }
)
let apiPost = (url: string, params: any, headers?: any) => axios.post(url, params, headers)
let apiGet = (url: string, params: any) => axios.get(url, { params: params })
export const login = (params: {
    account: String,
    password: String
}) => apiPost('/web/login', params);

export const userList = (params: {
    page: number,
    page_size: number,
    keywords: string,
}) => apiGet('/web/user/lists', params)

export const changeUserStatus = (params: {
    user_id: string,
    status: string
}) => apiPost('/web/user/changeStatus', params)


export const bannerList = (params: {
    page: number,
    page_size: number,
    type: number
}) => apiGet('/web/banner/lists', params)


export const createBanners = (params: {
    type: string,
    url?: string,
    goods_id?: string,
    remark: string,
    image: string,
    long_image?: string,
}) => apiPost('/web/banner/add', params)



export const editBanners = (params: {
    banner_id: string,
    type: string,
    url?: string,
    goods_id?: string,
    remark: string,
    image: string,
    long_image?: string,
}) => apiPost('/web/banner/edit', params)





export const goodList = (params: {
    "page": number,
    "page_size": number,
    "status"?: string | null,
    "keywords"?: string
}) => apiGet('/web/goods/lists', params)

export const createGoods = (params) => apiPost('/web/goods/add', params)
export const goodsCategorys = (params: {
    "page": number,
    "page_size": number,
    "keywords"?: string
}) => apiGet('/web/goods_category/lists', params)

export const cateCategorys = (params: {
    icon: string,
    title: string
}) => apiPost('/web/goods_category/add', params)

// export const exitCategorys=(params)=>apiPost()
export const editCategorys = (params: {
    category_id: string,
    icon: string,
    title: string
}) => apiPost('/web/goods_category/edit', params)

export const changeGoodsStatus = (params) => apiPost('/web/goods/changeStatus', params)

export const rmCategorys = (params: {
    category_id: string,
}) => apiPost('web/goods_category/delete', params)

export const imageUpLoad = (params) => apiPost('/web/upload', params, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})

export const booking_order = params => apiGet('/web/booking_order/lists', params);
export const booking_changeStatus = params => apiPost('/web/booking_order/changeStatus', params)
export const booking_changeContactStatus = params => apiPost('/web/booking_order/changeContactStatus', params)

export const booking_plan = params => apiGet("/web/booking_plan/lists", params);
export const booking_plan_create = params => apiPost("/web/booking_plan/add", params);
export const booking_plan_edit = params => apiPost("/web/booking_plan/edit", params);
export const about_edit = params => apiPost("/web/about/edit", params);
export const about_detail = () => apiGet("/web/about/detail", null);
export const desc_edit = params => apiPost("/web/desc/edit", params);
export const desc_detail = () => apiGet("/web/desc/detail", null);


