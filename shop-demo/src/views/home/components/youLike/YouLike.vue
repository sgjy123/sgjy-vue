<!--
 * @Descripttion: 猜你喜欢
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/11/6 9:57
-->
<template>
    <div class="youLike-wrap">
        <div class="title-wrap">
            <div class="middleLine"></div>
            <div class="title">猜你喜欢</div>
        </div>
        <!--主题内容-->
        <div class="content-wrap">
            <YouLikeItem
                    v-for="(product) in youLikeList"
                    :key="product.id"
                    :product="product"/>
        </div>
    </div>
</template>

<script>
    import YouLikeItem from './YouLikeItem'
    export default {
        name: "YouLike",
        props: {
            youLikeList: {
                type: Array,
                require: true,
                default: function () {
                    return []
                }
            }
        },
        data() {
            return {}
        },
        components: {
            YouLikeItem
        }
    }
</script>

<style lang='scss' scoped>
    .youLike-wrap {
        margin-top: 0.625rem;
        .title-wrap {
            position: relative;
            padding: 0 0.625rem;
            height: 2.1875rem;
            text-align: center;
            .middleLine {
                padding-top: 1.09375rem;
                border-bottom: solid 1px #D8D8D8;
            }
            .title {
                position: relative;
                display: inline-block;
                top: -1.09375rem;
                padding: 0 1.25rem;
                line-height: 2.1875rem;
                font-size: 1rem;
                background: #F5F5F5;
            }
        }
        .content-wrap {
            margin-bottom: 1rem;
        }
    }
</style>
