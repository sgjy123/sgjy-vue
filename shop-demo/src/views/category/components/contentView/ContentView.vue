<!--
 * @Descripttion: 分类-右侧商品
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/11/17 10:52
-->
<template>
    <div class="wrapper emptyWrapper">
        <div v-for="(categoriesDetail) in categoriesDetailData"
             :key="categoriesDetail.id">
            <div class="categoryTitle">{{categoriesDetail.name}}</div>
            <ProductItem :products="categoriesDetail.products"></ProductItem>
        </div>
    </div>
</template>

<script>
    // 1.导入组件
    import ProductItem from './../productItem/ProductItem'
    export default {
        name: "ContentView",
        props: {
            categoriesDetailData: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        data() {
            return {}
        },
        components: {
            ProductItem
        },
        created() {
        },
        mounted() {
        },
        methods: {},
    }
</script>

<style lang='scss' scoped>
    @import "@/style/vriable.scss";
    .wrapper {
        position: absolute;
        left: 5.3125rem;
        right: 0;
        bottom: 0;
        top: 0;
        background: #FFF;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;

        .categoryTitle {
            height: 2rem;
            line-height: 2rem;
            padding: 0 0.3125rem;
            font-size: 0.75rem;
            background: #F8F8F8;
            color: #666666;
            @include ellipsis
        }
    }
</style>
