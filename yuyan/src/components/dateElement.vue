<template>
  <a-card title="设置">
    <div class="picker">
      <div class="picker-date">
        <div class="picker-header">
          <div class="ant-picker-header">
            <div>
              <a-button type="link" @click="prevYear"><DoubleLeftOutlined /></a-button>
              <a-button type="link" @click="prevMonth"><LeftOutlined /></a-button>
            </div>
            <div class="text">{{ currentInfo }}</div>
            <div>
              <a-button type="link" @click="nextMonth"><RightOutlined /></a-button>
              <a-button type="link" @click="nextYear"><DoubleRightOutlined /></a-button>
            </div>
          </div>
        </div>
        <div class="picker-body">
          <table class="picker-content" border="0" cellpadding="0" cellspacing="0">
            <thead>
              <tr>
                <th>一</th>
                <th>二</th>
                <th>三</th>
                <th>四</th>
                <th>五</th>
                <th>六</th>
                <th>日</th>
              </tr>
            </thead>
            <tbody v-if="days.length != 0">
              <tr v-for="(item, index) in days" :key="index">
                <td
                  v-for="(node, nindex) in item"
                  :key="nindex"
                  :class="computedClass(node)"
                >
                  <div @click="handleActive(node)">
                    {{ node.day }}
                    <span class="today" v-if="handleTodayDays(node)">
                      <img src="../assets/image/today.png" alt="" />
                    </span>
                    <span
                      class="today"
                      v-else-if="pickerDayDatas.includes(node.timestamp)"
                    >
                      <img src="../assets/image/activeDays.png" alt="" />
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="reset">
          <a-button type="link" @click="handleResetRenderCalendar">回到当月</a-button>
        </div>
      </div>
      <div class="picker-time">
        <div class="picker-header">
          <div class="text">{{ activeDay }}</div>
        </div>
        <a-checkbox-group v-model:value="timeForm.index" style="width: 100%">
          <div class="picker-body">
            <div class="am">
              <p>上午</p>
              <div class="times">
                <a-row>
                  <a-col
                    :span="24"
                    v-for="(item, i = 0) in [].concat(checkboxs.slice(0, 5))"
                    :key="i"
                  >
                    <div class="time-checkbox">
                      <a-checkbox :disabled="activeDay == ''" :value="item.index">
                        {{ item.start_time }} - {{ item.end_time }}
                      </a-checkbox>
                    </div>
                  </a-col>
                </a-row>
              </div>
            </div>
            <div class="pm">
              <p>下午</p>
              <div class="times">
                <a-row>
                  <a-col
                    :span="24"
                    v-for="(item, i) in [].concat(checkboxs.slice(6, checkboxs.length))"
                    :key="i"
                  >
                    <div class="time-checkbox">
                      <a-checkbox :disabled="activeDay == ''" :value="item.index">
                        {{ item.start_time }} - {{ item.end_time }}
                      </a-checkbox>
                    </div>
                  </a-col>
                </a-row>
              </div>
            </div>
          </div>
        </a-checkbox-group>
        <div class="footer">
          <div class="footer-left">
            <p>说明：人数限制后，每时段最多预约20人</p>
            <div>
              人数限制：<a-radio-group
                v-model:value="timeForm.is_limit"
                name="radioGroup"
              >
                <a-radio :value="1">限制</a-radio>
                <a-radio :value="0" style="margin-left: 10px">不限制</a-radio>
              </a-radio-group>
            </div>
          </div>
          <div class="footer-right">
            <a-button>清空</a-button>
            <a-button type="primary" style="margin-left: 8px" @click="saveTimes"
              >保存</a-button
            >
          </div>
        </div>
      </div>
    </div>
  </a-card>
  <div class="submit-footer">
    <a-button type="primary" :loading="submitLoading" @click="handleSubmit"
      >提 交</a-button
    >
  </div>
  <div style="height: 100px"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import {
  LeftOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";
import moment from "moment";
import { booking_plan, booking_plan_edit } from "@/utils/request/index";
import { message, Modal } from "ant-design-vue";

let props = defineProps({
  type: Number,
});
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
let currentInfo = ref("");
let activeDay = ref("");
let days = ref([]);
let ams = ref([]);
let is_limit = ref("1");
let timeForm = ref({
  index: null,
  is_limit: 1,
});
let pickerDayActives = ref([]);
let pickerDayDatas = ref([]);

let checkboxs = ref([
  { start_time: "06:00", end_time: "07:00", is_limit: 0, index: "1" },
  { start_time: "07:00", end_time: "08:00", is_limit: 0, index: "2" },
  { start_time: "08:00", end_time: "09:00", is_limit: 0, index: "3" },
  { start_time: "09:00", end_time: "10:00", is_limit: 0, index: "4" },
  { start_time: "10:00", end_time: "11:00", is_limit: 0, index: "5" },
  { start_time: "11:00", end_time: "12:00", is_limit: 0, index: "6" },
  { start_time: "12:00", end_time: "13:00", is_limit: 0, index: "7" },
  { start_time: "13:00", end_time: "14:00", is_limit: 0, index: "8" },
  { start_time: "14:00", end_time: "15:00", is_limit: 0, index: "9" },
  { start_time: "15:00", end_time: "16:00", is_limit: 0, index: "10" },
  { start_time: "16:00", end_time: "17:00", is_limit: 0, index: "11" },
  { start_time: "17:00", end_time: "18:00", is_limit: 0, index: "12" },
  { start_time: "18:00", end_time: "19:00", is_limit: 0, index: "13" },
  { start_time: "19:00", end_time: "20:00", is_limit: 0, index: "14" },
]);
let pmCheckbox = ref([]);
let activeTimes = null;
const handleActive = (node: { timestamp: moment.MomentInput }) => {
  pickerDayActives.value = [];
  pickerDayActives.value.push(node.timestamp);
  let times = node.timestamp as number;
  activeTimes = times;
  const date = moment(times * 1000).format("YYYY年M月D日");
  activeDay.value = date + "";

  setTimes(node.timestamp);
};
let updateTimes = [];
const computedClass = (node: any) => {
  let classStr = "";
  if (handleTodayDays(node)) {
    classStr = "activeToDays";
  } else if (handlePreviousDays(node)) {
    classStr = "previousDays";
  } else if (handleDisabledDays(node)) {
    return "disabledDays";
  }
  if (handleActiveDays(node)) {
    classStr += " activeDays";
  }
  return classStr;
};
const handleActiveDays = (node: { timestamp: any }) => {
  return pickerDayActives.value.includes(node.timestamp);
};
const handleTodayDays = (node: { timestamp: number }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const timestamp = today.getTime() / 1000;
  return timestamp == node.timestamp;
};
const handlePreviousDays = (node: { timestamp: number }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const timestamp = today.getTime() / 1000;
  return timestamp > node.timestamp;
};
const handleDisabledDays = (node: { timestamp: number }) => {
  const today = new Date();
  const eightDaysLater = new Date(today);
  eightDaysLater.setDate(today.getDate() + 7);
  eightDaysLater.setHours(0, 0, 0, 0);

  const timestamp = eightDaysLater.getTime() / 1000;
  return timestamp > node.timestamp;
};
const handleResetRenderCalendar = () => {
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  renderCalendar(currentYear, currentMonth);
};
function renderCalendar(year: number, month: number) {
  const today = new Date();
  days.value = [];
  const matrix = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDay.getDay();
  const daysFromLastMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  const lastMonthLastDay = new Date(year, month, 0).getDate();
  const lastMonthDays = Array.from(
    { length: daysFromLastMonth },
    (_, i) => lastMonthLastDay - i
  ).reverse();
  const currentMonthDays = Array.from({ length: lastDay.getDate() }, (_, i) => i + 1);
  let dayCount = 0;
  for (let i = 0; i < 6; i++) {
    let day = 0;
    let dateObject = null;
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < daysFromLastMonth) {
        // 上个月的日期
        day = lastMonthDays[j];

        dateObject = {
          day: day,
          timestamp: new Date(year, month, day).setHours(0, 0, 0, 0) / 1000,
          isToday:
            today.getFullYear() === year &&
            today.getMonth() === month &&
            day === today.getDate(),
        };
        matrix.push(dateObject);
      } else if (dayCount < currentMonthDays.length) {
        // 当前月的日期
        day = currentMonthDays[dayCount];
        dayCount++;
        dateObject = {
          day: day,
          timestamp: new Date(year, month, day).setHours(0, 0, 0, 0) / 1000,
          isToday:
            today.getFullYear() === year &&
            today.getMonth() === month &&
            day === today.getDate(),
        };
        matrix.push(dateObject);
      }
    }
  }

  const rows = 7;
  const columns = 7;

  days.value = Array.from({ length: rows }, (_, i) =>
    Array.from({ length: columns }, (_, j) => {
      const index = i * columns + j;
      return index < matrix.length ? matrix[index] : null;
    }).filter((item) => item !== null)
  );
  currentInfo.value = moment(`${year}-${month + 1}`, "YYYY-M").format("YYYY年M月");

  nextTick(() => {
    let disabledDays = document.getElementsByClassName("disabledDays");
    if (disabledDays.length === 0) return false;
    let firstDisabledDays = disabledDays[0];
    let lastDisabledDays = disabledDays[disabledDays.length - 1];
    firstDisabledDays.classList.add("radius-1");
    lastDisabledDays.classList.add("radius-2");
  });
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentYear, currentMonth);
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentYear, currentMonth);
}

