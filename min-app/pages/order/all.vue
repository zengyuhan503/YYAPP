<template>
  <view class="page-content">
    <div class="main">
      <div class="items" v-for="(item, index) in orderList" :key="index">
        <div class="item" @click="handleToOrderInfo(item)">
          <div class="cate">
            <div>商品类型</div>
            <div class="type" v-if="item.status == 0">待付款</div>
            <div class="type" v-if="item.status == 2">待收货</div>
            <div class="type cancel" v-if="item.status == 4">已完成</div>
          </div>
          <div class="info">
            <div class="cover">
              <image :src="'https://dental.cdwuhu.com/' + item.goods_image" mode="" />
            </div>
            <div class="desc">
              <div class="title">{{ item.goods_name }}</div>
              <div class="count">x {{ item.num }}</div>
              <div class="price">实际支付 ¥{{ item.real_price }}</div>
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
let orderList = ref([]);
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
  if (item.status == 0) {
    uni.navigateTo({
      url: "/pages/detail/unpaid?id=" + item.id,
    });
  }
  // uni.navigateTo({
  //   url: "",
  // });
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
