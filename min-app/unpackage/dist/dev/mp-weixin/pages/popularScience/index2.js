"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api_index = require("../../utils/api/index.js");
if (!Math) {
  (Header + DateElement)();
}
const Header = () => "../../components/header/index.js";
const DateElement = () => "../../components/DateElement.js";
const _sfc_main = {
  __name: "index2",
  setup(__props) {
    let endTime = common_vendor.ref(common_vendor.hooks().format("YYYY-MM-DD"));
    let showDate = common_vendor.ref(false);
    let hasSubscribe = common_vendor.ref(false);
    let showCancel = common_vendor.ref(false);
    let showSubscribeSuccess = common_vendor.ref(false);
    let popularForm = common_vendor.ref({
      name: "",
      gender: "1",
      phone: "",
      date: "",
      date_index: "",
      age: "",
      type: "1"
    });
    let times = common_vendor.ref([
      {
        start_time: "06:00",
        end_time: "07:00",
        is_limit: 0,
        index: "1",
        show: false
      },
      {
        start_time: "07:00",
        end_time: "08:00",
        is_limit: 0,
        index: "2",
        show: false
      },
      {
        start_time: "08:00",
        end_time: "09:00",
        is_limit: 0,
        index: "3",
        show: false
      },
      {
        start_time: "09:00",
        end_time: "10:00",
        is_limit: 0,
        index: "4",
        show: false
      },
      {
        start_time: "10:00",
        end_time: "11:00",
        is_limit: 0,
        index: "5",
        show: false
      },
      {
        start_time: "11:00",
        end_time: "12:00",
        is_limit: 0,
        index: "6",
        show: false
      },
      {
        start_time: "12:00",
        end_time: "13:00",
        is_limit: 0,
        index: "7",
        show: false
      },
      {
        start_time: "13:00",
        end_time: "14:00",
        is_limit: 0,
        index: "8",
        show: false
      },
      {
        start_time: "14:00",
        end_time: "15:00",
        is_limit: 0,
        index: "9",
        show: false
      },
      {
        start_time: "15:00",
        end_time: "16:00",
        is_limit: 0,
        index: "10",
        show: false
      },
      {
        start_time: "16:00",
        end_time: "17:00",
        is_limit: 0,
        index: "11",
        show: false
      },
      {
        start_time: "17:00",
        end_time: "18:00",
        is_limit: 0,
        index: "12",
        show: false
      },
      {
        start_time: "18:00",
        end_time: "19:00",
        is_limit: 0,
        index: "13",
        show: false
      },
      {
        start_time: "19:00",
        end_time: "20:00",
        is_limit: 0,
        index: "14",
        show: false
      }
    ]);
    const handleChangeFrom = () => {
      let froms = popularForm.value;
      if (!Object.values(froms).includes("")) {
        isSubmit.value = true;
      } else {
        isSubmit.value = false;
      }
    };
    let isSubmit = common_vendor.ref(false);
    const handleShowPopup = () => {
      if (hasSubscribe.value)
        return false;
      showDate.value = true;
    };
    const handleClosePopup = () => {
      showDate.value = false;
    };
    let selectTime = null;
    const handleSelectTimes = (date, actDayTime) => {
      let year = common_vendor.hooks(actDayTime).format("MM/DD");
      popularForm.value.date_index = date.index;
      selectTime = {
        date: common_vendor.hooks(actDayTime).format("YYYY-MM-DD"),
        index: date.index
      };
      let str = `${year} ${date.start_time} `;
      popularForm.value.date = str;
      showDate.value = false;
      handleChangeFrom();
    };
    let agenum = null;
    let selectror = common_vendor.ref(1);
    const handleSelectCount = (e) => {
      const birthdate = common_vendor.hooks(e.detail.value);
      const currentDate = common_vendor.hooks();
      const age = currentDate.diff(birthdate, "years");
      agenum = age;
      popularForm.value.age = age + "岁";
      handleChangeFrom();
    };
    common_vendor.ref([]);
    const handleGetPlans = () => {
      let params = {
        type: 1
      };
      utils_api_index.booking_order_detail(params).then((res) => {
        console.log(res);
        try {
          let status = res.status;
          if (status == 0) {
            popularForm.value.name = res.name;
            popularForm.value.phone = res.phone;
            popularForm.value.gender = res.gender;
            popularForm.value.age = res.age + "岁";
            agenum = res.age;
            let date = times.value.find((obj) => obj.index == res.time_index);
            selectTime = {
              date: res.booking_time,
              index: res.time_index
            };
            let year = common_vendor.hooks(res.booking_time).format("MM/DD");
            let str = `${year} ${date.start_time} `;
            popularForm.value.date = str;
            hasSubscribe.value = true;
          } else {
            hasSubscribe.value = false;
          }
          console.log(popularForm.value);
        } catch (error) {
          console.log(error);
        }
      });
    };
    const handleSubmit = () => {
      let params = {
        name: popularForm.value.name,
        gender: popularForm.value.gender,
        phone: popularForm.value.phone,
        date: selectTime.date,
        date_index: selectTime.index,
        age: agenum,
        type: "1"
      };
      utils_api_index.CreateBookingPlans(params).then((res) => {
        showSubscribeSuccess.value = true;
        hasSubscribe.value = true;
      });
    };
    const handleCancelSub = () => {
      let params = {
        type: 1
      };
      utils_api_index.CancelBookingPlans(params).then((res) => {
        console.log(res);
        common_vendor.index.showToast({
          title: "操作成功，可再次在入口处预约时间",
          duration: 2e3,
          icon: "none",
          success() {
            common_vendor.index.redirectTo({
              url: "/pages/index/index"
            });
          }
        });
        popularForm.value = {
          name: "",
          gender: "",
          phone: "",
          date: "",
          date_index: "",
          age: "",
          type: "",
          number: ""
        };
        hasSubscribe.value = false;
      });
    };
    const handleChangeGenders = (type) => {
      if (hasSubscribe.value)
        return false;
      popularForm.value.gender = type;
    };
    common_vendor.onMounted(() => {
      handleGetPlans();
      let phone = common_vendor.index.getStorageSync("yy-phone");
      console.log(phone);
      if (phone) {
        popularForm.value.phone = phone;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "看诊预约馆"
        }),
        b: common_vendor.unref(hasSubscribe),
        c: common_vendor.o(handleChangeFrom),
        d: common_vendor.unref(popularForm).name,
        e: common_vendor.o(($event) => common_vendor.unref(popularForm).name = $event.detail.value),
        f: common_vendor.unref(hasSubscribe),
        g: common_vendor.o(handleChangeFrom),
        h: common_vendor.unref(popularForm).phone,
        i: common_vendor.o(($event) => common_vendor.unref(popularForm).phone = $event.detail.value),
        j: common_vendor.unref(popularForm).gender == 1 ? 1 : "",
        k: common_vendor.o(($event) => handleChangeGenders("1")),
        l: common_vendor.unref(popularForm).gender == 0 ? 1 : "",
        m: common_vendor.o(($event) => handleChangeGenders("0")),
        n: common_vendor.o(handleChangeFrom),
        o: common_vendor.unref(popularForm).age,
        p: common_vendor.o(($event) => common_vendor.unref(popularForm).age = $event.detail.value),
        q: common_vendor.unref(endTime),
        r: common_vendor.unref(selectror),
        s: common_vendor.unref(hasSubscribe),
        t: common_vendor.o(handleSelectCount),
        v: common_vendor.o(handleChangeFrom),
        w: common_vendor.unref(popularForm).date,
        x: common_vendor.o(($event) => common_vendor.unref(popularForm).date = $event.detail.value),
        y: common_vendor.o(handleShowPopup),
        z: !common_vendor.unref(hasSubscribe)
      }, !common_vendor.unref(hasSubscribe) ? common_vendor.e({
        A: common_vendor.unref(isSubmit)
      }, common_vendor.unref(isSubmit) ? {
        B: common_vendor.o(handleSubmit)
      } : {}) : {
        C: common_vendor.o(($event) => common_vendor.isRef(showCancel) ? showCancel.value = true : showCancel = true)
      }, {
        D: common_vendor.unref(showDate)
      }, common_vendor.unref(showDate) ? {
        E: common_vendor.o(handleSelectTimes),
        F: common_vendor.o(handleClosePopup),
        G: common_vendor.p({
          type: "1"
        })
      } : {}, {
        H: common_vendor.unref(showSubscribeSuccess)
      }, common_vendor.unref(showSubscribeSuccess) ? {
        I: common_vendor.o(($event) => common_vendor.isRef(showSubscribeSuccess) ? showSubscribeSuccess.value = false : showSubscribeSuccess = false),
        J: common_vendor.o(($event) => common_vendor.isRef(showSubscribeSuccess) ? showSubscribeSuccess.value = false : showSubscribeSuccess = false)
      } : {}, {
        K: common_vendor.unref(showCancel)
      }, common_vendor.unref(showCancel) ? {
        L: common_vendor.o(($event) => common_vendor.isRef(showCancel) ? showCancel.value = false : showCancel = false),
        M: common_vendor.o(handleCancelSub)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/PROJECT-ZENGYUHAN/yuyan-project/min-app/pages/popularScience/index2.vue"]]);
wx.createPage(MiniProgramPage);
