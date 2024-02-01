<script setup lang="ts">
import { ref, onMounted, reactive, watch, createVNode } from "vue";
import { useRouter, useRoute } from "vue-router";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons-vue";
import {
  order_list,
  order_ship,
  order_cancel,
  order_finish,
  order_updateExpress,
  order_open,
  expresss,
} from "@/utils/request/index";
import moment from "moment";
import { message, Modal } from "ant-design-vue";
let router = useRouter();
let route = useRoute();
let searchStatus = ref(false);
let tabActive = ref(1);
let searchVal = ref("");
const onSearch = () => {
  pagination.current = 1;
  getList();
};
let goodsCategoryList = ref([]);
const columns = [
  {
    title: "订单编号",
    dataIndex: "out_trade_no",
    align: "center",
    key: "out_trade_no",
    ellipsis: true,
    width: 250,
    fixed: "left",
  },
  {
    title: "商品缩略图",
    dataIndex: "goods_image",
    align: "center",
    key: "goods_image",
    ellipsis: true,
    width: 130,
  },
  {
    title: "商品名称",
    key: "goods_name",
    align: "center",
    dataIndex: "goods_name",
    ellipsis: true,
    width: 130,
  },
  {
    title: "数量",
    key: "num",
    ellipsis: true,
    align: "center",
    dataIndex: "num",
    width: 80,
  },
  {
    title: "实际支付",
    key: "real_price",
    align: "center",
    dataIndex: "real_price",
    ellipsis: true,
    width: 100,
  },
  {
    title: "下单时间",
    key: "create_time",
    align: "center",
    dataIndex: "create_time",
    ellipsis: true,
    width: 200,
    sorter: (a, b) => {
      let at = a.create_time;
      let bt = b.create_time;
      return moment(bt).valueOf() - moment(at).valueOf();
    },
  },
  {
    title: "收货人",
    key: "name",
    align: "center",
    dataIndex: "name",
    ellipsis: true,
    width: 200,
  },
  {
    title: "收货人电话",
    key: "phone",
    align: "center",
    dataIndex: "phone",
    ellipsis: true,
    width: 200,
  },

  {
    title: "物流公司",
    key: "ship_company",
    align: "center",
    ellipsis: true,
    dataIndex: "ship_company",
    width: 150,
  },

  {
    title: "物流单号",
    key: "ship_number",
    align: "center",
    ellipsis: true,
    dataIndex: "ship_number",
    width: 150,
    customRender(record) {
      if (record.record.ship_code == "ziti") {
        return "自提方式暂无单号";
      } else {
        return record.text;
      }
    },
  },
  {
    title: "物流信息",
    key: "ship_state",
    align: "center",
    dataIndex: "ship_state",
    ellipsis: true,
    width: 200,
    customRender(record) {
      if (record.record.ship_code == "ziti") {
        return "等待自提中";
      } else {
        return record.text;
      }
    },
  },
  {
    title: "操作",
    align: "center",
    key: "action",
    width: 400,
    fixed: "right",
  },
];
// 待发货
const columns2 = [
  {
    title: "订单编号",
    dataIndex: "out_trade_no",
    align: "center",
    ellipsis: true,
    key: "out_trade_no",
    width: 250,
  },
  {
    title: "商品缩略图",
    dataIndex: "goods_image",
    align: "center",
    key: "goods_image",
    ellipsis: true,
    width: 130,
  },
  {
    title: "商品名称",
    key: "goods_name",
    align: "center",
    ellipsis: true,
    dataIndex: "goods_name",
    width: 130,
  },
  {
    title: "数量",
    key: "num",
    align: "center",
    dataIndex: "num",
    ellipsis: true,
    width: 80,
  },
  {
    title: "实际支付",
    key: "real_price",
    align: "center",
    dataIndex: "real_price",
    ellipsis: true,
    width: 100,
  },
  {
    title: "下单时间",
    key: "create_time",
    align: "center",
    ellipsis: true,
    dataIndex: "create_time",
    width: 200,
    sorter: (a, b) => {
      let at = a.create_time;
      let bt = b.create_time;
      return moment(bt).valueOf() - moment(at).valueOf();
    },
  },
  {
    title: "收货人",
    key: "name",
    align: "center",
    dataIndex: "name",
    ellipsis: true,
  },
  {
    title: "收货人电话",
    key: "phone",
    align: "center",
    dataIndex: "phone",
    ellipsis: true,
  },
  {
    title: "收货人地址",
    key: "address",
    align: "center",
    ellipsis: true,
    dataIndex: "address",
  },
  {
    title: "操作",
    align: "center",
    key: "action",
    fixed: "right",
    width: 360,
  },
];
// 全部
const columns3 = [
  {
    title: "订单编号",
    dataIndex: "out_trade_no",
    align: "center",
    key: "out_trade_no",
    ellipsis: true,
    width: 250,
    fixed: "left",
  },
  {
    title: "商品缩略图",
    dataIndex: "goods_image",
    align: "center",
    key: "goods_image",
    ellipsis: true,
    width: 130,
  },
  {
    title: "商品名称",
    key: "goods_name",
    align: "center",
    dataIndex: "goods_name",
    ellipsis: true,
    width: 130,
  },
  {
    title: "数量",
    key: "num",
    align: "center",
    dataIndex: "num",
    ellipsis: true,
    width: 80,
  },
  {
    title: "实际支付",
    key: "real_price",
    align: "center",
    dataIndex: "real_price",
    ellipsis: true,
    width: 100,
  },
  {
    title: "下单时间",
    key: "create_time",
    align: "center",
    dataIndex: "create_time",
    ellipsis: true,
    width: 200,
    sorter: (a, b) => {
      let at = a.create_time;
      let bt = b.create_time;
      return moment(bt).valueOf() - moment(at).valueOf();
    },
  },
  {
    title: "收货人",
    key: "name",
    align: "center",
    dataIndex: "name",
    ellipsis: true,
    width: 200,
  },
  {
    title: "收货人电话",
    key: "phone",
    align: "center",
    dataIndex: "phone",
    ellipsis: true,
    width: 200,
  },
  {
    title: "订单状态",
    key: "status",
    align: "center",
    dataIndex: "status",
    ellipsis: true,
    width: 150,
  },
  {
    title: "订单地址",
    key: "address",
    align: "center",
    dataIndex: "address",
    width: 360,
  },
  {
    title: "操作",
    align: "center",
    key: "action",
    width: 300,
    fixed: "right",
  },
];
let columnsTables = ref([]);
columnsTables.value = columns2;
watch(tabActive, (newVal) => {
  let data = {
    1: columns2,
    2: columns,
    4: columns3,
  };
  columnsTables.value = data[newVal];
});
const orderList = ref([]);
const changeTables = (status) => {
  tabActive.value = status;
  getList();
};

