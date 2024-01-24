<template>
  <view class="page-content">
    <view class="main">
      <view class="user-picture">
        <view class="picture">
          <image :src="alignmentFormData.avatar" />
        </view>
        <view class="edit-picture">
          <button open-type="chooseAvatar" @chooseavatar="handlebindchooseavatar">
            修改头像 >
          </button>
        </view>
      </view>
      <view class="form">
        <uni-forms ref="baseForm" :modelValue="alignmentFormData" label-position="left">
          <uni-forms-item label="姓名" class="items">
            <uni-easyinput
              class="easyinput"
              v-model="alignmentFormData.nickname"
              @change="handleEditNickname"
              placeholder="请输入姓名"
            />
          </uni-forms-item>
          <uni-forms-item label="电话" class="items">
            <button @getphonenumber="getinfos" open-type="getPhoneNumber">
              <uni-easyinput
                class="easyinput"
                disabled
                v-model="alignmentFormData.phone"
                placeholder="请输入手机号"
              />
            </button>
          </uni-forms-item>
        </uni-forms>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { EditUserInfo, GetUserPhone, GetServerUserInfo } from "../../utils/api/index";
let alignmentFormData = ref({
  avatar: null,
  nickname: null,
  phone: "",
});
const handleEditNickname = () => {
  let params = {
    ...alignmentFormData.value,
  };
  params.avatar = params.avatar.replace("https://dental.cdwuhu.com/", "");
  EditUserInfo(params).then((res) => {
    console.log(res);
    uni.showToast({
      title: "修改成功",
      duration: 2000,
    });
    handleServerGetUserInfo();
  });
};
const handleServerGetUserInfo = () => {
  GetServerUserInfo().then((res) => {
    console.log(res);
    alignmentFormData.value.avatar = "https://dental.cdwuhu.com/" + res.avatar;
    alignmentFormData.value.nickname = res.nickname;
  });
};
const handlebindchooseavatar = (e) => {
  let avatar = e.detail.avatarUrl;
  console.log(avatar);
  uni.uploadFile({
    url: "https://dental.cdwuhu.com/api/upload", //仅为示例，非真实的接口地址
    filePath: avatar,
    name: "limit_image",
    success: (uploadFileRes) => {
      let url = uploadFileRes.data;
      url = JSON.parse(url);
      alignmentFormData.value.avatar = "https://dental.cdwuhu.com/" + url.data;
      let params = {
        ...alignmentFormData.value,
        avatar: url.data,
      };
      EditUserInfo(params).then((res) => {
        console.log(res);
        uni.showToast({
          title: "修改成功",
          duration: 2000,
        });
        handleServerGetUserInfo();
      });
    },
  });
};
const getinfos = (e) => {
  let detail = e.detail;
  if (detail.errMsg.indexOf("ok") != -1) {
    let params = {
      code: detail.code,
    };
    GetUserPhone(params).then((res) => {
      if (res === alignmentFormData.value.phone) return false;
      alignmentFormData.value.phone = res;
      let params = {
        ...alignmentFormData.value,
      };
      EditUserInfo(params).then((res) => {
        console.log(res);
      });
    });
  }
};
onMounted(() => {
  try {
    handleServerGetUserInfo();
    alignmentFormData.value.phone = uni.getStorageSync("yy-phone");
  } catch (error) {
    uni.removeStorageSync("yy-userinfo");
    wx.redirectTo({
      url: "/pages/user/index",
    });
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
.form .uni-forms-item {
  border-bottom: 1px solid #f7f7f7;
  overflow: hidden;
  height: 56px;
  background: #ffffff;
  padding: 0 15px;
  margin-bottom: 0;
}
.form .uni-forms-item > view {
  height: 56px;
  background: #ffffff;
}
.form .uni-forms-item > view input {
  height: 56px;
  background: #ffffff;
  line-height: 56px;
  font-size: 17px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  color: #000000;
}
.form .uni-forms-item button {
  padding: 0;
}
.form .uni-forms-item button::after {
  border: 1px solid transparent;
  border-radius: 10px;
  box-sizing: border-box;
  content: " ";
  height: 200%;
  left: 0;
  position: absolute;
  top: 0;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  width: 200%;
  border-top-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-top-style: solid;
  border-right-style: solid;
  border-bottom-style: solid;
  border-left-style: solid;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-image-source: initial;
  border-image-slice: initial;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: initial;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.form .uni-forms-item__label {
  font-size: 17px !important;
  font-weight: 400 !important ;
  color: rgba(0, 0, 0, 0.9) !important;
}
.is-disabled,
.is-input-border .is-disabled {
  background: #ffffff !important;
}
</style>
