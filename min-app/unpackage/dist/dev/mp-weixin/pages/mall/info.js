"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api_index = require("../../utils/api/index.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  (_easycom_uni_nav_bar2 + _easycom_uni_swiper_dot2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_swiper_dot)();
}
const _sfc_main = {
  __name: "info",
  setup(__props) {
    let goodsId = common_vendor.ref(null);
    let goodsInfo = common_vendor.ref({});
    let mode = common_vendor.ref("default");
    let refStyle = common_vendor.ref({
      top: "46px"
    });
    let height = common_vendor.ref(0);
    common_vendor.onLoad((option) => {
      goodsId.value = option.id;
      console.log(goodsId.value);
      handleGetOrderInfo();
    });
    const handleleft = () => {
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    let covers = common_vendor.ref([]);
    const handleGetOrderInfo = () => {
      let params = {
        goods_id: goodsId.value
      };
      utils_api_index.GetGoodsInfo(params).then((res) => {
        goodsInfo.value = res;
        let newArr = [res.head_image];
        let dimg = res.deputy_image;
        dimg = dimg.split(",");
        newArr.push(...dimg);
        covers.value = newArr;
      });
    };
    let orderList = {
      0: [],
      2: [],
      4: [],
      all: []
    };
    const handleToCreateOrder = () => {
      if (orderList["0"].length != 0) {
        common_vendor.index.showToast({
          title: "你当前还有待付款订单，请前往个人中心查看",
          duration: 2e3,
          icon: "none"
        });
        return false;
      }
      common_vendor.index.navigateTo({
        url: "/pages/mall/purchase?id=" + goodsInfo.value.id
      });
    };
    const handleGetOrderList = () => {
      let params = {
        page: 1,
        page_size: 1e3,
        status: "all"
      };
      utils_api_index.GetOrderList(params).then((res) => {
        console.log(res);
        let list = res.data;
        orderList["0"] = list.filter((item) => item.status == 0);
        orderList["2"] = list.filter((item) => item.status == 2);
        orderList["all"] = list;
      });
    };
    common_vendor.onShow((options) => {
      const res = common_vendor.wx$1.getMenuButtonBoundingClientRect();
      height.value = res.height;
      refStyle.value["top"] = res.top + "px";
      handleGetOrderList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleleft),
        b: common_vendor.p({
          ["left-icon"]: "left",
          border: false,
          backgroundColor: "transparent",
          title: "",
          height: common_vendor.unref(height),
          color: "#ffffff"
        }),
        c: common_vendor.s(common_vendor.unref(refStyle)),
        d: common_vendor.f(common_vendor.unref(covers), (item, index, i0) => {
          return {
            a: "https://dental.cdwuhu.com/" + item,
            b: index
          };
        }),
        e: common_vendor.p({
          mode: common_vendor.unref(mode),
          field: "content"
        }),
        f: common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price
      }, common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price ? {
        g: common_vendor.t(common_vendor.unref(goodsInfo).sale_price),
        h: common_vendor.t(common_vendor.unref(goodsInfo).price)
      } : {
        i: common_vendor.t(common_vendor.unref(goodsInfo).sale_price)
      }, {
        j: common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price
      }, common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price ? {
        k: common_vendor.t(common_vendor.unref(goodsInfo).price - common_vendor.unref(goodsInfo).sale_price)
      } : {}, {
        l: common_vendor.t(common_vendor.unref(goodsInfo).title),
        m: common_vendor.t(common_vendor.unref(goodsInfo).desc),
        n: "https://dental.cdwuhu.com/" + common_vendor.unref(goodsInfo).detail_image,
        o: common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price
      }, common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price ? {} : {}, {
        p: common_vendor.t(common_vendor.unref(goodsInfo).sale_price),
        q: common_vendor.o(handleToCreateOrder)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6f02fc2b"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/mall/info.vue"]]);
wx.createPage(MiniProgramPage);
