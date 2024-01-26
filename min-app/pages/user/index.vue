<template>
  <view class="page-content">
    <view class="main">
      <view class="user-info">
        <view class="portrait">
          <image
            src="http://h5.dental.cdwuhu.com/static/image/logo.png"
            v-if="!isLogin"
            mode=""
          />
          <image :src="userInfo.avatar" v-else mode="" />
        </view>
        <view class="desc" @click="handleEditInfo" v-if="isLogin">
          <view class="name">{{ userInfo.nickname }}</view>
          <view class="link">修改资料></view>
        </view>
        <view v-else class="nologin">登录/注册</view>
      </view>
      <view class="orders" v-if="isLogin">
        <view class="title">我的订单</view>
        <view class="items">
          <view class="item" @click="handleToOrderPage('0')">
            <image src="http://h5.dental.cdwuhu.com/static/icon/order1.png" />
            <view>待付款</view>
          </view>
          <view class="item" @click="handleToOrderPage('2')">
            <image src="http://h5.dental.cdwuhu.com/static/icon/order2.png" />
            <view>待收货</view>
          </view>
          <view class="item" @click="handleToOrderPage('4')">
            <image src="http://h5.dental.cdwuhu.com/static/icon/order3.png" />
            <view>完成订单</view>
          </view>
          <view class="item" @click="handleToOrderPage('all')">
            <image src="http://h5.dental.cdwuhu.com/static/icon/order4.png" />
            <view>全部订单</view>
          </view>
        </view>
      </view>
      <view class="helps" v-if="isLogin">
        <view class="items">
          <view class="item" @click="handleToAddress">
            <view class="label">
              <image
                src="http://h5.dental.cdwuhu.com/static/icon/help1.png"
                mode=""
              /><text>地址管理</text>
            </view>
            <uni-icons type="right" size="18" color="#B3BAC5"></uni-icons>
          </view>
          <view class="item" @click="handleToAboutDesc">
            <view class="label">
              <image
                src="http://h5.dental.cdwuhu.com/static/icon/help2.png"
                mode=""
              /><text>医生介绍</text>
            </view>
            <uni-icons type="right" size="18" color="#B3BAC5"></uni-icons>
          </view>
          <view class="item" @click="handleToAboutUs">
            <view class="label">
              <image
                src="http://h5.dental.cdwuhu.com/static/icon/help3.png"
                mode=""
              /><text>关于我们</text>
            </view>
            <uni-icons type="right" size="18" color="#B3BAC5"></uni-icons>
          </view>
          <view class="item" @click="showCtUs = true">
            <view class="label">
              <image
                src="http://h5.dental.cdwuhu.com/static/icon/help4.png"
                mode=""
              /><text>联系我们</text>
            </view>
            <uni-icons type="right" size="18" color="#B3BAC5"></uni-icons>
          </view>
        </view>
      </view>
      <view class="loginOut">
        <button
          size="default"
          type="default"
          style="color: #ffffff; bordercolor: #d44469"
          hover-class="is-hover"
          v-if="isLogin"
          @click="handleLoginOut"
        >
          退出登录
        </button>
        <button
          @getphonenumber="getinfos"
          size="default"
          open-type="getPhoneNumber"
          style="color: #ffffff; bordercolor: #d44469"
          hover-class="is-hover"
          v-else
        >
          登录/注册
        </button>
      </view>
    </view>
    <navs active="user" />
  </view>
  <view class="contus" v-if="showCtUs">
    <div class="contus_body">
      <div class="close">
        <uni-icons type="closeempty" size="30" @click="showCtUs = false"></uni-icons>
      </div>
      <div class="contus_main">
        <div class="title">立即致电我们</div>
        <div class="desc">
          或者添加我们的客服微信 <br />
          15522756996
        </div>
        <div class="call" @click="handleMakePhoneCall">拨打电话</div>
      </div>
    </div>
  </view>

  <!-- <view class="" style="height: 50px"> </view> -->
</template>

<script setup>
import navs from "/components/navs/index.vue";
import { onLaunch, onShow, onLoad } from "@dcloudio/uni-app";
import {
  GetUserInfo,
  GetUserPhone,
  GetServerUserInfo,
  GetOrderList,
} from "../../utils/api/index";
import { ref, onMounted } from "vue";

