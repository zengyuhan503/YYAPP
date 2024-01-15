"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  _easycom_uni_nav_bar2();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  _easycom_uni_nav_bar();
}
const _sfc_main = {
  __name: "index",
  props: {
    title: String
  },
  setup(__props) {
    const props = __props;
    let refStyle = common_vendor.ref({
      "padding-top": "42px"
    });
    let height = common_vendor.ref(0);
    let pageTitle = common_vendor.ref("标题");
    pageTitle.value = props.title;
    common_vendor.onLaunch((options) => {
      console.log(options);
    });
    common_vendor.onShow((options) => {
      const res = common_vendor.wx$1.getMenuButtonBoundingClientRect();
      height.value = res.height;
      refStyle.value["padding-top"] = res.top + "px";
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["left-icon"]: "left",
          border: false,
          backgroundColor: "transparent",
          title: common_vendor.unref(pageTitle),
          height: common_vendor.unref(height),
          color: "#ffffff"
        }),
        b: common_vendor.s(common_vendor.unref(refStyle))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/components/header/index.vue"]]);
wx.createComponent(Component);
