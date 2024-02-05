<script setup lang="ts">
import { reactive, ref, watch, onMounted, createVNode } from "vue";
import { useRouter } from "vue-router";
import DateElement from "@components/dateElement.vue";
import { Modal, message } from "ant-design-vue";
import {
  booking_order,
  booking_changeStatus,
  booking_changeContactStatus,
} from "@/utils/request/index";
import moment from "moment";
let router = useRouter();
let searchStatus = ref(false);
let tabActive = ref(1);
let searchVal = ref("");
let contact_status = ref("0");
const onSearch = () => {
  pagination.current = 1;
  getList();
};
let checkboxs = [
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
];

const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 6,
  hideOnSinglePage: true,
});
let dateElementRef = ref(null);
const columns = [
  {
    title: "用户昵称",
    dataIndex: "name",
    align: "center",
    key: "name",
  },
  {
    title: "用户ID",
    dataIndex: "user_id",
    align: "center",
    key: "user_id",
  },
  {
    title: "用户电话号码",
    key: "phone",
    align: "center",
    dataIndex: "phone",
  },
  {
    title: "预约时间",
    key: "booking_time",
    align: "center",
    dataIndex: "booking_time",
    customRender: (record) => {
      let str = record.text;
      let times = checkboxs.filter((item) => item.index == record.record.time_index);
      if (times.length != 0) {
        str += `  ${times[0].start_time} - ${times[0].end_time}  `;
      }
      return str;
    },
    sorter: (a, b) => {
      let astr = a;
      let times = checkboxs.filter((item) => item.index == astr.time_index);
      let ats = `${a.booking_time} ${times[0].start_time}`;

      let bstr = b;
      let btimes = checkboxs.filter((item) => item.index == bstr.time_index);
      let bts = `${b.booking_time} ${btimes[0].start_time}`;
      return moment(bts).valueOf() - moment(ats).valueOf();
    },
  },
  {
    title: "预约姓名",
    key: "user",
    align: "center",
    dataIndex: "user",
    customRender: (record) => {
      if (record.text) {
        return record.text.nickname;
      } else {
        return "-";
      }
    },
  },
  {
    title: "预约电话号码",
    key: "subPhone",
    align: "center",
    dataIndex: "user",
    customRender: (record) => {
      if (record.text) {
        return record.text.phone;
      } else {
        return "-";
      }
    },
  },
  {
    title: "预约人数",
    key: "number",
    align: "center",
    dataIndex: "number",
  },
  {
    title: "状态",
    key: "status",
    align: "center",
    dataIndex: "status",
    filters: [
      {
        text: "待到店",
        value: "0",
      },
      {
        text: "已到达",
        value: "1",
      },
      {
        text: "已取消",
        value: "2",
      },
      {
        text: "已过期",
        value: "3",
      },
    ],
    onFilter: (value, record) => record.status == value,
  },
  {
    title: "操作",
    align: "center",
    key: "action",
  },
  {
    title: "备注",
    align: "center",
    key: "remake",
  },
];

const dataSource = ref([]);
const handleSignin = (record) => {
  Modal.confirm({
    title: "确定到店?",
    content: createVNode(
      "div",
      {},
      "请确认预约客户信息，登记好到店记录。后点击确认到店。"
    ),
    onOk() {
      let params = {
        order_id: record.id,
        status: 1,
      };
      booking_changeStatus(params).then((res) => {
        console.log(res);
        message.success("操作成功");
        getList();
      });
    },
    onCancel() {
      console.log("Cancel");
    },
    class: "test",
  });
};
const handleCancelReservation = (record) => {
  Modal.confirm({
    title: "取消该用户预约?",
    content: createVNode("div", {}, "请确认该客户已无法到店，且已告知客户。"),
    onOk() {
      console.log("OK");
      let params = {
        order_id: record.id,
        status: 2,
      };
      booking_changeStatus(params).then((res) => {
        console.log(res);
        message.success("操作成功");
        getList();
      });
    },
    onCancel() {
      console.log("Cancel");
    },
    class: "test",
  });
};
const changeTables = (status) => {
  pagination.current = 1;
  tabActive.value = status;
  getList();
};
const getList = () => {
  let params = {
    page: pagination.current,
    page_size: pagination.pageSize,
    type: 2,
    keywords: searchVal.value,
  };
  booking_order(params).then((res) => {
    let data = res.data;
    pagination.total = data.total;
    pagination.current = data.current_page;
    dataSource.value = res.data.data;
  });
};

