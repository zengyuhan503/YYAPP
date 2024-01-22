<template>
  <view class="page-content">
    <view class="content">
      <view class="page-header"> 预颜口腔 </view>
      <view class="page-banner">
        <uni-swiper-dot
          class="uni-swiper-dot-box"
          @clickItem="clickItem"
          :info="info"
          :current="current"
          :mode="mode"
          :dots-styles="dotsStyles"
          field="content"
        >
          <swiper class="swiper-box" @change="change" :current="swiperDotIndex">
            <swiper-item
              v-for="(item, index) in banners"
              :key="index"
              @click="handleToBannerInfo(item)"
            >
              <image
                :src="'https://dental.cdwuhu.com/' + item.image"
                mode="widthFix"
                class="swiper-image"
              ></image>
            </swiper-item>
          </swiper>
        </uni-swiper-dot>
      </view>
      <view class="yuyue">
        <view class="item" @click="handleToPopularScience">
          <view class="title">科普馆预约</view>
          <view class="desc">了解更多科普知识</view>
          <image
            class="yuyueimg"
            src="http://h5.dental.cdwuhu.com/static/image/yuyue1.png"
            mode="widthFix"
          >
          </image>
          <view class="yuyue-btn">
            <image
              src="http://h5.dental.cdwuhu.com/static/image/yuyue-btn1.png"
              mode=""
            ></image>
            <view class=""> 预约 </view>
          </view>
        </view>
        <view class="item item2" @click="handleToPopularScience2">
          <view class="title">看诊预约</view>
          <view class="desc">专业团队一触即达</view>
          <image
            class="yuyueimg"
            src="http://h5.dental.cdwuhu.com/static/image/yuyue2.png"
            mode="widthFix"
          >
          </image>
          <view class="yuyue-btn">
            <image
              style="width: 134px"
              src="http://h5.dental.cdwuhu.com/static/image/yuyue-btn2.png"
              mode=""
            ></image>
            <view class=""> 预约 </view>
          </view>
        </view>
      </view>
      <view class="homeImage">
        <view class="homeImagebox">
          <view class="showimage">
            <image
              src="http://h5.dental.cdwuhu.com/static/image/homeimage1.png"
              mode="widthFix"
            ></image>
          </view>
          <view class="text">
            <view class="text1"> 成长大道 </view>
            <view class="text2"> 即将推出 </view>
          </view>
        </view>
      </view>
      <view class="" style="height: 100px"> </view>
    </view>
    <navs active="home" />
  </view>
</template>

<script setup>
import navs from "/components/navs/index.vue";
import { ref, onMounted } from "vue";
import { GetIndexBanner } from "../../utils/api/index";
let modeIndex = ref(-1);
let styleIndex = ref(-1);
let current = ref(0);
let info = ref([{}]);
let mode = ref("default");
let dotsStyles = ref({});
let swiperDotIndex = ref(0);
let banners = ref([]);
const change = (e) => {
  current.value = e.detail.current;
};

const clickItem = (e) => {
  current.value = e;
};
const handleToPopularScience = () => {
  wx.navigateTo({
    url: "/pages/popularScience/index",
    fail: (err) => {
      console.log(err);
    },
  });
};
const handleToPopularScience2 = () => {
  wx.navigateTo({
    url: "/pages/popularScience/index2",
    fail: (err) => {
      console.log(err);
    },
  });
};
const handleGetBanner = () => {
  GetIndexBanner({ type: 1 }).then((res) => {
    console.log(res);
    banners.value = res;
  });
};

function objectToQueryString(obj) {
  var queryString = "";
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (queryString.length > 0) {
        queryString += "&";
      }
      queryString += key + "=" + obj[key];
    }
  }
  return "?" + queryString;
}
const handleToBannerInfo = (item) => {
  let querys = objectToQueryString(item);
  let url = "/pages/index/bannerinfo" + querys;
  console.log(url);
  uni.navigateTo({
    url: url,
  });
};
onMounted(() => {
  handleGetBanner();
});
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
<style>
.uni-swiper__warp {
  box-shadow: 0px -2px 20px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
}
</style>