const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 6,
  hideOnSinglePage: true,
});

const handlePageChange = (page) => {
  pagination.current = page.current;
  getList();
};
const getList = () => {
  let params = {
    page: pagination.current,
    page_size: pagination.pageSize,
    status: tabActive.value == 4 ? "all" : tabActive.value,
    keyword: searchVal.value,
  };
  order_list(params).then((res) => {
    let data = res.data;
    pagination.total = data.total;
    pagination.current = data.current_page;
    orderList.value = data.data;
  });
};
const handleCopyAddress = (record) => {
  let str = `姓名：${record.name};电话：${record.phone};详细地址：${record.address}`;
  try {
    navigator.clipboard
      .writeText(str)
      .then((res) => {
        message.success("地址复制成功");
      })
      .catch((err) => {
        console.log(err);
        message.error("地址复制失败");
      });
  } catch (error) {
    console.log(error);
    message.error("你的浏览器不支持复制文本，请更换浏览器或者使用最新的版本");
  }
};
let shipOpen = ref(false);

let shipformState = ref({
  ship_company: null,
  ship_number: null,
});
let shiporderId = "";
const handleShip = (record) => {
  shiporderId = record.id;
  shipOpen.value = true;
};
const handleCancelShip = () => {
  shipformState.value = {
    ship_company: "",
    ship_number: "",
  };
};
const handleShipOk = () => {
  let params = {
    ...shipformState.value,
    order_id: shiporderId,
  };
  console.log(params);
  if (Object.entries(params).some(([key, value]) => value === "")) {
    message.error("请填写完整信息");
    return false;
  }
  order_ship(params).then((res) => {
    if (res) {
      message.success("操作成功");
      shipOpen.value = false;
      getList();
      handleCancelShip();
    }
  });
};
const handleCloseOrder = (record) => {
  Modal.confirm({
    title: "确认关闭该订单么？?",
    icon: createVNode(ExclamationCircleOutlined),
    content: createVNode(
      "div",
      { style: "color: rgba(0,0,0,0.65);" },
      "关闭订单前，请务必与客户确定过后操作。"
    ),
    onOk() {
      let params = {
        order_id: record.id,
      };
      order_cancel(params).then((res) => {
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
const handleOpenOrder = (record) => {
  Modal.confirm({
    title: "确认开启该订单么？?",
    icon: createVNode(ExclamationCircleOutlined),
    content: createVNode(
      "div",
      { style: "color: rgba(0,0,0,0.65);" },
      "开启订单前，请务必与客户确定过后操作。"
    ),
    onOk() {
      let params = {
        order_id: record.id,
      };
      order_open(params).then((res) => {
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
const handleOverOrder = (record) => {
  Modal.confirm({
    title: "确认商品已送达？",
    icon: createVNode(ExclamationCircleOutlined),
    content: createVNode(
      "div",
      { style: "color: rgba(0,0,0,0.65);" },
      "请确定物流状态后，点击送达，以完成该订单。"
    ),
    onOk() {
      let params = {
        order_id: record.id,
      };
      order_finish(params).then((res) => {
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
const handleToInfo = (record) => {
  router.push({
    path: "/order/info",
    query: {
      id: record.id,
    },
  });
};
const handleUpdateShip = () => {
  order_updateExpress().then(() => {
    message.success("已更新物流信息");
    getList();
  });
};
let expressList = ref([]);
const getExpresss = () => {
  expresss().then((res) => {
    console.log(res);
    expressList.value = res.data;
  });
};
onMounted(() => {
  getList();
  getExpresss();
});
</script>

<template>
  <div class="page-content">
    <div class="page-head">
      <div class="page-info">
        <p class="title" style="margin-bottom: 16px">订单管理</p>
      </div>
      <div class="page-form">
        <a-input-search
          v-model:value="searchVal"
          enter-button="搜 索"
          placeholder="请输入"
          @search="onSearch"
          :loading="searchStatus"
        />
      </div>
    </div>
    <div class="tabs">
      <span @click="changeTables(1)" :class="{ active: tabActive == 1 }">待发货</span>
      <span @click="changeTables(2)" :class="{ active: tabActive == 2 }">已发货</span>
      <span @click="changeTables(4)" :class="{ active: tabActive == 4 }">全部订单</span>
    </div>
    <div class="page-body">
      <div class="page-table">
        <p class="title">
          商品列表
          <a-button type="primary" v-if="tabActive == 2" @click="handleUpdateShip()"
            >刷新物流</a-button
          >
        </p>
        <div class="tables">
          <a-table
            :columns="columnsTables"
            :data-source="orderList"
            @change="handlePageChange"
            :scroll="{ x: 1300, y: 1000 }"
            :pagination="pagination"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'out_trade_no'">
                <a-button type="link" @click="handleToInfo(record)">{{
                  record.out_trade_no
                }}</a-button>
              </template>
              <template v-if="column.key === 'goods_image'">
                <a-avatar :src="'https://dental.cdwuhu.com/' + record.goods_image" />
              </template>
              <template v-if="column.key === 'status'">
                <span style="color: #d44469" v-if="record.status == 0">待支付</span>
                <span style="color: #d44469" v-if="record.status == 1">待发货</span>
                <span style="color: #d44469" v-if="record.status == 2">已发货</span>
                <span style="color: #d44469" v-if="record.status == 3">已收货</span>
                <span v-if="record.status == 4">已完成</span>
                <span v-if="record.status == -1">已关闭</span>
              </template>
              <template v-else-if="column.key === 'action'">
                <template v-if="tabActive == 1">
                  <div>
                    <a-button type="link" @click="handleCopyAddress(record)">
                      复制地址
                    </a-button>
                    <a-divider type="vertical" />
                    <a-button
                      type="link"
                      @click="handleShip(record)"
                      v-if="record.status == 1"
                      >发货
                    </a-button>
                    <a-divider type="vertical" />
                    <a-button
                      danger
                      type="link"
                      v-if="record.status != -1"
                      @click="handleCloseOrder(record)"
                    >
                      关闭
                    </a-button>
                    <a-button
                      danger
                      type="link"
                      v-if="record.status == -1"
                      @click="handleOpenOrder(record)"
                    >
                      打开
                    </a-button>
                  </div>
                </template>
                <template v-if="tabActive == 2">
                  <a-button
                    type="link"
                    v-if="tabActive == 2"
                    @click="handleToInfo(record)"
                    >物流详情</a-button
                  >
                  <a-divider type="vertical" />
                  <a-button type="link" @click="handleCopyAddress(record)">
                    复制地址
                  </a-button>
                  <a-divider type="vertical" />
                  <a-button type="link" @click="handleOverOrder(record)">送达 </a-button>
                  <a-divider type="vertical" />
                  <a-button
                    danger
                    type="link"
                    v-if="record.status != -1"
                    @click="handleCloseOrder(record)"
                  >
                    关闭
                  </a-button>
                  <a-button
                    danger
                    type="link"
                    v-if="record.status == -1"
                    @click="handleOpenOrder(record)"
                  >
                    打开
                  </a-button>
                </template>
                <template v-if="tabActive == 4">
                  <a-button type="link" @click="handleCopyAddress(record)">
                    复制地址
                  </a-button>
                  <a-divider type="vertical" />
                  <a-button
                    type="link"
                    :disabled="record.status < 0 || record.status > 2"
                    v-if="record.ship_number == ''"
                    @click="handleShip(record)"
                    >发货
                  </a-button>
                  <a-button
                    type="link"
                    :disabled="record.status < 0 || record.status > 2"
                    v-else
                    @click="handleOverOrder(record)"
                    >送达
                  </a-button>
                  <a-divider type="vertical" />
                  <a-button
                    danger
                    type="link"
                    v-if="record.status != -1"
                    @click="handleCloseOrder(record)"
                  >
                    关闭
                  </a-button>
                  <a-button
                    danger
                    type="link"
                    v-if="record.status == -1"
                    @click="handleOpenOrder(record)"
                  >
                    打开
                  </a-button>
                </template>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </div>
    <a-modal
      v-model:open="shipOpen"
      title="单号上传"
      @cancel="handleCancelShip"
      @ok="handleShipOk"
    >
      <div class="forms" style="padding: 15px 0">
        <a-form
          :model="shipformState"
          name="basic"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
        >
          <a-form-item label="快递公司" name="ship_company">
            <!-- <a-input v-model:value="shipformState.ship_company" /> -->
            <a-select ref="select" v-model:value="shipformState.ship_company">
              <a-select-option
                v-for="(value, key) in expressList"
                :key="key"
                :value="key"
              >
                {{ value }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="快递单号" name="ship_company">
            <a-input
              v-model:value="shipformState.ship_number"
              placeholder="自提方式不用填写单号"
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>
<style lang="less" scoped>
@import url("./index.less");
</style>
<style>
.login-form .ant-message {
  position: absolute;
}
</style>
