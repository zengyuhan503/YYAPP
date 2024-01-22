<template>
  <view class="page-content">
    <div class="page-header" :style="refStyle">
      <uni-nav-bar
        left-icon="left"
        :border="false"
        backgroundColor="transparent"
        title="关于我们"
        :height="height"
        @clickLeft="handleleft"
        color="#000000"
      />
    </div>
    <image :src="aboutDescs" mode="widthFix" />
  </view>
</template>

<script setup>
import { onLaunch, onShow } from "@dcloudio/uni-app";
import { ref, onMounted } from "vue";
import { AboutUs } from "../../utils/api";
let aboutDescs = ref("");
let refStyle = ref({
  top: "46px",
});
onMounted(() => {
  AboutUs().then((res) => {
    console.log(res);
    aboutDescs.value = "https://dental.cdwuhu.com/" + res.image;
  });
});

const handleleft = () => {
  uni.navigateBack({
    delta: 1,
  });
};
let height = ref(0);
onShow((options) => {
  const res = wx.getMenuButtonBoundingClientRect();
  console.log(res);
  height.value = res.height;
  refStyle.value["top"] = res.top + "px";
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
  padding: 8px 17px;
  position: absolute;
}
.page-content {
  image {
    width: 100%;
  }
}
</style>
