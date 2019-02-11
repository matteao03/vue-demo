<template>
    <div class="forget-password">
        <van-nav-bar
            title="找回密码"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            class="custom-nav"
        />

        <van-cell-group class="forget-password-form">
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
                 <!-- 倒计时组件 -->
                <count-down 
                    slot="button" 
                    :start="flagSendCode" 
                    @click.native="getValidateCode"
                >
                </count-down>
            </van-field>

            <van-field class="input-style"
                v-model="form.password"
                :type="type"
                placeholder="请输入新密码"
                :icon="passwordIcon"
                @click-icon="changeType"
            />
        </van-cell-group>
        
        <van-button class="forget-password-btn" type="primary" @click="forgetPassword">找回密码</van-button>

    </div>
</template>

<script>
import {NavBar, Button, Field, CellGroup} from 'vant'
import CountDown from '@/components/CountDown.vue'
import Validator from '@/utils/validator.js'
import { sendValidateCode, forgetPassword } from '@/api/auth.js'

export default {
    data() {
        return { 
            flagSendCode:false,
            type:'password',
            passwordIcon:'eye-o',
            form:{
                mobile:'',
                validateCode:'',
                password:'',
            },
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
                password: [
                    {required: true, message: '请输入新密码'}
                ] 
            }
        }
    },
    components: {
        [NavBar.name]: NavBar,
        [Button.name]: Button,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
        CountDown
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
            this.goBack()
        },
        goBack () {
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
                    sendValidateCode({
                        mobile:this.form.mobile,
                        from:2
                    })
                    .then(res=>{
                        if (res.data.code){
                            this.flagSendCode = true
                        } else {
                            this.$toast({
                                message:res.data.msg,
                                position:'top'
                            })
                        }
                    })
                }
            }, {mobile:this.form.mobile})
        },
        forgetPassword(){
            this.validator.validate((errors) => {
                if (errors.length >= 1) {
                    for (let index in errors) {
                        this.$toast({
                            message:errors[index].message,
                            position:'top'
                        })
                    }
                } else {
                    forgetPassword({
                        mobile:this.form.mobile, 
                        CodeChangePwd:this.form.validateCode,
                        newPassword:this.form.password
                    })
                    .then((response)=>{
                        if (response.data.code){
                             this.$toast({
                                message:response.data.msg,
                                position:'top'
                            })

                            if (response.data.code){
                                this.$router.push('/login')
                            }
                        } else {
                            this.$toast({
                                message:'手机号码和密码不匹配，请检查',
                                position:'top'
                            })
                        }
                        
                    })
                    .catch((error)=>{})
                }

            });
        }
    },
    created:function() {
        this.validator = Validator(this.rules, this.form);//实例化一个表单验证器
    },
}
</script>

<style lang="scss" scoped>
.forget-password{
     padding:15px;

    .forget-password-form{
        padding-bottom:25px;

        .input-style {
            border:1px solid #ccc;
            border-radius:4px;
            margin-top:15px;
        }
    }
    .forget-password-btn{
        width:100%;
        @include button-style
    }
   
}
</style>
<style lang="scss">
.custom-nav{
    @include custom-nav
}
</style>