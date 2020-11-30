<!--
 * @Descripttion: 面板
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/10/30 11:45
-->
<template>
    <div id="dashBoard">
        <!--tabbar-->
        <van-tabbar v-model="active" active-color="#07c160" inactive-color="#999">
            <van-tabbar-item name="home"
                             replace
                             to="/dashboard/home"
                             icon="wap-home">首页</van-tabbar-item>
            <van-tabbar-item name="category"
                             replace
                             to="/dashboard/category"
                             icon="shop">分类</van-tabbar-item>
            <van-tabbar-item name="cart"
                             replace
                             to="/dashboard/cart"
                             icon="shopping-cart" :badge="goodsNum > 0 ? goodsNum : ''">购物车</van-tabbar-item>
            <van-tabbar-item name="mine"
                             replace
                             to="/dashboard/mine"
                             icon="friends">我的</van-tabbar-item>
        </van-tabbar>
        <!--路由页面-->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: "DashBoard",
        data() {
            return {
                active: sessionStorage.getItem('tabBarIndex') || 'home'
            }
        },
        watch: {
            active(value) {
                // 设置值
                let tabBarIndex = value ? value : 'home';
                // 本地存储
                sessionStorage.setItem('tabBarIndex', tabBarIndex);
            }
        },
        computed: {
            ...mapState(['shopCart']),
            goodsNum() {
                if (this.shopCart) {
                    // 1. 定义商品数量
                    let num = 0;
                    Object.values(this.shopCart).forEach((goods, index) => {
                        num += goods.num;
                    });
                    return num
                } else {
                    return 0;
                }
            }
        },
        components: {},
        created() {
        },
        mounted() {
        },
        methods: {},
    }
</script>

<style lang='scss'>
    #dashBoard {
        height: 100%;
    }
</style>
