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
    const handleleft = () => {
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    let refStyle = common_vendor.ref({
      top: "46px"
    });
    let height = common_vendor.ref(0);
    common_vendor.onShow((options) => {
      const res = common_vendor.wx$1.getMenuButtonBoundingClientRect();
      height.value = res.height;
      refStyle.value["top"] = res.top + "px";
    });
    let aboutDescs = common_vendor.ref("");
    common_vendor.onMounted(() => {
      utils_api_index.AboutUs().then((res) => {
        aboutDescs.value = "https://dental.cdwuhu.com/" + res.image;
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleleft),
        b: common_vendor.p({
          ["left-icon"]: "left",
          border: false,
          backgroundColor: "transparent",
          title: "",
          height: common_vendor.unref(height),
          color: "#ffffff"
        }),
        c: common_vendor.s(common_vendor.unref(refStyle)),
        d: common_vendor.unref(aboutDescs)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-99a1d68c"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/about/us.vue"]]);
wx.createPage(MiniProgramPage);
