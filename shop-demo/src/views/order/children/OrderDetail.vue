<!--
 * @Descripttion: 订单详情
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/12/9 13:56
-->
<template>
    <div class="orderDetail" id="orderDetail">
        <!--导航栏-->
        <van-nav-bar title="商品清单"
                     left-arrow
                     :fixed='true'
                     :border='true'
                     @click-left="$router.go(-1)"></van-nav-bar>
        <!--内容-->
        <van-cell-group style="margin-top: 3rem">
            <van-cell title="商品" value="共3件"></van-cell>
            <van-card num="2"
                      price="2.00"
                      desc="描述信息"
                      title="商品标题"
                      thumb="https://img.yzcdn.cn/vant/ipad.jpeg"/>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: "OrderDetail",
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

<style lang='scss' scoped>
    #orderDetail{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 200;
    }
</style>
