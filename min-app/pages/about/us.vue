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
    <image :src="aboutDescs" mode="widthFix" />
  </view>
</template>

<script setup>
import { onLaunch, onShow } from "@dcloudio/uni-app";
import { ref, onMounted } from "vue";
import { AboutUs } from "../../utils/api";
import Header from "../../components/header/index";

const handleleft = () => {
  uni.navigateBack({
    delta: 1,
  });
};
let refStyle = ref({
  top: "46px",
});
let height = ref(0);
onShow((options) => {
  const res = wx.getMenuButtonBoundingClientRect();
  height.value = res.height;
  refStyle.value["top"] = res.top + "px";
});
let aboutDescs = ref("");
onMounted(() => {
  AboutUs().then((res) => {
    aboutDescs.value = "https://www.yuyandental.com/" + res.image;
  });
});
</script>

<style lang="less" scoped>
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
.page-content {
  image {
    width: 100%;
  }
}

.page-header {
  //   position: absolute;
  width: 100%;
  z-index: 1001;
}
.uni-navbar__header-btns {
  float: left;
}
</style>
