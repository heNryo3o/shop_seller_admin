import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_DUTY: (state, duty) => {
    state.duty = duty
  },
  SET_DEPARTMENT: (state, department) => {
    state.department = department
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        const {
          data
        } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
	  return new Promise((resolve, reject) => {
	    getInfo(state.token).then(response => {
	      const { data } = response

	      if (!data) {
	        reject('登录失败，请重新登录！')
	      }

	      const { username, avatar, duty, department, roles } = data

	      // roles must be a non-empty array
	      if (!roles || roles.length <= 0) {
	        reject('您的账号没有设置权限，请联系管理员进行设置！')
	      }

	      commit('SET_NAME', username)
	      commit('SET_AVATAR', avatar)
	      commit('SET_DUTY', duty)
	      commit('SET_DEPARTMENT', department)
	      commit('SET_ROLES', roles)
	      resolve(data)
	    }).catch(error => {
	      reject(error)
	    })
	  })
  },

  // user logout
  logout({ commit, state }) {
	  return new Promise((resolve, reject) => {
	    logout(state.token).then(() => {
	      commit('SET_TOKEN', '')
	      commit('SET_ROLES', [])
	      removeToken()
	      resetRouter()
	      resolve()
	    }).catch(error => {
	      reject(error)
	    })
	  })
  },

  // remove token
  resetToken({ commit }) {
	  return new Promise(resolve => {
	    commit('SET_TOKEN', '')
	    commit('SET_ROLES', [])
	    removeToken()
	    resolve()
	  })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
	  return new Promise(async resolve => {
	    const token = role + '-token'

	    commit('SET_TOKEN', token)
	    setToken(token)

	    const { roles } = await dispatch('getInfo')

	    resetRouter()

	    // generate accessible routes map based on roles
	    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

	    // dynamically add accessible routes
	    router.addRoutes(accessRoutes)

	    // reset visited views and cached views
	    dispatch('tagsView/delAllViews', null, { root: true })

	    resolve()
	  })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
