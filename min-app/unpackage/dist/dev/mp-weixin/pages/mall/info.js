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
    common_vendor.ref("default");
    let refStyle = common_vendor.ref({
      top: "46px"
    });
    let swiperDotIndex = common_vendor.ref(0);
    let dotsStyles = common_vendor.ref({
      backgroundColor: "rgba(255,255,255,0.5);",
      border: "2px rgba(255,255,255,0.5); solid",
      color: "#fff",
      selectedBackgroundColor: "#F9A143",
      selectedBorder: "2px #F9A143 solid"
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
    const handleBannerChange = (e) => {
      let index = e.detail.current;
      swiperDotIndex.value = index;
    };
    const handleGetOrderInfo = () => {
      let params = {
        goods_id: goodsId.value
      };
      utils_api_index.GetGoodsInfo(params).then((res) => {
        goodsInfo.value = res;
        let newArr = [res.head_image];
        let dimg = res.deputy_image;
        dimg = dimg === "" ? [] : dimg.split(",");
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
    common_vendor.onShareAppMessage(() => {
      console.log(goodsInfo.value);
      return {
        title: goodsInfo.value.title,
        path: `/pages/mall/info?id=${goodsId.value}`
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: goodsInfo.value.title,
        path: `/pages/mall/info?id=${goodsId.value}`,
        imageUrl: "https://www.yuyandental.com/" + covers.value[0]
      };
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
            a: "https://www.yuyandental.com/" + item,
            b: index
          };
        }),
        e: common_vendor.o(handleBannerChange),
        f: common_vendor.p({
          info: common_vendor.unref(covers),
          current: common_vendor.unref(swiperDotIndex),
          ["dots-styles"]: common_vendor.unref(dotsStyles),
          mode: "round",
          field: "content"
        }),
        g: common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price
      }, common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price ? {
        h: common_vendor.t(common_vendor.unref(goodsInfo).sale_price),
        i: common_vendor.t(common_vendor.unref(goodsInfo).price)
      } : {
        j: common_vendor.t(common_vendor.unref(goodsInfo).sale_price)
      }, {
        k: common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price
      }, common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price ? {
        l: common_vendor.t((common_vendor.unref(goodsInfo).price * 1e3 - common_vendor.unref(goodsInfo).sale_price * 1e3) / 1e3)
      } : {}, {
        m: common_vendor.t(common_vendor.unref(goodsInfo).title),
        n: common_vendor.t(common_vendor.unref(goodsInfo).desc),
        o: "https://www.yuyandental.com/" + common_vendor.unref(goodsInfo).detail_image,
        p: common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price
      }, common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price ? {} : {}, {
        q: common_vendor.t(common_vendor.unref(goodsInfo).sale_price),
        r: common_vendor.o(handleToCreateOrder)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6f02fc2b"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
