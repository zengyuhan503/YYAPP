<script setup lang="ts">
import { reactive, ref, watch, onMounted } from "vue";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { login } from "@/utils/request/index";
import { loginCms } from "@/utils/user/index";
import { useRouter } from "vue-router";
import userStore from "@/pinia/userStore/index";
let router = useRouter();
let formData = reactive({
  account: "",
  password: "",
});
let isloginLoading = ref(false);
const loginLoading = ref(false);
const submitLogin = () => {
  if (formData.account == "" || formData.password == "") {
    message.error("请填写正确的登录信息");
  }
  let params = {
    ...formData,
  };
  isloginLoading.value = true;
  login(params)
    .then((res: any) => {
      console.log(res.data);
      isloginLoading.value = false;
      loginCms(res.data);
      userStore().setInfo(res.data);
      router.push("/user/lists");
    })
    .catch((err) => {
      isloginLoading.value = false;
    });
};
</script>

<template>
  <div class="page_login">
    <div class="left_aside">
      <div class="page-header"></div>
      <div class="page-content">
        <div class="login-form" id="login-content">
          <p class="title">预颜小程序后台</p>
          <div class="login-input">
            <a-input
              v-model:value="formData.account"
              ref="userNameInput"
              placeholder="请输入您的账户"
            >
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
            <a-input-password
              v-model:value="formData.password"
              ref="userNameInput"
              @keyup.enter="submitLogin"
              placeholder="请输入您的密码"
            >
              <template #prefix>
                <UnlockOutlined />
              </template>
            </a-input-password>
            <a-button
              :loading="isloginLoading"
              block
              class="loginBtn"
              @click="submitLogin"
              >登 录</a-button
            >
          </div>
        </div>
      </div>
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
