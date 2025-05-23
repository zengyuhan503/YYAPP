"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
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
    const handleClickLogin = () => {
      if (!isArg.value) {
        common_vendor.index.showToast({
          icon: "error",
          title: "请阅读并同意",
          duration: 2e3
        });
        return false;
      }
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
                  handleServerGetUserInfo();
                  handleGetOrderList();
                });
              }
            }
          });
        }
      });
    };
    let isArg = common_vendor.ref(false);
    const handleClickRadio = () => {
      isArg.value = !isArg.value;
    };
    const handleToArg1 = () => {
      common_vendor.index.navigateTo({
        url: "/pages/args/index1"
      });
    };
    const handleToArg2 = () => {
      common_vendor.index.navigateTo({
        url: "/pages/args/index2"
      });
    };
    common_vendor.onLoad((e) => {
      wxInfo = e;
    });
    common_vendor.onShow(() => {
      handleGetOrderList();
      handleServerGetUserInfo();
    });
    const handleEditInfo = () => {
      common_vendor.wx$1.navigateTo({
        url: "/pages/editUser/index"
      });
    };
    const handleServerGetUserInfo = () => {
      utils_api_index.GetServerUserInfo().then((res) => {
        userInfo.value = res;
        userInfo.value.avatar = "https://www.yuyandental.com/" + res.avatar;
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
    let orderList = {
      0: [],
      2: [],
      4: [],
      all: []
    };
    const handleGetOrderList = () => {
      let params = {
        page: 1,
        page_size: 1e3,
        status: "all"
      };
      utils_api_index.GetOrderList(params).then((res) => {
        let list = res.data;
        orderList["0"] = list.filter((item) => item.status == 0);
        orderList["2"] = list.filter((item) => item.status == 2);
        orderList["4"] = list.filter((item) => item.status == 4);
        orderList["all"] = list;
      });
    };
    common_vendor.onShareAppMessage(() => {
      return {
        title: "多一点预防，多一点健康",
        path: "/pages/user/index"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "多一点预防，多一点健康",
        path: "/pages/user/index"
      };
    });
    const handleToOrderPage = (status) => {
      let str = {
        0: "待付款",
        2: "待收货",
        4: "完成",
        all: "全部"
      };
      if (orderList[status].length == 0) {
        common_vendor.index.showToast({
          icon: "error",
          title: `无${str[status]}订单`,
          duration: 2e3
        });
        return false;
      }
      if (status == 0) {
        let orderid = orderList[status][0].id;
        common_vendor.index.navigateTo({
          url: "/pages/detail/unpaid?id=" + orderid
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/order/all?status=" + status
        });
      }
    };
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
      }, isLogin.value ? {
        g: common_vendor.o(($event) => handleToOrderPage("0")),
        h: common_vendor.o(($event) => handleToOrderPage("2")),
        i: common_vendor.o(($event) => handleToOrderPage("4")),
        j: common_vendor.o(($event) => handleToOrderPage("all"))
      } : {}, {
        k: isLogin.value
      }, isLogin.value ? {
        l: common_vendor.p({
          type: "right",
          size: "18",
          color: "#B3BAC5"
        }),
        m: common_vendor.o(handleToAddress),
        n: common_vendor.p({
          type: "right",
          size: "18",
          color: "#B3BAC5"
        }),
        o: common_vendor.o(handleToAboutDesc),
        p: common_vendor.p({
          type: "right",
          size: "18",
          color: "#B3BAC5"
        }),
        q: common_vendor.o(handleToAboutUs),
        r: common_vendor.p({
          type: "right",
          size: "18",
          color: "#B3BAC5"
        }),
        s: common_vendor.o(($event) => showCtUs.value = true)
      } : {}, {
        t: !isLogin.value
      }, !isLogin.value ? {
        v: common_vendor.unref(isArg),
        w: common_assets._imports_0,
        x: common_vendor.o(handleClickRadio),
        y: common_vendor.o(handleToArg1),
        z: common_vendor.o(handleToArg2)
      } : {}, {
        A: isLogin.value
      }, isLogin.value ? {
        B: common_vendor.o(handleLoginOut)
      } : common_vendor.e({
        C: common_vendor.unref(isArg)
      }, common_vendor.unref(isArg) ? {
        D: common_vendor.o(getinfos)
      } : {
        E: common_vendor.o(handleClickLogin)
      }), {
        F: common_vendor.p({
          active: "user"
        }),
        G: showCtUs.value
      }, showCtUs.value ? {
        H: common_vendor.o(($event) => showCtUs.value = false),
        I: common_vendor.p({
          type: "closeempty",
          size: "30"
        }),
        J: common_vendor.o(handleMakePhoneCall)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-79e6a490"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
