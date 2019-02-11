<template>
    <div class="mine">
        <van-nav-bar
            title="我的"
        />
        <van-cell-group>
            <van-cell 
                class="info"
                title="matteao" 
                :icon="info.avater"
                center
                size="large" 
                is-link
                label="账号：175****2593"
                to="/myprofile"
            />
            <van-cell
                title="我的文章" 
                icon="edit"
                size="large"  
                is-link 
            />
            <van-cell
                title="我的帖子" 
                icon="comment-o"
                size="large"  
                is-link 
            />
            <van-cell 
                title="设置" 
                icon="setting-o"
                size="large"  
                is-link 
                to="/setList"
            />
            <van-cell 
                title="关于" 
                icon="info-o"
                size="large"  
                is-link 
            />
            <van-cell 
                title="帮助" 
                icon="question-o"
                size="large"  
                is-link 
            />
        </van-cell-group>
    </div>
  
</template>

<script>
import {NavBar, Cell, CellGroup} from 'vant'

export default {
    data(){
        return {
            info:{
                avater: require('@/assets/images/my/avater.png')
            }
        }
    },
    computed:{
        authAvater:function(){
            return this.info.avater ?  this.info.avater : require('@/assets/images/my/avater.png')
        }
    },
    components:{
        [NavBar.name]: NavBar,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
    },
}
</script>

<style lang="scss" scoped>
.mine {
    .info{
        background-color:$button-color; 
        color: $white;
    }
}
</style>

<style lang="scss">
    .mine {
        .info{
            .van-cell__label{
                color: $white;
            }
            .van-icon{
                color:$white;
            }
            .van-cell__left-icon{
                height:50px;
                font-size:50px;
                line-height:50px;
            }
        }

        .van-cell__left-icon{
            height:24px;
            font-size:24px;
            line-height:24px;
        }
    }
</style>

