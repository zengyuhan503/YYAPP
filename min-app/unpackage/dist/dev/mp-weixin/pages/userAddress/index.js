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
    let addressList = common_vendor.ref([]);
    let isOpened = common_vendor.ref(false);
    const bindClick = (e) => {
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
    function objectToQueryString(obj) {
      var queryString = "";
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (queryString.length > 0) {
            queryString += "&";
          }
          queryString += key + "=" + obj[key];
        }
      }
      return "?" + queryString;
    }
    const handleGetAddressList = () => {
      utils_api_index.GetAddressList().then((res) => {
        console.log(res);
        addressList.value = res;
      });
    };
    const handleEditAdd = (item) => {
      let querys = objectToQueryString(item);
      let url = `/pages/userAddress/edit${querys}`;
      console.log(url);
      common_vendor.index.navigateTo({
        url
      });
    };
    const handleDelete = (item) => {
      let params = {
        address_id: item.id
      };
      utils_api_index.RmAddress(params).then((res) => {
        common_vendor.index.showToast({
          title: "操作成功",
          icon: "none"
        });
        handleGetAddressList();
      });
    };
    common_vendor.onMounted(() => {
      handleGetAddressList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(addressList), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.phone),
            c: item.is_default
          }, item.is_default ? {} : {}, {
            d: common_vendor.t(item.provinces),
            e: common_vendor.t(item.addres),
            f: common_vendor.o(($event) => handleDelete(item), index),
            g: common_vendor.o(($event) => handleEditAdd(item), index),
            h: index,
            i: common_vendor.o(change, index),
            j: common_vendor.o(bindClick, index),
            k: "7f8df939-1-" + i0 + ",7f8df939-0"
          });
        }),
        b: common_vendor.p({
          show: common_vendor.unref(isOpened),
          ["auto-close"]: false
        }),
        c: common_vendor.o(handleToCreateAdds)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7f8df939"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/userAddress/index.vue"]]);
wx.createPage(MiniProgramPage);
