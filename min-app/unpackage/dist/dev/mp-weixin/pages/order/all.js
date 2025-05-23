"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api_index = require("../../utils/api/index.js");
const _sfc_main = {
  __name: "all",
  setup(__props) {
    let status = common_vendor.ref(0);
    common_vendor.ref({
      0: "待付款",
      1: "待发货",
      2: "待收货",
      3: "已收货",
      4: "完成订单",
      "-1": "已关闭",
      "-2": "已取消",
      "-3": "已取消",
      all: "全部订单"
    });
    let orderList = common_vendor.ref([]);
    const getClassStatus = (status2) => {
      let str = {
        0: "active",
        "-1": "cancel",
        "-2": "cancel",
        "-3": "cancel"
      };
      return str[status2] || "";
    };
    common_vendor.onLoad((option) => {
      status.value = option.status;
      console.log(status.value);
      handleGetOrderList(status.value);
      handleSetPageTitle(status.value);
    });
    const handleSetPageTitle = (status2) => {
      let str = {
        0: "待付款",
        2: "待收货",
        4: "完成订单",
        all: "全部订单"
      };
      let title = str[status2];
      console.log(title);
      common_vendor.index.setNavigationBarTitle({
        title
      });
    };
    const handleGetOrderList = (status2) => {
      let params = {
        page: 1,
        page_size: 1e3,
        status: status2
      };
      utils_api_index.GetOrderList(params).then((res) => {
        console.log(res);
        orderList.value = res.data;
      });
    };
    const handleToOrderInfo = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/detail/unpaid?id=" + item.id
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(orderList), (item, index, i0) => {
          return common_vendor.e({
            a: item.status == 0
          }, item.status == 0 ? {} : {}, {
            b: item.status == 1
          }, item.status == 1 ? {} : {}, {
            c: item.status == 2
          }, item.status == 2 ? {} : {}, {
            d: item.status == 3
          }, item.status == 3 ? {} : {}, {
            e: item.status == 4
          }, item.status == 4 ? {} : {}, {
            f: item.status == -1
          }, item.status == -1 ? {} : {}, {
            g: item.status == -2
          }, item.status == -2 ? {} : {}, {
            h: item.status == -3
          }, item.status == -3 ? {} : {}, {
            i: "https://www.yuyandental.com/" + item.goods_image,
            j: common_vendor.t(item.goods_name),
            k: common_vendor.t(item.num),
            l: common_vendor.t(item.real_price),
            m: common_vendor.n(getClassStatus(item.status)),
            n: common_vendor.o(($event) => handleToOrderInfo(item), index),
            o: index
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4284604b"]]);
wx.createPage(MiniProgramPage);
