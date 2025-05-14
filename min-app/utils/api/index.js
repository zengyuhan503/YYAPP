let apiPost = (uri, params, token = null) => {
	return new Promise((resolve, reject) => {
		let url = "https://www.yuyandental.com" + uri
		wx.request({
			url: url,
			data: params,
			method: "POST",
			header: {
				"content-type": "application/json",
				"Token": token != null ? token() : null
			},
			success(res) {
				if (res.data.code == 200) {
					resolve(res.data.data)
				} else {
					console.log(res.data.code)
					if (res.data.code == 203) {
						tokenfFail()
						reject()
					} else {
						uni.showToast({
							icon: "none",
							title: res.data.msg,
							duration: 2000
						});
					}
				}
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

const tokenfFail = () => {
	let token = uni.getStorageSync('yy-token');
	let str = token ? '登录失效，请重新登录' : '你当前未登录，请登录后尝试'
	uni.removeStorageSync('yy-token');
	uni.removeStorageSync('yy-userinfo');
	var pages = getCurrentPages();
	var currentPage = pages[pages.length - 1];
	var currentRoute = currentPage.route;
	if (currentRoute == 'pages/user/index') return false;
	uni.showToast({
		title: str,
		icon: "none",
		duration: 2000
	});
	setTimeout(() => {
		wx.reLaunch({
			url: "/pages/user/index",
		});
	}, 2000);
}
let apiGet = (uri, params, token = null) => {
	return new Promise((resolve, reject) => {
		let url = "https://www.yuyandental.com" + uri
		wx.request({
			url: url,
			data: params,
			method: "GET",
			header: {
				"Token": token != null ? token() : null
			},
			success(res) {
				if (res.data.code == 200) {
					resolve(res.data.data)
				} else {
					if (res.data.code == 203) {
						tokenfFail()
						reject()
					} else {
						uni.showToast({
							icon: "none",
							title: res.data.msg,
							duration: 2000
						});
					}
				}
			},
			fail(err) {
				reject(err)
			}
		})
	})
}
const apiUploadImage = (uri) => {
	return new Promise((resolve, reject) => {
		let url = "https://www.yuyandental.com" + uri
		wx.request({
			url: url,
			data: params,
			method: "POST",
			header: {
				"content-type": "multipart/form-data",
			},
			success(res) {
				if (res.data.code == 200) {
					resolve(res.data.data)
				} else {
					if (res.data.code == 203) {
						tokenfFail()
						reject()
					} else {
						uni.showToast({
							icon: "none",
							title: res.data.msg,
							duration: 2000
						});
					}
				}
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

function getUserToken() {
	let token = uni.getStorageSync('yy-token');
	return token
}
export const GetIndexBanner = (params) => apiGet("/api/common/banner", params, null)
export const GetServerUserInfo = (params) => apiGet('/api/user/getUser', params, getUserToken)
export const GetUserInfo = (params) => apiPost('/api/user/wechat', params)
export const GetUserPhone = (params) => apiPost('/api/user/phone', params, getUserToken)

export const EditUserInfo = (params) => apiPost('/api/user/edit', params, getUserToken)
export const uploadImage = (params) => apiUploadImage('/api/upload', params)


export const GetAddressList = () => apiGet('/api/user/address/lists', null, getUserToken)
export const CreateAddress = (params) => apiPost('/api/user/address/add', params, getUserToken)
export const RmAddress = (params) => apiPost('/api/user/address/delete', params, getUserToken)
export const EditAddress = (params) => apiPost('/api/user/address/edit', params, getUserToken)

export const AboutDesc = () => apiGet('/api/common/desc', null, null)
export const AboutUs = () => apiGet('/api/common/about', null, null)

export const booking_plans = (params) => apiGet('/api/booking_plan/lists?type=' + params.type, null, getUserToken)
export const booking_plans_detail = (params) => apiGet('/api/booking_plan/detail', params, getUserToken)
export const booking_order_detail = (params) => apiGet('/api/booking_order/detail', params, getUserToken)
export const CreateBookingPlans = (params) => apiPost('/api/booking_order/createKpBooking', params, getUserToken)
export const CancelBookingPlans = (params) => apiPost('/api/booking_order/cancel', params, getUserToken)

export const GetGoodsList = (params) => apiGet('/api/goods/lists', params, getUserToken)
export const GetGoodsInfo = (params) => apiGet("/api/goods/detail", params, getUserToken)

export const GetCalculate = params => apiGet('/api/order/calculate', params, getUserToken)
export const CreateOrder = params => apiPost('/api/order/create', params, getUserToken)
export const GetCateList = (params) => apiGet('/api/goods_category/lists', params, getUserToken)
export const CreateWxPay = params => apiPost('/api/order/pay', params, getUserToken)
export const GetOrderList = (params) => apiGet("/api/order/lists", params, getUserToken)
export const GetOrderInfo = (params) => apiGet("/api/order/detail", params, getUserToken)
export const CancelOrder = (params) => apiPost("/api/order/cancel", params, getUserToken)