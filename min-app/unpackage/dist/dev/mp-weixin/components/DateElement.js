"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "DateElement",
  emits: "handleClosePopup",
  setup(__props, { emit }) {
    const weekdays = ["天", "一", "二", "三", "四", "五", "六"];
    const weekDates = common_vendor.ref([]);
    const generatedWeekdays = common_vendor.ref([]);
    const closePopup = () => {
      emit("handleClosePopup");
    };
    common_vendor.onMounted(() => {
      const today = /* @__PURE__ */ new Date();
      const currentDayOfWeek = today.getDay();
      for (let i = 0; i < 7; i++) {
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
        weekDates.value.push(date.getDate());
      }
      for (let i = currentDayOfWeek, count = 0; count < 7; i = (i + 1) % 7, count++) {
        generatedWeekdays.value.push(weekdays[i]);
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "closeempty",
          size: "30"
        }),
        b: common_vendor.o(closePopup),
        c: common_vendor.f(generatedWeekdays.value, (weekday, k0, i0) => {
          return {
            a: common_vendor.t(weekday),
            b: weekday
          };
        }),
        d: common_vendor.f(weekDates.value, (date, index, i0) => {
          return {
            a: common_vendor.t(index == 0 ? "今" : date),
            b: index == 0 ? 1 : "",
            c: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-29cd71d4"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/components/DateElement.vue"]]);
wx.createComponent(Component);
