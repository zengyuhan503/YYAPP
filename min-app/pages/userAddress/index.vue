<template>
  <view class="page-content">
    <div class="main">
      <uni-swipe-action>
        <uni-swipe-action-item
          v-for="(item, index) in addressList"
          :key="index"
          :show="isOpened"
          :auto-close="false"
          @change="change"
          @click="bindClick"
        >
          <div class="items">
            <div class="name">{{ item.name }}</div>
            <div class="phone">{{ item.phone }}</div>
            <div class="addres">
              <div class="default" v-if="item.is_default">默认</div>
              {{ item.provinces }}-{{ item.addres }}
            </div>
          </div>
          <template v-slot:right>
            <div class="action">
              <div class="delete" @click="handleDelete(item)">
                <div class="icons">
                  <image src="http://h5.yuyandental.com/static/image/delete.png" />
                </div>
                <div class="label">删除</div>
              </div>
              <div class="delete" style="margin-right: 0" @click="handleEditAdd(item)">
                <div class="icons">
                  <image src="http://h5.yuyandental.com/static/image/edit.png" />
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
        @click="handleToCreateAdds"
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
import { GetAddressList, RmAddress } from "../../utils/api/index";
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
let addressList = ref([]);
let isOpened = ref(false);
const bindClick = (e) => {
  uni.showToast({
    title: `点击了${e.position === "left" ? "左侧" : "右侧"} ${e.content.text}按钮`,
    icon: "none",
  });
};
const change = (e) => {
  console.log(e);
};
const handleToCreateAdds = () => {
  uni.navigateTo({
    url: "/pages/userAddress/add",
  });
};
function objectToQueryString(obj) {
  var queryString = "";
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (queryString.length > 0) {
        queryString += "&";
      }
      queryString += key + "=" + obj[key];
    }
  }
  return "?" + queryString;
}
const handleGetAddressList = () => {
  GetAddressList().then((res) => {
    console.log(res);
    addressList.value = res;
  });
};
const handleEditAdd = (item) => {
  let querys = objectToQueryString(item);
  let url = `/pages/userAddress/edit${querys}`;
  console.log(url);
  uni.navigateTo({
    url: url,
  });
};
const handleDelete = (item) => {
  let params = {
    address_id: item.id,
  };
  RmAddress(params).then((res) => {
    uni.showToast({
      title: "操作成功",
      icon: "none",
    });
    handleGetAddressList();
  });
};
onMounted(() => {
  handleGetAddressList();
});
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
