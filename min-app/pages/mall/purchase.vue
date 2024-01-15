<template>
  <view class="page-content">
    <view class="paymant-main">
      <view class="paymant-info">
        <view class="cover"
          ><image src="../../static/image/capabilities2.png" mode="widthFix"
        /></view>
        <view class="details">
          <view class="title">产品名字不能有空格跟符 最多两排号</view>
          <view class="price">
            <view>¥200</view>
            <view class="count">
              <image src="../../static/icon/num3.png" v-if="count == 0" />
              <image src="../../static/icon/num1.png" v-else @click="count--" />
              <text>{{ count }}</text>
              <image src="../../static/icon/num2.png" @click="count++" />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
const count = ref(0);
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>

<style lang="less"></style>
