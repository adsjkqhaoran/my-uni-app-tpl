<template>
	<view>
		<view
			class="nav-header"
			:class="{ fixed: navFixed, absolute: type == 'transparent', transparent: type == 'transparent', line: navLine, darkBg: isDarkBg, themeBgColor: themeBgColor }"
			:style="{ paddingTop: statusBarHeight + 'px', backgroundColor: navBgColor, color: navFontColor, opacity: transparentValue }"
		>
			<view class="left_box">
				<slot name="left">
					<view class="left_info" :class="{ btnMongol: isTwoBtn }" v-if="back || $slots.left || home">
						<view class="back iconfont icon-left" v-if="back && !firstPage" @click="onBackPage"></view>
						<text v-if="isTwoBtn"></text>
						<view class="home iconfont icon-home" v-if="(firstPage && back) || home" @click="onBackHome"></view>
					</view>
				</slot>
			</view>
			<view class="title" :class="{ center: titleCenter, darkBg: isDarkBg }" v-if="$slots.default || navTitle">
				<slot>{{ navTitle }}</slot>
			</view>
			<view class="right_info"><slot name="right"></slot></view>
		</view>
		<view
			class="nav-header transparentFixed fixed"
			:class="{ darkBg: isDarkBg }"
			v-if="type == 'transparentFixed'"
			:style="{
				paddingTop: statusBarHeight + 'px',
				backgroundColor: transparentFixedBgColor || 'transparent',
				color: navTransparentFixedFontColor,
				opacity: 1 - transparentValue,
				zIndex: transparentValue < 0.3 ? 100 : 90
			}"
		>
			<view class="left_box">
				<slot name="transparentFixedLeft" :class="{ darkBg: isDarkBg }">
					<view class="left_info" v-if="back || $slots.left || home">
						<view class="back iconfont icon-left" v-if="back && !firstPage" @click="onBackPage"></view>
						<text v-if="isTwoBtn"></text>
						<view class="home iconfont icon-home" v-if="(firstPage && back) || home" @click="onBackHome"></view>
					</view>
				</slot>
			</view>
			<view class="title" :class="{ center: titleCenter, darkBg: isDarkBg }" v-if="$slots.default || navTitle">
				<slot name="transparentFixed">{{ navTitle }}</slot>
			</view>
			<view class="right_info"><slot name="transparentFixedRight"></slot></view>
		</view>
		<view v-if="type == 'fixed'" class="station" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
		<view class="nav-status" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
		<view v-if="hasPlace" class="nav-place"></view>
	</view>
