<template>
  <view class="page-content">
    <view class="paymant-main">
      <view class="paymant-info">
        <view class="cover">
          <image
            :src="'https://dental.cdwuhu.com/' + goodsInfo.head_image"
            mode="widthFix"
          />
        </view>
        <view class="details">
          <view class="title">{{ goodsInfo.title }}</view>
          <view class="price">
            <view>¥{{ goodsInfo.sale_price }}</view>
            <view class="count">
              <image src="../../static/icon/num3.png" v-if="count == 1" />
              <image src="../../static/icon/num1.png" v-else @click="count--" />
              <text>{{ count }}</text>
              <image src="../../static/icon/num2.png" @click="count++" />
            </view>
          </view>
        </view>
      </view>
      <view class="address">
        <view class="addr-form">
          <view class="label">
            <view class="">新增收货地址</view>
            <view class="radios">
              <radio-group @change="handleChangeRadio" @click="handleClickRadio">
                <radio color="#d44469" :checked="addrForm.is_default == 1" value="1" />
                设为默认地址
              </radio-group>
            </view>
          </view>
          <div class="form-box">
            <view class="item">
              <div class="prefix">
                <image
                  src="../../static/icon/icon.png"
                  style="width: 16px; height: 18px"
                />
              </div>
              <div class="inputs">
                <input v-model="addrForm.name" type="text" placeholder="收货人名" />
              </div>
            </view>
            <view class="item">
              <div class="prefix">
                <image
                  src="../../static/icon/icon3.png"
                  style="width: 15px; height: 19px"
                />
              </div>
              <div class="inputs">
                <input v-model="addrForm.phone" type="text" placeholder="收货电话" />
              </div>
            </view>
            <view class="item">
              <picker
                mode="region"
                @change="bindRegionChange"
                custom-item="{{customItem}}"
              >
                <div class="prefix" style="left: 15px; top: 10px">
                  <image
                    src="../../static/icon/icon2.png"
                    style="width: 28px; height: 28px"
                  />
                </div>
                <div class="inputs">
                  <input type="text" :value="addrForm.provinces" placeholder="省市区" />
                </div>
              </picker>
            </view>

            <view class="item" style="height: 140px">
              <div class="prefix" style="left: 19px; top: 17px">
                <image
                  src="../../static/icon/icon1.png"
                  style="width: 19px; height: 15px"
                />
              </div>
              <div class="inputs">
                <textarea
                  name=""
                  id=""
                  v-model="addrForm.address"
                  placeholder="收货地址"
                  cols="30"
                  style="height: 100px"
                  rows="10"
                ></textarea>
              </div>
            </view>
          </div>
        </view>
      </view>
      <view class="changeaddress" @click="open">
        选择其他地址 <uni-icons class="icon" type="right" size="18"></uni-icons>
      </view>
      <view class="" style="height: 100px"></view>
      <uni-popup ref="popup" background-color="#fff" type="bottom">
        <view class="slectaddress">
          <view class="title">
            <uni-icons
              type="left"
              @click="closePopup"
              size="30"
              class="icon"
              color="#000000"
            >
            </uni-icons>
            选择其他地址
          </view>
          <view class="main">
            <view class="items">
              <view
                class="item"
                :class="{ active: addressId == item.id }"
                v-for="(item, index) in addressList"
                :key="index"
                @click="handleSelectAddress(item)"
              >
                <view class="label">{{ item.name }}</view>
                <view class="phone">{{ item.phone }}</view>
                <view class="desc"
                  ><view class="default" v-if="item.is_default == 1">默认</view
                  ><view> {{ item.provinces }} - {{ item.address }}</view></view
                >
              </view>
            </view>
          </view>
        </view>
      </uni-popup>
    </view>
    <view class="pays">
      <view class="price">
        <text v-if="goodsInfo.sale_price != goodsInfo.price">折后价</text>
        <text style="" v-else>惊喜价</text>
        <text style="color: #f9a143; display: inline"> ¥</text>
        <text class="num"> {{ goodsInfo.total_price }}</text>
      </view>
      <view class="btns" @click="handleToCreateOrder"> 支付 </view>
    </view>
  </view>

  <view class="subscribeSuccess" v-if="showSubscribeSuccess">
    <view class="subscribemodal">
      <view class="close">
        <image
          src="http://h5.dental.cdwuhu.com/static/image/close.png"
          @click="handleToUser"
          mode="widthFix"
        />
      </view>
      <view class="submain">
        <image
          src="http://h5.dental.cdwuhu.com/static/image/subscribe.png"
          mode="widthFix"
        />
        <view class="title">支付成功</view>
        <view class="desc">感谢您的购买，请及等待收货～</view>
      </view>
      <view class="btns" @click="handleOpenOrder">查看我的订单</view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { onLaunch, onShow, onLoad } from "@dcloudio/uni-app";
