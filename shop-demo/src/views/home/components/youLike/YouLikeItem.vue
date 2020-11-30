<!--
 * @Descripttion: 猜你喜欢商品组件
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/11/6 10:17
-->
<template>
    <div class="wrapper">
        <div class="content">
            <div class="imageWrapper">
                <van-image :src="product.small_image"
                           fit="cover"
                           lazy-load>
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20"/>
                    </template>
                    <template v-slot:error>加载失败</template>
                </van-image>
            </div>
            <div class="infoWrapper">
                <div class="name">
                    <span class="nameText">{{product.name}}</span>
                </div>
                <div class="priceWrapper">
                    <div class="priceInfo">
                        <div class="pricePart">
                            <div class="price">
                                {{product.price | moneyFormat}}
                            </div>
                            <div class="originPrice"> {{product.origin_price | moneyFormat}}</div>
                        </div>
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
    </div>
</template>

<script>
    // 引入通信组件
    import Pubsub from 'pubsub-js'

    export default {
        name: "YouLikeItem",
        props: {
            product: Object
        },
        data() {
            return {}
        },
        components: {},
        created() {
        },
        mounted() {
        },
        methods: {
            /**
             * @description: 添加商品到购物车
             * @author: 上官靖宇
             * @date: 2020/11/05
             * @param: {
             *   product: 商品
             * }
             */
            addToCart(product) {
                Pubsub.publish('homeAddToCart', product);
            }
        },
    }
</script>

<style lang='scss' scoped>
    .wrapper {
        position: relative;
        display: inline-block;
        width: 50%;
        padding: 0.3125rem;
        vertical-align: top;
    }

    .content {
        background: #FFF;
        border-radius: 0.3125rem;
        overflow: hidden;
    }

    .imageWrapper {
        position: relative;
        text-align: center;
        overflow: hidden;
        border-radius: 0.3125rem;
    }

    .imageWrapper > div:first-child {
        padding: 0.625rem;
    }

    .image {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 0.1875rem;
    }

    .infoWrapper {
        padding: 0 0.625rem 0.625rem 0.625rem;
    }

    .name {
        height: 2.5rem;
        line-height: 1.25rem;
        font-size: 0.875rem;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .name .nameText {
        vertical-align: middle;
    }

    .tagsWrapper {
        margin: 0.125rem 0;
        height: 1.0625rem;
        line-height: 0.8125rem;
        overflow: hidden;
    }

    .tag + .tag {
        margin-left: 0.3125rem;
    }

    @media screen and (min-width: 0px) and (max-width: 320px) {
        .tag + .tag {
            margin-left: 0.125rem;
        }
    }

    .H1B9Rvu {
        height: 1rem;
    }

    .priceWrapper {
        display: table;
        height: 2.5rem;
        width: 100%;
    }

    .priceWrapper .priceInfo {
        height: 2.5rem;
        display: table-cell;
        vertical-align: middle;
    }

    .priceWrapper .priceInfo .pricePart {
        height: 1.25rem;
        position: relative;
    }

    .priceWrapper .priceInfo .pricePart .price {
        display: inline-block;
        height: 1.25rem;
        line-height: 1.25rem;
        font-weight: bold;
        font-size: 0.75rem;
        color: #FE6263;
    }

    .priceWrapper .priceInfo .pricePart .originPrice {
        display: inline-block;
        vertical-align: bottom;
        margin-left: 0.3125rem;
        height: 1.25rem;
        line-height: 1.25rem;
        text-decoration: line-through;
        font-size: 0.6875rem;
        color: #B2B2B2;
        position: absolute;
        top: 0.15625rem;
    }


</style>
