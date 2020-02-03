import Request from '@/js_sdk/luch-request/request.js'
import baseConfig from '@/data/index.js'

const http = new Request({
})

http.setConfig((config) => { /* 设置全局配置 */
    let obj = {
		baseUrl: baseConfig.baseUrl+'1',
		custom: {auth: false}, // 可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
		header: {}
	}
  return Object.assign(config, obj)
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (statusCode) => {
  return statusCode === 200
}

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
  config.header = {
    ...config.header
  }
  /*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
  return config
})

http.interceptor.response((response) => { /* 请求之后拦截器 */
  // if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
  //   return Promise.reject(response)
  // }
  // if (response.config.custom.verification) { // 演示自定义参数的作用
  //   return response.data
  // }
  return response
}, (response) => { // 请求错误做点什么
  return response
})

// 这里统一处理catch
http.send = (data) => {
  return http.request(data).catch((e)=>{
	  console.log('request catch',e)
  })
}
export default http
