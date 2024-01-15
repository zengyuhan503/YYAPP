"use strict";
const common_vendor = require("../../common/vendor.js");
let apiPost = (uri, params, token = null) => {
  return new Promise((resolve, reject) => {
    let url = "https://dental.cdwuhu.com/" + uri;
    common_vendor.wx$1.request({
      url,
      data: params,
      method: "POST",
      header: {
        "content-type": "application/json",
        "Token": token != null ? token() : null
      },
      success(res) {
        if (res.data.code == 200) {
          resolve(res.data.data);
        } else {
          if (res.data.code == 203) {
            tokenfFail();
            reject();
          } else {
            common_vendor.index.showToast({
              title: res.data.msg,
              duration: 2e3
            });
          }
        }
      },
      fail(err) {
        reject(err);
      }
    });
  });
};
const tokenfFail = () => {
  common_vendor.index.showToast({
    title: "登录失效，请重新登录",
    duration: 2e3
  });
};
let apiGet = (uri, params, token = null) => {
  return new Promise((resolve, reject) => {
    let url = "https://dental.cdwuhu.com/" + uri;
    common_vendor.wx$1.request({
      url,
      data: params,
      method: "GET",
      header: {
        "Token": token != null ? token() : null
      },
      success(res) {
        if (res.data.code) {
          resolve(res.data.data);
        }
      },
      fail(err) {
        reject(err);
      }
    });
  });
};
function getUserToken() {
  let token = common_vendor.index.getStorageSync("yy-token");
  return token;
}
const GetIndexBanner = () => apiGet("api/common/banner", null);
const GetServerUserInfo = (params) => apiGet("api/user/getUser", params, getUserToken);
const GetUserInfo = (params) => apiPost("api/user/wechat", params);
const GetUserPhone = (params) => apiPost("api/user/phone", params, getUserToken);
const EditUserInfo = (params) => apiPost("/api/user/edit", params, getUserToken);
const GetAddressList = () => apiGet("api/user/address/lists", null, getUserToken);
exports.EditUserInfo = EditUserInfo;
exports.GetAddressList = GetAddressList;
exports.GetIndexBanner = GetIndexBanner;
exports.GetServerUserInfo = GetServerUserInfo;
exports.GetUserInfo = GetUserInfo;
exports.GetUserPhone = GetUserPhone;
