"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "add",
  setup(__props) {
    const isDefault = common_vendor.ref(false);
    let addrForm = common_vendor.ref({
      name: "",
      phone: "",
      provinces: "",
      address: "",
      is_default: ""
    });
    const bindRegionChange = (e) => {
      console.log(e);
      let detail = e.detail;
      let value = detail.value;
      addrForm.value.provinces = value.join("-");
      console.log(addrForm.value);
    };
    const submitUpdata = () => {
      console.log(isDefault.value);
      let params = {
        ...addrForm.value,
        is_default: isDefault.value ? 1 : 0
      };
      console.log(params);
    };
    return (_ctx, _cache) => {
      return {
        a: isDefault.value,
        b: common_vendor.unref(addrForm).name,
        c: common_vendor.o(($event) => common_vendor.unref(addrForm).name = $event.detail.value),
        d: common_vendor.unref(addrForm).phone,
        e: common_vendor.o(($event) => common_vendor.unref(addrForm).phone = $event.detail.value),
        f: common_vendor.unref(addrForm).provinces,
        g: common_vendor.o(bindRegionChange),
        h: common_vendor.unref(addrForm).address,
        i: common_vendor.o(($event) => common_vendor.unref(addrForm).address = $event.detail.value),
        j: common_vendor.o(submitUpdata)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-09e5ba6c"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/userAddress/add.vue"]]);
wx.createPage(MiniProgramPage);
