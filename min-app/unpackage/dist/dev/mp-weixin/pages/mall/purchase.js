"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "purchase",
  setup(__props) {
    const count = common_vendor.ref(0);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: count.value == 0
      }, count.value == 0 ? {} : {
        b: common_vendor.o(($event) => count.value--)
      }, {
        c: common_vendor.t(count.value),
        d: common_vendor.o(($event) => count.value++)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bcb386f7"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/mall/purchase.vue"]]);
wx.createPage(MiniProgramPage);
