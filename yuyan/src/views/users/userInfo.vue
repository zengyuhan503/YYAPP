<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { changeUserStatus, exitUserStatus } from "@/utils/request/index";
import { Modal, message } from "ant-design-vue";
let submitLoading = ref(false);
let router = useRouter();
let route = useRoute();
interface QueryJson {
  id: "",
  nickname: "",
  phone: "",
  gender: "0",
  avatar: "",
  wx_openid: "",
  status: "",
  remark: null,
  create_time: "",
  update_time: "",
}
let info = ref({
  id: "",
  nickname: "",
  phone: "",
  gender: "0",
  avatar: "",
  wx_openid: "",
  status: "",
  remark: null,
  create_time: "",
  update_time: "",
});
const handleDisabledUser = () => {
  Modal.confirm({
    title: "确认停用该用户吗",
    content: "停用该用户后，该用户将无法使用预颜小程序上的相关功能，请谨慎操作。",
    onOk() {
      changeUserStatus({
        user_id: info.value.id as string,
        status: "2",
      }).then(() => {
        message.success("操作成功");
        info.value.status = "2";
      });
    },
  });
};
const handleEnableUser = () => {
  Modal.confirm({
    title: "确认启用该用户吗",
    content: "启用该用户后，该用户将可以使用预颜小程序上的相关功能，请谨慎操作 ",
    onOk() {
      changeUserStatus({
        user_id: info.value.id as string,
        status: "1",
      }).then((res) => {
        message.success("操作成功");
        info.value.status = "1";
        console.log(res);
      });
    },
  });
};
const handleSubmit = () => {
  let params = {
    ...info.value,
    user_id: info.value.id,
  };
  exitUserStatus(params)
    .then((res) => {
      console.log(res);
      message.success("操作成功");
      setTimeout(() => {
        router.go(-1);
      }, 1000);
    })
    .catch((err) => {});
  console.log(params);
};
onMounted(() => {
  info.value = route.query as unknown as QueryJson;
  console.log(route.query);
});
</script>

<template>
  <div class="page-content">
    <div class="page-head">
      <div class="page-info">
        <div style="margin-bottom: 20px">
          <a-breadcrumb>
            <a-breadcrumb-item to="">
              <router-link to="/user/lists">注册用户管理</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>注册用户详情</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <p class="title" style="margin-bottom: 16px">注册用户详情</p>
        <!-- <p>在小程序中注册后的用户都会在以下列表中显</p> -->
      </div>
    </div>
    <div class="page-body">
      <div class="page-main">
        <p class="title">
          用户信息
          <a-button @click="handleEnableUser" v-if="info.status == '2'">启用</a-button>
          <a-button danger @click="handleDisabledUser" v-if="info.status == '1'"
            >停用</a-button
          >
        </p>
        <div class="page-info">
          <a-row :gutter="112">
            <a-col :span="16">
              <a-row>
                <a-col :span="12">
                  <p>用户昵称：{{ info.nickname }}</p></a-col
                >
                <a-col :span="12">
                  <p>用户ID：{{ info.id }}</p></a-col
                >
                <a-col :span="12">
                  <p>用户电话： {{ info.phone }}</p></a-col
                >
                <a-col :span="12">
                  <p>该用户注册时间： {{ info.create_time }}</p></a-col
                >
                <a-col :span="24">
                  <p>用户备注</p>
                  <a-input v-model:value="info.remark" placeholder="" />
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="6">
              <img :src="'https://yuyandental.com//' +(info.avatar as string)" alt="" />
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
    <div class="submit-footer">
      <a-button style="margin-right: 10px" @click="router.go(-1)"> 取 消 </a-button>
      <a-button type="primary" :loading="submitLoading" @click="handleSubmit"
        >提 交</a-button
      >
    </div>
  </div>
</template>
<style lang="less" scoped>
@import url("./index.less");
</style>
<style>
.login-form .ant-message {
  position: absolute;
}
</style>
