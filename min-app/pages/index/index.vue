<template>
  <view class="page-content">
    <view class="content">
      <view class="page-header"> 预颜口腔 </view>
      <view class="page-banner">
        <view>
          <uni-swiper-dot
            class="uni-swiper-dot-box"
            :info="banners"
            :current="swiperDotIndex"
            :dots-styles="dotsStyles"
            mode="round"
            field="content"
          >
            <swiper class="swiper-box" @change="change" interval="3000"  :autoplay="true" :current="swiperDotIndex">
              <swiper-item
                v-for="(item, index) in banners"
                :key="index"
                @click="handleToBannerInfo(item)"
              >
                <image
                  :src="'https://www.yuyandental.com/' + item.image"
                  mode="widthFix"
                  class="swiper-image"
                ></image>
              </swiper-item>
            </swiper>
          </uni-swiper-dot>
        </view>
      </view>
      <view class="yuyue">
        <view class="item" @click="handleToPopularScience">
          <view class="text">
            <view class="title">科普馆预约</view>
            <view class="desc">了解更多科普知识</view>
          </view>
          <image class="yuyueimg" src="http://h5.yuyandental.com/static/image/bj1.png" mode="widthFix">
          </image>
          <view class="yuyue-btn">
            <image src="http://h5.yuyandental.com/static/image/yuyue-btn1.png" mode="">
            </image>
            <view class=""> 预约 </view>
          </view>
        </view>
        <view class="step"></view>
        <view class="item item2" @click="handleToPopularScience2">
          <view class="text">
            <view class="title">看诊预约</view>
            <view class="desc">专业团队一触即达</view>
          </view>
          <image class="yuyueimg" src="http://h5.yuyandental.com/static/image/bj2.png" mode="widthFix">
          </image>
          <view class="yuyue-btn">
            <image
              style="width: 134px"
              src="http://h5.yuyandental.com/static/image/yuyue-btn2.png"
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
              src="http://h5.yuyandental.com/static/image/home03.jpg"
              mode="widthFix"
            ></image>
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
import {onShareAppMessage ,onShareTimeline} from "@dcloudio/uni-app"
let modeIndex = ref(-1);
let styleIndex = ref(-1);
let current = ref(0);
let info = ref([{}]);
let mode = ref("default");

let dotsStyles = ref({
  backgroundColor: "rgba(255,255,255,0.5);",
  border: "2px rgba(255,255,255,0.5); solid",
  color: "#fff",
  selectedBackgroundColor: "#F9A143",
  selectedBorder: "2px #F9A143 solid",
});
let swiperDotIndex = ref(0);
let banners = ref([]);
const change = (e) => {
  swiperDotIndex.value = e.detail.current;
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
  uni.navigateTo({
    url: url,
  });
};
onShareAppMessage(()=>{
	return {
		title:"多一点预防，多一点健康",
		path:'/pages/index/index'
	}
})

onShareTimeline(()=>{
	return {
		title:"多一点预防，多一点健康",
		path:'/pages/index/index'
	}
})
onMounted(() => {
  handleGetBanner();
});
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
<style>
.uni-swiper__warp {
  /* box-shadow: 0px -2px 20px 0px rgba(0, 0, 0, 0.2); */

  border-radius: 10px;
  overflow: hidden;
}
.uni-swiper__dots-item {
  width: 10px !important;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2) !important;
  height: 3px !important;
  margin-left: 4px !important;

}

.swiper-box {
  height: calc((100vw - 30px) / (720 / 360)) !important;
}
</style>
