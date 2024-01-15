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
          <view v-for="(date, index) in weekDates" :key="index">
            <view :class="{ today: index == 0 }">{{ index == 0 ? "今" : date }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="activeday"> 08月13日 </view>
    <view class="tiems">
      <view class="label">上午</view>
      <view class="items">
        <view class="item active"> 08:00-09:00 </view>
        <view class="item"> 08:00-09:00 </view>
      </view>
      <view class="label">下午</view>
      <view class="items">
        <view class="item active"> 08:00-09:00 </view>
        <view class="item"> 08:00-09:00 </view>
      </view>
    </view>
    <div class="okTime">
      <image src="../static/image/confirm.png" mode="" />
    </div>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";

const weekdays = ["天", "一", "二", "三", "四", "五", "六"];
const weekDates = ref([]);
const generatedWeekdays = ref([]);
let emit = defineEmits("handleClosePopup");
const closePopup = () => {
  emit("handleClosePopup");
};
onMounted(() => {
  const today = new Date();
  const currentDayOfWeek = today.getDay();

  // 生成日期
  for (let i = 0; i < 7; i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    weekDates.value.push(date.getDate());
  }

  // 生成星期
  for (let i = currentDayOfWeek, count = 0; count < 7; i = (i + 1) % 7, count++) {
    generatedWeekdays.value.push(weekdays[i]);
  }
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
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    overflow: auto;
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
.okTime {
  text-align: center;
  margin-top: 30px;
  image {
    width: 300px;
    height: 44px;
  }
}
</style>
