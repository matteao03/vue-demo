<template>
    <van-button 
        size="small" 
        type="primary" 
        :disabled="countDown ? true : false "
        class="custom-btn"
    >
        {{countDown ? countDown+'s 重发' : text}}
    </van-button>
</template>

<script>
import { Button } from 'vant'

export default {
    props:{
        text:{
            type:String,
            default:'获取验证码'
        },
        msg:{
            type:String,
            default:'短信验证码已发送'
        },
        second:{
            type:Number,
            default:60
        },
        start:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
           countDown:0,
        }
    },
    watch:{
        start:function(val){
            if (val){
                this.countDown = this.second
                this.countDownMethod()
                this.$toast({
                    message:this.msg,
                    position:'top'
                })
            } else {
                this.countDown = this.second
            }
        }
    },
    components: {
        [Button.name]: Button,
    },
    methods:{
        countDownMethod(){ //倒计时
            if (this.countDown > 0) {
                setTimeout(() => {
                    this.countDown -= 1;
                    this.countDownMethod()
                }, 1000)
            }
        },
    }
}
</script>

<style lang="scss">
.custom-btn{
    background-color:$button-color;
    color:$white;
    border-color:$button-color;
}
</style>

