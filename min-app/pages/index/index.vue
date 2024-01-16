<template>
	<view class="page-content">
		<view class="content">
			<view class="page-header">
				预颜口腔
			</view>
			<view class="page-banner">
				<uni-swiper-dot class="uni-swiper-dot-box" @clickItem="clickItem" :info="info" :current="current" :mode="mode"
					:dots-styles="dotsStyles" field="content">
					<swiper class="swiper-box" @change="change" :current="swiperDotIndex">
						<swiper-item v-for="(item, index) in banners" :key="index">
							<image :src="'https://dental.cdwuhu.com/'+item.image" class="swiper-image"></image>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
			</view>
			<view class="yuyue">
				<view class="item"  @click="handleToPopularScience">
					<view class="title">科普馆预约</view>
					<view class="desc">了解更多科普知识</view>
					<image class="yuyueimg" src="../../static/image/yuyue1.png" mode="aspectFit">
					</image>
					<view class="yuyue-btn">
						<image src="../../static/image/yuyue-btn1.png" mode=""></image>
						<view class="">
							预约
						</view>
					</view>
				</view>
				<view class="item item2" @click="handleToPopularScience">
					<view class="title">看诊预约</view>
					<view class="desc">专业团队一触即达</view>
					<image class="yuyueimg" src="../../static/image/yuyue2.png" mode="aspectFit">
					</image>
					<view class="yuyue-btn">
						<image style="width: 134px;" src="../../static/image/yuyue-btn2.png" mode=""></image>
						<view class="">
							预约
						</view>
					</view>
				</view>
			</view>
		</view>
		<navs active='home' />
	</view>
</template>

<script setup>
	import navs from "/components/navs/index.vue";
	import {
		ref,
		onMounted
	} from "vue";
	import {
		GetIndexBanner
	} from "../../utils/api/index.js"
	let modeIndex = ref(-1);
	let styleIndex = ref(-1);
	let current = ref(0);
	let info = ref([{}]);
	let mode = ref("default");
	let dotsStyles = ref({});
	let swiperDotIndex = ref(0);
	let banners = ref([])
	const change = (e) => {
		current.value = e.detail.current;
	};

	const clickItem = (e) => {
		current.value = e;
	};
	const handleToPopularScience = () => {
		console.log(1111)
		wx.navigateTo({
			url: "/pages/popularScience/index",
			fail: (err) => {
				console.log(err)
			}
		})
	}
	const handleGetBanner = () => {
		GetIndexBanner().then(res => {
			console.log(res)
			banners.value = res
		})
	}
	onMounted(() => {
		handleGetBanner()
	})
</script>

<style lang="less" scoped>
	@import url("./index.less");
</style>