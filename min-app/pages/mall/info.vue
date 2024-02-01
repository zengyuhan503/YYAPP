<template>
  <view class="page-content">
    <div class="page-header" :style="refStyle">
      <uni-nav-bar
        left-icon="left"
        :border="false"
        backgroundColor="transparent"
        title=""
        :height="height"
        @clickLeft="handleleft"
        color="#ffffff"
      />
    </div>
    <div class="covers">
      <!-- <image :src="'https://dental.cdwuhu.com/' + goodsInfo.head_image" mode="widthFix" /> -->
      <uni-swiper-dot
        class="uni-swiper-dot-box"
        :info="covers"
        :current="swiperDotIndex"
        :dots-styles="dotsStyles"
        mode="round"
        field="content"
      >
        <swiper class="swiper-box" @change="handleBannerChange">
          <swiper-item v-for="(item, index) in covers" :key="index">
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
              折后价 ¥ <text style="font-weight: 600">{{ goodsInfo.sale_price }}</text>
            </view>
            <view>日常价 ¥ {{ goodsInfo.price }}</view>
          </view>
          <view class="price" v-else>
            <view>
              惊喜价 ¥ <text style="font-weight: 600">{{ goodsInfo.sale_price }}</text>
            </view>
          </view>
          <view class="discounts hasback" v-if="goodsInfo.sale_price != goodsInfo.price">
            <!-- <image src="http://h5.dental.cdwuhu.com/static/image/discounts.png" mode="" /> -->
            <view class="text">
              立省 ¥
              <text style="font-weight: 600">{{
                goodsInfo.price - goodsInfo.sale_price
              }}</text></view
            >
          </view>
          <view class="discounts hasback2" v-else>
            <!-- <image
              src="http://h5.dental.cdwuhu.com/static/image/discounts1.png"
              mode=""
            /> -->
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
          <text v-if="goodsInfo.sale_price != goodsInfo.price">折后价</text>
          <text style="" v-else>惊喜价</text>
          <text style="color: #f9a143; display: inline"> ¥</text>
          <text class="num"> {{ goodsInfo.sale_price }}</text>
        </view>
        <view class="btns" @click="handleToCreateOrder"> 购买 </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onLaunch, onShow, onLoad } from "@dcloudio/uni-app";
import { GetGoodsInfo, GetOrderList } from "../../utils/api";
let goodsId = ref(null);
let goodsInfo = ref({});
let mode = ref("default");

let refStyle = ref({
  top: "46px",
});

let swiperDotIndex = ref(0);
let dotsStyles = ref({
  backgroundColor: "rgba(255,255,255,0.5);",
  border: "2px rgba(255,255,255,0.5); solid",
  color: "#fff",
  selectedBackgroundColor: "#F9A143",
  selectedBorder: "2px #F9A143 solid",
});
let height = ref(0);
onLoad((option) => {
  goodsId.value = option.id;
  console.log(goodsId.value);
  handleGetOrderInfo();
});

const handleleft = () => {
  uni.navigateBack({
    delta: 1,
  });
};
let covers = ref([]);

const handleBannerChange = (e) => {
  let index = e.detail.current;
  swiperDotIndex.value = index;
};
const handleGetOrderInfo = () => {
  let params = {
    goods_id: goodsId.value,
  };
  GetGoodsInfo(params).then((res) => {
    goodsInfo.value = res;
    let newArr = [res.head_image];
    let dimg = res.deputy_image;
    dimg = dimg === "" ? [] : dimg.split(",");
    newArr.push(...dimg); 
    covers.value = newArr;
  });
};
let orderList = {
  0: [],
  2: [],
  4: [],
  all: [],
};
const handleToCreateOrder = () => {
  if (orderList["0"].length != 0) {
    uni.showToast({
      title: "你当前还有待付款订单，请前往个人中心查看",
      duration: 2000,
      icon: "none",
    });
    return false;
  }
  uni.navigateTo({
    url: "/pages/mall/purchase?id=" + goodsInfo.value.id,
  });
};

const handleGetOrderList = () => {
  let params = {
    page: 1,
    page_size: 1000,
    status: "all",
  };
  GetOrderList(params).then((res) => {
    console.log(res);

    let list = res.data;
    orderList["0"] = list.filter((item) => item.status == 0);
    orderList["2"] = list.filter((item) => item.status == 2);
    orderList["all"] = list;
  });
};
onShow((options) => {
  const res = wx.getMenuButtonBoundingClientRect();
  height.value = res.height;
  refStyle.value["top"] = res.top + "px";
  handleGetOrderList();
});
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

.page-header {
  width: 100%;
  z-index: 1001;
  font-size: 17px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  height: 33px;
  line-height: 33px;
  position: absolute;
}
.uni-swiper__dots-box{
  bottom: 20px !important;

}

.uni-swiper__dots-item {
  width: 10px !important;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
  height: 4px !important;
}
</style>
