<template>
    <van-tabbar 
        v-model="active" 
        fixed 
        @change="changeIndex" 
        active-color="#1fbdc8"
    >
        <van-tabbar-item icon="orders-o" to="/home">文章</van-tabbar-item>
        <van-tabbar-item icon="comment-o">论坛</van-tabbar-item>
        <van-tabbar-item icon="service-o">维权</van-tabbar-item>
        <van-tabbar-item icon="bullhorn-o" to="/job">招聘</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
import ls from '@/utils/localStorage.js'

export default {
    data() {
        return {
            active: ls.getItem('tabIndex') || 0
        }
    },
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
    },
    methods:{
        changeIndex(active){
            if (active === 1 || active === 2){ //临时解决方案
                this.$dialog.alert({ 
                    message:'功能开发中，敬请期待',
                    confirmButtonText:'知道了'
                })
                this.active = ls.getItem('tabIndex')
            } else {
                this.active = active
                ls.setItem('tabIndex', active)
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>


