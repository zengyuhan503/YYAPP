"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/index/bannerinfo.js";
  "./pages/args/index1.js";
  "./pages/args/index2.js";
  "./pages/user/index.js";
  "./pages/about/desc.js";
  "./pages/about/us.js";
  "./pages/userAddress/index.js";
  "./pages/editUser/index.js";
  "./pages/popularScience/index.js";
  "./pages/popularScience/index2.js";
  "./pages/detail/unpaid.js";
  "./pages/mall/purchase.js";
  "./pages/mall/info.js";
  "./pages/mall/index.js";
  "./pages/userAddress/add.js";
  "./pages/userAddress/edit.js";
  "./pages/order/all.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/App.vue"]]);
let i18nConfig = {
  locale: common_vendor.index.getLocale()
  // 获取已设置的语言
};
const i18n = common_vendor.createI18n(i18nConfig);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(i18n);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
