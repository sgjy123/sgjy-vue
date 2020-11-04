<!--
 * @Descripttion: 轮播-引用组件swiper
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/11/3 17:00
-->
<template>
    <swiper id="swiper" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(item) in sowinglist" :key="item['cid']">
            <img :src="item['icon_url']" :alt="item['public_name']">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    export default {
        name: "Sowing",
        props: {
            sowinglist: {
                type: Array,
                default: function () {
                    return []
                },
                require: true
            }
        },
        data() {
            return {
                swiperOption: {
                    notNextTick: true,
                    // 分页
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    bulletActiveClass : 'my-bullet-active',
                    // 循环
                    loop: true,
                    // 切换时长
                    autoplay: {
                        delay: 1000
                    },
                    // 速度
                    speed: 1000,
                    // 滑动后回调函数
                    on: {
                        slideChangeTransitionEnd() {
                            // console.log(this.activeIndex);
                        }
                    }
                }
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        mounted() {
            // this.swiper.slideTo(3, 1000, false)
        },
        methods: {},
    }
</script>

<style lang='scss'>
    #swiper {
        width: 100%;
        height: 14rem;
        background-color: transparent;
        img {
            width: 100%;
            height: 100%;
        }
        /deep/ .swiper-pagination-bullet-active{
            background-color: #75a342 ;
        }
    }
</style>