</template>
<script>
// 主页页面的页面路径
// 关联功能：打开的页面只有一个的时候右上角自动显示返回首页按钮，下面这个数组是排除显示返回首页的页面。
// 主页使用场景：小程序分享出去的页面，用户点击开是分享页面，很多情况下是没有返回首页按钮的
const mainPagePath = ['pages/index/index'];
// const mainPagePath = ["pages/index/index"];
//返回首页的地址
const homePath = '/pages/index/index';
//白色表达值
const whiteList = ['#FFF', '#FFFFFF', 'white', 'rgb(255,255,255)', 'rgba(255,255,255,1)'];
import * as utils from '../../utils/utls.js';
export default {
	props: {
		//是否显示返回按钮
		// 1000 显示返回按钮
		// 2000 不显示返回按钮
		// 3000 自定义返回按钮方法，点击返回箭头后会发送一个backClick事件
		backState: {
			default: function() {
				return 1000;
			}
		},
		// 过渡刚开始的颜色
		transparentFixedBgColor: {
			default: function() {
				return 'transparent';
			}
		},
		//是否显示返回首页按钮
		home: {
			type: Boolean,
			default: function() {
				return false;
			}
		},
		//导航背景色，支持渐变
		bgColor: {
			type: [String, Array],
			default: function() {
				return '#FFF';
			}
		},
		// 导航背景色渐变角度
		bgColorAngle: {
			type: [String, Number],
			default: function() {
				return 90;
			}
		},
		//导航字体颜色，字体颜色为白色的时候会把手机状态栏设置为白色，否则为黑色
		fontColor: {
			type: String,
			default: function() {
				return '#000';
			}
		},
		//标题是否居中
		titleCenter: {
			type: Boolean,
			default: function() {
				return true;
			}
		},
		//标题
		title: {
			type: String,
			default: function() {
				return '';
			}
		},
		//类型 fixed为固定 默认
		// ordinary 普通的 不固定
		// transparent 透明不固定的
		//transparentFixed  透明固定的
		type: {
			type: String,
			default: function() {
				return 'fixed';
			}
		},
		//透明固定的时候字体颜色
		transparentFixedFontColor: {
			type: String,
			default: function() {
				return '#000';
			}
		},
		// 是否占位
		hasPlace: {
			type: Boolean,
			default: function() {
				return false;
			}
		},
		// mescroll
		mescroll: {
			type: Object,
			default: function() {
				return {};
			}
		}
	},
	data() {
		return {
			//当前页面是否是第一个页面
			firstPage: false,
			//透明度值
			transparentValue: 1,
			//标题
			navTitle: '',
			//字体色
			navFontColor: '#000',
			//背景色
			navBgColor: 'linear-gradient(90deg, #FFF 0%, #FFF 100%)',
			//透明底字体色
			navTransparentFixedFontColor: '#000',
			// 是否使用
			themeBgColor: false,
			// 导航栏高度
			statusBarHeight: 0
		};
	},
	computed: {
		// 是否transDom
		istranDom() {
			if (this.type == 'transparentFixed') {
				if (this.transparentValue < 0.5) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		},
		back() {
			return this.backState == 1000 || this.backState == 3000;
		},
		//导航固定
		navFixed() {
			if (this.type == 'transparentFixed' || this.type == 'fixed') {
				return true;
			} else {
				return false;
			}
		},
		//导航底部线是否显示
		navLine() {
			return this.type !== 'transparent' && utils.getContrastYIQ(this.navBgColor) == 'white';
		},
		//是否深色模式字体
		isDarkFont() {
			if (this.istranDom) {
				return utils.getContrastYIQ(this.transparentFixedFontColor) ? utils.getContrastYIQ(this.transparentFixedFontColor) != 'black' : false;
			} else {
				return utils.getContrastYIQ(this.navFontColor) != 'black';
			}
		},
		// 是深色背景
		isDarkBg() {
			if (this.istranDom) {
				return utils.getContrastYIQ(this.transparentFixedBgColor) ? utils.getContrastYIQ(this.transparentFixedBgColor) != 'black' : false;
			} else {
				return utils.getContrastYIQ(this.navBgColor) != 'black';
			}
		},
		//右上角是否有两个按钮
		isTwoBtn() {
			return (this.backState == 1000 || this.backState == 3000) && this.home && !this.firstPage;
		}
	},
	watch: {
		mescroll(e) {
			if (e.scrollTop > 180) {
				this.transparentValue = 1;
			} else {
				this.transparentValue = e.scrollTop / 180;
			}
		},
		title(val) {
			this.navTitle = val;
		},
		fontColor(val) {
			this.navFontColor = val;
			this.settingColor();
		},
		bgColor(val) {
			this.getNavBgColor(val);
		},
		transparentFixedFontColor(val) {
			this.navTransparentFixedFontColor = val;
		}
	},
	//第一次加载
	created() {
		this.navTitle = this.title;
		this.navFontColor = this.fontColor;
		this.getNavBgColor(this.bgColor);
		this.navTransparentFixedFontColor = this.transparentFixedFontColor;
		//获取手机状态栏高度
		this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
		const _this = this;
		if (this.type == 'transparentFixed') {
			this.transparentValue = 0;
		}
		this.settingColor();
		//获取所有页面
		let currentPages = getCurrentPages();
		let pageLen = currentPages.length;
		//判断是否是第一个页面，如果是有设置back为true的页面，将不显示返回箭头，而现实返回首页按钮
		if (pageLen == 1 && !mainPagePath.includes(currentPages[0].route)) {
			this.firstPage = true;
		}
		//监听页面滚动，type为transparentFixed的时候页面向下滚动的时候导航逐渐变白
		if (this.type == 'transparentFixed') {
			// #ifndef H5
			currentPages[pageLen - 1].onPageScroll = function(e) {
				_this.$emit('scroll', e);
				if (e.scrollTop > 180) {
					_this.transparentValue = 1;
				} else {
					_this.transparentValue = e.scrollTop / 180;
				}
			};
			// #endif
			// #ifdef H5
			window.onscroll = function(e) {
				let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				_this.$emit('scroll', { scrollTop: scrollTop });
				if (scrollTop > 180) {
					_this.transparentValue = 1;
				} else {
					_this.transparentValue = scrollTop / 180;
				}
			};
			// #endif
		}
	},
	//方法
	methods: {
		//返回上一页面
		onBackPage() {
			if (this.backState == 3000) {
				this.$emit('backClick');
			} else {
				uni.navigateBack();
			}
		},
		//返回首页
		onBackHome() {
			uni.switchTab({
				url: homePath,
				fail: function() {
					uni.redirectTo({
						url: homePath
					});
				}
			});
		},
		// 获取导航背景颜色
		getNavBgColor(val) {
			if (val == 'themeBgColor') {
				this.themeBgColor = true;
				this.navBgColor = '';
			} else {
				if (typeof val == 'string') {
					// 这里暂时去掉渐变的功能免得麻烦
					if (val.indexOf('#') >= 0) {
						this.navBgColor = val;
					} else {
						this.navBgColor = 'linear-gradient(90deg, ' + val + ' 0%, ' + val + ' 100%)';
					}
				} else if (val instanceof Array && val.length >= 2) {
					let navBgColor = 'linear-gradient(' + this.bgColorAngle + 'deg';
					val.forEach(item => {
						if (typeof item == 'string') {
							navBgColor += ',' + item;
						} else if (typeof item == 'object') {
							navBgColor += ',' + item.color + ' ' + item.scale;
						}
					});
					navBgColor += ')';

					this.navBgColor = navBgColor;
				}
			}
		},
		//设置手机状态栏颜色
		settingColor() {
			//判断导航栏颜色
			if (!this.isLightBg) {
				// 改变手机状态栏颜色
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: this.navBgColor
				});
			} else {
				// 改变手机状态栏颜色
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: this.navBgColor
				});
			}
		}
	}
};
</script>
<style lang="scss">
.station,
.nav-place {
	box-sizing: content-box;
	height: 88rpx;
}
.nav-header {
	flex: 1;
	display: flex;
	align-items: flex-end;
	position: relative;
	justify-content: space-between;
	box-sizing: content-box;
	height: 88rpx;
	/* #ifdef MP */
	padding-right: 190rpx;
	/* #endif */
	&.fixed {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
	}
	&.absolute {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
		background-color: transparent !important;
	}
	&.line {
		//需要显示线条的在这打开
		// border-bottom: 2rpx solid #f5f5f5;
		box-shadow: 0 0 6rpx 0 #ddd;
	}
	&.transparentFixed,
	&.transparent {
		border-bottom: 0;
		background-color: initial;
		background-image: initial;
		.left_info {
			// border: 2rpx solid rgba(0, 0, 0, 0.1);
			// background-color: rgba(255, 255, 255, 0.7);
			// border-radius: 33rpx;
			// box-sizing: border-box;
		}
		&.darkBg .left_info {
			// border: 2rpx solid rgba(255, 255, 255, 0.3);
			// background-color: rgba(0, 0, 0, 0.2);
		}
	}
	//深色背景
	&.darkBg {
		.iconfont {
			color: #ffffff;
		}
		.left_info {
			&.btnMongol {
				border: 2rpx solid rgba(255, 255, 255, 0.3);
				background-color: rgba(0, 0, 0, 0.2);
			}
			.back {
			}
			text {
				background-color: rgba(255, 255, 255, 0.3);
			}
			.home {
			}
		}
		.title {
			color: #ffffff;
		}
	}
	.left_box {
		display: flex;
		align-items: center;
		height: 100%;
	}
	$height: 56rpx;
	.iconfont {
		color: #000000;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 48rpx;
		font-weight: bloder;
		// width: $height;
		height: 100%;
	}
	.left_info {
		margin-right: 10rpx;
		display: flex;
		align-items: center;
		height: $height;
		transition: all 0.6s;
		margin-left: 10rpx;
		&.btnMongol {
			border-radius: 33rpx;
			border: 2rpx solid rgba(0, 0, 0, 0.1);
			background-color: rgba(255, 255, 255, 0.7);
			box-sizing: border-box;
			.back,
			.home {
				width: 70rpx;
			}
		}

		.back {
		}
		text {
			height: 30rpx;
			width: 2rpx;
			background-color: rgba(255, 255, 255, 0.4);
		}
		.home {
		}
	}
	.title {
		height: 88rpx;
		font-size: 32rpx;
		// padding-left: 30rpx;
		// padding-right: 30rpx;
		font-weight: 700;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: flex;
		align-items: center;
		flex: 1;
		/* #ifndef APP-PLUS||H5 */
		max-width: 60vw;
		/* #endif */
		color: #000000;
		&.center {
			// position: absolute;
			// bottom: 0;
			// left: 50%;
			// transform: translateX(-50%);
		}
	}
	.right_info {
		height: 100%;
		display: flex;
		align-items: center;
		margin-right: 10rpx;
		margin-left: 10rpx;
	}
}
</style>
