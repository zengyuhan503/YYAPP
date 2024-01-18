"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api_index = require("../../utils/api/index.js");
const _sfc_main = {
  __name: "all",
  setup(__props) {
    let status = common_vendor.ref(0);
    let orderList = common_vendor.ref([]);
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
      if (item.status == 0) {
        common_vendor.index.navigateTo({
          url: "/pages/detail/unpaid?id=" + item.id
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(orderList), (item, index, i0) => {
          return common_vendor.e({
            a: item.status == 0
          }, item.status == 0 ? {} : {}, {
            b: item.status == 2
          }, item.status == 2 ? {} : {}, {
            c: item.status == 4
          }, item.status == 4 ? {} : {}, {
            d: "https://dental.cdwuhu.com/" + item.goods_image,
            e: common_vendor.t(item.goods_name),
            f: common_vendor.t(item.num),
            g: common_vendor.t(item.real_price),
            h: common_vendor.o(($event) => handleToOrderInfo(item), index),
            i: index
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4284604b"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/order/all.vue"]]);
wx.createPage(MiniProgramPage);
