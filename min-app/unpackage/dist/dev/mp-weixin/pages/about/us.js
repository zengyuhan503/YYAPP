"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api_index = require("../../utils/api/index.js");
const _sfc_main = {
  __name: "us",
  setup(__props) {
    let aboutDescs = common_vendor.ref("");
    common_vendor.onMounted(() => {
      utils_api_index.AboutUs().then((res) => {
        console.log(res);
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(aboutDescs)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-99a1d68c"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/about/us.vue"]]);
wx.createPage(MiniProgramPage);
