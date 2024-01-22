<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { changeUserStatus } from "@/utils/request/index";
import { Modal, message } from "ant-design-vue";
let searchStatus = ref(false);
let route = useRoute();
let remark = ref("");
const textToCopy = ref("这是要复制的文本");
const copyText = async () => {
  if (!navigator.clipboard) {
    message.error("浏览器不支持剪贴板，请检查浏览器或者网站地址是否正常");
    return;
  }
  try {
    await navigator.clipboard.writeText(textToCopy.value);
    message.success("文本已复制到剪贴板");
  } catch (err) {
    message.error("复制文本失败", err);
  }
};
</script>

<template>
  <div class="page-content">
    <div class="page-head">
      <div class="page-info">
        <p class="title" style="margin-bottom: 16px">
          订单编号<span style="color: #1890ff">G123456</span>
        </p>
        <p>下单时间：2023/12/11 14:33:22</p>
        <!-- <p>在小程序中注册后的用户都会在以下列表中显</p> -->
      </div>
      <div class="status">已完成</div>
    </div>
    <div class="page-body">
      <div class="page-main">
        <p class="title">下单账号信息</p>
        <div class="page-info info1">
          <a-row :gutter="112">
            <a-col :span="16">
              <a-row>
                <a-col :span="12">
                  <p><span>用户昵称：</span>付小小</p></a-col
                >
                <a-col :span="12">
                  <p><span>用户ID：</span>UserID XXXXXXXX</p></a-col
                >
                <a-col :span="12">
                  <p><span>用户电话：</span>18322193472</p></a-col
                >
                <a-col :span="12">
                  <p><span>该用户注册时间：</span> 2017-04-05</p></a-col
                >
                <a-col :span="24">
                  <p><span>用户备注</span></p>
                  <p>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="6">
              <img src="" alt="" />
            </a-col>
          </a-row>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="page-main">
        <p class="title" style="display: block">
          <a-row :gutter="112">
            <a-col :span="12"> 收货地址详情 </a-col>
            <a-col :span="12"> 物流状态详情 </a-col>
          </a-row>
        </p>
        <div class="page-info info1">
          <a-row :gutter="112">
            <a-col :span="12">
              <p><span>收货姓名：</span>付小小</p>
              <p><span>收货电话：</span>18322193472</p>
              <div>
                <p><span>收货地址：</span></p>
                <p>天津市XXXXXXXXXXXXXXXXXXXXXXX</p>
              </div>
            </a-col>
            <a-col :span="12">
              <p><span>快递公司：</span>顺丰速运</p>
              <p>
                <span>快递单号：</span>18322193472
                <a-button type="link" @click="copyText">复制</a-button>
              </p>
              <div>
                <p><span>物流状态：</span></p>
                <p>已签收（菜鸟驿站XXX）这部分 不一定能</p>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="page-main">
        <p class="title" style="display: block">
          <a-row :gutter="112">
            <a-col :span="12"> 订单商品详情 </a-col>
            <a-col :span="12"> <span style="color: #1890ff">物流状态详情</span> </a-col>
          </a-row>
        </p>
        <div class="page-info info1">
          <a-row :gutter="112">
            <a-col :span="12">
              <p><span>商品名称：</span>付小小</p>
              <p><span>商品ID：</span>18322193472</p>
              <div style="width: 400px; position: absolute">
                <p><span>收货地址：</span></p>
                <p>
                  甄选牙膏，asdadasdasdasd as dasdasdas das dasasd asdaeqwadasd a das asd
                  as as da as das
                </p>
                <div class="images"></div>
              </div>
            </a-col>
            <a-col :span="12">
              <p><span>商品类别：</span>顺丰速运</p>
              <p><span>商品原价：</span>18322193472</p>
              <p><span>折后价格：</span>18322193472</p>
              <p><span>商品折扣：</span>18322193472</p>
              <p><span>购买数量：</span>18322193472</p>
            </a-col>
          </a-row>
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
