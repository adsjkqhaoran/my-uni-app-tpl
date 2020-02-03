<template>
	<view>
		<nav-bar title="ajax"></nav-bar>
		ajax
	</view>
</template>

<script>
	import * as demoApi from '@/api/demo/index.js'
	export default {
		methods: {
		},
		onReady() {
			demoApi.getTmp().then((res)=>{
				console.log(res)
			})
		},
		components: {
		}
	}
</script>

<style lang=scss>
</style>
