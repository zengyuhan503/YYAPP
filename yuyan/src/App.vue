<script setup lang="ts">
import { ref, provide } from "vue";
import PageHeaderView from "@/layout/PageHeaderView.vue";
import PageSiderView from "@/layout/PageSiderView.vue";

import "moment/dist/locale/zh-cn";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import moment from "moment"; //引入moment
dayjs.locale("cn");
moment.locale("zh-cn"); //配置moment中文环境
const locale = ref(zhCN);
let collapsed = ref(false);
const changeCollapsed = () => {
  collapsed.value = !collapsed.value;
};
provide("collapsed", collapsed);
</script>

<template>
  <a-config-provider :locale="locale">
    <a-layout>
      <a-layout-sider
        width="256"
        v-model:collapsed="collapsed"
        :trigger="null"
        :collapsible="true"
      >
        <PageSiderView />
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="header">
          <PageHeaderView @changeCollapsed="changeCollapsed" />
        </a-layout-header>
        <a-layout-content>
          <router-view> </router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<style lang="less">
#app,
body,
html {
  width: 100%;
  height: 100%;
  .ant-layout-header {
    background: transparent;
    padding: 0;
    box-shadow: 0px 1px 4px 0px rgb(0 21 41 / 12%);
    z-index: 999;
  }
  .ant-layout {
    min-width: 1184px;
    height: 100%;
  }
  .ant-layout-content {
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
  }
  .ant-layout-sider {
    background: #002140;
    z-index: 11;
  }
}
#app {
  width: 100%;
  height: 100%;
}
.ant-input,
.ant-input-search-button,
.ant-select-selector,
.ant-input-number-input-wrap,
.ant-input-number-input ,.ant-select-selection-search-input{
  height: 40px !important;
}
.ant-message-error span:last-child {
  color: #002140;
}
.ant-message-success {
  color: #52c41a;
}
.ant-select-selection-item,.ant-select-selection-search-input {
  line-height: 38px !important;
  height: 38px !important;
}
.ant-select-selection-overflow-item .ant-select-selection-item {
  line-height: 30px !important;
  height: 30px !important;
}
.ant-pagination-options .ant-select-selection-item {
  line-height: 30px !important;
  height: 30px !important;
}
</style>
