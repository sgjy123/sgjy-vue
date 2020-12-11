import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
// 引入一级页面
import DashBoard from './../views/dashboard/DashBoard'; // 全局面板-统一进入页面
const Home = () => import('./../views/home/Home.vue'); // 首页
const Category = () => import('./../views/category/Category.vue'); // 分类
const Cart = () => import('./../views/cart/Cart.vue'); // 购物车
const Mine = () => import('./../views/mine/Mine.vue'); // 我的

// 引入级联跳转页面
const Order = () => import('./../views/order/Order.vue'); // 订单页面
const OrderDetail = ()=> import('./../views/order/children/OrderDetail.vue'); // 订单详情
const MyAddress = ()=> import('./../views/order/children/MyAddress.vue'); // 我的地址
const AddAddress = ()=> import('./../views/order/children/children/AddAddress.vue'); // 添加地址
const EditAddress = ()=> import('./../views/order/children/children/EditAddress.vue'); // 编辑地址

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
                {path: 'cart', name: 'cart', component: Cart},
                {path: 'mine', name: 'mine', component: Mine}
            ]
        },
        {
            path: '/order',
            name: 'order',
            component: Order,
            children: [
                {
                    path: 'myAddress',
                    name: 'myAddress',
                    component: MyAddress,
                    children: [
                        {
                            path: 'addAddress',
                            name: 'addAddress',
                            component: AddAddress
                        },
                        {
                            path: 'editAddress',
                            name: 'editAddress',
                            component: EditAddress
                        }
                    ]
                },
                {
                    path: 'orderDetail',
                    name: 'orderDetail',
                    component: OrderDetail
                }
            ]
        }
    ]
})
