<template>
  <div class="page-header" :style="refStyle">
    <uni-nav-bar
      left-icon="left"
      :border="false"
      backgroundColor="transparent"
      :title="pageTitle"
      :height="height"
      color="#ffffff"
    />
  </div>
</template>

<script setup>
import { onLaunch, onShow } from "@dcloudio/uni-app";
import { ref, onMounted } from "vue";
let refStyle = ref({
  "padding-top": "42px",
});
let height = ref(0);
let pageTitle = ref("标题");
let props = defineProps({
  title: String,
});
pageTitle.value=props.title
onLaunch((options) => {
  console.log(options);
});
onShow((options) => {
  const res = wx.getMenuButtonBoundingClientRect();
  height.value = res.height;
  refStyle.value["padding-top"] = res.top + "px";
});
</script>

<style lang="less">
	.page-header{
		// position: absolute;
		width: 100%;
		z-index: 1001;
	}
  .uni-navbar__header-btns{
    float: left;
  }
</style>
