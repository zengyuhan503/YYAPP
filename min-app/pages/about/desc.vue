<template>
  <view class="page-content">
    <div class="page-header" :style="refStyle">
      <uni-nav-bar
        left-icon="left"
        :border="false"
        backgroundColor="transparent"
        title="医生介绍"
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
import { AboutDesc } from "../../utils/api";
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
  AboutDesc().then((res) => {
    aboutDescs.value = "https://dental.cdwuhu.com/" + res.image;
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
  padding: 8px 17px;
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
