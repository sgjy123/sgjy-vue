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
                     :placeholder="true"
                     @click-left="goBackPage"></van-nav-bar>
        <!--地址列表-->
        <van-address-list v-model="chosenAddressId"
                          :list="list"
                          :disabled-list="disabledList"
                          disabled-text="以下地址超出配送范围"
                          default-tag-text="默认"
                          @add="goAddAddress"
                          @edit="goEditAddress"></van-address-list>
        <!--出口-->
        <transition name="router-slider" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {Toast} from 'vant'
    export default {
        name: "MyAddress",
        data() {
            return {
                chosenAddressId: '1',
                list: [
                    {
                        id: '1',
                        name: '张三',
                        tel: '13000000000',
                        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                        isDefault: true,
                    },
                    {
                        id: '2',
                        name: '李四',
                        tel: '1310000000',
                        address: '浙江省杭州市拱墅区莫干山路 50 号',
                    },
                ],
                disabledList: [
                    {
                        id: '3',
                        name: '王五',
                        tel: '1320000000',
                        address: '浙江省杭州市滨江区江南大道 15 号',
                    },
                ],
            };
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
            /**
             * @description: 跳转添加地址页面
             * @author: 上官靖宇
             * @date: 2020-12-09
             */
            goAddAddress() {
                this.$router.push('/order/myAddress/addAddress')
            },
            goEditAddress(item, index) {
                this.$router.push('/order/myAddress/EditAddress')
            },
        }
    }
</script>

<style lang='scss' scoped>
    #myAddress {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 200;
    }
</style>
