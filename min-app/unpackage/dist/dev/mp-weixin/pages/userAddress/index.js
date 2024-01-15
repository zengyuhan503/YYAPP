"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api_index = require("../../utils/api/index.js");
if (!Array) {
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  (_easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2)();
}
const _easycom_uni_swipe_action_item = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
if (!Math) {
  (_easycom_uni_swipe_action_item + _easycom_uni_swipe_action)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref([
      {
        text: "取消",
        style: {
          backgroundColor: "#007aff"
        }
      },
      {
        text: "确认",
        style: {
          backgroundColor: "#F56C6C"
        }
      }
    ]);
    common_vendor.ref([]);
    let isOpened = common_vendor.ref(false);
    const bindClick = (e) => {
      console.log(e);
      common_vendor.index.showToast({
        title: `点击了${e.position === "left" ? "左侧" : "右侧"} ${e.content.text}按钮`,
        icon: "none"
      });
    };
    const change = (e) => {
      console.log(e);
    };
    const handleToCreateAdds = () => {
      common_vendor.index.navigateTo({
        url: "/pages/userAddress/add"
      });
    };
    const handleGetAddressList = () => {
      utils_api_index.GetAddressList().then((res) => {
        console.log(res);
      });
    };
    common_vendor.onMounted(() => {
      handleGetAddressList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(change),
        b: common_vendor.o(bindClick),
        c: common_vendor.p({
          show: common_vendor.unref(isOpened),
          ["auto-close"]: false
        }),
        d: common_vendor.o(handleToCreateAdds)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7f8df939"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/userAddress/index.vue"]]);
wx.createPage(MiniProgramPage);
