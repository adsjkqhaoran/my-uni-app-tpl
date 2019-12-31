<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style lang=scss>
	/*每个页面公共css */
	/* #ifndef APP-PLUS-NVUE */
	@import './styles/base.scss';
	/* #endif */
	@import './styles/iconfont.scss';
	@import './styles/components.scss';
	::-webkit-scrollbar {
	        display: none;  
	        width: 0 !important;  
	        height: 0 !important;  
	        -webkit-appearance: none;  
	        background: transparent;  
	    }
</style>