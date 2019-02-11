import axios from 'axios'
import qs from 'qs'
import store from '@/store'

 //axios.defaults.baseURL = '/api'
axios.defaults.baseURL = 'http://'

axios.interceptors.request.use((config) => {
  let token = store.state.auth.token;
  config.headers.common['X-Auth-Token'] = token

  if(config.method  === 'post'){
      config.data = qs.stringify(config.data);
  }
  return config;
})

export default axios