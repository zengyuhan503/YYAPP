<template>
  <view class="deteElement">
    <view class="head">
      <view class="title">选择时间</view>
      <view class="close" @click="closePopup">
        <uni-icons type="closeempty" size="30"></uni-icons>
      </view>
    </view>
    <view class="days">
      <view class="calendar">
        <view class="weekdays">
          <!-- 显示星期 -->
          <view v-for="weekday in generatedWeekdays" :key="weekday">
            <view>
              {{ weekday }}
            </view>
          </view>
        </view>
        <view class="dates">
          <!-- 显示日期 -->
          <view
            v-for="(date, index) in weekDates"
            :key="index"
            @click="handleGetBooking_plans_detail(date)"
          >
            <view :class="{ today: date.time == actDayTime }">{{
              index == 0 ? "今" : date.day
            }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="activeday"
      ><image src="../static/image/dateicon.png" mode="widthFix" /> 08月13日
    </view>
    <view class="tiems" v-if="hasTimes.length != 0">
      <view class="label">上午</view>
      <view class="items">
        <view
          @click="handleSelectDay(item)"
          v-for="(item, i = 0) in hasTimes"
          v-show="parseInt(item.index) < 7"
          :key="i"
          class="item"
          :class="{ active: actTime == item.index }"
        >
          {{ item.start_time }} - {{ item.end_time }}
        </view>
      </view>
      <view class="label">下午</view>
      <view class="items">
        <view
          @click="handleSelectDay(item)"
          v-for="(item, i = 0) in hasTimes"
          v-show="parseInt(item.index) > 7"
          :key="i"
          class="item"
          :class="{ active: actTime == item.index }"
        >
          {{ item.start_time }} - {{ item.end_time }}
        </view>
      </view>
    </view>
    <view class="tiems" v-else>
      <view class="no_times"> 今日预约已满，请选择其他日期 </view>
    </view>
    <div class="okTime">
      <image src="../static/image/confirm.png" mode="" @click="handleConfirm" />
    </div>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { booking_plans_detail } from "../utils/api/index";
import moment from "moment";
let props = defineProps({
  type: String,
});
const weekdays = ["天", "一", "二", "三", "四", "五", "六"];
const weekDates = ref([]);
const generatedWeekdays = ref([]);

let times = ref([
  {
    start_time: "06:00",
    end_time: "07:00",
    is_limit: 0,
    index: "1",
    show: false,
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
  { start_time: "19:00", end_time: "20:00", is_limit: 0, index: "14", show: false },
]);
let hasTimes = ref([]);
let emit = defineEmits("handleClosePopup", "handleSelectTimes");
const closePopup = () => {
  emit("handleClosePopup");
};
const renderDays = () => {
  const today = new Date();
  const currentDayOfWeek = today.getDay();

  // 生成日期
  for (let i = 0; i < 7; i++) {
    // const date = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate() + i);
    const date = moment(today).add(i, "days").startOf("days").format("DD");
    const time = moment(today).add(i, "days").startOf("days").valueOf();
    weekDates.value.push({
      day: date,
      time: time,
    });
  }
  // 生成星期
  for (let i = currentDayOfWeek, count = 0; count < 7; i = (i + 1) % 7, count++) {
    generatedWeekdays.value.push(weekdays[i]);
  }
  actDayTime.value = moment().startOf("days").valueOf();
};
let actDayTime = ref(0);
let actDay;
let actTimeItem = ref(null);
let actTime = ref(0);
const handleSelectDay = (item) => {
  actTime.value = item.index;
  actTimeItem.value = item;
};
const handleGetBooking_plans_detail = (date = null) => {
  actDay = moment().format("YYYY-MM-DD");
  actDayTime.value = moment().startOf("days").valueOf();
  if (date != null) {
    actDay = moment(date.time).format("YYYY-MM-DD");
    actDayTime.value = date.time;
  }
  let params = {
    date: actDay,
    type: props.type,
  };
  booking_plans_detail(params).then((res) => {
    // hasTimes.value = [{ ...res }];
    let indexs = res.index.split(",");
    hasTimes.value = times.value.filter((item) => indexs.includes(item.index));
  });
};
const handleConfirm = () => {
  if (actTime.value == 0) {
    uni.showToast({
      title: "请选择时间段，获取取消选择",
      icon: "none",
      duration: 2000,
    });
    return false;
  }
  emit("handleSelectTimes", actTimeItem.value, actDayTime.value);
};
defineExpose([actTimeItem]);
onMounted(() => {
  renderDays();
  handleGetBooking_plans_detail();
  console.log(props);
});
</script>
<style lang="less" scoped>
.deteElement {
  height: 500px;
  background: #ffffff;
  border-radius: 12px 12px 0px 0px;
  padding: 17px 14px;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 111;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  .title {
    font-size: 24px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    color: #172b4d;
    line-height: 33px;
    -webkit-background-clip: text;
  }
}
.days {
  padding: 10px 15px;
  margin-top: 20px;
  .calendar {
    .weekdays {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > view {
        width: 36px;
        height: 36px;
        text-align: center;
        font-size: 17px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #5e6c84;
      }
    }
    .dates {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      & > view {
        width: 36px;
        height: 36px;
        text-align: center;
        font-size: 17px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #5e6c84;
        line-height: 36px;
      }
    }
    .today {
      width: 36px;
      height: 36px;
      background: #d44469;
      border-radius: 18px;
      color: #ffffff;
    }
  }
}
.activeday {
  font-size: 12px;
  font-family: SFProText, SFProText;
  font-weight: 400;
  color: #5e6c84;
  line-height: 14px;
  padding-left: 10px;
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  image {
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }
}
.tiems {
  margin-top: 20px;
  .label {
    font-size: 20px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #5e6c84;
    line-height: 28px;
  }
  .items {
    margin-bottom: 10px;
    padding: 4px 0;
    display: grid;
    overflow: auto;
    grid-auto-flow: column;
    .item {
      width: 140px;
      height: 42px;
      border-radius: 8px;
      border: 2px solid #dfe1e6;
      font-size: 16px;
      font-family: SFProText, SFProText;
      font-weight: 400;
      color: #5e6c84;
      line-height: 19px;
      text-align: center;
      line-height: 42px;
      margin-right: 8px;
      &.active {
        width: 140px;
        height: 42px;
        background: #d44469;
        border-radius: 8px;
        color: #ffffff;
      }
    }
  }
}
.no_times {
  margin: 20px 0;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  color: #5e6c84;
  line-height: 28px;
  margin-bottom: 100px;
}
.okTime {
  text-align: center;
  margin-top: 30px;
  image {
    width: 300px;
    height: 44px;
  }
}
</style>
