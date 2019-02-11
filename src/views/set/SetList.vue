<template>
    <div>
        <van-nav-bar
            title="设置"
            left-arrow
            @click-left="onClickLeft"
            class="custom-nav"
        />
        <van-cell-group>
            <van-cell 
                title="修改密码" 
                is-link
                to="/resetPassword"
            />
        </van-cell-group>

        <van-button type="primary" class="logout-btn" @click="logout">退出登录</van-button>
    </div>
  
</template>

<script>
import {NavBar, Cell, CellGroup, Button} from 'vant'
export default {
    components:{
        [NavBar.name]: NavBar,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Button.name]: Button,
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        logout(){
            this.$store.dispatch('logout')
        }
    }
}
</script>

<style lang="scss" scoped>
    .logout-btn{
        margin:30px 10px 10px;
        width:calc(100% - 20px);
        @include button-style;
    }
</style>

<style lang="scss">
.custom-nav{
    @include custom-nav;
}    
</style>

