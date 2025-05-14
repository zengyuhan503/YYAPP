"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "index",
  props: {
    active: "home"
  },
  setup(__props) {
    let props = __props;
    const navTo = (route) => {
      let uri = {
        home: "/pages/index/index",
        detail: "/pages/mall/index",
        user: "/pages/user/index"
      };
      common_vendor.wx$1.redirectTo({
        url: uri[route],
        fail: (err) => {
          console.log(err);
        }
      });
    };
    const handleGetUserProfile = (res) => {
      common_vendor.wx$1.redirectTo({
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
      }, common_vendor.unref(props).active == "home" ? {
        b: common_assets._imports_0$2
      } : {
        c: common_assets._imports_1$2
      }, {
        d: common_vendor.o(($event) => navTo("home")),
        e: common_vendor.unref(props).active == "mall"
      }, common_vendor.unref(props).active == "mall" ? {
        f: common_assets._imports_2$2
      } : {
        g: common_assets._imports_3$1
      }, {
        h: common_vendor.o(($event) => navTo("detail")),
        i: common_vendor.unref(props).active == "user"
      }, common_vendor.unref(props).active == "user" ? {
        j: common_assets._imports_4$1
      } : {
        k: common_assets._imports_5
      }, {
        l: common_vendor.o(handleGetUserProfile)
      });
    };
  }
};
wx.createComponent(_sfc_main);
