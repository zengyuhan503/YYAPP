"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (Header + DateElement)();
}
const Header = () => "../../components/header/index.js";
const DateElement = () => "../../components/DateElement.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let showDate = common_vendor.ref(false);
    let popularForm = common_vendor.ref({
      name: "",
      count: 0
    });
    const handleShowPopup = () => {
      showDate.value = true;
    };
    const handleClosePopup = () => {
      showDate.value = false;
    };
    let selectror = common_vendor.ref(1);
    const handleSelectCount = (e) => {
      console.log(e);
      popularForm.value.count = e.detail.value;
    };
    let array = common_vendor.ref(["1", "2", "3", "4"]);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "科普馆预约"
        }),
        b: common_vendor.unref(popularForm).name,
        c: common_vendor.unref(popularForm).name,
        d: common_vendor.unref(popularForm).name,
        e: common_vendor.o(handleShowPopup),
        f: common_vendor.unref(popularForm).count,
        g: common_vendor.unref(selectror),
        h: common_vendor.unref(array),
        i: common_vendor.o(handleSelectCount),
        j: common_vendor.unref(showDate)
      }, common_vendor.unref(showDate) ? {
        k: common_vendor.o(handleClosePopup)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/popularScience/index.vue"]]);
wx.createPage(MiniProgramPage);
