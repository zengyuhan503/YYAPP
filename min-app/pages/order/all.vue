<template>
  <view class="page-content">
    <div class="main">
      <div class="items" v-for="(item, index) in orderList" :key="index">
        <div class="item" @click="handleToOrderInfo(item)">
          <div class="cate">
            <div>商品类型</div>
            <div class="type" v-if="item.status == 0">待付款</div>
            <div class="type" v-if="item.status == 1">待发货</div>
            <div class="type" v-if="item.status == 2">待收货</div>
            <div class="type" v-if="item.status == 3">已收货</div>
            <div class="type cancel" v-if="item.status == 4">已完成</div>
            <div class="type cancel" v-if="item.status == -1">已关闭</div>
            <div class="type cancel" v-if="item.status == -2">已关闭</div>
            <div class="type cancel" v-if="item.status == -3">已关闭</div>
          </div>
          <div class="info">
            <div class="cover">
              <image :src="'https://www.yuyandental.com/' + item.goods_image" mode="" />
            </div>
            <div class="desc">
              <div class="title">{{ item.goods_name }}</div>
              <div class="count">x {{ item.num }}</div>
              <div class="price" :class="getClassStatus(item.status)">
                实际支付 ¥{{ item.real_price }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onLaunch, onShow, onLoad } from "@dcloudio/uni-app";
import { GetOrderList } from "../../utils/api/index";
let status = ref(0);
let orderStr = ref({
  0: "待付款",
  1: "待发货",
  2: "待收货",
  3: "已收货",
  4: "完成订单",
  "-1": "已关闭",
  "-2": "已取消",
  "-3": "已取消",
  all: "全部订单",
});
let orderList = ref([]);
const getClassStatus = (status) => {
  let str = {
    0: "active",
    "-1": "cancel",
    "-2": "cancel",
    "-3": "cancel",
  };
  return str[status] || "";
};
onLoad((option) => {
  status.value = option.status;
  console.log(status.value);
  handleGetOrderList(status.value);
  handleSetPageTitle(status.value);
});
const handleSetPageTitle = (status) => {
  let str = {
    0: "待付款",
    2: "待收货",
    4: "完成订单",
    all: "全部订单",
  };
  let title = str[status];
  console.log(title);
  uni.setNavigationBarTitle({
    title: title,
  });
};
const handleGetOrderList = (status) => {
  let params = {
    page: 1,
    page_size: 1000,
    status: status,
  };
  GetOrderList(params).then((res) => {
    console.log(res);
    orderList.value = res.data;
  });
};
const handleToOrderInfo = (item) => {
  uni.navigateTo({
    url: "/pages/detail/unpaid?id=" + item.id,
  });
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