function prevYear() {
  currentYear--;
  renderCalendar(currentYear, currentMonth);
}
function nextYear() {
  currentYear++;
  renderCalendar(currentYear, currentMonth);
}

let hastime = [];
const getList = () => {
  let params = {
    type: props.type,
  };
  booking_plan(params).then((res) => {
    let data = res.data;
    hastime = data;
    hastime.forEach((item) => {
      console.log(moment(item.date).valueOf());
      pickerDayDatas.value.push(moment(item.date).valueOf() / 1000);
    });
  });
};
const setTimes = (day) => {
  timeForm.value.index = null;
  timeForm.value.is_limit = null;
  for (let i = 0; i < hastime.length; i++) {
    const item = hastime[i];
    let times = moment(item.date).valueOf() / 1000;
    if (times == day) {
      timeForm.value.index = item.index.split(",");
      timeForm.value.is_limit = item.is_limit;
    }
  }
};
const saveTimes = () => {
  if (timeForm.value.is_limit == null || timeForm.value.index == null) {
    message.error("请设置完整信息在保存");
    return false;
  }
  let day = moment(activeTimes * 1000).format("YYYY-MM-DD");
  let params = {
    date: day,
    index: timeForm.value.index.join(","),
    type: props.type,
    is_limit: timeForm.value.is_limit,
  };
  pickerDayDatas.value.push(activeTimes);
  let isHas = hastime.findIndex(
    (obj) => moment(obj.date).valueOf() / 1000 == activeTimes
  );

  Modal.confirm({
    title: `已保存设${moment(activeTimes * 1000).format("YYYY年MM月DD日")}置?`,
    content: "点击确定后自动跳到下一日期设置",
    onOk() {
      if (isHas != -1) {
        hastime[isHas] = params;
      } else {
        hastime.push(params);
      }
      let day =
        moment(activeTimes * 1000)
          .add(1, "days")
          .valueOf() / 1000;
      handleActive({
        timestamp: day,
      });
    },
    onCancel() {},
    class: "test",
  });
};
let submitLoading = ref(false);
const handleSubmit = () => {
  let date=hastime.map(item=>{
    const newItem={...item};
    delete newItem.id;
    return newItem
  })
  let params = {
    date: date,
    type:props.type
  };
  booking_plan_edit(params).then((res) => {
    console.log(res);
    message.success("提交成功");
    getList()
  });
};
// 初始渲染
onMounted(() => {
  renderCalendar(currentYear, currentMonth);

  const today = new Date();
  const eightDaysLater = new Date(today);
  eightDaysLater.setDate(today.getDate() + 7);
  eightDaysLater.setHours(0, 0, 0, 0);
  const date = moment(eightDaysLater.getTime()).format("YYYY年M月D日");
  activeDay.value = date;
  pickerDayActives.value = [];
  pickerDayActives.value.push(eightDaysLater.getTime() / 1000);
  getList();
});
</script>

