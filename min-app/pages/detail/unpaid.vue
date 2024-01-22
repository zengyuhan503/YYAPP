<template>
  <view class="page-content">
    <view class="detail-status">
      <view class="label">{{ str[orderInfo.status] }}</view>
      <view class="timeout" v-if="orderInfo.status == 0"
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
          <view class="name">
            快递公司： <text>{{ orderInfo.ship_company }}</text>
          </view>
          <view class="phone">
            快递单号： <text>{{ orderInfo.ship_number }}</text>
            <text @click="handleCopy" class="copy">复制</text>
          </view>
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
      如需退款，请 <text @click="handleMakePhoneCall">致电门店</text>
    </view>
    <view class="pays-content" v-if="orderInfo.status == 0">
      <view class="pays">
        <view class="price">
          <text style="margin-right: 16px">合计</text>
          <text style="color: #f9a143"> ¥</text>
          <text class="num"> {{ orderInfo.real_price }}</text>
        </view>
        <view class="btns" @click="handleToCreateOrder"> 支付 </view>
      </view>
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
import { GetOrderInfo, CancelOrder, CreateWxPay } from "../../utils/api/index";
import moment from "moment";
let str = ref({
  0: "待付款",
  1: "待发货",
  2: "待收货",
  3: "已收货",
  4: "完成订单",
  "-1": "已关闭",
  "-2": "已关闭",
  all: "全部订单",
});
let orderid = null;
let orderInfo = ref({});
let showCancel = ref(false);
let timeouts = ref("");
let interval = null;
function updateCountdown() {
  const expiredTime = orderInfo.value.expired_time;
  // 获取当前时间戳
  const currentTime = moment().unix();

  // 计算差值
  const timeDifference = expiredTime - currentTime;

  // 将差值转换为时分秒格式
  const duration = moment.duration(timeDifference, "seconds");
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  timeouts.value = `${hours}:${minutes}:${seconds}`;
  // 如果倒计时结束，停止更新
  if (timeDifference <= 0) {
    clearInterval(interval);
    GetOrderInfo()
    // setTimeout(() => {
    //   wx.redirectTo({
    //     url: "/pages/user/index",
    //   });
    // }, 2000);
  }
}

const handleMakePhoneCall = () => {
  uni.makePhoneCall({
    phoneNumber: "15522756996", //仅为示例
  });
};
const handleToCreateOrder = () => {
  let params = {
    order_id: orderid,
  };
  CreateWxPay(params).then((res) => {
    console.log(res);
    wx.requestPayment({
      timeStamp: res.timeStamp,
      nonceStr: res.nonceStr,
      package: res.package,
      signType: "MD5",
      paySign: res.paySign,
      success(res) {
        console.log(res);
        wx.showToast({
          icon: "success",
          title: "支付成功",
          duration: 2000,
        });
        setTimeout(() => {
          handleGetOrderInfo();
        }, 2000);
      },
      fail(err) {
        wx.showToast({
          icon: "error",
          title: "支付失败",
          duration: 2000,
        });
        setTimeout(() => {
          handleGetOrderInfo();
        }, 2000);
        console.log(err);
      },
    });
  });
};
const handleGetOrderInfo = () => {
  let params = {
    order_id: orderid,
  };
  GetOrderInfo(params).then((res) => {
    orderInfo.value = res;
    clearInterval(interval);
    interval = null;
    interval = setInterval(updateCountdown, 1000);
    updateCountdown();
  });
};
const handleCopy = () => {
  uni.setClipboardData({
    data: orderInfo.ship_number,
    success: function () {
      uni.showToast({
        icon: "none",
        title: "复制成功",
        duration: 2000,
      });
    },
  });
};
const handleCancelOrder = () => {
  let params = {
    order_id: orderid,
  };
  CancelOrder(params).then((res) => {
    console.log(res);
    uni.showToast({
      icon: "success",
      duration: 2000,
      title: "取消成功",
      success() {
        setTimeout(() => {
          wx.redirectTo({
            url: "/pages/user/index",
          });
        }, 2000);
      },
    });
  });
};

onLoad((options) => {
  orderid = options.id;
  handleGetOrderInfo();
});
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
