<template>
	<view class='layout'>
		<slot></slot>
		<!-- <uni-popup :animation="true" ref="popup" type="center">底部弹出 Popup</uni-popup> -->
	</view>
</template>

<script>
	export default {
		onReady() {
			// setTimeout(()=>{
			// 	this.$refs.popup.open()
			// 	this.$refs.anRef.show("验证码发送失败，请重试！");
			// },3000)
		},
		components: {}
	}
</script>

<style>
</style>
