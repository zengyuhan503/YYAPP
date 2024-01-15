"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let alignmentFormData = common_vendor.ref({
      avatar: null,
      nickname: null
    });
    common_vendor.onMounted(() => {
      try {
        let info = common_vendor.index.getStorageSync("yy-userinfo");
        console.log(common_vendor.index.getStorageSync("yy-phone"));
        info = JSON.parse(info);
        alignmentFormData.value.avatar = info.avatar;
        alignmentFormData.value.nickname = info.nickname;
        alignmentFormData.value.phone = common_vendor.index.getStorageSync("yy-phone");
      } catch (error) {
        common_vendor.index.removeStorageSync("yy-userinfo");
        common_vendor.wx$1.navigateTo({
          url: "/pages/user/index"
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.unref(alignmentFormData).nickname = $event),
        b: common_vendor.p({
          placeholder: "请输入姓名",
          modelValue: common_vendor.unref(alignmentFormData).nickname
        }),
        c: common_vendor.p({
          label: "姓名"
        }),
        d: common_vendor.o(_ctx.getinfos),
        e: common_vendor.o(($event) => common_vendor.unref(alignmentFormData).phone = $event),
        f: common_vendor.p({
          placeholder: "请输入手机号",
          modelValue: common_vendor.unref(alignmentFormData).phone
        }),
        g: common_vendor.p({
          label: "电话"
        }),
        h: common_vendor.sr("baseForm", "d9dfb2ef-0"),
        i: common_vendor.p({
          modelValue: common_vendor.unref(alignmentFormData),
          ["label-position"]: "left"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d9dfb2ef"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/editUser/index.vue"]]);
wx.createPage(MiniProgramPage);
