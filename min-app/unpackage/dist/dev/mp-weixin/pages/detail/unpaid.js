"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api_index = require("../../utils/api/index.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
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
      "-2": "已取消",
      "-3": "已取消",
      all: "全部订单"
    });
    let popup = common_vendor.ref(null);
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
    const handleToGoodsInfo = () => {
      console.log(orderInfo);
      common_vendor.index.navigateTo({
        url: "/pages/mall/info?id=" + orderInfo.value.goods_id
      });
    };
    const handleCopy = () => {
      common_vendor.index.setClipboardData({
        data: orderInfo.value.ship_number + "",
        success: function() {
          common_vendor.index.showToast({
            icon: "none",
            title: "单号复制成功",
            duration: 2e3
          });
        },
        fail: function(err) {
          console.log(err);
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
    const handleOpenShip = () => {
      popup.value.open();
    };
    common_vendor.onUnmounted(() => {
      var _a;
      (_a = popup.value) == null ? void 0 : _a.close();
    });
    common_vendor.onLoad((options) => {
      orderid = options.id;
      handleGetOrderInfo();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(str)[common_vendor.unref(orderInfo).status]),
        b: common_vendor.unref(orderInfo).status == 1
      }, common_vendor.unref(orderInfo).status == 1 ? {} : {}, {
        c: common_vendor.unref(orderInfo).status == 2
      }, common_vendor.unref(orderInfo).status == 2 ? {} : {}, {
        d: common_vendor.unref(orderInfo).status == 3
      }, common_vendor.unref(orderInfo).status == 3 ? {} : {}, {
        e: common_vendor.unref(orderInfo).status == 4
      }, common_vendor.unref(orderInfo).status == 4 ? {} : {}, {
        f: common_vendor.unref(orderInfo).status < 0
      }, common_vendor.unref(orderInfo).status < 0 ? {} : {}, {
        g: common_vendor.unref(orderInfo).status == 0
      }, common_vendor.unref(orderInfo).status == 0 ? {
        h: common_vendor.t(common_vendor.unref(timeouts))
      } : {}, {
        i: common_vendor.unref(orderInfo).status == 2
      }, common_vendor.unref(orderInfo).status == 2 ? common_vendor.e({
        j: common_vendor.unref(orderInfo).ship_code != "ziti"
      }, common_vendor.unref(orderInfo).ship_code != "ziti" ? {
        k: common_vendor.o(handleOpenShip)
      } : {}, {
        l: common_vendor.t(common_vendor.unref(orderInfo).ship_company),
        m: common_vendor.unref(orderInfo).ship_code != "ziti"
      }, common_vendor.unref(orderInfo).ship_code != "ziti" ? {
        n: common_vendor.t(common_vendor.unref(orderInfo).ship_number)
      } : common_vendor.e({
        o: common_vendor.unref(orderInfo).status == 2
      }, common_vendor.unref(orderInfo).status == 2 ? {} : {}, {
        p: common_vendor.unref(orderInfo).status == 4
      }, common_vendor.unref(orderInfo).status == 4 ? {} : {}), {
        q: common_vendor.unref(orderInfo).ship_code != "ziti"
      }, common_vendor.unref(orderInfo).ship_code != "ziti" ? {
        r: common_vendor.o(handleCopy)
      } : {}) : {}, {
        s: common_vendor.t(common_vendor.unref(orderInfo).name),
        t: common_vendor.t(common_vendor.unref(orderInfo).phone),
        v: common_vendor.t(common_vendor.unref(orderInfo).address),
        w: common_vendor.t(common_vendor.unref(orderInfo).create_time),
        x: common_vendor.t(common_vendor.unref(orderInfo).out_trade_no),
        y: "https://dental.cdwuhu.com/" + common_vendor.unref(orderInfo).goods_image,
        z: common_vendor.t(common_vendor.unref(orderInfo).goods_name),
        A: common_vendor.t(common_vendor.unref(orderInfo).num),
        B: common_vendor.t(common_vendor.unref(orderInfo).real_price),
        C: common_vendor.o(handleToGoodsInfo),
        D: common_vendor.unref(orderInfo).status == 0
      }, common_vendor.unref(orderInfo).status == 0 ? {
        E: common_vendor.o(($event) => common_vendor.isRef(showCancel) ? showCancel.value = true : showCancel = true)
      } : {}, {
        F: common_vendor.unref(orderInfo).status == 1 || common_vendor.unref(orderInfo).status == 2 || common_vendor.unref(orderInfo).status == 3 || common_vendor.unref(orderInfo) == 4
      }, common_vendor.unref(orderInfo).status == 1 || common_vendor.unref(orderInfo).status == 2 || common_vendor.unref(orderInfo).status == 3 || common_vendor.unref(orderInfo) == 4 ? {
        G: common_vendor.o(handleMakePhoneCall)
      } : {}, {
        H: common_vendor.unref(orderInfo).status == 0
      }, common_vendor.unref(orderInfo).status == 0 ? {
        I: common_vendor.t(common_vendor.unref(orderInfo).real_price),
        J: common_vendor.o(handleToCreateOrder)
      } : {}, {
        K: common_vendor.unref(showCancel)
      }, common_vendor.unref(showCancel) ? {
        L: common_vendor.o(($event) => common_vendor.isRef(showCancel) ? showCancel.value = false : showCancel = false),
        M: common_vendor.o(handleCancelOrder)
      } : {}, {
        N: common_vendor.t(common_vendor.unref(orderInfo).ship_company),
        O: common_vendor.t(common_vendor.unref(orderInfo).ship_number),
        P: common_vendor.t(common_vendor.unref(orderInfo).ship_state),
        Q: common_vendor.unref(orderInfo).express
      }, common_vendor.unref(orderInfo).express ? common_vendor.e({
        R: common_vendor.unref(orderInfo).express.state == -1
      }, common_vendor.unref(orderInfo).express.state == -1 ? {
        S: common_vendor.t(common_vendor.unref(orderInfo).express.data)
      } : {
        T: common_vendor.f(common_vendor.unref(orderInfo).express.data, (item, index, i0) => {
          return {
            a: common_vendor.t(item.time),
            b: common_vendor.t(item.context),
            c: index
          };
        })
      }) : {}, {
        U: common_vendor.sr(popup, "2550a99d-0", {
          "k": "popup"
        }),
        V: common_vendor.p({
          type: "bottom"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2550a99d"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/detail/unpaid.vue"]]);
wx.createPage(MiniProgramPage);
