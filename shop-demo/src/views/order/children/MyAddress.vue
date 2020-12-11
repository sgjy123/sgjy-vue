<!--
 * @Descripttion: 我的地址
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/12/9 13:55
-->
<template>
    <div id="myAddress" class="myAddress">
        <!--导航栏-->
        <van-nav-bar title="我的地址"
                     left-arrow
                     :fixed="true"
                     :border="true"
                     @click-left="goBackPage"></van-nav-bar>
        <!--地址列表-->

        <!--出口-->
        <transition name="router-slider" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "MyAddress",
        data() {
            return {}
        },
        components: {},
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
    #myAddress {

    }
</style>
