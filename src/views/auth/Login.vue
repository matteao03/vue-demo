<template>
    <div class="login">
        <van-nav-bar
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            class="custom-nav"
        />
        <div class="logo-info">
            <img src="@/assets/images/logo.png" class="logo"/>
        </div>
        <van-cell-group class="login-form">
            <van-field class="input-style"
                v-model="form.mobile"
                type="tel"
                placeholder="请输入手机号码"
            />

            <van-field class="input-style"
                v-model="form.password"
                :type="type"
                placeholder="请输入密码"
                :icon="passwordIcon"
                @click-icon="changeType"
            />
        </van-cell-group>
        
        <van-button class="login-btn"  @click="login">登 录</van-button>

        <div class="other-link">
            <router-link to="/forgetPassword" class="password-link">忘记密码?</router-link>
            <router-link to="/register" class="register-link">注册账号</router-link>
        </div>
    </div>
</template>

<script>
import {NavBar, Button, Field, CellGroup} from 'vant'
import Validator from '@/utils/validator.js'
import { login } from '@/api/auth.js'

export default {
    data() {
        return { 
            form:{
                mobile:'17500000000',
                password:'123456',
            },
            type:'password',
            passwordIcon:'eye-o',
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
            this.$router.push('/home')
        },
        login() {
            this.validator.validate((errors) => {
                if (errors.length >= 1) {
                    for (let index in errors) {
                        this.$toast({
                            message:errors[index].message,
                            position:'top'
                        })
                    }
                } else {
                    this.$store.commit("SET_TOKEN", 'strayjoke')
                    this.$router.push('/home')
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
.login{
    padding:15px;
    text-align: center;

    .logo-info{
        padding:10px;
        .logo{
            width:100px;
            height:100px;
        }
    }

    .login-form{
        margin:25px auto;

        .input-style {
            border:1px solid #ccc;
            border-radius:4px;
            margin-top:15px;
        }
    }

    .login-btn{
        width:100%;
        @include button-style
    }

    .other-link{
        float:right;
        padding:15px;
        font-size:16px;

        .register-link{
            margin-left:15px;
            color:$anchor-text;
        }
        .password-link{
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


