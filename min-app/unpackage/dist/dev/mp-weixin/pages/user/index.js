"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api_index = require("../../utils/api/index.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_icons + navs)();
}
const navs = () => "../../components/navs/index.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref(-1);
    common_vendor.ref(-1);
    common_vendor.ref(0);
    common_vendor.ref([{}]);
    common_vendor.ref("default");
    common_vendor.ref({});
    common_vendor.ref(0);
    let userInfo = common_vendor.ref({
      avatar: null,
      nickname: null,
      user_id: null,
      session_key: null,
      wx_openid: null
    });
    let wxInfo = {};
    const isLogin = common_vendor.ref(false);
    const showCtUs = common_vendor.ref(false);
    const handleMakePhoneCall = () => {
      common_vendor.index.makePhoneCall({
        phoneNumber: "15522756996"
        //仅为示例
      });
    };
    const handleGetUserInfo = (fn) => {
      let params = {
        cloudID: wxInfo.cloudID,
        code: wxInfo.code,
        encryptedData: wxInfo.encryptedData,
        rawData: wxInfo.rawData,
        iv: wxInfo.iv,
        signature: wxInfo.signature
      };
      utils_api_index.GetUserInfo(params).then((res) => {
        let info = {
          ...res
        };
        userInfo.value = {
          avatar: info.avatar,
          nickname: info.nickname,
          user_id: info.user_id,
          session_key: info.session_key,
          wx_openid: info.wx_openid
        };
        common_vendor.index.setStorage({
          key: "yy-userinfo",
          data: JSON.stringify({
            avatar: info.avatar,
            nickname: info.nickname,
            user_id: info.user_id,
            session_key: info.session_key,
            wx_openid: info.wx_openid
          }),
          success: function() {
            console.log("success");
          }
        });
        common_vendor.index.setStorageSync("yy-token", res.token.token);
        common_vendor.index.setStorage({
          key: "yy-is_login",
          data: true
        });
        isLogin.value = true;
        fn();
      });
    };
    const handleLoginOut = () => {
      common_vendor.index.removeStorageSync("yy-token");
      common_vendor.index.removeStorageSync("yy-userinfo");
      isLogin.value = false;
    };
    const getinfos = (e) => {
      let detail = e.detail;
      common_vendor.index.login({
        provider: "weixin",
        //使用微信登录
        success: function(loginRes) {
          common_vendor.index.getUserInfo({
            provider: "weixin",
            success: function(infoRes) {
              let query = {
                cloudID: infoRes.cloudID,
                encryptedData: infoRes.encryptedData,
                iv: infoRes.iv,
                rawData: infoRes.rawData,
                signature: infoRes.signature,
                code: loginRes.code
              };
              wxInfo = query;
              if (detail.errMsg.indexOf("ok") != -1) {
                let params = {
                  code: detail.code
                };
                handleGetUserInfo(() => {
                  utils_api_index.GetUserPhone(params).then((res) => {
                    console.log(res);
                    common_vendor.index.setStorageSync("yy-phone", res);
                  });
                });
              }
            }
          });
        }
      });
    };
    common_vendor.onLoad((e) => {
      wxInfo = e;
    });
    const handleEditInfo = () => {
      common_vendor.wx$1.navigateTo({
        url: "/pages/editUser/index"
      });
    };
    const handleServerGetUserInfo = () => {
      utils_api_index.GetServerUserInfo().then((res) => {
        userInfo.value = res;
        console.log(res);
        userInfo.value.avatar = "https://dental.cdwuhu.com/" + res.avatar;
        isLogin.value = true;
      });
    };
    const handleToAddress = () => {
      common_vendor.wx$1.navigateTo({
        url: "/pages/userAddress/index"
      });
    };
    const handleToAboutDesc = () => {
      common_vendor.wx$1.navigateTo({
        url: "/pages/about/desc"
      });
    };
    const handleToAboutUs = () => {
      common_vendor.wx$1.navigateTo({
        url: "/pages/about/us"
      });
    };
    common_vendor.onMounted(() => {
      handleServerGetUserInfo();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !isLogin.value
      }, !isLogin.value ? {} : {
        b: common_vendor.unref(userInfo).avatar
      }, {
        c: isLogin.value
      }, isLogin.value ? {
        d: common_vendor.t(common_vendor.unref(userInfo).nickname),
        e: common_vendor.o(handleEditInfo)
      } : {}, {
        f: isLogin.value
      }, isLogin.value ? {} : {}, {
        g: isLogin.value
      }, isLogin.value ? {
        h: common_vendor.p({
          type: "right",
          size: "18",
          color: "#B3BAC5"
        }),
        i: common_vendor.o(handleToAddress),
        j: common_vendor.p({
          type: "right",
          size: "18",
          color: "#B3BAC5"
        }),
        k: common_vendor.o(handleToAboutDesc),
        l: common_vendor.p({
          type: "right",
          size: "18",
          color: "#B3BAC5"
        }),
        m: common_vendor.o(handleToAboutUs),
        n: common_vendor.p({
          type: "right",
          size: "18",
          color: "#B3BAC5"
        }),
        o: common_vendor.o(($event) => showCtUs.value = true)
      } : {}, {
        p: isLogin.value
      }, isLogin.value ? {
        q: common_vendor.o(handleLoginOut)
      } : {
        r: common_vendor.o(getinfos)
      }, {
        s: showCtUs.value
      }, showCtUs.value ? {
        t: common_vendor.o(($event) => showCtUs.value = false),
        v: common_vendor.p({
          type: "closeempty",
          size: "30"
        }),
        w: common_vendor.o(handleMakePhoneCall)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-79e6a490"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/user/index.vue"]]);
wx.createPage(MiniProgramPage);
