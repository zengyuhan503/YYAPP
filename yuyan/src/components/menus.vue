<template>
  <a-menu
    style="width: 256px"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :multiple="true"
    theme="dark"
    @openChange="handleopenChange"
    :inline-collapsed="collapsed"
  >
    <a-sub-menu v-for="item in menuLists" :key="item.path">
      <template #icon>
        <!-- <MenuFoldOutlined /> -->
        <!-- <icon-font :type="item.icon"></icon-font> -->
        <div style="width: 50px"></div>
      </template>
      <template #title>
        {{ item.name }}
      </template>
      <template v-for="child in item.children" :key="child.path">
        <a-menu-item
          @click="handleClick(child.path)"
          v-if="child.meta.showMenu || child.showMenu"
          :key="child.path"
          style="padding-left: 60px"
        >
          <span class="dev-audit">
            {{ child.name }}
          </span>
        </a-menu-item>
      </template>
    </a-sub-menu>
  </a-menu>
</template>
<script setup lang="ts">
import { ref, inject, watch, onMounted, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import options from "@router/config";
import { createFromIconfontCN } from "@ant-design/icons-vue";
const selectedKeys = ref<string[]>([]);
const rootSubmenuKeys = ref([]);
const openKeys = ref<string[]>([]);
const collapsed = inject("collapsed");
let menuLists = ref([]);
const router = useRouter();
const route = useRoute();
const IconFont = createFromIconfontCN({
  scriptUrl: "./util/icon/iconfont.js",
});
const handleopenChange = (refopenKeys: string[]) => {
  // let openKey = refopenKeys[refopenKeys.length - 1];
  // openKeys.value = [openKey];
};

const handleClick = (key) => {
  router.push(key);
};
menuLists.value = options.filter((option) => option.meta.showMenu === true);
console.log(menuLists.value);

watch(
  route,
  (newVal) => {
    // console.log(newVal.fullPath)
    const paths = newVal.fullPath.split("/");
    // console.log(paths)
    openKeys.value = [];
    selectedKeys.value = [];
    openKeys.value.push(`/${paths[1]}`);
    selectedKeys.value.push(newVal.fullPath);
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>
<style lang="less">
.ant-menu {
  div {
    padding: 0 !important;
    margin: 0 !important;
    border-radius: 0 !important;
  }
}
.ant-menu-sub {
  background: #002140;
}
.ant-menu-submenu-selected .ant-menu-submenu-title {
  color: #177ddc;
}
.ant-menu-submenu-title:hover {
  color: #177ddc;
}
.ant-menu-submenu-active {
  color: #177ddc;
}
.ant-menu-item {
  padding-left: 70px !important;
}
.ant-menu-item:hover {
  color: #177ddc;
}
.ant-menu .ant-menu-item-selected,
.ant-menu-submenu-popup .ant-menu-item-selected {
  background-color: #177ddc;
}
.ant-menu .ant-menu-item-selected:hover {
  color: #ffffff;
}
.dev-audit {
  position: relative;
}
.ant-menu-title-content {
  overflow: initial !important;
}
.hide-audit::before {
  display: none;
}
.ant-menu-item-icon {
  font-size: 18px !important;
}
.workorder {
  position: relative;
  &::before {
    display: block;
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    left: -19px;
    top: 5px;
    border-radius: 50%;
  }
  &.handle::before {
    background: #ffa84a;
  }
  &.list::before {
    background: #ff1a2e;
  }
}
.ant-menu-submenu-title {
  background: rgb(0, 33, 64);
  padding: 0px 0px 0px 24px;
  margin: 0px;
}
.ant-menu {
  background: #002140;
}

.ant-menu-item {
  width: 100% !important;
  margin: 0 !important;
  border-radius: 0 !important;
}
</style>
