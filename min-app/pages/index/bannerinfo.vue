<template>
  <view class="page-content">
    <image
      v-if="info.long_image != ''"
      :src="'https://dental.cdwuhu.com/' + info.long_image"
      mode="widthFix"
    ></image>
    <web-view  v-if="info.url != ''" :src="info.url"></web-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onLaunch, onLoad } from "@dcloudio/uni-app";
let info = ref({
  long_image: "",
  url: "",
});
onLoad((options) => {
  console.log(options);
  info.value = options;
});
</script>
<style lang="less" scoped>
.page-content {
	width: 100%;
	height: 100vh;
	
  image {
    width: 100%;
  }
}
</style>
