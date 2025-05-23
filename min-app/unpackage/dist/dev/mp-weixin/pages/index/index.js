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
    common_vendor.ref(-1);
    common_vendor.ref(-1);
    common_vendor.ref(0);
    common_vendor.ref([{}]);
    common_vendor.ref("default");
    let dotsStyles = common_vendor.ref({
      backgroundColor: "rgba(255,255,255,0.5);",
      border: "2px rgba(255,255,255,0.5); solid",
      color: "#fff",
      selectedBackgroundColor: "#F9A143",
      selectedBorder: "2px #F9A143 solid"
    });
    let swiperDotIndex = common_vendor.ref(0);
    let banners = common_vendor.ref([]);
    const change = (e) => {
      swiperDotIndex.value = e.detail.current;
    };
    const handleToPopularScience = () => {
      common_vendor.wx$1.navigateTo({
        url: "/pages/popularScience/index",
        fail: (err) => {
          console.log(err);
        }
      });
    };
    const handleToPopularScience2 = () => {
      common_vendor.wx$1.navigateTo({
        url: "/pages/popularScience/index2",
        fail: (err) => {
          console.log(err);
        }
      });
    };
    const handleGetBanner = () => {
      utils_api_index.GetIndexBanner({ type: 1 }).then((res) => {
        console.log(res);
        banners.value = res;
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
    const handleToBannerInfo = (item) => {
      let querys = objectToQueryString(item);
      let url = "/pages/index/bannerinfo" + querys;
      common_vendor.index.navigateTo({
        url
      });
    };
    common_vendor.onShareAppMessage(() => {
      return {
        title: "多一点预防，多一点健康",
        path: "/pages/index/index"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "多一点预防，多一点健康",
        path: "/pages/index/index"
      };
    });
    common_vendor.onMounted(() => {
      handleGetBanner();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(banners), (item, index, i0) => {
          return {
            a: "https://www.yuyandental.com/" + item.image,
            b: index,
            c: common_vendor.o(($event) => handleToBannerInfo(item), index)
          };
        }),
        b: common_vendor.o(change),
        c: common_vendor.unref(swiperDotIndex),
        d: common_vendor.p({
          info: common_vendor.unref(banners),
          current: common_vendor.unref(swiperDotIndex),
          ["dots-styles"]: common_vendor.unref(dotsStyles),
          mode: "round",
          field: "content"
        }),
        e: common_vendor.o(handleToPopularScience),
        f: common_vendor.o(handleToPopularScience2),
        g: common_vendor.p({
          active: "home"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
