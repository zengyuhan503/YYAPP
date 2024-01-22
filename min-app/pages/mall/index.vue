<template>
  <view class="page-content">
    <view class="banner">
      <view class="banner-back">
        <image :src="showbanner" mode="" />
        <view class="filter-back"></view>
      </view>
      <view class="page-banner">
        <view>
          <uni-swiper-dot
            class="uni-swiper-dot-box"
            :info="banners"
            :dots-styles="dotsStyles"
            field="content"
          >
            <swiper
              class="swiper-box"
              @change="handleBannerChange"
              :circular="true"
              indicator-active-color="#F9A143"
            >
              <swiper-item
                v-for="(item, index) in banners"
                @click="handleToBannerInfo(item)"
                :key="index"
                :item-id="index"
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
      </view>
    </view>
    <view class="main">
      <view class="sider">
        <view class="items">
          <view
            class="item"
            :class="{ active: item.id == cateActive }"
            v-for="(item, index) in cateList"
            :key="index"
            @click="handleChangeCate(item.id)"
          >
            <image :src="'https://dental.cdwuhu.com/' + item.icon" />
            <view class="title">{{ item.title }}</view>
          </view>
        </view>
      </view>
      <view class="content">
        <view class="items">
          <view
            class="item"
            v-for="(item, index) in goodsList"
            :key="index"
            @click="handleToInfo(item)"
          >
            <view class="cover">
              <image :src="'https://dental.cdwuhu.com/' + item.head_image" />
            </view>
            <div class="info">
              <view class="title">{{ item.title }}</view>
              <view class="original">
                <span v-if="item.discount != '100.0'">¥{{ item.price }}</span>
              </view>
              <view class="price">¥{{ item.sale_price }}</view>
              <view class="discount" v-if="item.discount != '100.0'">
                <image
                  src="http://h5.dental.cdwuhu.com/static/image/mailtag.png"
                  mode="widthFix"
                />
                <view class="num"
                  ><text>{{ parseInt(item.discount) / 10 }}</text
                  >折</view
                >
              </view>
            </div>
          </view>
        </view>
      </view>
    </view>
    <navs active="mall" />
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import navs from "/components/navs/index.vue";
import { GetIndexBanner, GetCateList, GetGoodsList } from "../../utils/api";
let banners = ref([]);
const handleGetBanner = () => {
  GetIndexBanner({ type: 2 }).then((res) => {
    console.log(res);
    banners.value = res;
    showbanner.value = "https://dental.cdwuhu.com/" + res[0].image;
  });
};
let dotsStyles = ref({
  backgroundColor: "rgba(255,255,255,0.5);",
  border: "2px rgba(255,255,255,0.5); solid",
  color: "#fff",
  selectedBackgroundColor: "#F9A143",
  selectedBorder: "2px #F9A143 solid",
});
let cateList = ref([]);
let cateActive = ref(null);
const handleGetCateList = () => {
  let params = {
    page: 1,
    page_size: 1000,
  };
  GetCateList(params).then((res) => {
    console.log(res);
    cateList.value = res;
    cateActive.value = res[0].id;
    handleGetGoodsList();
  });
};
let showbanner = ref("");
let swiperDotIndex = ref(null);
const handleBannerChange = (e) => {
  let index = e.detail.current;
  showbanner.value = "https://dental.cdwuhu.com/" + banners.value[index].image;
};
let goodsList = ref([]);
const handleGetGoodsList = () => {
  let params = {
    page: 1,
    page_size: 1000,
    category_id: cateActive.value,
  };
  GetGoodsList(params).then((res) => {
    console.log(res);
    goodsList.value = res.data;
  });
};
const handleChangeCate = (id) => {
  cateActive.value = id;
  handleGetGoodsList();
};
const handleToInfo = (item) => {
  uni.navigateTo({
    url: "/pages/mall/info?id=" + item.id,
  });
};
const handleToBannerInfo = (item) => {
  uni.navigateTo({
    url: "/pages/mall/info?id=" + item.goods_id,
  });
};
onMounted(() => {
  handleGetBanner();
  handleGetCateList();
});
</script>

<style lang="less" scoped>
@import url("./index.less");

.swiper-box {
  height: calc((100vw - 30px) / (720 / 260)) !important;
}

.swiper-image {
  width: 100% !important;
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

.uni-swiper__warp {
  /* box-shadow: 0px -2px 20px 0px rgba(0, 0, 0, 0.2); */
  border-radius: 10px;
  overflow: hidden;
}
</style>
