import Vue from 'vue'
import App from './App.vue'
import './qiankun';
import './registerServiceWorker';
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

export const instance = new Vue({
  render: h => h(App)
}).$mount('#app')
