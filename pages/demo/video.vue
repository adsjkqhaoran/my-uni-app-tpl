<template>
	<Layout ref="layout">
		<nav-bar :bgColor="common.theme" title="视频"></nav-bar>
		<view class="uni-padding-wrap uni-common-mt">
			<view>
				<video
					id="myVideo"
					class="myVideo"
					src="https://ipfs.slyzn.com/ipfs/Qmcn99QXbrqwZSZtq1tyBVTPxpcnJYYxsGgysJMafVmoDp"
					@error="videoErrorCallback"
					:danmu-list="danmuList"
					enable-danmu
					danmu-btn
					controls
				></video>
			</view>
			<!-- #ifndef MP-ALIPAY -->
			<view class="uni-list uni-common-mt">
				<view class="uni-list-cell">
					<view><view class="uni-label">弹幕内容</view></view>
					<view class="uni-list-cell-db"><input v-model="danmuValue" class="uni-input" type="text" placeholder="在此处输入弹幕内容" /></view>
				</view>
			</view>
			<view class="uni-btn-v"><button @click="sendDanmu" class="page-body-button">发送弹幕</button></view>
			<!-- #endif -->
		</view>
	</Layout>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
	data() {
		return {
			src: '',
			danmuList: [
				{
					text: '第 1s 出现的弹幕',
					color: '#ff0000',
					time: 1
				},
				{
					text: '第 3s 出现的弹幕',
					color: '#ff00ff',
					time: 3
				}
			],
			danmuValue: ''
		};
	},
	computed: {
		...mapState(['common', 'user'])
	},
	onReady() {
		this.videoContext = uni.createVideoContext('myVideo')
	},
	methods: {
		sendDanmu: function() {
			this.$refs.layout.topTips('你好')
			// this.videoContext.sendDanmu({
			// 	text: this.danmuValue,
			// 	color: this.getRandomColor()
			// });
			// this.danmuValue = '';
		},
		videoErrorCallback: function(e) {
			uni.showModal({
				content: e.target.errMsg,
				showCancel: false
			});
		},
		getRandomColor: function() {
			const rgb = [];
			for (let i = 0; i < 3; ++i) {
				let color = Math.floor(Math.random() * 256).toString(16);
				color = color.length == 1 ? '0' + color : color;
				rgb.push(color);
			}
			return '#' + rgb.join('');
		}
	}
};
</script>

<style lang="scss">
	.myVideo{
		width: 100%;
	}
</style>
