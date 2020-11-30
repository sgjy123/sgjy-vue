<!--
 * @Descripttion: 限时抢购-抢购商品
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/11/5 15:21
-->
<template>
    <div class="flashSale-item-wrap" data-index="3">
        <div class="itemWrapper">
            <div class="imageWrapper">
                <img class="image" :src="product.small_image" :alt="product.spec">
            </div>
            <div>
                <div class="name">{{product.name}}</div>
                <div class="originPrice">{{product.origin_price | moneyFormat}}</div>
                <div class="priceWrapper">
                    <div class="price">{{product.price | moneyFormat}}</div>
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
    // 引用通信组件
    import PubSub from 'pubsub-js'
    export default {
        name: "FlashSaleItem",
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
                PubSub.publish('homeAddToCart', product);
            }
        },
    }
</script>

<style lang='scss' scoped>
    .flashSale-item-wrap {
        display: inline-block;
        padding: 0 0.32rem;
        margin: 0 0.25rem;
        white-space: normal;
        width: 28%;
        border: 1px solid #ececec;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        box-shadow: 0px 0px 0px 1px #efefef;
        .imageWrapper {
            height: 0;
            padding-bottom: 100%;
            overflow: hidden;
            margin-bottom: 0.625rem;
            position: relative;
        }
        .image {
            width: 100%;
            height: auto;
            display: block;
        }
        .name {
            margin-bottom: 0.625rem;
            height: 2.5rem;
            line-height: 1.25rem;
            font-size: 0.8125rem;
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        .originPrice {
            margin-bottom: 0.3125rem;
            font-size: 0.6875rem;
            color: #999999;
            text-decoration: line-through;
        }

        .noticeSoldOut span {
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            display: inline-block;
            width: 60%;
            text-align: center;
            color: #FFF;
            font-size: 0.75rem;
            height: 1.25rem;
            line-height: 1.25rem;
            background: rgba(0, 0, 0, 0.4);
            border-radius: 1.25rem;
        }

        .priceWrapper {
            position: relative;
            margin-bottom: 0.3rem;
        }

        .price {
            height: 1.875rem;
            line-height: 1.875rem;
            font-size: 0.6875rem;
            color: #FE6263;
        }

        .cart-icon-wrap {
            position: absolute;
            top: 0;
            right: 0;
            width: 1.875rem;
        }
    }

    @media screen and (min-width: 0px) and (max-width: 320px) {
        .itemWrapper {
            width: 33%;
        }
    }
</style>
