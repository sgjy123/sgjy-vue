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
    import {mapState, mapMutations, mapActions} from 'vuex';
    import {getGoodsCart} from './../../service/api/index';
    import {setStore} from "./../../config/global";

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
            // 自动登录
            this.reqUserInfo();

        },
        methods: {
            ...mapActions(['reqUserInfo']),
            ...mapMutations(['INIT_SHOP_CART']),
            /**
             * @description: 初始化购物车
             * @author: 上官靖宇
             * @date: 2020-12-16
             */
            async initShopCart() {
                // 判断当前是否存在登录人
                if (this.userInfo.token) {
                    let res = await getGoodsCart(this.userInfo.token);
                    // 返回
                    if(res.success_code === 200){
                        // 存放数据
                        let cartArr = res.data, shopCart = {};
                        // 设置内容
                        cartArr.forEach((value)=>{
                            shopCart[value.goods_id] = {
                                "num": value.num,
                                "id": value.goods_id,
                                "name": value.goods_name,
                                "small_image": value.small_image,
                                "price": value.goods_price,
                                "checked": value.checked
                            }
                        });
                        setStore('shopCart', shopCart);
                        this.INIT_SHOP_CART();
                    } else {
                        this.$toast('购物车信息获取失败')
                    }
                }
            }
        },
    }
</script>

<style lang='scss'>
    #dashBoard {
        height: 100%;
    }
</style>
