"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index2",
  setup(__props) {
    let argHtmls = common_vendor.ref(`<p><br></p><p>隐私政策</p><p><br></p><p>我们非常重视您的隐私保护，尊重并保护所有使用小程序用户的个人隐私权。本《隐私政策》（以下简称“政策”）帮助您了解我们收集哪些信息，为什么收集这些信息，以及我们如何使用这些信息。</p><p>1. 信息收集：为了提供更好的服务与改善用户体验，我们会收集您在注册、使用小程序服务过程中提供的个人信息，包括但不限于姓名、电话号码、电子邮件地址等。我们也可能会收集您使用服务时的设备信息、操作记录等。</p><p>2. 信息使用：我们收集信息的主要目的在于提供、维护、保护和改善当前的服务，开发新的服务，并保护我们和我们的用户。我们承诺不会将这些信息出售或共享给第三方，除非有法律要求或得到您的明确许可。</p><p>3. 信息安全：我们严格保护您个人信息的安全。我们使用各种安全技术和程序来保护您的个人信息不被未授权的访问、使用或泄露。</p>`);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(argHtmls)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/args/index2.vue"]]);
wx.createPage(MiniProgramPage);