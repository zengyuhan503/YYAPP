"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/user/index.js";
  "./pages/about/desc.js";
  "./pages/about/us.js";
  "./pages/userAddress/index.js";
  "./pages/index/index.js";
  "./pages/editUser/index.js";
  "./pages/popularScience/index.js";
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
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
