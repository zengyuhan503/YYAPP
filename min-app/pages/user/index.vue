<template>
  <view class="page-content">
    <view class="main">
      <view class="user-info">
        <view class="portrait">
          <image src="../../static/image/logo.png" v-if="!isLogin" mode="" />
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
          <view class="item">
            <image src="../../static/icon/order1.png" />
            <view>待付款</view>
          </view>
          <view class="item">
            <image src="../../static/icon/order2.png" />
            <view>待收货</view>
          </view>
          <view class="item">
            <image src="../../static/icon/order3.png" />
            <view>完成订单</view>
          </view>
          <view class="item">
            <image src="../../static/icon/order4.png" />
            <view>全部订单</view>
          </view>
        </view>
      </view>
      <view class="helps" v-if="isLogin">
        <view class="items">
          <view class="item">
            <view class="label">
              <image src="../../static/icon/help1.png" mode="" /><text>地址管理</text>
            </view>
            <uni-icons type="right" size="18" color="#B3BAC5"></uni-icons>
          </view>
          <view class="item">
            <view class="label">
              <image src="../../static/icon/help2.png" mode="" /><text>医生介绍</text>
            </view>
            <uni-icons type="right" size="18" color="#B3BAC5"></uni-icons>
          </view>
          <view class="item">
            <view class="label">
              <image src="../../static/icon/help3.png" mode="" /><text>关于我们</text>
            </view>
            <uni-icons type="right" size="18" color="#B3BAC5"></uni-icons>
          </view>
          <view class="item">
            <view class="label">
              <image src="../../static/icon/help3.png" mode="" /><text>联系我们</text>
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
    <navs />
  </view>
</template>

<script setup>
import navs from "/components/navs/index.vue";
import { onLaunch, onShow, onLoad } from "@dcloudio/uni-app";
import { GetUserInfo, GetUserPhone } from "../../utils/api/index";
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
const handleEditInfo = () => {
  wx.navigateTo({
    url: "/pages/editUser/index",
  });
};
onMounted(() => {
  uni.getStorage({
    key: "yy-is_login",
    success: function (res) {
      if (res != null) {
        isLogin.value = true;
        let info = uni.getStorage({
          key: "yy-userinfo",
          success(res) {
            console.log(res);
            info = res.data;
            userInfo.value = JSON.parse(info);
            console.log(userInfo.value);
          },
          fail(err) {
            isLogin.value = false;
          },
        });
      } else {
        isLogin.value = false;
      }
    },
    fail(err) {
      isLogin.value = false;
    },
  });
});
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
