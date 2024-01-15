<template>
  <view class="page-content">
    <view class="main">
      <view class="addr-form">
        <view class="label">
          <view class="">新增收获地址</view>
          <view class="">
            <radio :value="isDefault" color="#d44469" />
            设为默认地址
          </view>
        </view>
        <div class="form-box">
          <view class="item">
            <div class="prefix">
              <image src="../../static/icon/icon.png" style="width: 16px; height: 18px" />
            </div>
            <div class="inputs">
              <input type="text" placeholder="收货人名" />
            </div>
          </view>
          <view class="item">
            <div class="prefix">
              <image
                src="../../static/icon/icon3.png"
                style="width: 15px; height: 19px"
              />
            </div>
            <div class="inputs">
              <input type="text" placeholder="收获电话" />
            </div>
          </view>
          <view class="item">
            <picker mode="region" @change="bindRegionChange" custom-item="{{customItem}}">
              <div class="prefix" style="left: 15px; top: 10px">
                <image
                  src="../../static/icon/icon2.png"
                  style="width: 28px; height: 28px"
                />
              </div>
              <div class="inputs">
                <input type="text" :value="addrForm.region" placeholder="省市区" />
              </div>
            </picker>
          </view>

          <view class="item">
            <div class="prefix" style="left: 19px; top: 17px">
              <image
                src="../../static/icon/icon1.png"
                style="width: 19px; height: 15px"
              />
            </div>
            <div class="inputs">
              <textarea
                name=""
                id=""
                placeholder="收获地址"
                cols="30"
                style="height: 100px"
                rows="10"
              ></textarea>
            </div>
          </view>
        </div>
      </view>
    </view>
    <view class="loginOut">
      <button size="default" @click="submitUpdata" type="default" hover-class="is-hover">
        保存
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
const isDefault = ref(false);
let addrForm = ref({
  name: "",
  region: "",
});
const bindRegionChange = (e) => {
  console.log(e);
  let detail = e.detail;
  let value = detail.value;
  addrForm.value.region = value.join("-");
  console.log(addrForm.value);
};
const submitUpdata = () => {
  uni.showToast({
    icon: "error",
    title: "标题",
    duration: 2000,
  });
};
</script>

<style lang="less" scoped>
@import url("./index.less");
.page-content {
  padding: 15px;
}

.loginOut {
  margin-top: 15px;
  button {
    background: #d44469;
    border-color: #d44469;
    width: 300px;
    height: 44px;
    border-radius: 10px;
    color: #ffffff;
  }
  button[disabled] {
    background: rgba(111, 111, 111, 0.4);
    border-color: rgba(111, 111, 111, 0.4);
    border-radius: 10px;
  }
}
</style>

<style lang="less"></style>
