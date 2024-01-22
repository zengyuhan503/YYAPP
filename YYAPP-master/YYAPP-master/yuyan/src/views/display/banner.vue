<script setup lang="ts">
import { reactive, ref, watch, onMounted, createVNode } from "vue";
import { useRouter } from "vue-router";
import { Modal } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { bannerList } from "@/utils/request/index";
let router = useRouter();
let searchStatus = ref(false);
let createBanner = (item: any) => {
  router.push({
    path: "/display/bannerInfo",
    query: item !== null ? { ...item } : null,
  });
};
let banners = ref([]);
const getList = () => {
  let params = {
    type: 1,
  };
  bannerList(params)
    .then((result) => {
      let data = result.data;
      banners.value =data.data;
    })
    .catch((err) => {});
};
onMounted(() => {
  getList();
});
</script>

<template>
  <div class="page-content">
    <div class="page-head">
      <div class="page-info">
        <p class="title" style="margin-bottom: 16px">首页banner配置</p>
        <p>
          最多可以配置6个banner，每个banner可以配一张长图或者一个链接。<span
            style="color: #d44469"
            >完全为空的banner，不会展示在小程序上。</span
          >
        </p>
      </div>
    </div>
    <div class="page-body">
      <div class="banners">
        <div class="item" @click="createBanner(null)">
          <div class="cover">
            <img src="../../assets/image/display-banner.png" alt="" />
            <div class="updata">
              <PlusOutlined />
            </div>
          </div>
          <div class="info">
            <p class="position">NO.N</p>
            <p class="note">备注信息（不展示在小程序）</p>
          </div>
          <p class="staus">无/长图/链接</p>
        </div>
        <div
          class="item"
          v-for="(item, index) in banners"
          @click="createBanner(item)"
          :key="index"
        >
          <div class="cover">
            <img :src="'https://dental.cdwuhu.com/' + item.image" alt="" />
          </div>
          <div class="info">
            <p class="position">NO.{{ index + 1 }}</p>
            <p class="note">{{ item.remark }}</p>
          </div>
          <p class="staus">{{ item.url == "" ? "长图" : "链接" }}</p>
        </div>

        <!-- <a-row :gutter="24">
          <a-col :span="8" v-for="(item, index) in banners" :key="index">
           
          </a-col>
          <a-col :span="8">
           
          </a-col>
        </a-row> -->
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
