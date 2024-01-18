"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api_index = require("../../utils/api/index.js");
const _sfc_main = {
  __name: "unpaid",
  setup(__props) {
    let orderid = null;
    let orderInfo = common_vendor.ref({});
    let showCancel = common_vendor.ref(false);
    common_vendor.onLoad((options) => {
      orderid = options.id;
      handleGetOrderInfo();
    });
    let timeouts = common_vendor.ref("");
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
    const handleCancelOrder = () => {
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(timeouts)),
        b: common_vendor.unref(orderInfo).status == 2
      }, common_vendor.unref(orderInfo).status == 2 ? {} : {}, {
        c: common_vendor.t(common_vendor.unref(orderInfo).name),
        d: common_vendor.t(common_vendor.unref(orderInfo).phone),
        e: common_vendor.t(common_vendor.unref(orderInfo).address),
        f: common_vendor.t(common_vendor.unref(orderInfo).create_time),
        g: common_vendor.t(common_vendor.unref(orderInfo).order_no),
        h: "https://dental.cdwuhu.com/" + common_vendor.unref(orderInfo).goods_image,
        i: common_vendor.t(common_vendor.unref(orderInfo).goods_name),
        j: common_vendor.t(common_vendor.unref(orderInfo).num),
        k: common_vendor.t(common_vendor.unref(orderInfo).real_price),
        l: common_vendor.unref(orderInfo).status == 0
      }, common_vendor.unref(orderInfo).status == 0 ? {
        m: common_vendor.o(($event) => common_vendor.isRef(showCancel) ? showCancel.value = true : showCancel = true)
      } : {}, {
        n: common_vendor.unref(orderInfo).status !== 0
      }, common_vendor.unref(orderInfo).status !== 0 ? {} : {}, {
        o: common_vendor.unref(orderInfo).status == 0
      }, common_vendor.unref(orderInfo).status == 0 ? {
        p: common_vendor.t(common_vendor.unref(orderInfo).real_price)
      } : {}, {
        q: common_vendor.unref(showCancel)
      }, common_vendor.unref(showCancel) ? {
        r: common_vendor.o(($event) => common_vendor.isRef(showCancel) ? showCancel.value = false : showCancel = false),
        s: common_vendor.o(handleCancelOrder)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2550a99d"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/detail/unpaid.vue"]]);
wx.createPage(MiniProgramPage);
