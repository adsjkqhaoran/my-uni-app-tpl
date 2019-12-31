import Vue from 'vue'
import App from './App'
import store from './store'
import zhouWeiNavBar from "@/components/zhouWei-navBar";
 // import AnLayer from '@/components/an-layer/an-layer.vue';
Vue.component("nav-bar", zhouWeiNavBar);
// Vue.component('AnLayer', AnLayer)
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
