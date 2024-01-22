<script setup lang="ts">
import { reactive, ref, watch, createVNode, onMounted, toRefs } from "vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
//第二个参数options对象，是各种配置参数
import { logout } from "@/utils/user/index";
import { useRouter } from "vue-router";
import userStore from "@/pinia/userStore/index";
const props = defineProps({
  collapsed: Boolean,
});
let router = useRouter();
const emits = defineEmits(["changeCollapsed"]);
const setCollapsed = () => {
  emits("changeCollapsed");
};
const handleLoginout = () => {
  logout();
  router.push("/login");
};
interface info {
  name: string;
  account: string;
  token: {
    token: string;
    token_exp: number;
    refresh_token: string;
    refresh_token_exp: number;
  };
}
let user = ref({
  name: "",
  account: "",
  token: {
    token: "",
    token_exp: 0,
    refresh_token: "",
    refresh_token_exp: 0,
  },
});
// user.value = {
//   ...userStore().getInfo,
// };
const subscribe = userStore().$subscribe((m, states) => {
  let state = {
    ...(states.info as info),
  };
  user.value = state;
  console.log(state);
});
</script>

<template>
  <div class="layout-header">
    <div class="menu-outlined">
      <!-- <menu-unfold-outlined v-if="collapsed" class="trigger" @click="setCollapsed" />
      <menu-fold-outlined v-else class="trigger" @click="setCollapsed" /> -->
    </div>

    <div class="user-info">
      <a-dropdown>
        <span @click.prevent>{{ user?.name || "" }}</span>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0" @click="handleLoginout">
              <span>退出登录</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-button
        @click="handleLoginout"
        size="small"
        style="margin-left: 10px"
        type="primary"
        >退出</a-button
      >
    </div>
  </div>
</template>

<style lang="less" scoped>
.layout-header {
  height: 64px;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
  box-sizing: border-box;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .menu-outlined {
    span {
      font-size: 24px;
    }
  }
  .user-info {
    span {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      cursor: pointer;
    }
  }
}
</style>
