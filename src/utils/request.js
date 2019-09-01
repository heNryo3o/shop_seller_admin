import axios from 'axios'
import {
	MessageBox,
	Message
} from 'element-ui'
import store from '@/store'
import {
	getToken
} from '@/utils/auth'

// create an axios instance
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
	// withCredentials: true, // send cookies when cross-domain requests
	timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
	config => {
		// do something before request is sent

		if (store.getters.token) {
			// let each request carry token
			// ['X-Token'] is a custom headers key
			// please modify it according to the actual situation
			config.headers['Authorization'] = getToken()
		}
		return config
	},
	error => {
		// do something with request error
		console.log(error) // for debug
		return Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	/**
	 * If you want to get http information such as headers or status
	 * Please return  response => response
	 */

	/**
	 * Determine the request status by custom code
	 * Here is just an example
	 * You can also judge the status by HTTP Status Code
	 */
	response => {
		const res = response.data

		if (res.code === 403) {
			// to re-login
			MessageBox.confirm('您的登录状态已失效，请重新登录！', '登录状态失效', {
				confirmButtonText: '重新登录',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				store.dispatch('user/resetToken').then(() => {
					location.reload()
				})
			})
		} else if (res.code === 402) {
			Message({
				message: '抱歉，您的权限不能进行此操作，请联系管理员',
				type: 'warning',
				duration: 5 * 1000
			})
			return Promise.reject(res.msg || 'error')
		} else if (res.code !== 200) {
			Message({
				message: res.msg || 'Error',
				type: 'error',
				duration: 5 * 1000
			})
			return Promise.reject(res.msg || 'error')
		} else {
			return res
		}

	},
	error => {
		console.log('err' + error) // for debug
		Message({
			message: error.msg,
			type: 'error',
			duration: 5 * 1000
		})
		return Promise.reject(error)
	}
)

export default service
