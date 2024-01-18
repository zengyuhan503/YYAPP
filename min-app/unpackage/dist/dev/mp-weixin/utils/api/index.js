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
          console.log(res.data.code);
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
    icon: "none",
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
        if (res.data.code == 200) {
          resolve(res.data.data);
        } else {
          console.log(res.data.code);
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
function getUserToken() {
  let token = common_vendor.index.getStorageSync("yy-token");
  return token;
}
const GetIndexBanner = (params) => apiGet("api/common/banner", params, null);
const GetServerUserInfo = (params) => apiGet("api/user/getUser", params, getUserToken);
const GetUserInfo = (params) => apiPost("api/user/wechat", params);
const GetUserPhone = (params) => apiPost("api/user/phone", params, getUserToken);
const EditUserInfo = (params) => apiPost("/api/user/edit", params, getUserToken);
const GetAddressList = () => apiGet("api/user/address/lists", null, getUserToken);
const CreateAddress = (params) => apiPost("api/user/address/add", params, getUserToken);
const RmAddress = (params) => apiPost("api/user/address/delete", params, getUserToken);
const EditAddress = (params) => apiPost("api/user/address/edit", params, getUserToken);
const AboutDesc = () => apiGet("/api/common/desc", null, null);
const AboutUs = () => apiGet("/api/common/about", null, null);
const booking_plans_detail = (params) => apiGet("/api/booking_plan/detail", params, getUserToken);
const booking_order_detail = (params) => apiGet("/api/booking_order/detail", params, getUserToken);
const CreateBookingPlans = (params) => apiPost("/api/booking_order/createKpBooking", params, getUserToken);
const CancelBookingPlans = (params) => apiPost("/api/booking_order/cancel", params, getUserToken);
const GetGoodsList = (params) => apiGet("/api/goods/lists", params, getUserToken);
const GetGoodsInfo = (params) => apiGet("/api/goods/detail", params, getUserToken);
const GetCalculate = (params) => apiGet("/api/order/calculate", params, getUserToken);
const CreateOrder = (params) => apiPost("/api/order/create", params, getUserToken);
const GetCateList = (params) => apiGet("/api/goods_category/lists", params, getUserToken);
const CreateWxPay = (params) => apiPost("/api/order/pay", params, getUserToken);
const GetOrderList = (params) => apiGet("/api/order/lists", params, getUserToken);
const GetOrderInfo = (params) => apiGet("/api//order/detail", params, getUserToken);
exports.AboutDesc = AboutDesc;
exports.AboutUs = AboutUs;
exports.CancelBookingPlans = CancelBookingPlans;
exports.CreateAddress = CreateAddress;
exports.CreateBookingPlans = CreateBookingPlans;
exports.CreateOrder = CreateOrder;
exports.CreateWxPay = CreateWxPay;
exports.EditAddress = EditAddress;
exports.EditUserInfo = EditUserInfo;
exports.GetAddressList = GetAddressList;
exports.GetCalculate = GetCalculate;
exports.GetCateList = GetCateList;
exports.GetGoodsInfo = GetGoodsInfo;
exports.GetGoodsList = GetGoodsList;
exports.GetIndexBanner = GetIndexBanner;
exports.GetOrderInfo = GetOrderInfo;
exports.GetOrderList = GetOrderList;
exports.GetServerUserInfo = GetServerUserInfo;
exports.GetUserInfo = GetUserInfo;
exports.GetUserPhone = GetUserPhone;
exports.RmAddress = RmAddress;
exports.booking_order_detail = booking_order_detail;
exports.booking_plans_detail = booking_plans_detail;
