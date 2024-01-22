"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api_index = require("../../utils/api/index.js");
if (!Array) {
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  _easycom_uni_swiper_dot2();
}
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
if (!Math) {
  _easycom_uni_swiper_dot();
}
const _sfc_main = {
  __name: "info",
  setup(__props) {
    let goodsId = common_vendor.ref(null);
    let goodsInfo = common_vendor.ref({});
    let mode = common_vendor.ref("default");
    common_vendor.onLoad((option) => {
      goodsId.value = option.id;
      console.log(goodsId.value);
      handleGetOrderInfo();
    });
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
    const handleToCreateOrder = () => {
      console.log(1111);
      common_vendor.index.navigateTo({
        url: "/pages/mall/purchase?id=" + goodsInfo.value.id
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(covers), (item, index, i0) => {
          return {
            a: "https://dental.cdwuhu.com/" + item,
            b: index
          };
        }),
        b: common_vendor.p({
          mode: common_vendor.unref(mode),
          field: "content"
        }),
        c: common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price
      }, common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price ? {
        d: common_vendor.t(common_vendor.unref(goodsInfo).sale_price),
        e: common_vendor.t(common_vendor.unref(goodsInfo).price)
      } : {
        f: common_vendor.t(common_vendor.unref(goodsInfo).sale_price)
      }, {
        g: common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price
      }, common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price ? {
        h: common_vendor.t(common_vendor.unref(goodsInfo).price - common_vendor.unref(goodsInfo).sale_price)
      } : {}, {
        i: common_vendor.t(common_vendor.unref(goodsInfo).title),
        j: common_vendor.t(common_vendor.unref(goodsInfo).desc),
        k: "https://dental.cdwuhu.com/" + common_vendor.unref(goodsInfo).detail_image,
        l: common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price
      }, common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price ? {} : {}, {
        m: common_vendor.t(common_vendor.unref(goodsInfo).sale_price),
        n: common_vendor.o(handleToCreateOrder)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6f02fc2b"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/mall/info.vue"]]);
wx.createPage(MiniProgramPage);
