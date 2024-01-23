"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api_index = require("../../utils/api/index.js");
const _sfc_main = {
  __name: "edit",
  setup(__props) {
    common_vendor.ref(false);
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
    const handleChangeRadio = (e) => {
      console.log(e);
      addrForm.value.is_default = e.detail.value;
    };
    const handleClickRadio = () => {
      addrForm.value.is_default = !addrForm.value.is_default;
    };
    const submitUpdata = () => {
      let params = {
        ...addrForm.value,
        is_default: addrForm.value.is_default == 1 ? 1 : 0,
        address_id: editid
      };
      if (Object.values(params).includes("")) {
        common_vendor.index.showToast({
          title: "格式不正确",
          icon: "error"
        });
        return false;
      }
      utils_api_index.EditAddress(params).then((res) => {
        common_vendor.index.showToast({
          title: "添加成功",
          icon: "success",
          duration: 2e3,
          success() {
            common_vendor.wx$1.navigateTo({
              url: "/pages/userAddress/index"
            });
          }
        });
      });
      console.log(params);
    };
    let editid = null;
    common_vendor.onLoad((option) => {
      addrForm.value.address = option.address;
      addrForm.value.phone = option.phone;
      addrForm.value.name = option.name;
      addrForm.value.provinces = option.provinces;
      addrForm.value.is_default = option.is_default;
      editid = option.id;
      console.log(option);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(addrForm).is_default == 1,
        b: common_vendor.o(handleChangeRadio),
        c: common_vendor.o(handleClickRadio),
        d: common_vendor.unref(addrForm).name,
        e: common_vendor.o(($event) => common_vendor.unref(addrForm).name = $event.detail.value),
        f: common_vendor.unref(addrForm).phone,
        g: common_vendor.o(($event) => common_vendor.unref(addrForm).phone = $event.detail.value),
        h: common_vendor.unref(addrForm).provinces,
        i: common_vendor.o(bindRegionChange),
        j: common_vendor.unref(addrForm).address,
        k: common_vendor.o(($event) => common_vendor.unref(addrForm).address = $event.detail.value),
        l: common_vendor.o(submitUpdata)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-788d9103"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/userAddress/edit.vue"]]);
wx.createPage(MiniProgramPage);
