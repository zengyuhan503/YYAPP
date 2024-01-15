<template>
  <view class="page-content">
    <view class="main">
      <view class="user-picture">
        <view class="picture">
          <image src="../../static/image/capabilities2.png" />
        </view>
        <view class="edit-picture"> 修改头像 ></view>
      </view>
      <view class="form">
        <uni-forms ref="baseForm" :modelValue="alignmentFormData" label-position="left">
          <uni-forms-item label="姓名">
            <uni-easyinput
              class="easyinput"
              v-model="alignmentFormData.nickname"
              placeholder="请输入姓名"
            />
          </uni-forms-item>
          <uni-forms-item label="电话">
            <uni-easyinput
              class="easyinput"
              @getphonenumber="getinfos"
              v-model="alignmentFormData.phone"
              placeholder="请输入手机号"
            />
          </uni-forms-item>
        </uni-forms>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
let alignmentFormData = ref({
  avatar: null,
  nickname: null,
});
onMounted(() => {
  try {
    let info = uni.getStorageSync("yy-userinfo");
    console.log(uni.getStorageSync("yy-phone"))
    info=JSON.parse(info)
    alignmentFormData.value.avatar = info.avatar;
    alignmentFormData.value.nickname = info.nickname;
    alignmentFormData.value.phone = uni.getStorageSync("yy-phone");
  } catch (error) {
    uni.removeStorageSync('yy-userinfo');
    wx.navigateTo({
    url:"/pages/user/index"
  })
  }
});
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>

<style>
.uni-easyinput > view {
  border: none;
  border-color: none;
}
.uni-forms-item {
  /* border-bottom: 1px solid #f7f7f7; */
}
</style>