let modeIndex = ref(-1);
let styleIndex = ref(-1);
let current = ref(0);
let info = ref([{}]);
let mode = ref("default");
let dotsStyles = ref({});
let swiperDotIndex = ref(0);
let userInfo = ref({
  avatar: null,
  nickname: null,
  user_id: null,
  session_key: null,
  wx_openid: null,
});
const change = (e) => {
  current.value = e.detail.current;
};
let wxInfo = {};
const isLogin = ref(false);
const showCtUs = ref(false);
const handleMakePhoneCall = () => {
  uni.makePhoneCall({
    phoneNumber: "15522756996", //仅为示例
  });
};
const handleGetUserInfo = (fn) => {
  let params = {
    cloudID: wxInfo.cloudID,
    code: wxInfo.code,
    encryptedData: wxInfo.encryptedData,
    rawData: wxInfo.rawData,
    iv: wxInfo.iv,
    signature: wxInfo.signature,
  };
  GetUserInfo(params).then((res) => {
    let info = {
      ...res,
    };
    userInfo.value = {
      avatar: info.avatar,
      nickname: info.nickname,
      user_id: info.user_id,
      session_key: info.session_key,
      wx_openid: info.wx_openid,
    };
    uni.setStorage({
      key: "yy-userinfo",
      data: JSON.stringify({
        avatar: info.avatar,
        nickname: info.nickname,
        user_id: info.user_id,
        session_key: info.session_key,
        wx_openid: info.wx_openid,
      }),
      success: function () {
        console.log("success");
      },
    });
    uni.setStorageSync("yy-token", res.token.token);
    uni.setStorage({
      key: "yy-is_login",
      data: true,
    });
    isLogin.value = true;
    fn();
  });
};
const handleLoginOut = () => {
  uni.removeStorageSync("yy-token");
  uni.removeStorageSync("yy-userinfo");
  isLogin.value = false;
};
const getinfos = (e) => {
  let detail = e.detail;
  uni.login({
    provider: "weixin", //使用微信登录
    success: function (loginRes) {
      uni.getUserInfo({
        provider: "weixin",
        success: function (infoRes) {
          let query = {
            cloudID: infoRes.cloudID,
            encryptedData: infoRes.encryptedData,
            iv: infoRes.iv,
            rawData: infoRes.rawData,
            signature: infoRes.signature,
            code: loginRes.code,
          };
          wxInfo = query;

          if (detail.errMsg.indexOf("ok") != -1) {
            let params = {
              code: detail.code,
            };
            handleGetUserInfo(() => {
              GetUserPhone(params).then((res) => {
                console.log(res);
                uni.setStorageSync("yy-phone", res);
              });
              handleServerGetUserInfo();
            });
          }
        },
      });
    },
  });
  let params = {};
};
onLoad((e) => {
  wxInfo = e;
});
onShow(() => {
  handleGetOrderList();
  handleServerGetUserInfo();
});
const handleEditInfo = () => {
  wx.navigateTo({
    url: "/pages/editUser/index",
  });
};
const handleServerGetUserInfo = () => {
  GetServerUserInfo().then((res) => {
    userInfo.value = res;
    console.log(res);
    userInfo.value.avatar = "https://dental.cdwuhu.com/" + res.avatar;
    isLogin.value = true;
  });
};
const handleToAddress = () => {
  wx.navigateTo({
    url: "/pages/userAddress/index",
  });
};
const handleToAboutDesc = () => {
  wx.navigateTo({
    url: "/pages/about/desc",
  });
};
const handleToAboutUs = () => {
  wx.navigateTo({
    url: "/pages/about/us",
  });
};
let orderList = {
  0: [],
  2: [],
  4: [],
  all: [],
};
const handleGetOrderList = () => {
  let params = {
    page: 1,
    page_size: 1000,
    status: "all",
  };
  GetOrderList(params).then((res) => {
    console.log(res);

    let list = res.data;
    orderList["0"] = list.filter((item) => item.status == 0);
    orderList["2"] = list.filter((item) => item.status == 2);
    orderList["4"] = list.filter((item) => item.status == 4);
    orderList["all"] = list;
  });
};
const handleToOrderPage = (status) => {
  let str = {
    0: "待付款",
    2: "待收货",
    4: "完成",
    all: "全部",
  };
  if (orderList[status].length == 0) {
    uni.showToast({
      icon: "error",
      title: `无${str[status]}订单`,
      duration: 2000,
    });
    return false;
  }
  if (status == 0) {
    let orderid = orderList[status][0].id;
    uni.navigateTo({
      url: "/pages/detail/unpaid?id=" + orderid,
    });
  } else {
    uni.navigateTo({
      url: "/pages/order/all?status=" + status,
    });
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
