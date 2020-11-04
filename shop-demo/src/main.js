import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

// 引入fastClick插件，防止手机端端浏览器内部双击事件
import FastClick from 'fastclick'
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}
// 阻止启动生产消息
Vue.config.productionTip = false

// 导入样式
import './style/common.scss'

// 引入vant
import './plugins/vant'

// 引入rem.js
import './config/rem.js'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
