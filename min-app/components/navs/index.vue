<template>
  <view class="navs">
    <view class="nav" @click="navTo('home')">
      <image
        src="../../static/image/yachi-1.png"
        mode=""
        v-if="props.active == 'home'"
      ></image>
      <image src="../../static/image/yachi.png" mode="" v-else></image>
      主页
    </view>
    <view class="nav" @click="navTo('detail')">
      <image
        src="../../static/image/shangdian-1.png"
        mode=""
        v-if="props.active == 'mall'"
      ></image>
      <image src="../../static/image/shangdian.png" mode="" v-else></image>
      商城
    </view>
    <view class="nav" @click="handleGetUserProfile">
      <image src="../../static/image/user.png" mode=""></image>
      我的
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
let props = defineProps({
  active: "home",
});
const navTo = (route) => {
  let uri = {
    home: "/pages/index/index",
    detail: "/pages/detail/index",
    user: "/pages/user/index",
  };
  wx.navigateTo({
    url: uri[route],
    fail: (err) => {
      console.log(err);
    },
  });
};
const handleGetUserProfile = (res) => {
  wx.navigateTo({
    url: `/pages/user/index`,
    fail: (err) => {
      console.log(err);
    },
  });
};
console.log(props);
</script>
<style lang="less">
@import url("index.less");
</style>
