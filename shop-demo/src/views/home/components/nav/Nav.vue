<!--
 * @Descripttion: 首页导航分类
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/11/5 14:12
-->
<template>
    <div id="homeNav" class="nav-wrap">
        <div class="nav-wrap-item" v-for="(item) in navlist" :key="item['cid']">
            <div class="image-wrap">
                <img :src="item['icon_url']" :alt="item['public_name']">
            </div>
            <div class="title-wrap">
                <div class="title">{{item['name']}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Nav",
        props: {
            navlist: {
                require: true,
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        data() {
            return {}
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
    .nav-wrap {
        display: flex;
        flex-wrap: wrap;
        padding-top: 0.625rem;
        background-color: #fff;
        &-item {
            width: 20%;
            .image-wrap {
                padding-bottom: 58.823%;
                height: 0;
                overflow: hidden;
                text-align: center;
                img {
                    display: inline-block;
                    width: 58.823%;
                    height: auto;
                }
            }
            .title-wrap {
                width: 100%;
                text-align: center;
                padding-top: 0.3125rem;
                padding-bottom: 0.3125rem;
                .title {
                    width: 100%;
                    font-size: 0.75rem;
                    color: #555555;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
    }
</style>
