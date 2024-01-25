"use strict";
const common_vendor = require("../common/vendor.js");
const utils_api_index = require("../utils/api/index.js");
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
  props: {
    type: String
  },
  emits: "handleClosePopup",
  setup(__props, { expose, emit }) {
    const props = __props;
    const weekdays = ["天", "一", "二", "三", "四", "五", "六"];
    const weekDates = common_vendor.ref([]);
    const generatedWeekdays = common_vendor.ref([]);
    let times = common_vendor.ref([
      {
        start_time: "06:00",
        end_time: "07:00",
        is_limit: 0,
        index: "1",
        show: false
      },
      { start_time: "07:00", end_time: "08:00", is_limit: 0, index: "2", show: false },
      { start_time: "08:00", end_time: "09:00", is_limit: 0, index: "3", show: false },
      { start_time: "09:00", end_time: "10:00", is_limit: 0, index: "4", show: false },
      { start_time: "10:00", end_time: "11:00", is_limit: 0, index: "5", show: false },
      { start_time: "11:00", end_time: "12:00", is_limit: 0, index: "6", show: false },
      { start_time: "12:00", end_time: "13:00", is_limit: 0, index: "7", show: false },
      { start_time: "13:00", end_time: "14:00", is_limit: 0, index: "8", show: false },
      { start_time: "14:00", end_time: "15:00", is_limit: 0, index: "9", show: false },
      { start_time: "15:00", end_time: "16:00", is_limit: 0, index: "10", show: false },
      { start_time: "16:00", end_time: "17:00", is_limit: 0, index: "11", show: false },
      { start_time: "17:00", end_time: "18:00", is_limit: 0, index: "12", show: false },
      { start_time: "18:00", end_time: "19:00", is_limit: 0, index: "13", show: false },
      { start_time: "19:00", end_time: "20:00", is_limit: 0, index: "14", show: false }
    ]);
    let hasTimes = common_vendor.ref([]);
    const closePopup = () => {
      emit("handleClosePopup");
    };
    const renderDays = () => {
      const today = /* @__PURE__ */ new Date();
      const currentDayOfWeek = today.getDay();
      for (let i = 0; i < 7; i++) {
        const date = common_vendor.hooks(today).add(i, "days").startOf("days").format("DD");
        const time = common_vendor.hooks(today).add(i, "days").startOf("days").valueOf();
        weekDates.value.push({
          day: date,
          time
        });
      }
      for (let i = currentDayOfWeek, count = 0; count < 7; i = (i + 1) % 7, count++) {
        generatedWeekdays.value.push(weekdays[i]);
      }
      actDayTime.value = common_vendor.hooks().startOf("days").valueOf();
    };
    let actDayTime = common_vendor.ref(0);
    let actDay = common_vendor.ref("");
    let actTimeItem = common_vendor.ref(null);
    let actTime = common_vendor.ref(0);
    const handleSelectDay = (item) => {
      actTime.value = item.index;
      actTimeItem.value = item;
      console.log(actTimeItem.value);
    };
    const handleGetBooking_plans_detail = (date = null) => {
      hasTimes.value = [];
      actDay.value = common_vendor.hooks().format("YYYY-MM-DD");
      actDayTime.value = common_vendor.hooks().startOf("days").valueOf();
      if (date != null) {
        actDay.value = common_vendor.hooks(date.time).format("YYYY-MM-DD");
        actDayTime.value = date.time;
      }
      let params = {
        date: actDay.value,
        type: props.type
      };
      utils_api_index.booking_plans_detail(params).then((res) => {
        if (res.length == 0)
          return false;
        let indexs = res.index.split(",");
        hasTimes.value = times.value.filter((item) => indexs.includes(item.index));
      });
    };
    const handleConfirm = () => {
      if (actTime.value == 0) {
        common_vendor.index.showToast({
          title: "请选择时间段，获取取消选择",
          icon: "none",
          duration: 2e3
        });
        return false;
      }
      emit("handleSelectTimes", actTimeItem.value, actDayTime.value);
    };
    expose([actTimeItem]);
    common_vendor.onMounted(() => {
      renderDays();
      handleGetBooking_plans_detail();
      console.log(props);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
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
            a: common_vendor.t(index == 0 ? "今" : date.day),
            b: date.time == common_vendor.unref(actDayTime) ? 1 : "",
            c: index,
            d: common_vendor.o(($event) => handleGetBooking_plans_detail(date), index)
          };
        }),
        e: common_vendor.t(common_vendor.unref(common_vendor.hooks)(common_vendor.unref(actDay)).format("MM月DD日")),
        f: common_vendor.unref(hasTimes).length != 0
      }, common_vendor.unref(hasTimes).length != 0 ? {
        g: common_vendor.f(common_vendor.unref(hasTimes), (item, i = 0, i0) => {
          return {
            a: common_vendor.t(item.start_time),
            b: common_vendor.t(item.end_time),
            c: common_vendor.o(($event) => handleSelectDay(item), i),
            d: parseInt(item.index) < 7,
            e: i,
            f: common_vendor.unref(actTime) == item.index ? 1 : ""
          };
        }),
        h: common_vendor.unref(hasTimes).some((item) => parseInt(item.index) > 7),
        i: common_vendor.f(common_vendor.unref(hasTimes), (item, i = 0, i0) => {
          return {
            a: common_vendor.t(item.start_time),
            b: common_vendor.t(item.end_time),
            c: common_vendor.o(($event) => handleSelectDay(item), i),
            d: parseInt(item.index) > 7,
            e: i,
            f: common_vendor.unref(actTime) == item.index ? 1 : ""
          };
        })
      } : {}, {
        j: common_vendor.o(handleConfirm)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-29cd71d4"], ["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/components/DateElement.vue"]]);
wx.createComponent(Component);
