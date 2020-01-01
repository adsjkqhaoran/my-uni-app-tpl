import Vue from 'vue'
import App from './App'
import store from './store'
import zhouWeiNavBar from "@/components/zhouWei-navBar";
import Layout from '@/components/layout/layout.vue'
Vue.component("nav-bar", zhouWeiNavBar);
Vue.component('Layout', Layout)
Vue.prototype.$store = store
Vue.config.productionTip = false

// 全局混入
Vue.mixin({
	methods: {
		navigateTo(path) {
			uni.navigateTo({
				url: path,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		redirectTo(path) {
			uni.redirectTo({
				url: path,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		switchTo(path) {
			uni.switchTab({
			    url: path
			});
		}
	}
})

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