<style lang="less" scoped>
.picker-date {
  width: 560px;
  background: #ffffff;
  border-radius: 8px;
  border: 2px solid #d9d9d9;
}
</style>
<style lang="less">
.picker {
  display: flex;
  justify-content: flex-start;
}
.ant-picker-header {
  height: 78px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  button {
    color: rgba(0, 0, 0, 0.45);
    font-size: 20px;
  }
  .text {
    font-size: 28px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
}
.picker-body {
  padding-top: 40px;
  width: 100%;
  user-select: none;
  table {
    width: 100%;
    user-select: none;
  }
  thead {
    text-align: center;
    user-select: none;
    width: 100%;
    tr {
      display: flex;
      width: 100%;
      justify-content: space-between;
      th {
        width: 14.2%;
        height: 48px;
        border-radius: 4px;
        font-size: 28px;
        color: rgba(0, 0, 0, 0.65);
        cursor: pointer;
        user-select: none;
        text-align: center;
        line-height: 48px;
        &.active {
          background: #1890ff;
          color: #ffffff;
        }
      }
    }
  }
  tr {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    margin-bottom: 23px;
    td {
      width: 14.4%;
      height: 48px;
      font-size: 28px;
      color: rgba(0, 0, 0, 0.65);
      cursor: pointer;
      user-select: none;
      text-align: center;
      line-height: 48px;
      position: relative;
      div {
        width: 48px;
        margin: auto;
      }
      .days {
        width: 48px;
        margin: auto;
      }
    }
  }
  .previousDays {
    color: rgba(0, 0, 0, 0.25);
    background: transparent !important;
  }
  .activeToDays {
    color: #1890ff !important;
    background: transparent !important;
  }
  .disabledDays {
    background: rgba(111, 111, 111, 0.4);
    color: rgba(0, 0, 0, 0.25);
  }
  .today {
    position: absolute;
    bottom: -28px;
    left: 50%;
    transform: translateX(-50%);
  }
  .radius-1 {
    border-radius: 10px 0 0 10px;
  }
  .radius-2 {
    border-radius: 0px 10px 10px 0px;
  }
  .activeDays > div {
    background: #1890ff;
    color: #ffffff;
    border-radius: 10px;
  }
}
.reset {
  text-align: center;
  font-size: 28px;
  font-weight: 400;
  color: #108ee9;
  height: 78px;
  border-top: 1px solid rgba(0, 0, 0, 0.09);
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    font-size: 28px;
    height: 78px;
  }
}
.picker-time {
  position: relative;
  width: 480px;
  background: #ffffff;
  border-radius: 8px;
  border: 2px solid #d9d9d9;
  margin-left: 32px;
  user-select: none;
  .picker-header {
    height: 78px;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
    .text {
      font-size: 28px;
      font-weight: 500;
      color: #1890ff;
    }
  }
  .picker-body {
    padding: 40px;
    display: flex;
    justify-content: flex-start;
    & > div {
      width: 50%;
      text-align: left;
      p {
        font-size: 28px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.65);
        margin-bottom: 16px;
        text-align: center;
      }
    }
    .pm {
      margin-left: 110px;
    }
    .time-checkbox {
      width: 100%;
      margin-bottom: 20px;
      span {
        font-size: 14px;
      }
    }
  }
  .footer {
    display: flex;
    padding: 0 14px;
    position: absolute;
    justify-content: space-between;
    align-items: center;
    bottom: 10px;
    width: 100%;
    .footer-left {
      p {
        font-size: 12px;
        font-weight: 400;
        color: #1890ff;
        line-height: 22px;
      }
      div {
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);
      }
    }
    .footer-right {
      text-align: right;
    }
  }
}

.submit-footer {
  position: fixed;
  height: 56px;
  background: #ffffff;
  box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.03);
  filter: blur(0px);
  width: 100%;
  left: 0;
  bottom: 0;
  padding-right: 2%;
  box-sizing: border-box;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    text-align: right;
    margin-bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
