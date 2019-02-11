<template>
    <div>
        <van-nav-bar
            title="个人信息"
            left-arrow
            @click-left="onClickLeft"
            class="custom-nav"
        />
        <van-cell-group>
            <van-cell 
                title="头像"  
                is-link 
                center
            >
                <van-icon 
                    slot="" 
                    :name="info.avater" 
                    class="custom-icon" 
                />
            </van-cell>
            <van-cell 
                title="姓名"  
                value="matteao" 
            />
            <van-cell 
                title="手机号" 
                value="175****2593"
            />
            <van-cell 
                title="性别"  
                value="" 
            />
            <van-cell 
                title="详细地址"  
                value="" 
            />
            <van-cell 
                title="微信公众号"   
            />
        </van-cell-group>
    </div>
  
</template>

<script>
import {NavBar, Cell, CellGroup, Icon} from 'vant'

export default {
    data(){
        return {
            info:{
                avater:require('@/assets/images/avater-blue.png')
            }
        }
    },
    computed:{
        authAvater:function(){
            return this.info.avater ?  this.info.avater : require('@/assets/images/avater-blue.png')
        }
    },
    components:{
        [NavBar.name]: NavBar,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Icon.name]: Icon,
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
.custom-icon{
    width:50px;
    height:50px;
}
</style>

<style lang="scss">


.custom-nav{
    @include custom-nav;
}
</style>