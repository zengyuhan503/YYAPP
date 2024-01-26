<template>
  <view class="page-content page-content2">
    <Header title="看诊预约" />
    <view class="content">
      <view class="main main1 main2 hasback">
        <view class="hastag">
          <view>
            <view class="tag1"></view>
            <view class="tag1"></view>
          </view>
          <view>
            <view class="tag1"></view>
            <view class="tag1"></view>
          </view>
        </view>
        <view class="imgs imgs">
          <image
            src="http://h5.dental.cdwuhu.com/static/image/kanzhenyuyue.png"
            class="kanzhen"
            mode="widthFix"
          ></image>
        </view>
        <view class="main-title"> 看诊预约 </view>
        <view class="main-desc"> 让孩子们游戏化看牙，让成年人舒适化看牙 </view>
        <view class="popularForm" style="padding: 0 5px">
          <view class="formInput">
            <image src="http://h5.dental.cdwuhu.com/static/image/name.png" />
            <input
              type="text"
              placeholder="姓名"
              :disabled="hasSubscribe"
              v-model="popularForm.name"
              @change="handleChangeFrom"
            />
          </view>
          <view class="formInput">
            <image src="http://h5.dental.cdwuhu.com/static/image/phone.png" />
            <input
              type="text"
              placeholder="手机号"
              :disabled="hasSubscribe"
              @change="handleChangeFrom"
              v-model="popularForm.phone"
            />
          </view>
          <view class="formGroup">
            <view class="formItem">
              <view class="formInput">
                <view class="genders">
                  <view
                    class="boy"
                    :class="{ active: popularForm.gender == 1 }"
                    @click="handleChangeGenders('1')"
                    >男</view
                  >
                  <view
                    class="girl"
                    :class="{ active: popularForm.gender == 0 }"
                    @click="handleChangeGenders('0')"
                    >女</view
                  >
                </view>
              </view>
            </view>
            <view class="step"></view>
            <view class="formItem">
              <picker
                bindchange="bindPickerChange"
                mode="date"
                :end="endTime"
                :value="selectror"
                :disabled="hasSubscribe"
                @change="handleSelectCount"
              >
                <view class="formInput">
                  <image
                    style="width: 18px; height: 18px"
                    src="http://h5.dental.cdwuhu.com/static/image/age.png"
                  />
                  <input
                    type="text"
                    disabled
                    @change="handleChangeFrom"
                    placeholder="年龄"
                    v-model="popularForm.age"
                  />
                </view>
              </picker>
            </view>
          </view>
          <view class="formItem" @click="handleShowPopup">
            <view class="formInput">
              <image
                style="width: 28px; height: 28px; left: 12px; top: 10px"
                src="http://h5.dental.cdwuhu.com/static/image/addr.png"
              />
              <input
                type="text"
                disabled
                @change="handleChangeFrom"
                placeholder="时间"
                v-model="popularForm.date"
              />
            </view>
          </view>
        </view>
        <view class="submit-btns">
          <!-- <image
              src="http://h5.dental.cdwuhu.com/static/image/confirm.png"
              @click="handleSubmit"
              v-if="isSubmit"
              mode="widthFix"
            /> -->
          <view v-if="!hasSubscribe">
            <view @click="handleSubmit" class="submitbtn" v-if="isSubmit">预约</view>
            <view class="submitbtn disabled" v-else>预约</view>
          </view>
          <view v-else>
            <view class="cancel" @click="showCancel = true">取消预约</view>
          </view>
        </view>
      </view>
    </view>
    <DateElement
      v-if="showDate"
      type="1"
      @handleSelectTimes="handleSelectTimes"
      @handleClosePopup="handleClosePopup"
    />
  </view>
  <view class="subscribeSuccess" v-if="showSubscribeSuccess">
    <view class="subscribemodal">
      <view class="close">
        <image
          src="http://h5.dental.cdwuhu.com/static/image/close.png"
          @click="showSubscribeSuccess = false"
          mode="widthFix"
        />
      </view>
      <view class="main">
        <image
          src="http://h5.dental.cdwuhu.com/static/image/subscribe.png"
          mode="widthFix"
        />
        <view class="title">预约成功</view>
        <view class="desc">感谢您的预约，请及时到店～</view>
      </view>
      <view class="btns" @click="showSubscribeSuccess = false">查看我的预约</view>
    </view>
  </view>

  <view class="cancelSubcribe" v-if="showCancel">
    <view class="body">
      <view class="close">
        <image
          src="http://h5.dental.cdwuhu.com/static/image/close.png"
          @click="showCancel = false"
          mode="widthFix"
        />
      </view>
      <view class="main">
        <view class="title">确定要取消预约么</view>
        <view class="desc">取消预约后，可再次在入口处预约时间</view>
      </view>
      <view class="btns" @click="handleCancelSub">取消我的预约</view>
    </view>
  </view>
