<!--
 * @Descripttion: 购物车
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/10/30 11:48
-->
<template>
    <div id="cart" class="cart">
        <!--头部区域-->
        <header class="titleWrapper">
            <h4><strong>购物车</strong></h4>
            <van-button @click="clearCart"
                        class="clearCart"
                        type="warning"
                        size="small"
                        plain hairline round>清空购物车</van-button>
        </header>
        <!--商品-->
        <div class="contentWrapper" v-if="showCart">
            <!--中间内容-->
            <main class="contentWrapperList">
                <section>
                    <div class="shopCartListConWrap" v-for="(goods, index) in shopCart" :key="goods.id">
                        <van-swipe-cell>
                            <div class="shopCartListCon">
                                <div class="left">
                                    <van-checkbox v-model="goods.checked"
                                                  @click="checkSingleGood(goods.id)"
                                                  checked-color="#07c160"
                                                  icon-size="18px"/>
                                </div>
                                <div class="center">
                                    <img :src="goods.small_image">
                                </div>
                                <div class="right">
                                    <span href="#" class="title">{{goods.name}}</span>
                                    <div class="bottomContent">
                                        <p class="shopPrice">{{goods.price | moneyFormat}}</p>
                                        <div class="shopDeal">
                                            <van-stepper input-width="40px"
                                                         button-size="24px"
                                                         disable-input
                                                         @minus="reduceGoodsNum(goods.id, goods.num)"
                                                         @plus="addGoodsNum(goods.id, goods.name, goods.small_image, goods.price)"
                                                         v-model="goods.num"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <template #right>
                                <van-button square type="danger" text="删除" class="delete-button" @click="delectGood(goods.id)"/>
                            </template>
                        </van-swipe-cell>
                    </div>
                </section>
            </main>
            <!--底部通栏-->
            <div class="tabBar">
                <div class="tabBarLeft">
                    <van-checkbox v-model="tagAll"
                                  @click="checkAllGood(tagAll)"
                                  checked-color="#07c160"
                                  icon-size="18px">全选</van-checkbox>
                    <div class="selectAll">
                        合计：<span class="totalPrice">{{totalPrice | moneyFormat}}</span>
                    </div>
                </div>
                <div class="tabBarRight">
                    <van-button type="danger" @click="toPay">去结算({{goodsCount}})</van-button>
                </div>
            </div>
        </div>
        <VanEmpty v-else :imageUrl="imageUrl" :description="description" class="contentWrapper"></VanEmpty>
    </div>
</template>

<script>
    // 导入vuex
    import {mapState, mapMutations} from 'vuex'
    import {VanEmpty} from '@/components/index'
    // 6.引入toast轻提示
    import { toast } from'@/config/toast.js'
    export default {
        name: "Cart",
        components: {
            VanEmpty
        },
        data() {
            return {
                // 空图片地址
                imageUrl: 'https://img.yzcdn.cn/vant/custom-empty-image.png',
                // 空内容的显示文字
                description: '购物车什么也没有',
                tagAll: true
            }
        },
        computed: {
            ...mapState(['shopCart']),
            // 是否显示购物车内容
            showCart() {
                if (Object.values(this.shopCart).length > 0) {
                    return true;
                } else {
                    return false;
                }
            },
            // 选中多少件商品
            goodsCount() {
                // 1. 定义变量选中的个数
                let selecetdGoodsCount = 0;
                Object.values(this.shopCart).forEach((goods, index)=>{
                    if(goods.checked){
                        selecetdGoodsCount += 1;
                    }
                });
                return selecetdGoodsCount;
            },
            // 选中的商品总价
            totalPrice() {
                // 定义变量初始化总价
                let totalPrice = 0;
                Object.values(this.shopCart).forEach((goods, index)=>{
                    if (goods.checked) {
                        totalPrice += goods.price * goods.num;
                    }
                })
                return totalPrice;
            },
            // 商品全选
            isSelectAll() {
                let shopCount = Object.values(this.shopCart);
                this.tagAll = shopCount.length > 0;
                shopCount.forEach((goods, index)=>{
                    if(!goods.checked){
                        this.tagAll = false;
                    }
                });
                return this.tagAll;
            }
        },
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {
            ...mapMutations(['DELECT_SHOP_GOOD','SELECT_SINGLE_GOOD','ADD_GOODS','REDUCE_GOODS','CLEAR_CART','SELECT_ALL_GOODS']),
            /**
             * @description: 清空购物车
             * @author: 上官靖宇
             * @date: 2020-11-23
             */
            clearCart() {
                if (Object.values(this.shopCart).length > 0) {
                    this.$dialog.confirm({
                        title: '温馨提示',
                        message: '您确定要清空购物车吗？',
                    }).then(() => {
                        this.CLEAR_CART();
                    }).catch(()=>{});
                }
            },
            /**
             * @description: 删除单个商品
             * @author: 上官靖宇
             * @date: 2020-12-01
             * @param: {
             *     goodId: 商品id
             * }
             */
            delectGood(goodId) {
                if (goodId) {
                    this.$dialog.confirm({
                        title: '温馨提示',
                        message: '您确定要删除该商品吗？',
                    }).then(() => {
                        this.DELECT_SHOP_GOOD({goodId});
                    }).catch(()=>{});
                }
            },
            /**
             * @description: 单个商品点击复选框
             * @author: 上官靖宇
             * @date: 2020-12-04
             * @param: {
             *     goodId: 商品id
             * }
             */
            checkSingleGood(goodId) {
                // 1. 判断是否存在商品
                if (goodId) {
                    this.SELECT_SINGLE_GOOD({goodId});
                    this.checkTagAll();
                }
            },
            /**
             * @description: 添加商品数量
             * @author: 上官靖宇
             * @date: 2020-12-04
             * @param: {
             *     goodsId: 商品id,
             *     goodsName: 商品id,
             *     smallImage: 商品id,
             *     goodsPrice: 商品id
             * }
             */
            addGoodsNum(goodsId, goodsName, smallImage, goodsPrice) {
                this.ADD_GOODS({
                    goodsId,
                    goodsName,
                    smallImage,
                    goodsPrice
                });
            },
            /**
             * @description: 减少商品数量
             * @author: 上官靖宇
             * @date: 2020-12-04
             * @param: {
             *     goodId: 商品id,
             *     num: 商品数量
             * }
             */
            reduceGoodsNum(goodId, num) {
                if (num > 0) {
                    this.REDUCE_GOODS({
                        goodId
                    })
                } else if (num === 0) {
                    this.$dialog.confirm({
                        title: '温馨提示',
                        message: '您确定要删除该商品吗？',
                    }).then(() => {
                        this.DELECT_SHOP_GOOD({goodId});
                    }).catch(()=>{});
                }
            },
            /**
             * @description: 全选操作
             * @author: 上官靖宇
             * @date: 2020-12-04
             * @param: {
             *     isSelectAll: 全选状态
             * }
             */
            checkAllGood(isSelectAll) {
                this.SELECT_ALL_GOODS({isSelectAll})
            },
            /**
             * @description: 检查全选状态
             * @author: 上官靖宇
             * @date: 2020-12-04
             */
            checkTagAll() {
                let shopCount = Object.values(this.shopCart);
                this.tagAll = shopCount.length > 0;
                shopCount.forEach((goods, index)=>{
                    if(!goods.checked){
                        this.tagAll = false;
                    }
                });
                return this.tagAll;
            },
            /**
             * @description: 去支付跳转页面
             * @author: 上官靖宇
             * @date: 2020-12-09
             */
            toPay() {
                if (this.totalPrice > 0) {
                    this.$router.push('/order')
                } else {
                    toast('请先选择商品后再结算~');
                }
            }
        },
    }
