<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { PlusOutlined } from "@ant-design/icons-vue";
import { order_list } from "@/utils/request/index";
let router = useRouter();
let route = useRoute();
let searchStatus = ref(false);
let tabActive = ref(1);
let searchVal = ref("");
const onSearch = () => {
  pagination.current=1
  getList()
};
let goodsCategoryList = ref([]);
const columns = [
  {
    title: "订单编号",
    dataIndex: "title",
    align: "center",
    key: "title",
  },
  {
    title: "商品缩略图",
    dataIndex: "icon",
    align: "center",
    key: "icon",
  },
  {
    title: "商品名称",
    key: "phone",
    align: "center",
    dataIndex: "phone",
  },
  {
    title: "数量",
    key: "phone",
    align: "center",
    dataIndex: "phone",
  },
  {
    title: "实际支付",
    key: "phone",
    align: "center",
    dataIndex: "phone",
  },
  {
    title: "下单时间",
    key: "phone",
    align: "center",
    dataIndex: "phone",
  },
  {
    title: "收货人",
    key: "phone",
    align: "center",
    dataIndex: "phone",
  },
  {
    title: "收货人电话",
    key: "phone",
    align: "center",
    dataIndex: "phone",
  },
  {
    title: "收货人地址",
    key: "phone",
    align: "center",
    dataIndex: "phone",
  },

  {
    title: "物流信息",
    key: "phone",
    align: "center",
    dataIndex: "phone",
  },
  {
    title: "操作",
    align: "center",
    key: "action",
  },
];

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
    status: tabActive.value,
    keyword: searchVal.value,
  };
  order_list(params).then((res) => {
    console.log(res);
    let data = res.data;
    pagination.total = data.total;
    pagination.current = data.current_page;
  });
};

onMounted(() => {
  getList();
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
        <p class="title">商品列表</p>
        <div class="tables">
          <a-table
            :columns="columns"
            :data-source="orderList"
            @change="handlePageChange"
            :pagination="pagination"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'head_image'">
                <a>
                  <a-avatar :src="'https://dental.cdwuhu.com/' + record.head_image" />
                </a>
              </template>
              <template v-else-if="column.key === 'action'">
                <a-button type="link">编辑</a-button>
                <a-divider type="vertical" />
                <a-button v-if="record.status == 1" danger type="link">下架</a-button>
                <a-button v-else type="link">上架</a-button>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </div>
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
