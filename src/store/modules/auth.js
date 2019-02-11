import ls from '@/utils/localStorage'
import router from '@/router'

const state = {
  token: ls.getItem('token'),
  authInfo:ls.getItem('authInfo')
}

const mutations = {
  SET_TOKEN (state, value) {
    state.token = value 
    ls.setItem('token', value)
  },
  SET_AUTHINFO (state, value) {
    state.authInfo = value 
    ls.setItem('authInfo', value)
  },
}

const actions = {
	logout ({commit}){
		commit('SET_TOKEN', '')
    commit('SET_AUTHINFO', '')
    ls.clear()
		router.push('/login')
  }
}

export default {
    state,
    actions,
    mutations
}