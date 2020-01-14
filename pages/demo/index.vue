<template>
	<Layout class="d_flex">
		<view class="container Index">
			<nav-bar bgColor="#FFFFFF" :transparentFixedBgColor="common.theme" backState="2000" type="transparentFixed" :hasPlace="true" :mescroll="mescroll">
				<view class="mp-search-box"><input class="ser-input" type="text" value="庆余年" disabled @click="toast('搜索')" /></view>
				<view class="mp-search-box" slot="transparentFixed"><input class="ser-input" type="text" value="庆余年" disabled @click="toast('搜索')" /></view>
				<view class="iconfont icon-user" slot="transparentFixedLeft" @click="toUser"></view>
				<view class="iconfont icon-user" slot="left" @click="toUser"></view>
				<!-- #ifndef H5 -->
				<view class="iconfont icon-qrcode" slot="transparentFixedRight" @click="toScan"></view>
				<view class="iconfont icon-qrcode" slot="right" @click="toScan"></view>
				<!-- #endif -->
			</nav-bar>
			<QSTabs ref="tabs" :tabs="tabs" :current="tabCurrent" @change="tabChange" animationMode="line3" :activeColor="common.theme"></QSTabs>
			<swiper class="swiper" :current="tabCurrent" @transition="transition" @change="tabSwiperChange" @animationfinish="animationfinish">
				<swiper-item>
					<uni-swiper-dot :info="info" :current="swiperCurrent" field="content" :mode="mode">
						<swiper class="swiper-box" @change="swiperChange">
							<swiper-item v-for="(item, index) in info" :key="index">
								<view class="swiper-item">
									<image :src="item.src" alt="" mode="aspectFill" />
								</view>
							</swiper-item>
						</swiper>
					 </uni-swiper-dot>
					 {{ common.platForm }} {{ common.sysTemInfo.windowHeight }}
					 <!-- #ifdef APP-PLUS -->
					 <view class="hx_btn normal theme" @click="update">update</view>
					 <!-- #endif -->
					 <view class="hx_btn small theme m_t_10" @click="navigateTo('/pages/demo/video')">video</view>
					 <view class="hx_btn mini disable m_t_10" @click="navigateTo('/pages/demo/verify')">verify</view>
					 <view style="height:2000rpx;"></view>
				</swiper-item>
				<swiper-item>3</swiper-item>
				<swiper-item>3</swiper-item>
			</swiper>
		</view>
	</Layout>
</template>
<script>
import MescrollUni from '@/components/mescroll-diy/mescroll-xinlang.vue';
import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
import { mapMutations, mapState } from 'vuex';
import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
import Tips from '../../utils/tips.js';
import UiConfig from '../../data/ui.js';
export default {
	data() {
		return {
			tabs: [{ name: '测试1' }, { name: '测试2' }, { name: '测试3' }],
			tabCurrent: 0,
			mescroll: {},
			downOption: {
				auto: false //是否在初始化完毕之后自动执行下拉回调callback; 默认true
			},
			info: [
				{
					content: '内容 A',
					src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2329712721,1387032941&fm=26&gp=0.jpg'
				},
				{
					content: '内容 B',
					src:
						'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576759097723&di=c2d75f11ba6427810bc363de267b4095&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F7Po3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F7c1ed21b0ef41bd572ea367f5ada81cb38db3d84.jpg'
				}
			],
			swiperCurrent: 0,
			mode: 'nav'
		};
	},
	onReady() {},
	computed: {
		...mapState(['common', 'user'])
	},
	methods: {
		// #ifdef APP-PLUS
		update() {
			// wgt文件更新有点问题
			// 下载wgt文件
			var wgtUrl = 'http://demo.dcloud.net.cn/test/update/H5EF3C469.wgt';
			function downWgt() {
				plus.nativeUI.showWaiting('下载wgt文件...');
				plus.downloader
					.createDownload(wgtUrl, { filename: '_doc/update/' }, function(d, status) {
						if (status == 200) {
							console.log('下载wgt成功：' + d.filename);
							installWgt(d.filename); // 安装wgt包
						} else {
							console.log('下载wgt失败！');
							plus.nativeUI.alert('下载wgt失败！');
						}
						plus.nativeUI.closeWaiting();
					})
					.start();
			}
			// 更新应用资源
			function installWgt(path) {
				plus.nativeUI.showWaiting('安装wgt文件...');
				plus.runtime.install(
					path,
					{},
					function() {
						plus.nativeUI.closeWaiting();
						console.log('安装wgt文件成功！');
						plus.nativeUI.alert('应用资源更新完成！', function() {
							plus.runtime.restart();
						});
					},
					function(e) {
						plus.nativeUI.closeWaiting();
						console.log('安装wgt文件失败[' + e.code + ']：' + e.message);
						plus.nativeUI.alert('安装wgt文件失败[' + e.code + ']：' + e.message);
					}
				);
			}
			downWgt();
		},
		// #endif
		tabChange(index) {
			this.tabCurrent = index;
		},
		toast(title) {
			Tips.toast(title);
		},
		mescrollScroll(mescroll) {
			this.mescroll = {
				scrollTop: mescroll.scrollTop
			};
		},
		downCallback(mescroll) {
			setTimeout(function() {
				mescroll.endErr();
			}, 1000);
		},
		upCallback(mescroll) {
			setTimeout(function() {
				mescroll.endErr();
			}, 1000);
		},
		toUser() {
			uni.switchTab({
				url: '/pages/demo/user'
			});
		},
		toScan() {
			// h5是不支持扫码的
			// 允许从相机和相册扫码
			uni.scanCode({
				success: function(res) {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
					// 条码类型：QR_CODE at pages/index/index.vue
					// 条码内容：http://video.slyzn.com/setting.html?ipfsUrl=http://192.168.0.106:5001/
				}
			});
		},
		swiperChange(e) {
			this.swiperCurrent = e.detail.current;
		},
		tabSwiperChange(e) {},
		transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.tabCurrent = current;
		}
	},
	components: {
		uniSwiperDot,
		MescrollUni,
		QSTabs
	}
};
</script>

<style lang="scss">
.Index {
	display: flex;
	flex-direction: column;
	.swiper {
		flex: 1;
		height: auto !important;
	}
	.swiper-box {
		height: 50vw;
		.swiper-item {
			height: 50vw;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.mp-search-box {
		position: relative;
		left: 0;
		z-index: 9999;
		width: 100%;
		height: 88rpx;
		display: flex;
		align-items: center;
		padding: 0rpx 10rpx;
		box-sizing: border-box;
		.ser-input {
			flex: 1;
			height: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			font-size: 24rpx;
			color: map-get($generalColor, secondary_text);
			border-radius: 30rpx;
			background: #dddddd;
		}
		.ma-search-place {
			width: 100%;
			height: 88rpx;
		}
		image {
			width: 100%;
		}
	}
}
</style>