import { CreateOrder, GetCalculate, GetAddressList, CreateWxPay } from "../../utils/api";
const count = ref(1);
let goodsId = ref(null);
let showSubscribeSuccess = ref(false);
let addressId = ref(null);
let goodsInfo = ref({});
let addrForm = ref({
  name: "",
  phone: "",
  provinces: "",
  address: "",
  is_default: "",
});
onLoad((option) => {
  goodsId.value = option.id;
  handleGetCalculate();
  handleGetAddressList();
});
const handleChangeRadio = (e) => {
  console.log(e);
  // addrForm.value.is_default = e.detail.value;
};
const handleClickRadio = () => {
  addrForm.value.is_default = !addrForm.value.is_default;
};

const bindRegionChange = (e) => {
  let detail = e.detail;
  let value = detail.value;
  addrForm.value.provinces = value.join("-");
};
watch(count, (newVal) => {
  console.log(newVal);
  handleGetCalculate();
});
let isHasAddress = false;
const handleGetCalculate = () => {
  let params = {
    goods_id: goodsId.value,
    number: count.value,
  };
  GetCalculate(params).then((res) => {
    goodsInfo.value = res;
    console.log(res.address);
    if (res.address != "") {
      addrForm.value = res.address;
      addrForm.value.is_default = "1";
      isHasAddress = true;
    } else {
      isHasAddress = false;
    }
  });
};
let addressList = ref([]);
const handleGetAddressList = () => {
  GetAddressList().then((res) => {
    addressList.value = res;
    if (res.length == 0) return false;
    addressId.value = res.find((item) => item.is_default == "1").id;
  });
};
const handleSelectAddress = (item) => {
  addressId.value = item.id;
  addrForm.value = item;
};
let order_id = "";
const handleToCreateOrder = () => {
  let params = {
    goods_id: goodsId.value,
    number: count.value,
    address_id: isHasAddress ? addrForm.value.id : 0,
    remark: addrForm.value.remark||'',
    name: addrForm.value.name,
    phone: addrForm.value.phone,
    provinces: addrForm.value.provinces,
    address: addrForm.value.address,
    is_default: addrForm.value.is_default == "" ? 0 : addrForm.value.is_default,
  };
  console.log(params);
  CreateOrder(params).then((res) => {
    console.log(res);
    order_id = res.order_id;
    CreateWxPay(res).then((res2) => {
      console.log(res2);
      wx.requestPayment({
        timeStamp: res2.timeStamp,
        nonceStr: res2.nonceStr,
        package: res2.package,
        signType: res2.signType,
        paySign: res2.paySign,
        success() {
          showSubscribeSuccess.value = true;
        },
        fail(err) {
          wx.showToast({
            icon: "none",
            title: "支付失败,即将前往订单详情",
            duration: 2000,
          });
          setTimeout(() => {
            uni.redirectTo({
              url: "/pages/detail/unpaid?id=" + order_id,
            });
          }, 2000);
          console.log(err);
        },
      });
    });
  });
};
const handleOpenOrder = () => {
  uni.redirectTo({
    url: "/pages/detail/unpaid?id=" + order_id,
  });
};
const handleToUser = () => {
  uni.redirectTo({
    url: "/pages/user/index",
  });
};
let popup = ref(null);
const open = () => {
  console.log();
  popup.value.open();
};
const closePopup = () => {
  popup.value.close();
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>

<style lang="less"></style>
