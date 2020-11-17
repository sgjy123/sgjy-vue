<!--
 * @Descripttion: 分类
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/10/30 11:48
-->
<template>
    <div id="category" class="category">
        <!--头部组件-->
        <Header></Header>
        <!--主体内容-->
        <div class="listWrapper" v-if="!loadingPage">
            <!--左侧-->
            <div class="leftWrapper">
                <ul class="wrapper">
                    <li
                            class="categoryItem"
                            v-for="(cate, index) in categoriesData"
                            :class="{selected: currentIndex === index}"
                            @click="clickLeftLi(index)"
                            :key="cate.id"
                            ref="menuList">
                        <span class="textWrapper">{{cate.name}}</span>
                    </li>
                </ul>
            </div>
            <!--右侧-->
            <ContentView :categoriesDetailData="categoriesDetailData"></ContentView>
        </div>
        <van-loading size="24px" v-else class="loading-page">努力加载中...</van-loading>
    </div>
</template>

<script>
    // 1.导入组件
    import {Header,ContentView} from './components/index'
    // 2.导入数据请求
    import {getCategories} from './../../service/api/index'
    // 3.导入滚动插件
    import BScroll from 'better-scroll'

    export default {
        name: "Category",
        data() {
            return {
                // 页面loading
                loadingPage: true,
                // 左边导航数据
                categoriesData: [],
                // 右侧商品数据
                categoriesDetailData: [],
                // 左边item选中与否
                currentIndex: 0
            }
        },
        components: {
            Header,
            ContentView
        },
        created() {
            this.initData()
        },
        mounted() {
        },
        methods: {
            /**
             * @description: 初始化页面数据和相关操作
             * @author: 上官靖宇
             * @date: 2020-11-16
             */
            async initData() {
                let leftReg = await getCategories()
                if (leftReg.success) {
                    this.categoriesData = leftReg.data.cate;
                }
                this.loadingPage = false
                // 实例化滚动插件
                this.$nextTick(() => {
                    this.leftScroll = new BScroll('.leftWrapper', {
                        probeType: 3,
                        click: true,
                        scrollY: true,
                        tap: true,
                        mouseWheel: true
                    })
                })
            },
            /**
             * @description: 点击左侧
             * @author: 上官靖宇
             * @date: 2020-11-16
             */
            clickLeftLi(index) {
                // 1.处理索引
                this.currentIndex = index
                // 2.获取要滚动的元素
                let menuLists = this.$refs.menuList;
                let ele = menuLists[index]
                // 3.滚动到点击的位置上
                this.leftScroll.scrollToElement(ele, 350)

            }
        },
    }
</script>

<style lang='scss' scoped>
    .category {
        width: 100%;
        height: 100%;
        background-color: #F5F5F5;
        overflow: hidden;

        .listWrapper {
            position: fixed;
            top: 50px;
            bottom: 50px;
            display: flex;
            width: 100%;
            height: 100%;
            overflow: hidden;

            .leftWrapper {
                background-color: #F4F4F4;
                width: 5.3125rem;
                flex: 0 0 5.3125rem;

                .categoryItem {
                    padding: 0.75rem 0;
                    border-bottom: solid 1px #E8E9E8;
                    position: relative;
                }

                .categoryItem.selected {
                    background: #FFF;

                    .textWrapper {
                        border-left-color: #3cb963;
                        font-weight: bold;
                        font-size: 0.875rem;
                        color: #333333;
                    }
                }

                .textWrapper {
                    line-height: 1.25rem;
                    border-left: solid 0.1875rem transparent;
                    padding: 0.3125rem 0.6875rem;
                    font-size: 0.8125rem;
                    color: #666666;
                }

                .wrapper {
                    border-right: solid .5px #ffffff;
                }
            }
        }
    }
</style>
