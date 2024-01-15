<template>
  <view class="page-content">
    <view class="banner">
      <view class="banner-back">
        <image src="../../static/image/banner.png" mode="" />
        <view class="filter-back"></view>
      </view>
      <view class="page-banner">
        <uni-swiper-dot class="uni-swiper-dot-box" field="content">
          <swiper class="swiper-box" @change="change" :current="swiperDotIndex">
            <swiper-item v-for="(item, index) in 3" :key="index">
              <image src="../../static/image/banner.png" class="swiper-image"></image>
            </swiper-item>
          </swiper>
        </uni-swiper-dot>
      </view>
    </view>
    <view class="main">
      <view class="sider">
        <view class="items">
          <view class="item active">
            <image src="../../static/image/cate.png" />
            <view class="title">所有商品</view>
          </view>
          <view class="item">
            <image src="../../static/image/cate.png" />
            <view class="title">所有商品</view>
          </view>
          <view class="item">
            <image src="../../static/image/cate.png" />
            <view class="title">所有商品</view>
          </view>
        </view>
      </view>
      <view class="content">
        <view class="items">
          <view class="item">
            <view class="cover">
              <image src="../../static/image/banner.png" />
            </view>
            <div class="info">
              <view class="title">预颜超白美净牙膏</view>
              <view class="original">¥888</view>
              <view class="price">¥200</view>
            </div>
          </view>
          <view class="item">
            <view class="cover">
              <image src="../../static/image/banner.png" />
            </view>
            <div class="info">
              <view class="title">预颜超白美净牙膏</view>
              <view class="original">¥888</view>
              <view class="price">¥200</view>
            </div>
          </view>
          <view class="item">
            <view class="cover">
              <image src="../../static/image/banner.png" />
            </view>
            <div class="info">
              <view class="title">预颜超白美净牙膏</view>
              <view class="original">¥888</view>
              <view class="price">¥200</view>
            </div>
          </view>
          <view class="item">
            <view class="cover">
              <image src="../../static/image/banner.png" />
            </view>
            <div class="info">
              <view class="title">预颜超白美净牙膏</view>
              <view class="original">¥888</view>
              <view class="price">¥200</view>
            </div>
          </view>
          <view class="item">
            <view class="cover">
              <image src="../../static/image/banner.png" />
            </view>
            <div class="info">
              <view class="title">预颜超白美净牙膏</view>
              <view class="original">¥888</view>
              <view class="price">¥200</view>
            </div>
          </view>
          <view class="item">
            <view class="cover">
              <image src="../../static/image/banner.png" />
            </view>
            <div class="info">
              <view class="title">预颜超白美净牙膏</view>
              <view class="original">¥888</view>
              <view class="price">¥200</view>
            </div>
          </view>
          <view class="item">
            <view class="cover">
              <image src="../../static/image/banner.png" />
            </view>
            <div class="info">
              <view class="title">预颜超白美净牙膏</view>
              <view class="original">¥888</view>
              <view class="price">¥200</view>
            </div>
          </view>
          <view class="item">
            <view class="cover">
              <image src="../../static/image/banner.png" />
            </view>
            <div class="info">
              <view class="title">预颜超白美净牙膏</view>
              <view class="original">¥888</view>
              <view class="price">¥200</view>
            </div>
          </view>
          <view class="item">
            <view class="cover">
              <image src="../../static/image/banner.png" />
            </view>
            <div class="info">
              <view class="title">预颜超白美净牙膏</view>
              <view class="original">¥888</view>
              <view class="price">¥200</view>
            </div>
          </view>
        </view>
      </view>
    </view>
  <navs active="mall"/>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
	import navs from "/components/navs/index.vue";
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
