"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api_index = require("../../utils/api/index.js");
const _sfc_main = {
  __name: "unpaid",
  setup(__props) {
    let str = common_vendor.ref({
      0: "待付款",
      2: "待收货",
      4: "完成订单",
      all: "全部订单"
    });
    let orderid = null;
    let orderInfo = common_vendor.ref({});
    let showCancel = common_vendor.ref(false);
    common_vendor.onLoad((options) => {
      orderid = options.id;
      handleGetOrderInfo();
    });
    let timeouts = common_vendor.ref("");
    const handleMakePhoneCall = () => {
      common_vendor.index.makePhoneCall({
        phoneNumber: "15522756996"
        //仅为示例
      });
    };
    const handleGetOrderInfo = () => {
      let params = {
        order_id: orderid
      };
      utils_api_index.GetOrderInfo(params).then((res) => {
        console.log(res);
        orderInfo.value = res;
        const currentTime = common_vendor.hooks();
        const createTimeMoment = common_vendor.hooks(res.create_time, "YYYY-MM-DD HH:mm:ss");
        const timeDifferenceSeconds = createTimeMoment.diff(currentTime, "seconds");
        const hours = Math.floor(Math.abs(timeDifferenceSeconds) / 3600);
        const minutes = Math.floor(Math.abs(timeDifferenceSeconds) % 3600 / 60);
        const seconds = Math.abs(timeDifferenceSeconds) % 60;
        const formattedCountdown = `${timeDifferenceSeconds >= 0 ? "" : "-"} ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        console.log(formattedCountdown);
        timeouts.value = formattedCountdown;
      });
    };
    const handleCopy = () => {
      common_vendor.index.setClipboardData({
        data: orderInfo.ship_number,
        success: function() {
          console.log("success");
        }
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(str)[common_vendor.unref(orderInfo).status]),
        b: common_vendor.unref(orderInfo).status == 0
      }, common_vendor.unref(orderInfo).status == 0 ? {} : {}, {
        c: common_vendor.unref(orderInfo).status == 2
      }, common_vendor.unref(orderInfo).status == 2 ? {
        d: common_vendor.t(common_vendor.unref(orderInfo).ship_company),
        e: common_vendor.t(common_vendor.unref(orderInfo).ship_number),
        f: common_vendor.o(handleCopy)
      } : {}, {
        g: common_vendor.t(common_vendor.unref(orderInfo).name),
        h: common_vendor.t(common_vendor.unref(orderInfo).phone),
        i: common_vendor.t(common_vendor.unref(orderInfo).address),
        j: common_vendor.t(common_vendor.unref(orderInfo).create_time),
        k: common_vendor.t(common_vendor.unref(orderInfo).order_no),
        l: "https://dental.cdwuhu.com/" + common_vendor.unref(orderInfo).goods_image,
        m: common_vendor.t(common_vendor.unref(orderInfo).goods_name),
        n: common_vendor.t(common_vendor.unref(orderInfo).num),
        o: common_vendor.t(common_vendor.unref(orderInfo).real_price),
        p: common_vendor.unref(orderInfo).status == 0
      }, common_vendor.unref(orderInfo).status == 0 ? {
        q: common_vendor.o(($event) => common_vendor.isRef(showCancel) ? showCancel.value = true : showCancel = true)
      } : {}, {
        r: common_vendor.unref(orderInfo).status !== 0
      }, common_vendor.unref(orderInfo).status !== 0 ? {
        s: common_vendor.o(handleMakePhoneCall)
      } : {}, {
        t: common_vendor.unref(orderInfo).status == 0
      }, common_vendor.unref(orderInfo).status == 0 ? {
        v: common_vendor.t(common_vendor.unref(orderInfo).real_price),
        w: common_vendor.o(handleToCreateOrder)
      } : {}, {
        x: common_vendor.unref(showCancel)
      }, common_vendor.unref(showCancel) ? {
        y: common_vendor.o(($event) => common_vendor.isRef(showCancel) ? showCancel.value = false : showCancel = false),
        z: common_vendor.o(handleCancelOrder)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2550a99d"], ["__file", "J:/YYAPP-master (2)/YYAPP-master/min-app/pages/detail/unpaid.vue"]]);
wx.createPage(MiniProgramPage);
