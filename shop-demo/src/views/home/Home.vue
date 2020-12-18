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
            <!--猜你喜欢-->
            <YouLike :youLikeList="youLikeList"></YouLike>
            <!--返回顶部-->
            <ScrollTop v-show="showBackStatus" :scorllTop="scorllToTop"></ScrollTop>
        </div>
        <van-loading size="24px" v-else class="loading-page">努力加载中...</van-loading>
    </div>
</template>

<script>
    // 引入组件
    import {Header, Sowing, Nav, FlashSale, YouLike} from './components/index'
    // 引入全局组件
    import {ScrollTop} from '@/components/index'
    // 引入接口
    import {getHomeInfo,addGoodsToCart} from './../../service/api/index'
    // 引入处理返回顶部的函数
    import {showBack, animate} from "@/config/global";
    // 引入通信插件
    import PubSub from 'pubsub-js'
    // 引入vuex
    import {mapState, mapMutations} from 'vuex'
    // 引入toast轻提示
    // import { toast } from'@/config/toast.js'

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
                flashSaleList: [],
                // 猜你喜欢
                youLikeList: [],
                // 是否显示返回顶部
                showBackStatus: false
            }
        },
        components: {
            Header,
            Sowing,
            Nav,
            FlashSale,
            YouLike,
            ScrollTop
        },
        computed: {
            ...mapState(['userInfo'])
        },
        created() {
            this.getHomeInfo();
        },
        mounted() {
            // 调用通信方法
            this.initPubsub();
        },
        methods: {
            ...mapMutations(['ADD_GOODS']),
            /**
             * @description: 获取首页相关数据
             * @author: 上官靖宇
             * @date: 2020/11/05
             */
            async getHomeInfo() {
                let that = this;
                let res = await getHomeInfo();
                // console.log(res);
                if (res.msg === 'ok') {
                    that.sowingList = [...res.data.list[0]['icon_list']]; // 获取轮播数据
                    that.navList = [...res.data.list[2]['icon_list']]; // 获取分类导航数据
                    that.flashSaleList = [...res.data.list[3].product_list]; // 获取秒杀数据
                    that.youLikeList = [...res.data.list[12].product_list]; // 获取猜你喜欢数据
                    that.loadingPage = false;
                    // 开始监听滚动, 到达一定位置就显示返回顶部按钮
                    showBack((status) => {
                        // console.log(status);
                        this.showBackStatus = status;
                    });
                } else {
                    console.log(res.msg)
                }
            },
            /**
             * @description: 返回顶部
             * @author: 上官靖宇
             * @date: 2020/11/12
             */
            scorllToTop() {
                // 做缓动动画返回顶部
                let docB = document.documentElement || document.body;
                animate(docB, {scrollTop: '0'}, 400, 'ease-out');
            },
            /**
             * @description: 订阅消息
             * @author: 上官靖宇
             * @date: 2020/11/27
             */
            initPubsub() {
                // 添加到购物车
                PubSub.subscribe('homeAddToCart', (meg, goods) => {
                    if (meg === 'homeAddToCart') {
                        // 判断当前是否有登录人
                        if (this.userInfo.token) {
                            this.dealGoodsAdd(goods);
                        } else {
                            this.$router.push('/login');
                        }
                    }
                })
            },
            /**
             * @description: 添加商品到购物车
             * @author: 上官靖宇
             * @date: 2020/12/18
             */
            async dealGoodsAdd(goods) {
                let prams = {
                    user_id: this.userInfo.token,
                    goods_id: goods.id,
                    goods_name: goods.name,
                    goods_price: goods.price,
                    small_image: goods.small_image
                }
                // 调取接口
                let res = await addGoodsToCart(prams);
                if (res.success_code === 200) {
                    this.ADD_GOODS({
                        goodsId: goods.id,
                        goodsName: goods.name,
                        smallImage: goods.small_image,
                        goodsPrice: goods.price
                    });
                    this.$toast({
                        message: '添加成功',
                        duration: 800
                    })
                    // toast('添加成功'); // 使用这个方法请放开引入toast方法
                } else {
                    this.$toast({
                        message: '添加失败',
                        duration: 800
                    })
                }
            }
        },
        beforeDestroy() {
            PubSub.unsubscribe('homeAddToCart')
        }
    }
</script>

<style lang='scss'>
    #home {
        background-color: #f5f5f5;
        padding-bottom: 50px;
    }
</style>
