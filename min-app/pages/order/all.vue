<template>
  <view class="page-content">
    <div class="main">
      <div class="items">
        <div class="item">
          <div class="cate">
            <div>商品类型</div>
            <div class="type">待付款</div>
          </div>
          <div class="info">
            <div class="cover">
              <image src="../../static/image/capabilities2.png" mode="" />
            </div>
            <div class="desc">
              <div class="title">产品名字不能有空格跟符这里一排</div>
              <div class="count">x 2</div>
              <div class="price">实际支付 ¥200</div>
            </div>
          </div>
        </div>
      </div>
      <div class="items">
        <div class="item">
          <div class="cate">
            <div>商品类型</div>
            <div class="type cancel">已取消</div>
          </div>
          <div class="info">
            <div class="cover">
              <image src="../../static/image/capabilities2.png" mode="" />
            </div>
            <div class="desc cancel">
              <div class="title">产品名字不能有空格跟符这里一排</div>
              <div class="count">x 2</div>
              <div class="price">实际支付 ¥200</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
