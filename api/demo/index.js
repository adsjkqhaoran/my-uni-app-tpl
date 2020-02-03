import http from '@/utils/http.js'
export const  getTmp = (data) => http.send({
	method: 'POST',
	url: '/Page/Index'
})