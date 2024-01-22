"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api_index = require("../../utils/api/index.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  _easycom_uni_nav_bar2();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  _easycom_uni_nav_bar();
}
const _sfc_main = {
  __name: "us",
  setup(__props) {
    let aboutDescs = common_vendor.ref("");
    let refStyle = common_vendor.ref({
      top: "46px"
    });
    common_vendor.onMounted(() => {
      utils_api_index.AboutUs().then((res) => {
        console.log(res);
      });
    });
    const handleleft = () => {
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    common_vendor.onShow((options) => {
      const res = common_vendor.wx$1.getMenuButtonBoundingClientRect();
      height.value = res.height;
      refStyle.value["top"] = res.top + "px";
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleleft),
        b: common_vendor.p({
          ["left-icon"]: "left",
          border: false,
          backgroundColor: "transparent",
          title: "关于我们",
          height: _ctx.height,
          color: "#000000"
        }),
        c: common_vendor.s(common_vendor.unref(refStyle)),
        d: common_vendor.unref(aboutDescs)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-99a1d68c"], ["__file", "J:/YYAPP-master (2)/YYAPP-master/min-app/pages/about/us.vue"]]);
wx.createPage(MiniProgramPage);
