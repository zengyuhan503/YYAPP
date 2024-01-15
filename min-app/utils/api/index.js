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
					if (res.data.code == 203) {
						tokenfFail()
						reject()
					}else{
						uni.showToast({
							title:res.data.msg,
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
		duration: 2000
	});
}
let apiGet = (uri, params) => {
	return new Promise((resolve, reject) => {
		let url = "https://dental.cdwuhu.com/" + uri
		wx.request({
			url: url,
			data: params,
			method: "GET",
			success(res) {
				if (res.data.code) {
					resolve(res.data.data)
				}
			},
			fail(err) {
				reject(err)
			}
		})
	})
}


export const GetIndexBanner = () => apiGet("api/common/banner", null)
export const GetUserInfo = (params) => apiPost('api/user/wechat', params)
export const GetUserPhone = (params) => apiPost('api/user/phone', params, function () {
	let token = uni.getStorageSync('yy-token');
	return token
})