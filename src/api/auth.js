import axios from '@/utils/request.js';

export const login = params => { return axios.post(`/login`,  params ) }
export const sendValidateCode = params => { return axios.post(`/send_validation_code`,  params ) }
export const register = params => { return axios.post(`/register`,  params ) }
//修改密码接口
export const resetPassword = params => { return axios.post(`/change_password`,  params ) }
//忘记密码接口
export const forgetPassword = params => { return axios.post(`/forget_password`,  params ) }
