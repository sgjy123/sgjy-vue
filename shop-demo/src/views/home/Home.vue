<!--
 * @Descripttion: 首页
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/10/30 11:47
-->
<template>
    <div id="home" ref="home">
        <div v-if="!loadingPage">
            <!--头部组件-->
            <Header></Header>
            <!--轮播-->
            <Sowing :sowinglist="sowingList"></Sowing>
            <!--分类导航-->
            <Nav :navlist="navList"></Nav>
            <!--限时抢购-->
            <FlashSale :flashSaleList="flashSaleList"></FlashSale>
        </div>
        <van-loading size="24px" v-else class="loading-page">努力加载中...</van-loading>
    </div>
</template>

<script>
    // 引入组件
    import {Header, Sowing, Nav, FlashSale} from './components/index'
    // 引入接口
    import {getHomeInfo} from './../../service/api/index'

    export default {
        name: "Home",
        data() {
            return {
                // 页面loading
                loadingPage: true,
                // 轮播内容
                sowingList: [],
                // 分类导航
                navList: [],
                // 秒杀数据
                flashSaleList: []
            }
        },
        components: {
            Header,
            Sowing,
            Nav,
            FlashSale
        },
        created() {
            this.getHomeInfo();
        },
        mounted() {
        },
        methods: {
            /**
             * @description: 获取首页相关数据
             * @author: 上官靖宇
             * @date: 2020/11/05
             */
            getHomeInfo() {
                let that = this;
                getHomeInfo().then((res) => {
                    console.log(res);
                    if (res.msg==='ok') {
                        that.sowingList = [...res.data.list[0]['icon_list']]; // 获取轮播数据
                        that.navList = [...res.data.list[2]['icon_list']]; // 获取分类导航数据
                        that.flashSaleList = [...res.data.list[3].product_list]; // 获取秒杀数据
                        that.loadingPage = false
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        },
    }
</script>

<style lang='scss'>
    #home {
        background-color: #f5f5f5;
        padding-bottom: 50px;
        .loading-page {
            text-align: center;
            top: 50%;
        }
    }
</style>
