<!--
 * @Descripttion: 公用组件-依赖Empty插件，空元素组件
 * @version: v1.0.0
 * @Author: sgjy
 * @Date: 2020/12/1 17:58
-->
<template>
    <van-empty class="custom-image"
               :image="imageUrl"
               :description="description"/>
</template>

<script>
    export default {
        name: "Empty",
        props: {
            // 图片地址
            imageUrl: {
                type: String,
                default: 'error'
            },
            description: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style lang='scss'>
    .custom-image .van-empty__image {
        width: 90px;
        height: 90px;
    }
</style>
