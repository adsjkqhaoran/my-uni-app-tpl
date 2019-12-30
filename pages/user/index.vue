<template>
	<view>
			<nav-bar  bgColor="#CD3E40"  transparentFixedBgColor="#CD3E40">
				<view class="mp-search-box">
						<input class="ser-input" type="text" value="庆余年" disabled />
				</view>
				<view class="mp-search-box" slot="transparentFixed">
						<input class="ser-input" type="text" value="庆余年" disabled @click="test"/>
				</view>
			</nav-bar>
		   <image class="swiper-img" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2329712721,1387032941&fm=26&gp=0.jpg" alt="" mode="widthFix"></image>
		   <view style="height:2000rpx;background: #000;"></view>
			
	</view>
</template>

<script>
	import MescrollUni from "@/components/mescroll-diy/mescroll-xinlang.vue";
	export default {
		methods: {
			test() {
				console.log('111')
			}
		},
		components: {
			MescrollUni
		}
	}
</script>

<style lang=scss>
	.mp-search-box{
		position:relative;
		left: 0;
		z-index: 9999;
		width: 100%;
		height: 88rpx;
		display: flex;
		align-items: center;
		padding:0rpx 10rpx;
		box-sizing: border-box;
		.ser-input{
			flex:1;
			height: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			font-size: 24rpx;
			color:map-get($generalColor,secondary_text);
			border-radius: 30rpx;
			background: #DDDDDD;
		}
		.ma-search-place{
			width: 100%;
			height: 88rpx;
		}
		
	}
	.swiper-img{
		width: 100vw;
	}
</style>
