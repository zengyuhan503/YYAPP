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
    common_vendor.onMounted(() => {
      common_vendor.index.getStorage({
        key: "yy-is_login",
        success: function(res) {
          if (res != null) {
            isLogin.value = true;
            let info = common_vendor.index.getStorage({
              key: "yy-userinfo",
              success(res2) {
                console.log(res2);
                info = res2.data;
                userInfo.value = JSON.parse(info);
                console.log(userInfo.value);
              },
              fail(err) {
                isLogin.value = false;
              }
            });
          } else {
            isLogin.value = false;
          }
        },
        fail(err) {
          isLogin.value = false;
        }
      });
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
        i: common_vendor.p({
          type: "right",
          size: "18",
          color: "#B3BAC5"
        }),
        j: common_vendor.p({
          type: "right",
          size: "18",
          color: "#B3BAC5"
        }),
        k: common_vendor.p({
          type: "right",
          size: "18",
          color: "#B3BAC5"
        })
      } : {}, {
        l: isLogin.value
      }, isLogin.value ? {} : {
        m: common_vendor.o(getinfos)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-79e6a490"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/user/index.vue"]]);
wx.createPage(MiniProgramPage);
