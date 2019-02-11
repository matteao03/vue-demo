<template>
    <div class="register">
        <van-nav-bar
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            class="custom-nav"
        />
        <div class="logo-info">
            <img src="@/assets/images/logo.png" class="logo"/>
        </div>
        <van-cell-group class="register-form">
            <van-field class="input-style"
                v-model="form.mobile"
                type="tel"
                placeholder="请输入手机号码"
            />
            <van-field class="input-style"
                v-model="form.validateCode"
                center
                placeholder="请输入验证码"
            >
                <van-button 
                    slot="button" 
                    size="small" 
                    type="primary" 
                    @click="getValidateCode"
                    :disabled="second ? true : false "
                    class="code-btn"
                >
                    {{second ? second+'s 重发' : '获取验证码'}}
                </van-button>
            </van-field>

            <van-field class="input-style"
                v-model="form.username"
                placeholder="请输入用户名"
            />

            <van-field class="input-style"
                v-model="form.password"
                :type="type"
                placeholder="请输入密码"
                :icon="passwordIcon"
                @click-icon="changeType"
            />
        </van-cell-group>
        
        <van-button class="register-btn" type="primary" @click="register">注 册</van-button>

        <p class="agreement-info">点击“注册”按钮，即代表阅读并同意<router-link class="agreement">服务协议</router-link></p>

    </div>
</template>

<script>
import {NavBar, Button, Field, CellGroup} from 'vant'
import Validator from '@/utils/validator.js'
import { sendValidateCode, register } from '@/api/auth.js'

export default {
    data() {
        return {
            form:{
                mobile:'',
                validateCode:'',
                username:'',
                password:'',
            },
            type:'password',
            passwordIcon:'eye-o',
            second:0,
            rules:{
                mobile: [{
                    validator: (rule, value, callback) => {
                        if (!value) {
                            callback('请输入手机号码');
                        } else if (/^[1][0-9]{10}$/.test(value)) {
                            callback();
                        } else {
                            callback('手机号码格式不正确');
                        }
                    }
                }],
                validateCode: [{
                    validator: (rule, value, callback) => {
                        if (!value) {
                            callback('请输入验证码');
                        } else if (/^[\d]{6}$/.test(value)) {
                            callback();
                        } else {
                            callback('验证码格式不正确');
                        }
                    }
                }],
                username: [
                    {required: true, message: '请输入用户名'}
                ],
                password: [
                    {required: true, message: '请输入密码'}
                ]  
            }
        }
    },
    components: {
        [NavBar.name]: NavBar,
        [Button.name]: Button,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
    },
    methods:{
        changeType(){
            if (this.type === 'password'){
                this.type = 'text'
                this.passwordIcon = 'closed-eye'
            } else {
                this.type = 'password'
                this.passwordIcon = 'eye-o'
            }
        },
        onClickLeft(){
            window.history.length > 1
                ? this.$router.go(-1)
                : this.$router.push('/')
        },
        getValidateCode(){
            this.validator.validate((errors) => {
                if (errors.length >= 1) {
                    for (let index in errors) {
                        this.$toast({
                            message:errors[index].message,
                            position:'top'
                        })
                    }
                } else {
                    this.second = 60
                    sendValidateCode({mobile:this.form.mobile, from:1})
                    .then((res)=>{
                        if (res.data.code){
                            this.countDown()
                            this.$toast({
                                message:'短信验证码已发送',
                                position:'top'
                            })
                        } else {
                            this.$toast({
                                message:res.data.msg,
                                position:'top'
                            })
                            this.second = 0
                        }
                    })
                    .catch((error)=>{})
                }
            }, 'mobile')
        },
        countDown(){ //倒计时
            if (this.second > 0) {
                setTimeout(() => {
                    this.second -= 1;
                    this.countDown()
                }, 1000)
            }
        },
        register(){
            this.validator.validate((errors) => {
                if (errors.length >= 1) {
                    for (let index in errors) {
                        this.$toast({
                            message:errors[index].message,
                            position:'top'
                        })
                    }
                } else {
                    register({
                        mobile:this.form.mobile, 
                        newPassword:this.form.password, 
                        CodeChangePwd:this.form.validateCode,
                        name:this.form.username
                    })
                    .then((response)=>{
                        if (response.data.code){
                            this.$store.commit("SET_TOKEN", response.data.token)
                            this.$store.commit("SET_AUTHINFO", response.data.data)
                            this.$router.push('/home') // 跳转
                        } else {
                            this.$toast({
                                message:response.data.msg,
                                position:'top'
                            })
                        }   
                    })
                    .catch((error)=>{})
                }
            })
        }
    },
    created:function() {
        this.validator = Validator(this.rules, this.form); //实例化一个表单验证器
    },
}
</script>

<style lang="scss" scoped>
.register{
    padding:15px;

    .logo-info{
        text-align: center;
        padding:10px;

        .logo{
            width:80px;
            height:80px;
        }
    }

    .register-form{
        padding-bottom:25px;

        .code-btn{
            background-color:$button-color;
            color:$white;
            border-color:$button-color;
        }

        .input-style {
            border:1px solid #ccc;
            border-radius:4px;
            margin-top:15px;
        }
    }
    
    .register-btn{
        width:100%;
        @include button-style
    }

    .agreement-info{
        font-size:14px;
        text-align: center;

        .agreement{
            color:$anchor-text;
        }
    }
}
</style>
<style lang="scss">
.custom-nav{
    @include custom-nav
}
.van-field__icon{
    .van-icon{
        color:$anchor-text;
    }
}
</style>