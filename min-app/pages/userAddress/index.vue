<template>
  <view class="page-content">
    <div class="main">
      <uni-swipe-action>
        <uni-swipe-action-item
          :show="isOpened"
          :auto-close="false"
          @change="change"
          @click="bindClick"
        >
          <div class="items">
            <div class="name">张三</div>
            <div class="phone">18328518241</div>
            <div class="addres">
              <div class="default">默认</div>
              四川省成都市高新区天府三街写字楼B座30
            </div>
          </div>
          <template v-slot:right>
            <div class="action">
              <div class="delete">
                <div class="icons">
                  <image src="../../static/image/delete.png" />
                </div>
                <div class="label">删除</div>
              </div>
              <div class="delete" style="margin-right: 0">
                <div class="icons">
                  <image src="../../static/image/edit.png" />
                </div>
                <div class="label">编辑</div>
              </div>
            </div>
          </template>
        </uni-swipe-action-item>
      </uni-swipe-action>
    </div>
    <view class="loginOut">
      <button
        size="default"
        type="default"
        style="color: #ffffff; backgroundcolor: #d44469; bordercolor: #d44469"
        hover-class="is-hover"
      >
        新增收货地址
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
let options2 = ref([
  {
    text: "取消",
    style: {
      backgroundColor: "#007aff",
    },
  },
  {
    text: "确认",
    style: {
      backgroundColor: "#F56C6C",
    },
  },
]);
let isOpened = ref(false);
const bindClick = (e) => {
  console.log(e);
  uni.showToast({
    title: `点击了${e.position === "left" ? "左侧" : "右侧"} ${e.content.text}按钮`,
    icon: "none",
  });
};
const change = (e) => {
  console.log(e);
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>

<style lang="less">
.action {
  display: flex;
  justify-content: center;
  align-content: center;
  padding-left: 14px;
  .delete {
    width: 40px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-flow: column;
    margin-right: 14px;
    cursor: pointer;
    .icons {
      width: 40px;
      height: 40px;
      background: #d2516c;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      image {
        width: 20px;
        height: 20px;
      }
    }

    .label {
      font-size: 10px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #d44469;
    }
  }
}

.loginOut {
  margin-top: 15px;
  button {
    background: #d44469;
    border-color: #d44469;
    width: 300px;
    height: 44px;
    border-radius: 10px;
  }
}
</style>
