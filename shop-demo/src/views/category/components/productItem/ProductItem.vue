<!--
 * @Descripttion: 产品
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/11/17 16:29
-->
<template>
    <div class="productWrapper">
        <div v-for="(product) in products" class="infoWrapper" :key="product.public_id">
            <div class="imageWrapper">
                <div class="LazyLoad is-visible">
                    <img class="image" :src="product.small_image" alt=""></div>
            </div>
            <div class="nameWrapper">
                <div class="name">
                    <span class="nameTag nameText">{{product.product_name}}</span>
                </div>
                <div class="spec">
                    {{product.spec}}
                </div>
                <!--<div class="tagsWrapper">
                    <div class="H1B9Rvu"></div>
                </div>-->
            </div>
            <div class="priceWrapper">
                <div class="price">
                    {{product.price | moneyFormat}}
                </div>
                <div class="cart-icon-wrap">
                        <span class="cart-icon">
                             <van-icon name="cart-o"
                                       size="25"
                                       color="#ffffff"
                                       @click="addToCart(product)">
                            </van-icon>
                        </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {addGoodsToCart} from './../../../../service/api/index'
    export default {
        name: "ProductItem",
        props:{
            products: Array
        },
        data() {
            return {}
        },
        computed: {
            ...mapState(['userInfo'])
        },
        mounted() {
        },
        methods: {
            ...mapMutations(['ADD_GOODS']),
            /**
             * @description: 添加商品到购物车
             * @author: 上官靖宇
             * @date: 2020/11/05
             * @param: {
             *   product: 商品
             * }
             */
            async addToCart(product) {
                if (this.userInfo.token) {
                    let prams = {
                        user_id: this.userInfo.token,
                        goods_id: product.id,
                        goods_name: product.name,
                        goods_price: product.price,
                        small_image: product.small_image
                    }
                    // 调取接口
                    let res = await addGoodsToCart(prams);
                    if (res.success_code === 200) {
                        this.ADD_GOODS({
                            goodsId: product.id,
                            goodsName: product.name,
                            smallImage: product.small_image,
                            goodsPrice: product.price
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
                } else {
                    this.$router.push('/login')
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import "@/style/vriable.scss";
    .productWrapper {
        position: relative;
        padding: 0.8125rem 0;
        background: #FFF;
        .infoWrapper {
            position: relative;
            padding: 0.2rem 0.625rem 0.4rem 4.6625rem;
            border-bottom: 1px solid #e0e0e0;
            .imageWrapper {
                position: absolute;
                left: 0;
                top: 0.2375rem;
                width: 4.0625rem;
                height: 4.0625rem;
                overflow: hidden;
                border-radius: 4px;
                .image {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
            .nameWrapper {
                min-height: 2.1875rem;
                .name {
                    line-height: 1.25rem;
                    word-break: break-all;
                    font-size: 0.9375rem;
                    color: #333333;
                    @include ellipsis;
                    .nameTag {
                        margin-right: 0.125rem;
                        vertical-align: middle;
                    }
                    .nameText {
                        vertical-align: middle;
                    }
                }
                .spec {
                    min-height: 1.25rem;
                    line-height: 1.25rem;
                    font-size: 0.75rem;
                    color: #999999;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .tagsWrapper {
                    margin-top: 0.1875rem;
                    max-height: 1.0625rem;
                    line-height: 0.8125rem;
                    overflow: hidden;
                    .H1B9Rvu {
                        height: 1rem;
                    }
                }
            }
            .priceWrapper {
                position: relative;
                .price {
                    display: inline-block;
                    height: 1.875rem;
                    line-height: 1.875rem;
                    font-weight: bold;
                    font-size: 0.75rem;
                    color: #FE6263;
                }
                .cart-icon-wrap {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 1.875rem;
                }
            }
        }
    }
    .productWrapper + .productWrapper {
        border-top: solid 1px #EEEEEE;
    }
</style>
