import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
// 引入一级页面
import DashBoard from './../views/dashboard/DashBoard'; // 全局面板-统一进入页面
const Home = () => import('./../views/home/Home.vue'); // 首页
const Category = () => import('./../views/category/Category.vue'); // 分类
const Eat = () => import('./../views/eat/Eat.vue'); // 吃什么
const Cart = () => import('./../views/cart/Cart.vue'); // 购物车
const Mine = () => import('./../views/mine/Mine.vue'); // 我的

export default new Router({
    routes: [
        {path: '/', redirect: '/dashboard'},
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashBoard,
            children: [
                {path: '/dashboard',redirect: '/dashboard/home'},
                {path: 'home', name: 'home', component: Home, meta: {keepAlive: true}},
                {path: 'category', name: 'category', component: Category, meta: {keepAlive: true}},
                {path: 'eat', name: 'eat', component: Eat},
                {path: 'cart', name: 'cart', component: Cart},
                {path: 'mine', name: 'mine', component: Mine}
            ]
        }
    ]
})
