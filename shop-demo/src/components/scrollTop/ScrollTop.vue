<!--
 * @Descripttion: 返回顶部组件-全局
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/11/6 11:01
-->
<template>
    <div class="scrollTop-wrap" @click="scorllTop">
        <van-icon name="back-top" color="#e4e4e4" />
    </div>
</template>

<script>
    export default {
        name: "ScrollTop",
        props: {
            scorllTop: Function
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
.scrollTop-wrap {
    position: fixed;
    bottom: 5rem;
    right: .8rem;
    width: 2rem;
    height: 2rem;
    line-height: 2.5rem;
    font-size: 1rem;
    text-align: center;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 0 0 1px #e4e4e4;
}
</style>
