"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api_index = require("../../utils/api/index.js");
const _sfc_main = {
  __name: "unpaid",
  setup(__props) {
    let str = common_vendor.ref({
      0: "待付款",
      1: "待发货",
      2: "待收货",
      3: "已收货",
      4: "完成订单",
      "-1": "已关闭",
      "-2": "已关闭",
      all: "全部订单"
    });
    let orderid = null;
    let orderInfo = common_vendor.ref({});
    let showCancel = common_vendor.ref(false);
    let timeouts = common_vendor.ref("");
    let interval = null;
    function updateCountdown() {
      const expiredTime = orderInfo.value.expired_time;
      const currentTime = common_vendor.hooks().unix();
      const timeDifference = expiredTime - currentTime;
      const duration = common_vendor.hooks.duration(timeDifference, "seconds");
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();
      timeouts.value = `${hours}:${minutes}:${seconds}`;
      if (timeDifference <= 0) {
        clearInterval(interval);
        utils_api_index.GetOrderInfo();
      }
    }
    const handleMakePhoneCall = () => {
      common_vendor.index.makePhoneCall({
        phoneNumber: "15522756996"
        //仅为示例
      });
    };
    const handleToCreateOrder = () => {
      let params = {
        order_id: orderid
      };
      utils_api_index.CreateWxPay(params).then((res) => {
        console.log(res);
        common_vendor.wx$1.requestPayment({
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          signType: "MD5",
          paySign: res.paySign,
          success(res2) {
            console.log(res2);
            common_vendor.wx$1.showToast({
              icon: "success",
              title: "支付成功",
              duration: 2e3
            });
            setTimeout(() => {
              handleGetOrderInfo();
            }, 2e3);
          },
          fail(err) {
            common_vendor.wx$1.showToast({
              icon: "error",
              title: "支付失败",
              duration: 2e3
            });
            setTimeout(() => {
              handleGetOrderInfo();
            }, 2e3);
            console.log(err);
          }
        });
      });
    };
    const handleGetOrderInfo = () => {
      let params = {
        order_id: orderid
      };
      utils_api_index.GetOrderInfo(params).then((res) => {
        orderInfo.value = res;
        clearInterval(interval);
        interval = null;
        interval = setInterval(updateCountdown, 1e3);
        updateCountdown();
      });
    };
    const handleCopy = () => {
      common_vendor.index.setClipboardData({
        data: orderInfo.ship_number,
        success: function() {
          common_vendor.index.showToast({
            icon: "none",
            title: "复制成功",
            duration: 2e3
          });
        }
      });
    };
    const handleCancelOrder = () => {
      let params = {
        order_id: orderid
      };
      utils_api_index.CancelOrder(params).then((res) => {
        console.log(res);
        common_vendor.index.showToast({
          icon: "success",
          duration: 2e3,
          title: "取消成功",
          success() {
            setTimeout(() => {
              common_vendor.wx$1.redirectTo({
                url: "/pages/user/index"
              });
            }, 2e3);
          }
        });
      });
    };
    common_vendor.onLoad((options) => {
      orderid = options.id;
      handleGetOrderInfo();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(str)[common_vendor.unref(orderInfo).status]),
        b: common_vendor.unref(orderInfo).status == 0
      }, common_vendor.unref(orderInfo).status == 0 ? {
        c: common_vendor.t(common_vendor.unref(timeouts))
      } : {}, {
        d: common_vendor.unref(orderInfo).status == 2
      }, common_vendor.unref(orderInfo).status == 2 ? {
        e: common_vendor.t(common_vendor.unref(orderInfo).ship_company),
        f: common_vendor.t(common_vendor.unref(orderInfo).ship_number),
        g: common_vendor.o(handleCopy)
      } : {}, {
        h: common_vendor.t(common_vendor.unref(orderInfo).name),
        i: common_vendor.t(common_vendor.unref(orderInfo).phone),
        j: common_vendor.t(common_vendor.unref(orderInfo).address),
        k: common_vendor.t(common_vendor.unref(orderInfo).create_time),
        l: common_vendor.t(common_vendor.unref(orderInfo).order_no),
        m: "https://dental.cdwuhu.com/" + common_vendor.unref(orderInfo).goods_image,
        n: common_vendor.t(common_vendor.unref(orderInfo).goods_name),
        o: common_vendor.t(common_vendor.unref(orderInfo).num),
        p: common_vendor.t(common_vendor.unref(orderInfo).real_price),
        q: common_vendor.unref(orderInfo).status == 0
      }, common_vendor.unref(orderInfo).status == 0 ? {
        r: common_vendor.o(($event) => common_vendor.isRef(showCancel) ? showCancel.value = true : showCancel = true)
      } : {}, {
        s: common_vendor.unref(orderInfo).status !== 0
      }, common_vendor.unref(orderInfo).status !== 0 ? {
        t: common_vendor.o(handleMakePhoneCall)
      } : {}, {
        v: common_vendor.unref(orderInfo).status == 0
      }, common_vendor.unref(orderInfo).status == 0 ? {
        w: common_vendor.t(common_vendor.unref(orderInfo).real_price),
        x: common_vendor.o(handleToCreateOrder)
      } : {}, {
        y: common_vendor.unref(showCancel)
      }, common_vendor.unref(showCancel) ? {
        z: common_vendor.o(($event) => common_vendor.isRef(showCancel) ? showCancel.value = false : showCancel = false),
        A: common_vendor.o(handleCancelOrder)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2550a99d"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/detail/unpaid.vue"]]);
wx.createPage(MiniProgramPage);
