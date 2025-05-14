"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_api_index = require("../../utils/api/index.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_uni_popup = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _component_uni_popup)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "purchase",
  setup(__props) {
    const count = common_vendor.ref(1);
    let goodsId = common_vendor.ref(null);
    let showSubscribeSuccess = common_vendor.ref(false);
    let addressId = common_vendor.ref(null);
    let goodsInfo = common_vendor.ref({});
    let addrForm = common_vendor.ref({
      name: "",
      phone: "",
      provinces: "",
      address: "",
      is_default: ""
    });
    common_vendor.onLoad((option) => {
      goodsId.value = option.id;
      handleGetCalculate();
      handleGetAddressList();
    });
    const handleClickRadio = () => {
      addrForm.value.is_default = !addrForm.value.is_default;
    };
    const bindRegionChange = (e) => {
      let detail = e.detail;
      let value = detail.value;
      if (addrForm.value.provinces == value.join("-"))
        return false;
      addrForm.value.provinces = value.join("-");
      handleOnChangeForm();
    };
    common_vendor.watch(count, (newVal) => {
      handleGetCalculate();
    });
    let isHasAddress = false;
    const handleOnChangeForm = () => {
      if (!isCanChange)
        return false;
      addrForm.value.id = 0;
      console.log(addrForm.value);
    };
    let isCanChange = false;
    const handleGetCalculate = () => {
      let params = {
        goods_id: goodsId.value,
        number: count.value
      };
      utils_api_index.GetCalculate(params).then((res) => {
        goodsInfo.value = res;
        if (res.address != "") {
          addrForm.value = res.address;
          addrForm.value.is_default = "1";
          isHasAddress = true;
        } else {
          isHasAddress = false;
        }
        isCanChange = true;
      });
    };
    let addressList = common_vendor.ref([]);
    const handleGetAddressList = () => {
      utils_api_index.GetAddressList().then((res) => {
        addressList.value = res;
        if (res.length == 0)
          return false;
        addressId.value = res.find((item) => item.is_default == "1").id;
      });
    };
    const handleSelectAddress = (item) => {
      addressId.value = item.id;
      addrForm.value = item;
    };
    let order_id = "";
    const handleToCreateOrder = () => {
      let params = {
        goods_id: goodsId.value,
        number: count.value,
        address_id: isHasAddress ? addrForm.value.id : 0,
        remark: addrForm.value.remark || "",
        name: addrForm.value.name,
        phone: addrForm.value.phone,
        provinces: addrForm.value.provinces,
        address: addrForm.value.address,
        is_default: addrForm.value.is_default == "" ? 0 : addrForm.value.is_default
      };
      utils_api_index.CreateOrder(params).then((res) => {
        order_id = res.order_id;
        utils_api_index.CreateWxPay(res).then((res2) => {
          common_vendor.wx$1.requestPayment({
            timeStamp: res2.timeStamp,
            nonceStr: res2.nonceStr,
            package: res2.package,
            signType: res2.signType,
            paySign: res2.paySign,
            success() {
              showSubscribeSuccess.value = true;
            },
            fail(err) {
              common_vendor.wx$1.showToast({
                icon: "none",
                title: "支付失败,即将前往订单详情",
                duration: 2e3
              });
              setTimeout(() => {
                common_vendor.index.redirectTo({
                  url: "/pages/detail/unpaid?id=" + order_id
                });
              }, 2e3);
              console.log(err);
            }
          });
        });
      });
    };
    const handleOpenOrder = () => {
      common_vendor.index.redirectTo({
        url: "/pages/detail/unpaid?id=" + order_id
      });
    };
    const handleToUser = () => {
      common_vendor.index.redirectTo({
        url: "/pages/user/index"
      });
    };
    let popup = common_vendor.ref(null);
    const open = () => {
      console.log();
      popup.value.open();
    };
    const closePopup = () => {
      popup.value.close();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: "https://www.yuyandental.com/" + common_vendor.unref(goodsInfo).head_image,
        b: common_vendor.t(common_vendor.unref(goodsInfo).title),
        c: common_vendor.t(common_vendor.unref(goodsInfo).sale_price),
        d: count.value == 1
      }, count.value == 1 ? {
        e: common_assets._imports_0$1
      } : {
        f: common_assets._imports_1$1,
        g: common_vendor.o(($event) => count.value--)
      }, {
        h: common_vendor.t(count.value),
        i: common_assets._imports_2,
        j: common_vendor.o(($event) => count.value++),
        k: common_vendor.unref(addrForm).is_default,
        l: common_assets._imports_0,
        m: common_vendor.o(handleClickRadio),
        n: common_assets._imports_1,
        o: common_vendor.o([($event) => common_vendor.unref(addrForm).name = $event.detail.value, handleOnChangeForm]),
        p: common_vendor.unref(addrForm).name,
        q: common_assets._imports_2$1,
        r: common_vendor.o([($event) => common_vendor.unref(addrForm).phone = $event.detail.value, handleOnChangeForm]),
        s: common_vendor.unref(addrForm).phone,
        t: common_assets._imports_3,
        v: common_vendor.o([($event) => common_vendor.unref(addrForm).provinces = $event.detail.value, handleOnChangeForm]),
        w: common_vendor.unref(addrForm).provinces,
        x: common_vendor.o(bindRegionChange),
        y: common_assets._imports_4,
        z: common_vendor.o([($event) => common_vendor.unref(addrForm).address = $event.detail.value, handleOnChangeForm]),
        A: common_vendor.unref(addrForm).address,
        B: common_vendor.p({
          type: "right",
          size: "18"
        }),
        C: common_vendor.o(open),
        D: common_vendor.o(closePopup),
        E: common_vendor.p({
          type: "left",
          size: "30",
          color: "#000000"
        }),
        F: common_vendor.f(common_vendor.unref(addressList), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.phone),
            c: item.is_default == 1
          }, item.is_default == 1 ? {} : {}, {
            d: common_vendor.t(item.provinces),
            e: common_vendor.t(item.address),
            f: common_vendor.unref(addressId) == item.id ? 1 : "",
            g: index,
            h: common_vendor.o(($event) => handleSelectAddress(item), index)
          });
        }),
        G: common_vendor.sr(popup, "bcb386f7-1", {
          "k": "popup"
        }),
        H: common_vendor.p({
          ["background-color"]: "#fff",
          type: "bottom"
        }),
        I: common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price
      }, common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price ? {} : {}, {
        J: common_vendor.t(common_vendor.unref(goodsInfo).total_price),
        K: common_vendor.o(handleToCreateOrder),
        L: common_vendor.unref(showSubscribeSuccess)
      }, common_vendor.unref(showSubscribeSuccess) ? {
        M: common_vendor.o(handleToUser),
        N: common_vendor.o(handleOpenOrder)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bcb386f7"]]);
wx.createPage(MiniProgramPage);
