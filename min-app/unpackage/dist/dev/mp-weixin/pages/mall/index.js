"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  _easycom_uni_swiper_dot2();
}
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
if (!Math) {
  (_easycom_uni_swiper_dot + navs)();
}
const navs = () => "../../components/navs/index.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(3, (item, index, i0) => {
          return {
            a: index
          };
        }),
        b: common_vendor.o((...args) => _ctx.change && _ctx.change(...args)),
        c: _ctx.swiperDotIndex,
        d: common_vendor.p({
          field: "content"
        }),
        e: common_vendor.p({
          active: "mall"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-43c06b56"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/mall/index.vue"]]);
wx.createPage(MiniProgramPage);
