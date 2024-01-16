let apiPost = (uri, params, token = null) => {
	return new Promise((resolve, reject) => {
		let url = "https://dental.cdwuhu.com/" + uri
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
	uni.showToast({
		title: '登录失效，请重新登录',
		icon: "none",
		duration: 2000
	});
	uni.removeStorageSync('yy-token');
	uni.removeStorageSync('yy-userinfo');
	var pages = getCurrentPages();
	var currentPage = pages[pages.length - 1];
	var currentRoute = currentPage.route;
	console.log(currentRoute)
	if (currentRoute == 'pages/user/index') return false;

	wx.navigateTo({
		url: "/pages/user/index",
	});
}
let apiGet = (uri, params, token = null) => {
	return new Promise((resolve, reject) => {
		let url = "https://dental.cdwuhu.com/" + uri
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
					console.log(res.data.code)
					if (res.data.code == 203) {
						tokenfFail()
						reject()
					} else {
						uni.showToast({
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
		let url = "https://dental.cdwuhu.com/" + uri
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
					console.log(res.data.code)
					if (res.data.code == 203) {
						tokenfFail()
						reject()
					} else {
						uni.showToast({
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
export const GetIndexBanner = () => apiGet("api/common/banner", null)
export const GetServerUserInfo = (params) => apiGet('api/user/getUser', params, getUserToken)
export const GetUserInfo = (params) => apiPost('api/user/wechat', params)
export const GetUserPhone = (params) => apiPost('api/user/phone', params, getUserToken)

export const EditUserInfo = (params) => apiPost('/api/user/edit', params, getUserToken)
export const uploadImage = (params) => apiUploadImage('/api/upload', params)


export const GetAddressList = () => apiGet('api/user/address/lists', null, getUserToken)
export const CreateAddress = (params) => apiPost('api/user/address/add', params, getUserToken)
export const RmAddress = (params) => apiPost('api/user/address/delete', params, getUserToken)
export const EditAddress = (params) => apiPost('api/user/address/edit', params, getUserToken)

export const AboutDesc = () => apiGet('/api/common/desc', null, null)
export const AboutUs = () => apiGet('/api/common/about', null, null)