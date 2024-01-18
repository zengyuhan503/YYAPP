<template>
  <view class="page-content">
    <div class="covers">
      <!-- <image :src="'https://dental.cdwuhu.com/' + goodsInfo.head_image" mode="widthFix" /> -->
      <uni-swiper-dot class="uni-swiper-dot-box" :mode="mode" field="content">
        <swiper class="swiper-box">
          <swiper-item
            v-for="(item, index) in covers"
            :key="index"
            @click="handleToBannerInfo(item)"
          >
            <image
              :src="'https://dental.cdwuhu.com/' + item"
              mode="widthFix"
              class="swiper-image"
            ></image>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>
    </div>
    <view class="info-main">
      <view class="content">
        <view class="info">
          <view class="price" v-if="goodsInfo.sale_price != goodsInfo.price">
            <view>
              折后价 ¥ <text>{{ goodsInfo.sale_price }}</text>
            </view>
            <view>日常价 ¥ {{ goodsInfo.price }}</view>
          </view>
          <view class="price" v-else>
            <view>
              惊喜价 ¥ <text>{{ goodsInfo.sale_price }}</text>
            </view>
          </view>
          <view class="discounts" v-if="goodsInfo.sale_price != goodsInfo.price">
            <image src="../../static/image/discounts.png" mode="" />
            <view class="text"
              >立省¥ <text>{{ goodsInfo.price - goodsInfo.sale_price }}</text></view
            >
          </view>
          <view class="discounts" v-else>
            <image src="../../static/image/discounts1.png" mode="" />
            <view class="text">预颜臻选</view>
          </view>
        </view>
        <view class="title">{{ goodsInfo.title }}</view>
        <view class="desc">
          {{ goodsInfo.desc }}
        </view>
      </view>
      <view class="details">
        <view class="title">详情介绍</view>
        <image
          :src="'https://dental.cdwuhu.com/' + goodsInfo.detail_image"
          mode="widthFix"
        />
      </view>
      <view class="pays">
        <view class="price">
          <text v-if="goodsInfo.sale_price != goodsInfo.price">折扣价</text>
          <text v-else>惊喜价</text> <text class="num">¥ {{ goodsInfo.sale_price }}</text>
        </view>
        <view class="btns" @click="handleToCreateOrder"> 购买 </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onLaunch, onShow, onLoad } from "@dcloudio/uni-app";
import { GetGoodsInfo } from "../../utils/api";
let goodsId = ref(null);
let goodsInfo = ref({});
let mode = ref("default");
onLoad((option) => {
  goodsId.value = option.id;
  console.log(goodsId.value);
  handleGetOrderInfo();
});
let covers = ref([]);
const handleGetOrderInfo = () => {
  let params = {
    goods_id: goodsId.value,
  };
  GetGoodsInfo(params).then((res) => {
    goodsInfo.value = res;
    let newArr = [res.head_image];
    let dimg = res.deputy_image;
    dimg = dimg.split(",");
    newArr.push(...dimg);
    covers.value = newArr;
  });
};
const handleToCreateOrder = () => {
  console.log(1111);
  uni.navigateTo({
    url: "/pages/mall/purchase?id=" + goodsInfo.value.id,
  });
};
</script>

<style lang="less" scoped>
@import url("./index.less");

.swiper-box {
  height: calc(100vw) !important;
}
swiper {
  width: 100% !important;
  height: calc(100vw) !important;
}

.swiper-image {
  // width: 100% !important;
  // height: 180px !important;
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
