<template>
    <div class="reset-password">
        <van-nav-bar
            left-arrow
            title="修改密码"
            @click-left="onClickLeft"
            right-text="保存"
            @click-right="onClickRight"
            class="custom-nav"
        />
        <van-cell-group class="login-form">
            <van-field
                v-model="form.password"
                :type="oldType"
                label="原密码"
                placeholder="请填写原密码"
                :icon="oldIcon"
                @click-icon="changeType(1)"
            />
            <van-field
                v-model="form.newPassword"
                :type="newType"
                label="新密码"
                placeholder="请填写新的密码"
                :icon="newIcon"
                @click-icon="changeType(2)"
            />
            <van-field
                v-model="form.againPassword"
                :type="againType"
                label="确认密码"
                placeholder="请再次填写新密码"
                :icon="againIcon"
                @click-icon="changeType(3)"
            />
        </van-cell-group>
    </div>
</template>

<script>
import {NavBar, Field, CellGroup} from 'vant'
import { resetPassword } from '@/api/auth.js'
import Validator from '@/utils/validator.js'

export default {
    data() {
        return { 
            oldType:'password',
            newType:'password',
            againType:'password',
            oldIcon:'eye-o',
            newIcon:'eye-o',
            againIcon:'eye-o',
            form:{
                password:'',
                newPassword:'',
                againPassword:''
            },
            rules:{
                password: [
                    {required: true, message: '请填写原密码'}
                ],
                newPassword: [
                    {required: true, message: '请填写新密码'}
                ],
                againPassword: [
                    {required: true, message: '请再次填写新密码'},
                    {validator: (rule, value, callback) => {
                        if (value !== this.form.newPassword) {
                            callback('新密码两次输入不一致');
                        } else {
                            callback();
                        } 
                    }}
                ]
            }
        }
    },
    components: {
        [NavBar.name]: NavBar,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
    },
    methods:{
        changeType(index){
            if (index === 1){
                if (this.oldType === 'password'){
                    this.oldType = 'text'
                    this.oldIcon = 'closed-eye'
                } else {
                    this.oldType = 'password'
                    this.oldIcon = 'eye-o'
                }
            } else if (index === 2){
                if (this.newType === 'password'){
                    this.newType = 'text'
                    this.newIcon = 'closed-eye'
                } else {
                    this.newType = 'password'
                    this.newIcon = 'eye-o'
                }
            } else if (index === 3){
                if (this.againType === 'password'){
                    this.againType = 'text'
                    this.againIcon = 'closed-eye'
                } else {
                    this.againType = 'password'
                    this.againIcon = 'eye-o'
                }
            }
            
        },
        onClickLeft(){
            this.$router.go(-1)
        },
        onClickRight(){
            this.validator.validate((errors) => {
                if (errors.length >= 1) {
                    for (let index in errors) {
                        this.$toast({
                            message:errors[index].message,
                            position:'top'
                        })
                    }
                } else {
                    resetPassword({
                        lastpwd:this.form.password, 
                        newpwd:this.form.newPassword,
                        newpwdKey:this.form.againPassword,
                    })
                    .then((response)=>{
                        if (response.data.code === 1){
                            this.$router.go(-1)
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
        this.validator = Validator(this.rules, this.form);//实例化一个表单验证器
    },
}
</script>

<style lang="scss" scoped>
.reset-password{
    padding:0 10px;
}
</style>
<style lang="scss">
.custom-nav{
    @include custom-nav;
} 
.van-field__icon{
    .van-icon{
        color:$anchor-text;
    }
}
</style>