const handlePageChange = (page) => {
  pagination.current = page.current;
  getList();
};
const handleChangeContact = (record) => {
  let params = {
    order_id: record.id,
    status: record.contact_status,
  };
  booking_changeContactStatus(params).then((res) => {
    message.success("操作成功");
    getList();
  });
};
const setContactStatus = (status) => {
  let text = {
    0: "no_cts",
    1: "has_cts",
    2: "has_cts_fail",
  };
  return text[status];
};

let days = ref({
  day: moment().format("YYYY年MM月DD日"),
  nextDay: moment().add(6, "days").format("YYYY年MM月DD日"),
});
onMounted(() => {
  getList();
});
</script>

<template>
  <div class="page-content">
    <div class="page-head">
      <div class="page-info">
        <p class="title" style="margin-bottom: 16px">展馆预约管理</p>
      </div>
      <div class="page-form">
        <a-input-search
          v-if="tabActive == 1"
          v-model:value="searchVal"
          enter-button="搜 索"
          placeholder="请输入"
          @search="onSearch"
          :loading="searchStatus"
        />
        <div class="page-desc" v-if="tabActive == 2">
          <p class="label">今日：{{ days.day }} 可操作{{ days.nextDay }}后的日期</p>
          <p>请按时提前设置时间管理，如未设置时间管理，则用户端无法成功预约</p>
        </div>
      </div>
    </div>
    <div class="tabs">
      <span @click="changeTables(1)" :class="{ active: tabActive == 1 }">预约管理</span>
      <span @click="changeTables(2)" :class="{ active: tabActive == 2 }">时间设置</span>
    </div>
    <div class="page-body">
      <div class="page-table" v-if="tabActive == 1">
        <p class="title">预约用户清单</p>
        <div class="tables">
          <a-table
            :columns="columns"
            @change="handlePageChange"
            :data-source="dataSource"
            :pagination="pagination"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'name'">
                {{ record.name }}
              </template>
              <template v-if="column.key === 'status'">
                <div class="status">
                  <span class="ok" v-if="record.status == 1"></span>
                  <span class="fail" v-if="record.status == 3"></span>
                  <span class="await" v-if="record.status == 0"></span>
                  <span class="cancel" v-if="record.status == 2"></span>
                  <span v-if="record.status == 0">待到店</span>
                  <span v-if="record.status == 1">已到达</span>
                  <span v-if="record.status == 2">已取消</span>
                  <span v-if="record.status == 3">已过期</span>
                </div>
              </template>
              <template v-else-if="column.key === 'action'">
                <a-button
                  type="link"
                  :disabled="record.status != 0"
                  @click="handleSignin(record)"
                  >到店</a-button
                >
                <a-divider type="vertical" />
                <a-button
                  danger
                  :disabled="record.status != 0"
                  type="link"
                  @click="handleCancelReservation(record)"
                  >取消预约</a-button
                >
              </template>
              <template v-else-if="column.key === 'remake'">
                <div class="table-select">
                  <a-select
                    :class="setContactStatus(record.contact_status)"
                    ref="select"
                    style="width: 90px"
                    v-model:value="record.contact_status"
                    @change="handleChangeContact(record)"
                  >
                    {{ record.contact_status }}
                    <a-select-option :value="0">未联系</a-select-option>
                    <a-select-option :value="1">已联系</a-select-option>
                    <a-select-option :value="2">未接通</a-select-option>
                  </a-select>
                </div>
              </template>
            </template>
          </a-table>
        </div>
      </div>
      <div class="page-table" v-if="tabActive == 2">
        <DateElement ref="dateElementRef" :type="2" />
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import url("./index.less");
</style>
<style lang="less">
.login-form .ant-message {
  position: absolute;
}
.table-select {
  .ant-select {
    border: none !important;
  }
  .ant-select-selector {
    background: transparent !important;
    border: none !important;
    height: auto !important;
  }
  .ant-select-arrow {
    .anticon {
      color: #1890ff !important;
    }
  }
}
.no_cts,
.has_cts {
  .ant-select-selector {
    .ant-select-selection-item {
      color: #1890ff;
    }
  }
}
.has_cts_fail {
  .ant-select-selector {
    .ant-select-selection-item {
      color: #f5222d;
    }
  }
}
</style>
