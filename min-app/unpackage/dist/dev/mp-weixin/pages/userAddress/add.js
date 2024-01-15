"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "add",
  setup(__props) {
    const isDefault = common_vendor.ref(false);
    let addrForm = common_vendor.ref({
      name: "",
      region: ""
    });
    const bindRegionChange = (e) => {
      console.log(e);
      let detail = e.detail;
      let value = detail.value;
      addrForm.value.region = value.join("-");
      console.log(addrForm.value);
    };
    const submitUpdata = () => {
      common_vendor.index.showToast({
        icon: "error",
        title: "标题",
        duration: 2e3
      });
    };
    return (_ctx, _cache) => {
      return {
        a: isDefault.value,
        b: common_vendor.unref(addrForm).region,
        c: common_vendor.o(bindRegionChange),
        d: common_vendor.o(submitUpdata)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-09e5ba6c"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/userAddress/add.vue"]]);
wx.createPage(MiniProgramPage);
