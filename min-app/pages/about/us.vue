<template>
  <view class="page-content">
    <view class="page-header"> 预颜口腔 </view>
    <image :src="aboutDescs" mode="widthFix" />
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { AboutUs } from "../../utils/api";
let aboutDescs = ref("");
onMounted(() => {
  AboutUs().then((res) => {
    console.log(res);
    // aboutDescs.value = "https://dental.cdwuhu.com/" + res.image;
  });
});
</script>

<style lang="less" scoped>
.page-header {
  font-size: 17px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  height: 33px;
  line-height: 33px;
  padding: 8px 17px;
}
.page-content {
  image {
    width: 100%;
  }
}
</style>
