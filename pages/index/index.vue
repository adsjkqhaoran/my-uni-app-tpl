<template>
	<view>
		<nav-bar  
		bgColor="#FFFFFF"
		transparentFixedBgColor="#CD3E40"    
		type="transparentFixed" 
		:hasPlace="true"
		backState="2000"
		:mescroll="mescroll">
			<view class="mp-search-box">
					<input class="ser-input" type="text" value="庆余年" disabled />
			</view>
			<view class="mp-search-box" slot="transparentFixed">
					<input class="ser-input" type="text" value="庆余年" disabled @click="test"/>
			</view>
			<view class="iconfont icon-user" slot="transparentFixedLeft"></view>
			<view class="iconfont icon-user" slot="left"></view>
			<view class="iconfont icon-qrcode" slot="transparentFixedRight"></view>
			<view class="iconfont icon-qrcode" slot="right"></view>
		</nav-bar>
		<mescroll-uni :statusTop="true" top="88" bottom="0" :down="downOption" @down="downCallback"   @scroll="mescrollScroll">
			<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item ,index) in info" :key="index">
						<view class="swiper-item">
							<image :src="item.src" alt="" mode="aspectFill">
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
			{{common.platForm}}
			<view class='hx_btn normal theme' @click="toScan">打开扫码</view>
			<view class='hx_btn small theme m_t_10' @click="toUser">我的</view>
			<view class='hx_btn mini disable m_t_10'>cs</view>
			<view style="height:1000rpx;"></view>
		</mescroll-uni>
		
	</view>
</template>

<script>
	// 自定义的mescroll-xinlang.vue
	import MescrollUni from "@/components/mescroll-diy/mescroll-xinlang.vue";
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	import {mapMutations,mapState} from 'vuex';
	export default {
		data() {
			return {
				mescroll: {},
				downOption:{
					auto:false,//是否在初始化完毕之后自动执行下拉回调callback; 默认true
				},
				info: [{
					content: '内容 A',
					src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2329712721,1387032941&fm=26&gp=0.jpg'
				}, {
					content: '内容 B',
					src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576759097723&di=c2d75f11ba6427810bc363de267b4095&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F7Po3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F7c1ed21b0ef41bd572ea367f5ada81cb38db3d84.jpg'
				}],
				current: 0,
				mode: 'nav'
			};
		},
		onReady(){
			
		},
		computed:{
			 ...mapState(['common','user'])
		},
		methods: {
			mescrollScroll(mescroll) {
				this.mescroll = {
					scrollTop: mescroll.scrollTop 
				}
			},
			downCallback(mescroll){
				setTimeout(function(){
					mescroll.endErr()
				},3000)
			},
			toUser() {
				uni.navigateTo({
					url: '/pages/user/index'
				})
			},
			toScan(){
				// h5是不支持扫码的
				// 允许从相机和相册扫码
				// uni.scanCode({
				//     success: function (res) {
				//         console.log('条码类型：' + res.scanType);
				//         console.log('条码内容：' + res.result);
				// 		// 条码类型：QR_CODE at pages/index/index.vue
				// 		// 条码内容：http://video.slyzn.com/setting.html?ipfsUrl=http%3A%2F%2F192.168.0.106%3A5001%2F at pages/index/index.vue
				//     }
				// });
			},
			change(e) {
				this.current = e.detail.current
			} 
		},
		components: {
			uniSwiperDot,
			MescrollUni
		}
	}
</script>

<style lang="scss">
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
		image{
			width: 100%;
		}
	}
	.swiper-box{
		height: 50vw;
		.swiper-item{
			height: 50vw;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	
</style>
