<template>
  <view class="page-content">
    <Header title="科普馆预约" />
    <view class="content">
      <view class="main main1">
        <view class="imgs">
          <image src="../../static/image/1.png" mode="aspectFill"></image>
        </view>
        <view class="main-title"> 科普馆邀请函 </view>
        <view class="main-desc">
          这里是文字内容介绍，总字数不超过200个字，长文字介绍，文字介绍，总文字介绍，总文字介绍，总总字数不超过200个字，长文字介绍总字数不超过200个字，长文字介绍总字数不超过200个字，长文字
        </view>
        <view class="popularForm">
          <view class="formInput">
            <image src="../../static/image/name.png" />
            <input type="text" placeholder="姓名" :value="popularForm.name" />
          </view>
          <view class="formInput">
            <image src="../../static/image/phone.png" />
            <input type="text" placeholder="手机号" :value="popularForm.name" />
          </view>
          <view class="formGroup">
            <view class="formItem" @click="handleShowPopup">
              <view class="formInput">
                <image
                  style="width: 28px; height: 28px; left: 12px; top: 10px"
                  src="../../static/image/addr.png"
                />
                <input
                  type="text"
                  disabled
                  placeholder="时间"
                  :value="popularForm.name"
                />
              </view>
            </view>
            <view class="formItem">
              <picker
                bindchange="bindPickerChange"
                :value="selectror"
                :range="array"
                @change="handleSelectCount"
              >
                <view class="formInput" bindchange="bindPickerChange">
                  <image
                    style="width: 18px; height: 18px"
                    src="../../static/image/count.png"
                  />
                  <input
                    type="text"
                    disabled
                    placeholder="人数"
                    :value="popularForm.count"
                  />
                </view>
              </picker>
            </view>
          </view>
        </view>
      </view>
    </view>
    <DateElement v-if="showDate" @handleClosePopup="handleClosePopup" />
  </view>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import Header from "../../components/header/index.vue"
import DateElement from "/components/DateElement.vue";
let showDate = ref(false);
let popularForm = ref({
  name: "",
  count: 0,
});
const handleShowPopup = () => {
  showDate.value = true;
};
const handleClosePopup = () => {
  showDate.value = false;
};
let selectror = ref(1);
const handleSelectCount = (e) => {
  console.log(e);
  popularForm.value.count = e.detail.value;
};
let array = ref(["1", "2", "3", "4"]);
</script>
<style lang="less">
@import url(./index.less);
</style>
<style lang="less" scoped></style>
