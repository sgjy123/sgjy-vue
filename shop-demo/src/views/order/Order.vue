<!--
 * @Descripttion: 订单页面
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/12/9 13:11
-->
<template>
    <div class="order" id="order">
        <!--导航条-->
        <van-nav-bar title="填写订单"
                     left-arrow
                     :fixed="true"
                     :border="true"
                     :placeholder="true"
                     @click-left="goBackPage"/>
        <!--联系人-->
        <van-contact-card type="add" @click="onAdd" />
        <!--商品小计-->
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="送达时间" value="内容" is-link/>
            <router-link :to="{path: '/order/orderDetail'}">
                <van-cell value="共1件" is-link center>
                    <template slot="title">
                        <van-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    </template>
                </van-cell>
            </router-link>
        </van-cell-group>
        <!--支付方式-->
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="支付方式" value="微信"></van-cell>
        </van-cell-group>
        <!--备注-->
        <van-cell-group style="margin-top: 0.6rem">
            <van-field type="textarea" autosize rows="3" label="备注" placeholder="选填，备注您的特殊需求！" />
        </van-cell-group>
        <!--总计价格-->
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="商品金额" value="50"></van-cell>
            <van-cell title="配送费" value="1.5"></van-cell>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: "Order",
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
             * @description: 返回订单页
             * @author: 上官靖宇
             * @date: 2020-12-09
             */
            goBackPage() {
                this.$router.back();
            },
            onAdd() {

            }
        }
    }
</script>

<style lang='scss' scoped>
    #order {

    }
</style>
