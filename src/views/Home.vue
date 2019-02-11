<template>
    <div class="home">
        文章
    </div>
</template>

<script>
import { Row, Col, Swipe, SwipeItem, Tabbar, TabbarItem, Tab, Tabs } from 'vant'

export default {
    components:{
        [Row.name]: Row,
        [Col.name]: Col,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
    },
    data() {
        return {
           
        }
    },
    computed:{
       
    },
    methods:{
           
    },
    mounted:function(){
        
    }
}
</script>

<style lang="scss" scoped>
.home{
   height:100%;
   overflow: hidden;
    .menu{
        height:100%;

        .van-tabbar{
            flex-direction:column;
            height:100%;
            width:100%;

            .van-tabbar-item{
                border-bottom:1px solid #ccc;
                border-right:1px solid #ccc;
            }
            .van-tabbar-item--active{
                background-color:$anchor-text;
                color:$white;
            }

            .menu-img{
                width:30px;
                height:30px;
            }
        }
    }

    .item-menu{
        text-align: center;
        overflow:scroll;

        .title{
            color:$white;
            padding:5px;


            .title-zh{
                font-size:20px;
            }
            .title-en{
                font-size:14px;
            }
        }

        .item-row{
            padding:5px 5px;
            margin-left:0 !important;
            margin-right:0 !important;

            .row-img{
                width:100%;
                height:auto
            }
        }
    }
}
</style>

