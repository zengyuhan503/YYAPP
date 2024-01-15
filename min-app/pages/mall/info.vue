<template>
  <view class="page-content">
    <div class="covers">
      <image src="../../static/image/capabilities2.png" mode="widthFix" />
    </div>
    <view class="info-main">
      <view class="content">
        <view class="info">
          <view class="price">
            <view>折后价 ¥ <text>234</text></view>
            <view>日常价 ¥ 888</view>
          </view>
          <view class="discounts">
            <image src="../../static/image/discounts.png" mode="" />
            <view class="text">立省¥ <text>654</text></view>
          </view>
          <view class="discounts">
            <image src="../../static/image/discounts1.png" mode="" />
            <view class="text">预颜臻选</view>
          </view>
        </view>
        <view class="title">产品名字不能有空格跟符号</view>
        <view class="desc">
          这里是文字内容介绍，总字数不超过200个字，长文字介绍，总字数不超过200个字，长文字介绍总字数不超过200个字，长文字介绍总字数不超过200个字，长文字
        </view>
      </view>
      <view class="details">
        这里是详情详情详情
        这里是详情详情详情这里是详情详
        这里是详情详情详情
        这里是详情详情详情这里是详情详
        这里是详情详情详情
        这里是详情详情详情这里是详情详
        这里是详情详情详情
        这里是详情详情详情这里是详情详
        这里是详情详情详情
        这里是详情详情详情这里是详情详
        这里是详情详情详情
        这里是详情详情详情这里是详情详
        这里是详情详情详情
        这里是详情详情详情这里是详情详
        这里是详情详情详情
        这里是详情详情详情这里是详情详
        这里是详情详情详情
        这里是详情详情详情这里是详情详
        这里是详情详情详情
        这里是详情详情详情这里是详情详
        这里是详情详情详情
        这里是详情详情详情这里是详情详
        这里是详情详情详情
        这里是详情详情详情这里是详情详
        这里是详情详情详情
        这里是详情详情详情这里是详情详情详情这里是详情详情详情这里是详情详情详情这里是详情详情详情这里是详情详情详情这里是详情详情详情这里是详情详情详情这里是详情详情详情这里是详情详情详情这里是详情详情详情这里是详情详情详情
      </view>
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

.swiper-box {
  height: 180px !important;
}

.swiper-image {
  width: 100% !important;
  height: 180px !important;
  background: #ffffff;
  box-shadow: 0px -2px 20px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
}

.uni-swiper-dot-box > view > view {
  display: none !important;
  border-radius: 10px;
  overflow: hidden;
}
</style>

<style lang="less">
swiper-item,
swiper-box,
uni-swiper-dot,
.uni-swiper-dot-box {
  border-radius: 10px;
  overflow: hidden;
}
</style>
