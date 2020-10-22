import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "../src/assets/style/reset.css"
import "./assets/style/iconfont.css"
import components from "./components"
import filters from "./filters"
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
Vue.config.productionTip = false

// 引入全剧组件
for(let key in components){
  Vue.component(key,components[key])
}

for(let key in filters){
  Vue.filter(key,filters[key])
  console.log(key);
}

new Vue({
  mode:history,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