</script>

<style lang='scss' scoped>
    @import "@/style/vriable.scss";

    .cart {
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;

        .titleWrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 999;
            width: 100%;
            height: 2.6rem;
            background: #fff;
            -webkit-background-size: 0.1rem 4.4rem;
            background-size: 0.1rem 4.4rem;

            .clearCart {
                position: absolute;
                right: 0.3rem;
                color: red;
            }
        }

        .contentWrapper {
            padding-top: 3.5rem;
            /*列表内容*/
            .contentWrapperList {
                padding-bottom: 6rem;

                section {
                    background-color: #fff;

                    .shopCartListConWrap {
                        border-bottom: .5px solid #e0e0e0;
                        margin-bottom: 0.7rem;
                        .shopCartListCon {
                            display: flex;
                            height: 6rem;
                            padding: 0.5rem 0;

                            .left {
                                flex: 1;
                                display: flex;
                                justify-content: center;
                            }

                            .center {
                                flex: 3;

                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }

                            .right {
                                flex: 6;
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;
                                margin-left: 0.5rem;
                                margin-right: 0.5rem;
                                position: relative;

                                .title {
                                    display: inline-block;
                                    font-size: 0.7rem;
                                    line-height: 1.1rem;
                                    @include ellipsis;
                                }

                                .description {
                                    height: 2.2rem;
                                    line-height: 1.1rem;
                                    overflow: hidden;
                                    margin-bottom: 0.3rem;
                                    font-size: 0.7rem;
                                    color: #666;
                                }

                                .shopDeal span {
                                    display: inline-block;
                                    width: 1rem;
                                    height: 1.2rem;
                                    line-height: 1.2rem;
                                    text-align: center;
                                    float: left;
                                }

                                .shopDeal input {
                                    float: left;
                                    width: 2rem;
                                    height: 1.2rem;
                                    text-align: center;
                                    margin: 0 0.2rem;
                                    font-size: 0.8rem;
                                }
                            }

                            .bottomContent {
                                display: flex;
                                flex-direction: row;
                                justify-content: space-between;
                                align-items: center;

                                .shopPrice {
                                    color: red;
                                    font-size: 0.8rem;
                                }
                            }
                        }
                    }

                    .shopCartListConWrap + .shopCartListConWrap {
                        margin-bottom: 0;
                    }
                }
            }

            /*底部通栏*/
            .tabBar {
                position: fixed;
                left: 0;
                bottom: 50px;
                width: 100%;
                background-color: #fff;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-top: 0.01rem solid #e0e0e0;

                .tabBarLeft {
                    display: flex;
                    align-items: center;
                    margin-left: 0.5rem;

                    .selectAll {
                        margin-left: 1rem;
                        font-size: 1rem;

                        .totalPrice {
                            color: #E9232C;
                        }
                    }
                }
            }
        }

    }
    /*删除按钮*/
    .delete-button {
        height: 100%;
    }
</style>
