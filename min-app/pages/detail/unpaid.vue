<template>
  <view class="page-content">
    <view class="detail-status">
      <view class="label">待支付</view>
      <view class="timeout"
        >请在 <text>{{ timeouts }}</text> 内支付</view
      >
    </view>
    <view class="main">
      <view class="distribution" v-if="orderInfo.status == 2">
        <view class="label">
          <view class="name"> 物流信息 </view>
          <view class="btns"> 查看物流 </view>
        </view>
        <view class="info">
          <view class="name"> 快递公司： <text>2023/12/11 13:50</text> </view>
          <view class="phone">
            快递单号： <text>1234567890</text> <text class="copy">复制</text></view
          >
        </view>
      </view>
      <view class="address">
        <view class="label">
          <view class="name"> 收货地址 </view>
        </view>
        <view class="info">
          <view class="name"> {{ orderInfo.name }} </view>
          <view class="phone"> {{ orderInfo.phone }} </view>
          <view class="phone"> {{ orderInfo.address }} </view>
        </view>
      </view>
      <view class="order">
        <view class="label">
          <view class="name"> 订单信息 </view>
        </view>
        <view class="info">
          <view class="name">
            下单时间： <text>{{ orderInfo.create_time }}</text>
          </view>
          <view class="phone">
            订单编号： <text>{{ orderInfo.order_no }}</text>
          </view>
        </view>
      </view>
      <view class="commodity">
        <view class="label">
          <view class="name"> 商品信息 </view>
        </view>
        <view class="info">
          <view class="cover">
            <image
              :src="'https://dental.cdwuhu.com/' + orderInfo.goods_image"
              mode="widthFix"
            />
          </view>
          <view class="desc">
            <view class="name">{{ orderInfo.goods_name }}</view>
            <view class="count">x {{ orderInfo.num }}</view>
            <view class="price">实际支付 ¥{{ orderInfo.real_price }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="close-order" v-if="orderInfo.status == 0" @click="showCancel = true">
      取消订单
    </view>
    <view class="refund-order" v-if="orderInfo.status !== 0">
      如需退款，请 <text>致电门店</text>
    </view>
    <view class="pays-content" v-if="orderInfo.status == 0">
      <view class="pays">
        <view class="price"
          >折后价 <text>¥ {{ orderInfo.real_price }}</text></view
        >
        <view class="btns"> 购买 </view>
      </view>
    </view>
  </view>

  <view class="cancelSubcribe" v-if="showCancel">
    <view class="body">
      <view class="close">
        <image
          src="../../static/image/close.png"
          @click="showCancel = false"
          mode="widthFix"
        />
      </view>
      <view class="main">
        <view class="title">确定要取消订单</view>
        <view class="desc">取消订单后，您可重新下单</view>
      </view>
      <view class="btns" @click="handleCancelOrder">取消该订单</view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onLaunch, onShow, onLoad } from "@dcloudio/uni-app";
import { GetOrderInfo } from "../../utils/api/index";
import moment from "moment";
let orderid = null;
let orderInfo = ref({});
let showCancel = ref(false);
onLoad((options) => {
  orderid = options.id;
  handleGetOrderInfo();
});
let timeouts = ref("");
const handleGetOrderInfo = () => {
  let params = {
    order_id: orderid,
  };
  GetOrderInfo(params).then((res) => {
    console.log(res);
    orderInfo.value = res;
    const currentTime = moment();
    const createTimeMoment = moment(res.create_time, "YYYY-MM-DD HH:mm:ss");
    const timeDifferenceSeconds = createTimeMoment.diff(currentTime, "seconds");

    // 计算倒计时小时、分钟和秒数
    const hours = Math.floor(Math.abs(timeDifferenceSeconds) / 3600);
    const minutes = Math.floor((Math.abs(timeDifferenceSeconds) % 3600) / 60);
    const seconds = Math.abs(timeDifferenceSeconds) % 60;

    // 将时间差格式化为 "HH:mm:ss"
    const formattedCountdown = `${
      timeDifferenceSeconds >= 0 ? "" : "-"
    } ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    console.log(formattedCountdown);
    timeouts.value = formattedCountdown;
  });
};
const handleCancelOrder = () => {};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
