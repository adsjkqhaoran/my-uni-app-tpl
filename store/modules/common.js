const common = {
	namespaced: false,
	state: {
		version: 'v1.0.0',
		// #ifdef MP
		platForm: 'mp', // 小程序
		// #endif
		// #ifdef H5
		platForm: 'h5', 
		// #endif
		// #ifdef APP-PLUS
		platForm: uni.getSystemInfoSync().platform, 
		// #endif
		
	},
	mutations: {
	}
}
export  default common