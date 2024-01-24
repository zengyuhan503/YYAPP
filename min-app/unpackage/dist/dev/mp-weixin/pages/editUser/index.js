"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api_index = require("../../utils/api/index.js");
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
      nickname: null,
      phone: ""
    });
    const handleEditNickname = () => {
      let params = {
        ...alignmentFormData.value
      };
      params.avatar = params.avatar.replace("https://dental.cdwuhu.com/", "");
      utils_api_index.EditUserInfo(params).then((res) => {
        console.log(res);
        common_vendor.index.showToast({
          title: "修改成功",
          duration: 2e3
        });
        handleServerGetUserInfo();
      });
    };
    const handleServerGetUserInfo = () => {
      utils_api_index.GetServerUserInfo().then((res) => {
        console.log(res.avatar.indexOf("thirdwx.qlogo"));
        if (res.avatar.indexOf("thirdwx.qlogo") == -1) {
          alignmentFormData.value.avatar = "https://dental.cdwuhu.com/" + res.avatar;
        } else {
          alignmentFormData.value.avatar = res.avatar;
        }
        alignmentFormData.value.nickname = res.nickname;
      });
    };
    const handlebindchooseavatar = (e) => {
      let avatar = e.detail.avatarUrl;
      common_vendor.index.uploadFile({
        url: "https://dental.cdwuhu.com/api/upload",
        //仅为示例，非真实的接口地址
        filePath: avatar,
        name: "limit_image",
        success: (uploadFileRes) => {
          let url = uploadFileRes.data;
          url = JSON.parse(url);
          alignmentFormData.value.avatar = "https://dental.cdwuhu.com/" + url.data;
          let params = {
            ...alignmentFormData.value,
            avatar: url.data
          };
          utils_api_index.EditUserInfo(params).then((res) => {
            common_vendor.index.showToast({
              title: "修改成功",
              duration: 2e3,
              icon: "success"
            });
            handleServerGetUserInfo();
          });
        }
      });
    };
    const getinfos = (e) => {
      let detail = e.detail;
      if (detail.errMsg.indexOf("ok") != -1) {
        let params = {
          code: detail.code
        };
        utils_api_index.GetUserPhone(params).then((res) => {
          if (res === alignmentFormData.value.phone)
            return false;
          alignmentFormData.value.phone = res;
          let params2 = {
            ...alignmentFormData.value
          };
          utils_api_index.EditUserInfo(params2).then((res2) => {
            common_vendor.index.showToast({
              title: "修改成功",
              duration: 2e3,
              icon: "success"
            });
            handleServerGetUserInfo();
          });
        });
      }
    };
    common_vendor.onMounted(() => {
      try {
        handleServerGetUserInfo();
        alignmentFormData.value.phone = common_vendor.index.getStorageSync("yy-phone");
      } catch (error) {
        common_vendor.index.removeStorageSync("yy-userinfo");
        common_vendor.wx$1.redirectTo({
          url: "/pages/user/index"
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(alignmentFormData).avatar,
        b: common_vendor.o(handlebindchooseavatar),
        c: common_vendor.o(handleEditNickname),
        d: common_vendor.o(($event) => common_vendor.unref(alignmentFormData).nickname = $event),
        e: common_vendor.p({
          inputBorder: false,
          color: "rgba(0, 0, 0, 0.3)",
          placeholder: "请输入姓名",
          modelValue: common_vendor.unref(alignmentFormData).nickname
        }),
        f: common_vendor.p({
          label: "姓名"
        }),
        g: common_vendor.o(($event) => common_vendor.unref(alignmentFormData).phone = $event),
        h: common_vendor.p({
          disabled: true,
          type: "number",
          inputBorder: false,
          color: "rgba(0, 0, 0, 0.3)",
          placeholder: "请输入手机号",
          modelValue: common_vendor.unref(alignmentFormData).phone
        }),
        i: common_vendor.o(getinfos),
        j: common_vendor.p({
          label: "电话"
        }),
        k: common_vendor.sr("baseForm", "d9dfb2ef-0"),
        l: common_vendor.p({
          modelValue: common_vendor.unref(alignmentFormData),
          ["label-position"]: "left"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d9dfb2ef"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/editUser/index.vue"]]);
wx.createPage(MiniProgramPage);
