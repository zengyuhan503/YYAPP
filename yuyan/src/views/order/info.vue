<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { order_info } from "@/utils/request/index";
import { Modal, message } from "ant-design-vue";

let searchStatus = ref(false);
let route = useRoute();
let router = useRouter();
let remark = ref("");
let orderInfo = ref({
  express: null,
  category: [],
  create_time: null,
  avatar: null,
  name: null,
  user_id: null,
  phone: null,
  address: null,
  ship_company: null,
  ship_number: null,
  real_price: null,
  goods_name: null,
  goods_id: null,
  price: null,
  discount_rate: null,
  num: null,
  out_trade_no: null,
  goods_image: null,
  ship_code: null,
  status: null,
});
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
const handleGetInfo = (id) => {
  let params = {
    order_id: id,
  };
  order_info(params).then((res) => {
    console.log(res);
    orderInfo.value = res.data;
  });
};
onMounted(() => {
  let query = route.query;
  let id = query.id;
  handleGetInfo(id);
});
</script>

<template>
  <div class="page-content">
    <div class="page-head">
      <div class="page-info">
        <div style="margin-bottom: 20px">
          <a-breadcrumb>
            <a-breadcrumb-item to="">
              <router-link to="/order/orders">订单管理</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>订单详情</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <p class="title" style="margin-bottom: 16px">
          订单编号<span style="color: #1890ff">{{ orderInfo.out_trade_no }}</span>
        </p>
        <p>下单时间：{{ orderInfo.create_time }}</p>
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
                  <p><span>用户昵称：</span>{{ orderInfo.name }}</p></a-col
                >
                <a-col :span="12">
                  <p><span>用户ID：</span>UserID {{ orderInfo.user_id }}</p></a-col
                >
                <a-col :span="12">
                  <p><span>用户电话：</span>{{ orderInfo.phone }}</p></a-col
                >
                <a-col :span="12">
                  <p><span>该用户注册时间：</span> 2017-04-05</p></a-col
                >
                <a-col :span="24">
                  <p><span>用户备注</span></p>
                  <p>{{ orderInfo.phone }}</p>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="6">
              <div class="avatar">
                <img :src="'https://dental.cdwuhu.com/' + orderInfo.avatar" alt="" />
                <p>用户头像</p>
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
            <a-col :span="12"> 收货地址详情 </a-col>
            <a-col :span="12"> 物流状态详情 </a-col>
          </a-row>
        </p>
        <div class="page-info info1">
          <a-row :gutter="112">
            <a-col :span="12">
              <p><span>收货姓名：</span>{{ orderInfo.name }}</p>
              <p><span>收货电话：</span>{{ orderInfo.phone }}</p>
              <div>
                <p><span>收货地址：</span></p>
                <p>{{ orderInfo.address }}</p>
              </div>
            </a-col>
            <a-col :span="12">
              <div>
                <p><span>快递公司：</span>{{ orderInfo.ship_company }}</p>
                <p>
                  <span>快递单号：</span
                  ><template v-if="orderInfo.ship_code == 'ziti'"
                    >自提方式暂无单号
                  </template>
                  <template v-else>
                    {{ orderInfo.ship_number }}
                  </template>
                  <a-button
                    v-if="orderInfo.ship_number != ''"
                    type="link"
                    @click="copyText"
                    >复制</a-button
                  >
                </p>
                <template v-if="orderInfo.ship_code == 'ziti'">
                  <p v-if="orderInfo.status == 4"><span>物流状态：</span>已自提</p>
                  <p v-if="orderInfo.status == 2"><span>物流状态：</span>等待自提中</p>
                </template>
                <template v-else>
                  <div v-if="orderInfo.express?.state != -1">
                    <p>
                      <span>物流状态：{{ orderInfo.express?.state }}</span>
                    </p>
                    <div class="ship_items" v-if="orderInfo.express?.data">
                      <div v-for="(item, index) in orderInfo.express.data" :key="index">
                        <p>[{{ item.time }}][{{ item.areaCode }}]{{ item.context }}</p>
                      </div>
                    </div>
                  </div>
                  <p v-else>{{ orderInfo.express?.data }}</p>
                </template>
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
            <a-col :span="12">
              <span style="color: #1890ff"
                >实际支付价格：{{ orderInfo.real_price }}¥</span
              >
            </a-col>
          </a-row>
        </p>
        <div class="page-info info1">
          <a-row :gutter="112">
            <a-col :span="12">
              <p><span>商品名称：</span>{{ orderInfo.goods_name }}</p>
              <p><span>商品ID：</span>{{ orderInfo.goods_id }}</p>
              <div style="width: 400px; position: absolute">
                <p><span>收货地址：</span></p>
                <p>
                  {{ orderInfo.address }}
                </p>
                <div class="images">
                  <img
                    :src="'https://dental.cdwuhu.com/' + orderInfo.goods_image"
                    alt=""
                  />
                </div>
              </div>
            </a-col>
            <a-col :span="12">
              <p><span>商品类别：</span>{{ orderInfo.category.join(",") }}</p>
              <p><span>商品原价：</span>{{ orderInfo.price }}¥</p>
              <p><span>折后价格：</span>{{ orderInfo.real_price }}¥</p>
              <p><span>商品折扣：</span>{{ orderInfo.discount_rate }}%</p>
              <p><span>购买数量：</span>{{ orderInfo.num }}</p>
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
