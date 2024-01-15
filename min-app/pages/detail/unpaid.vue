<template>
  <view class="page-content">
    <view class="detail-status">
      <view class="label">待支付</view>
      <view class="timeout">请在 <text>00:15:00</text> 内支付</view>
    </view>
    <view class="main">
      <view class="distribution">
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
          <view class="name"> 张三 </view>
          <view class="phone"> 138789746457 </view>
          <view class="phone"> 四川省成都市高新区天府三街写字楼1qweqe134 </view>
        </view>
      </view>
      <view class="order">
        <view class="label">
          <view class="name"> 收货地址 </view>
        </view>
        <view class="info">
          <view class="name"> 下单时间： <text>2023/12/11 13:50</text> </view>
          <view class="phone"> 订单编号： <text>1234567890</text> </view>
        </view>
      </view>
      <view class="commodity">
        <view class="label">
          <view class="name"> 收货地址 </view>
        </view>
        <view class="info">
          <view class="cover">
            <image src="../../static/image/capabilities2.png" mode="widthFix" />
          </view>
          <view class="desc">
            <view class="name">产品名字不能有空格跟符这里一排</view>
            <view class="count">x 2</view>
            <view class="price">实际支付 ¥200</view>
          </view>
        </view>
      </view>
    </view>
    <view class="close-order"> 取消订单 </view>
    <view class="refund-order"> 如需退款，请 <text>致电门店</text> </view>
    <view class="pays-content">
      <view class="pays">
        <view class="price">折后价 <text>¥ 234</text></view>
        <view class="btns"> 购买 </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
