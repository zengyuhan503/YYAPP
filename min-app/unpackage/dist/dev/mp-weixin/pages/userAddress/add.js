"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api_index = require("../../utils/api/index.js");
const _sfc_main = {
  __name: "add",
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
    };
    const handleClickRadio = () => {
      addrForm.value.is_default = !addrForm.value.is_default;
    };
    const submitUpdata = () => {
      let params = {
        ...addrForm.value,
        is_default: addrForm.value.is_default == 1 ? 1 : 0
      };
      if (Object.values(params).includes("")) {
        common_vendor.index.showToast({
          title: "格式不正确",
          icon: "error"
        });
        return false;
      }
      utils_api_index.CreateAddress(params).then((res) => {
        common_vendor.index.showToast({
          title: "添加成功",
          icon: "success",
          duration: 2e3,
          success() {
            common_vendor.wx$1.redirectTo({
              url: "/pages/userAddress/index"
            });
          }
        });
      });
      console.log(params);
    };
    common_vendor.onMounted(() => {
      let phone = common_vendor.index.getStorageSync("yy-phone");
      if (phone) {
        addrForm.value.phone = phone;
      }
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-09e5ba6c"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/userAddress/add.vue"]]);
wx.createPage(MiniProgramPage);
