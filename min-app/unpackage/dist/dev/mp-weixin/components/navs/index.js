"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  props: {
    active: "home"
  },
  setup(__props) {
    const props = __props;
    const navTo = (route) => {
      let uri = {
        home: "/pages/index/index",
        detail: "/pages/mall/index",
        user: "/pages/user/index"
      };
      common_vendor.wx$1.navigateTo({
        url: uri[route],
        fail: (err) => {
          console.log(err);
        }
      });
    };
    const handleGetUserProfile = (res) => {
      common_vendor.wx$1.navigateTo({
        url: `/pages/user/index`,
        fail: (err) => {
          console.log(err);
        }
      });
    };
    console.log(props);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(props).active == "home"
      }, common_vendor.unref(props).active == "home" ? {} : {}, {
        b: common_vendor.o(($event) => navTo("home")),
        c: common_vendor.unref(props).active == "mall"
      }, common_vendor.unref(props).active == "mall" ? {} : {}, {
        d: common_vendor.o(($event) => navTo("detail")),
        e: common_vendor.o(handleGetUserProfile)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/components/navs/index.vue"]]);
wx.createComponent(Component);
