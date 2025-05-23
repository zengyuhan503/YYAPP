"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api_index = require("../../utils/api/index.js");
if (!Array) {
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  _easycom_uni_swiper_dot2();
}
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
if (!Math) {
  (_easycom_uni_swiper_dot + navs)();
}
const navs = () => "../../components/navs/index.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let banners = common_vendor.ref([]);
    const handleGetBanner = () => {
      utils_api_index.GetIndexBanner({ type: 2 }).then((res) => {
        console.log(res);
        banners.value = res;
        showbanner.value = "https://www.yuyandental.com/" + res[0].image;
      });
    };
    let dotsStyles = common_vendor.ref({
      backgroundColor: "rgba(255,255,255,0.5);",
      border: "2px rgba(255,255,255,0.5); solid",
      color: "#fff",
      selectedBackgroundColor: "#F9A143",
      selectedBorder: "2px #F9A143 solid"
    });
    let cateList = common_vendor.ref([]);
    let cateActive = common_vendor.ref(null);
    const handleGetCateList = () => {
      let params = {
        page: 1,
        page_size: 1e3
      };
      utils_api_index.GetCateList(params).then((res) => {
        console.log(res);
        cateList.value = res;
        cateActive.value = res[0].id;
        handleGetGoodsList();
      });
    };
    let showbanner = common_vendor.ref("");
    let swiperDotIndex = common_vendor.ref(0);
    const handleBannerChange = (e) => {
      let index = e.detail.current;
      swiperDotIndex.value = index;
      showbanner.value = "https://www.yuyandental.com/" + banners.value[index].image;
    };
    let goodsList = common_vendor.ref([]);
    const handleGetGoodsList = () => {
      let params = {
        page: 1,
        page_size: 1e3,
        category_id: cateActive.value
      };
      utils_api_index.GetGoodsList(params).then((res) => {
        console.log(res);
        goodsList.value = res.data;
      });
    };
    const handleChangeCate = (id) => {
      cateActive.value = id;
      handleGetGoodsList();
    };
    const handleToInfo = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/mall/info?id=" + item.id
      });
    };
    const handleToBannerInfo = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/mall/info?id=" + item.goods_id
      });
    };
    common_vendor.onShareAppMessage(() => {
      return {
        title: "多一点预防，多一点健康",
        path: "/pages/mall/index"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "多一点预防，多一点健康",
        path: "/pages/mall/index"
      };
    });
    common_vendor.onMounted(() => {
      handleGetBanner();
      handleGetCateList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(showbanner),
        b: common_vendor.f(common_vendor.unref(banners), (item, index, i0) => {
          return {
            a: "https://www.yuyandental.com/" + item.image,
            b: common_vendor.o(($event) => handleToBannerInfo(item), index),
            c: index,
            d: index
          };
        }),
        c: common_vendor.o(handleBannerChange),
        d: common_vendor.p({
          info: common_vendor.unref(banners),
          current: common_vendor.unref(swiperDotIndex),
          ["dots-styles"]: common_vendor.unref(dotsStyles),
          mode: "round",
          field: "content"
        }),
        e: common_vendor.f(common_vendor.unref(cateList), (item, index, i0) => {
          return {
            a: "https://www.yuyandental.com/" + item.icon,
            b: common_vendor.t(item.title),
            c: item.id == common_vendor.unref(cateActive) ? 1 : "",
            d: index,
            e: common_vendor.o(($event) => handleChangeCate(item.id), index)
          };
        }),
        f: common_vendor.f(common_vendor.unref(goodsList), (item, index, i0) => {
          return common_vendor.e({
            a: "https://www.yuyandental.com/" + item.head_image,
            b: common_vendor.t(item.title),
            c: item.discount != "100.0"
          }, item.discount != "100.0" ? {
            d: common_vendor.t(item.price)
          } : {}, {
            e: common_vendor.t(item.sale_price),
            f: item.discount != "100.0"
          }, item.discount != "100.0" ? {
            g: common_vendor.t(parseInt(item.discount) / 10)
          } : {}, {
            h: index,
            i: common_vendor.o(($event) => handleToInfo(item), index)
          });
        }),
        g: common_vendor.p({
          active: "mall"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-43c06b56"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
