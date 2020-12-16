<!--
 * @Descripttion: 我的页面
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/10/30 11:49
-->
<template>
    <div id="mine" class="mine" v-if="userInfo.token">
        <!--个人信息-->
        <van-cell-group>
            <van-cell @click="$router.push('/dashboard/mine/userCenter')"
                      is-link
                      class="person-cell"
                      :center="true">
                <template #title>
                    <div class="person-msg">
                        <img class="person-msg-img" :src="userInfo.icon_url" :alt="userInfo.real_name">
                        <div class="person-msg-info">
                            <div class="name">{{userInfo.real_name}}</div>
                            <div class="phone">手机号: {{userInfo.phone}}</div>
                        </div>
                    </div>
                </template>
            </van-cell>
        </van-cell-group>
        <!--我的订单-->
        <van-cell-group>
            <van-cell class="van-cell__left-icon-yellow" value="查看全部订单" icon="label" title="我的订单" is-link></van-cell>
            <van-grid>
                <van-grid-item v-for="(order, index) in orderData"
                               :key="index"
                               :icon="order.icon"
                               :text="order.title" />
            </van-grid>
        </van-cell-group>
        <!--我的优惠-->
        <van-cell-group style="margin-top: 0.4rem">
            <van-cell class="van-cell__left-icon-yellow" title="我的优惠券" icon="gold-coin" value="1张" is-link></van-cell>
            <van-cell class="van-cell__left-icon-yellow" title="我的收货地址" icon="todo-list" is-link></van-cell>
        </van-cell-group>
        <!--联系客服-->
        <van-cell-group style="margin-top: 0.4rem">
            <van-cell class="van-cell__left-icon-yellow" title="联系客服" icon="phone" value="客服时间 07:00-22:00" is-link></van-cell>
            <van-cell class="van-cell__left-icon-yellow" title="意见反馈" icon="smile-comment" is-link></van-cell>
        </van-cell-group>
        <!--小撩买菜-->
        <van-cell-group style="margin-top: 0.4rem">
            <van-cell class="van-cell__left-icon-yellow" title="小撩买菜" icon="gift-card" value="下载APP体验更佳" is-link></van-cell>
        </van-cell-group>
        <!--路由的出口-->
        <transition name="router-slider" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
    <ChangeLogin v-else/>
</template>

<script>
    import {mapState} from 'vuex'
    import ChangeLogin from './../login/ChangeLogin'
    export default {
        name: "Mine",
        data() {
            return {
                // 订单
                orderData: [
                    {icon: 'cart-circle-o', title: '待支付'},
                    {icon: 'gift-o', title: '待收货'},
                    {icon: 'smile-comment-o', title: '待评价'},
                    {icon: 'cash-back-record', title: '售后/退款'}
                ]
            }
        },
        components: {
            ChangeLogin
        },
        computed: {
            ...mapState(['userInfo'])
        },
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
    #mine {
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        .van-nav-bar__green {
            background-color: #3bba63;
        }
        /deep/ .van-nav-bar__title {
            color: #fff;
        }
        .person-cell {
            background-color: #3bba63;
            color:#FFF;
            .van-cell__right-icon {
                color:#FFF;
            }
        }
        .person-msg {
            display: flex;
            align-items: center;
            &-img {
                width: 4rem;
                height: 4rem;
                border-radius: 2rem;
                border: 0.12rem solid #FFF;
            }
            &-info {
                margin-left: 0.33rem;
                .name {
                    font-size: 1rem;
                }
            }
        }
        .van-cell__left-icon-yellow {
            .van-cell__left-icon {
                color: orange;
            }
        }
        /*转场动画*/
        .router-slider-enter-active, .router-slider-leave-active{
            transition: all 0.3s;
        }

        .router-slider-enter, .router-slider-leave-active{
            transform: translate3d(2rem, 0, 0);
            opacity: 0;
        }
    }
</style>
