"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api_index = require("../../utils/api/index.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup)();
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
    const handleChangeRadio = (e) => {
      console.log(e);
    };
    const handleClickRadio = () => {
      addrForm.value.is_default = !addrForm.value.is_default;
    };
    const bindRegionChange = (e) => {
      let detail = e.detail;
      let value = detail.value;
      addrForm.value.provinces = value.join("-");
    };
    common_vendor.watch(count, (newVal) => {
      console.log(newVal);
      handleGetCalculate();
    });
    let isHasAddress = false;
    const handleGetCalculate = () => {
      let params = {
        goods_id: goodsId.value,
        number: count.value
      };
      utils_api_index.GetCalculate(params).then((res) => {
        goodsInfo.value = res;
        console.log(res.address);
        if (res.address != "") {
          addrForm.value = res.address;
          addrForm.value.is_default = "1";
          isHasAddress = true;
        } else {
          isHasAddress = false;
        }
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
      console.log(params);
      utils_api_index.CreateOrder(params).then((res) => {
        console.log(res);
        order_id = res.order_id;
        utils_api_index.CreateWxPay(res).then((res2) => {
          console.log(res2);
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
        a: "https://dental.cdwuhu.com/" + common_vendor.unref(goodsInfo).head_image,
        b: common_vendor.t(common_vendor.unref(goodsInfo).title),
        c: common_vendor.t(common_vendor.unref(goodsInfo).sale_price),
        d: count.value == 1
      }, count.value == 1 ? {} : {
        e: common_vendor.o(($event) => count.value--)
      }, {
        f: common_vendor.t(count.value),
        g: common_vendor.o(($event) => count.value++),
        h: common_vendor.unref(addrForm).is_default == 1,
        i: common_vendor.o(handleChangeRadio),
        j: common_vendor.o(handleClickRadio),
        k: common_vendor.unref(addrForm).name,
        l: common_vendor.o(($event) => common_vendor.unref(addrForm).name = $event.detail.value),
        m: common_vendor.unref(addrForm).phone,
        n: common_vendor.o(($event) => common_vendor.unref(addrForm).phone = $event.detail.value),
        o: common_vendor.unref(addrForm).provinces,
        p: common_vendor.o(bindRegionChange),
        q: common_vendor.unref(addrForm).address,
        r: common_vendor.o(($event) => common_vendor.unref(addrForm).address = $event.detail.value),
        s: common_vendor.p({
          type: "right",
          size: "18"
        }),
        t: common_vendor.o(open),
        v: common_vendor.o(closePopup),
        w: common_vendor.p({
          type: "left",
          size: "30",
          color: "#000000"
        }),
        x: common_vendor.f(common_vendor.unref(addressList), (item, index, i0) => {
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
        y: common_vendor.sr(popup, "bcb386f7-1", {
          "k": "popup"
        }),
        z: common_vendor.p({
          ["background-color"]: "#fff",
          type: "bottom"
        }),
        A: common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price
      }, common_vendor.unref(goodsInfo).sale_price != common_vendor.unref(goodsInfo).price ? {} : {}, {
        B: common_vendor.t(common_vendor.unref(goodsInfo).total_price),
        C: common_vendor.o(handleToCreateOrder),
        D: common_vendor.unref(showSubscribeSuccess)
      }, common_vendor.unref(showSubscribeSuccess) ? {
        E: common_vendor.o(handleToUser),
        F: common_vendor.o(handleOpenOrder)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bcb386f7"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/mall/purchase.vue"]]);
wx.createPage(MiniProgramPage);