</template>
<script setup>
import { ref, watch, onMounted } from "vue";
import Header from "../../components/header/index.vue";
import DateElement from "../../components/DateElement.vue";
import moment from "moment";
import {
  booking_order_detail,
  CreateBookingPlans,
  CancelBookingPlans,
} from "../../utils/api/index";
let endTime = ref(moment().format("YYYY-MM-DD"));
let showDate = ref(false);
let hasSubscribe = ref(false);
let showCancel = ref(false);
let showSubscribeSuccess = ref(false);
let popularForm = ref({
  name: "",
  gender: "1",
  phone: "",
  date: "",
  date_index: "",
  age: "",
  birthday: "",
  type: "1",
});
let times = ref([
  {
    start_time: "06:00",
    end_time: "07:00",
    is_limit: 0,
    index: "1",
    show: false,
  },
  {
    start_time: "07:00",
    end_time: "08:00",
    is_limit: 0,
    index: "2",
    show: false,
  },
  {
    start_time: "08:00",
    end_time: "09:00",
    is_limit: 0,
    index: "3",
    show: false,
  },
  {
    start_time: "09:00",
    end_time: "10:00",
    is_limit: 0,
    index: "4",
    show: false,
  },
  {
    start_time: "10:00",
    end_time: "11:00",
    is_limit: 0,
    index: "5",
    show: false,
  },
  {
    start_time: "11:00",
    end_time: "12:00",
    is_limit: 0,
    index: "6",
    show: false,
  },
  {
    start_time: "12:00",
    end_time: "13:00",
    is_limit: 0,
    index: "7",
    show: false,
  },
  {
    start_time: "13:00",
    end_time: "14:00",
    is_limit: 0,
    index: "8",
    show: false,
  },
  {
    start_time: "14:00",
    end_time: "15:00",
    is_limit: 0,
    index: "9",
    show: false,
  },
  {
    start_time: "15:00",
    end_time: "16:00",
    is_limit: 0,
    index: "10",
    show: false,
  },
  {
    start_time: "16:00",
    end_time: "17:00",
    is_limit: 0,
    index: "11",
    show: false,
  },
  {
    start_time: "17:00",
    end_time: "18:00",
    is_limit: 0,
    index: "12",
    show: false,
  },
  {
    start_time: "18:00",
    end_time: "19:00",
    is_limit: 0,
    index: "13",
    show: false,
  },
  {
    start_time: "19:00",
    end_time: "20:00",
    is_limit: 0,
    index: "14",
    show: false,
  },
]);
const handleChangeFrom = () => {
  let froms = popularForm.value;
  if (!Object.values(froms).includes("")) {
    isSubmit.value = true;
  } else {
    isSubmit.value = false;
  }
};
let isSubmit = ref(true);
const handleShowPopup = () => {
  if (hasSubscribe.value) return false;
  showDate.value = true;
};
const handleClosePopup = () => {
  showDate.value = false;
};
let selectTime = null;
const handleSelectTimes = (date, actDayTime) => {
  let year = moment(actDayTime).format("MM/DD");
  popularForm.value.date_index = date.index;
  selectTime = {
    date: moment(actDayTime).format("YYYY-MM-DD"),
    index: date.index,
  };
  let str = `${year} ${date.start_time} `;
  popularForm.value.date = str;
  showDate.value = false;
  handleChangeFrom();
};
let agenum = null;
let selectror = ref(1);
const handleSelectCount = (e) => {
  const birthdate = moment(e.detail.value);
  popularForm.value.birthday = birthdate.format("YYYY-MM-DD日");
  const currentDate = moment();
  const age = currentDate.diff(birthdate, "years");
  agenum = age;
  popularForm.value.age = age + "岁";
  handleChangeFrom();
};
let hasTimes = ref([]);
const handleGetPlans = () => {
  let params = {
    type: 1,
  };
  booking_order_detail(params).then((res) => {
    console.log(res);
    try {
      let status = res.status;
      if (status == 0) {
        popularForm.value.name = res.name;
        popularForm.value.phone = res.phone;
        popularForm.value.gender = res.gender;
        popularForm.value.birthday = res.birthday;
        popularForm.value.age = res.age + "岁";
        agenum = res.age;
        let date = times.value.find((obj) => obj.index == res.time_index);
        selectTime = {
          date: res.booking_time,
          index: res.time_index,
        };
        let year = moment(res.booking_time).format("MM/DD");
        let str = `${year} ${date.start_time} `;
        popularForm.value.date = str;
        hasSubscribe.value = true;
      } else {
        hasSubscribe.value = false;
        let phone = uni.getStorageSync("yy-phone");
        if (phone) {
          popularForm.value.phone = phone;
        }
      }
      handleChangeFrom();
      console.log(popularForm.value);
    } catch (error) {
      console.log(error);
    }
    // hasTimes.value = res;
  });
};
const handleSubmit = () => {
  let params = {
    name: popularForm.value.name,
    gender: popularForm.value.gender,
    phone: popularForm.value.phone,
    birthday: popularForm.value.birthday,
    date: selectTime.date,
    date_index: selectTime.index,
    age: agenum,
    type: "1",
  };
  CreateBookingPlans(params).then((res) => {
    showSubscribeSuccess.value = true;
    hasSubscribe.value = true;
  });
};
const handleCancelSub = () => {
  let params = {
    type: 1,
  };
  CancelBookingPlans(params).then((res) => {
    console.log(res);
    uni.showToast({
      title: "操作成功，可再次在入口处预约时间",
      duration: 2000,
      icon: "none",
      success() {
        setTimeout(() => {
          uni.redirectTo({
            url: "/pages/index/index",
          });
        }, 2000);
      },
    });
    popularForm.value = {
      name: "",
      gender: "",
      phone: "",
      date: "",
      date_index: "",
      age: "",
      type: "",
      number: "",
    };
    hasSubscribe.value = false;
  });
};
const handleChangeGenders = (type) => {
  if (hasSubscribe.value) return false;
  popularForm.value.gender = type;
};
onMounted(() => {
  handleGetPlans();
});
</script>
<style lang="less">
@import url(./index.less);
</style>
<style lang="less" scoped></style>
