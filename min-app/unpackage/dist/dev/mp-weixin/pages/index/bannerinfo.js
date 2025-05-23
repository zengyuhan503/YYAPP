"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "bannerinfo",
  setup(__props) {
    let info = common_vendor.ref({
      long_image: "",
      url: ""
    });
    common_vendor.onLoad((options) => {
      console.log(options);
      info.value = options;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(info).long_image != ""
      }, common_vendor.unref(info).long_image != "" ? {
        b: "https://www.yuyandental.com/" + common_vendor.unref(info).long_image
      } : {}, {
        c: common_vendor.unref(info).url != ""
      }, common_vendor.unref(info).url != "" ? {
        d: common_vendor.unref(info).url
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-63965d32"]]);
wx.createPage(MiniProgramPage);
