<script setup lang="ts">
import { ref, inject, watch, onMounted } from "vue";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
import Menus from "@components/menus.vue";
let collapsed = inject("collapsed");
</script>

<template>
  <div class="layout-sider">
    <div class="menu-logo">
      <img src="../assets/image/logo.png" alt="">
    </div>
    <div class="menu">
      <Menus />
    </div>
  </div>
</template>
<style lang="less" scoped>
.layout-sider {
  z-index: 11;
  .menu-logo {
    height: 64px;
    text-align: center;
    line-height: 64px;
    img {
      width: 180px;
    }
  }
}
</style>
