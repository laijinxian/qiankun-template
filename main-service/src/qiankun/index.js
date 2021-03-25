import {
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  start
} from "qiankun";
import store from '../store/index'
import { instance } from "../main";
import 'nprogress/nprogress.css'

/**
 * Step1 初始化应用（可选）
 */

function loader(loading) {
  if (instance && instance.$children) {
    // instance.$children[0] 是App.vue，此时直接改动App.vue的isLoading
    instance.$children[0].isLoading = loading;
  }
}

/**
 * Step2 注册子应用
 */

const microApps = [
  {
    name: 'sub-vue2',
    developer: 'vue2.x',
    entry: '//localhost:7788',
    activeRule: '/sub-vue2',
  },
  {
    name: 'sub-vue3',
    developer: 'vue3.x',
    entry: '//localhost:7799',
    activeRule: '/sub-vue3'
  },
  {
    name: 'sub-react',
    developer: 'react16',
    entry: '//localhost:7755',
    activeRule: '/sub-react'
  },
  {
    name: 'sub-umi2',
    developer: 'umi2.x',
    entry: '//localhost:7766',
    activeRule: '/sub-umi2'
  },
  {
    name: 'sub-umi3',
    developer: 'umi3.x',
    entry: '//localhost:7733',
    activeRule: '/sub-umi3'
  }
]

const apps = microApps.map(item => {
  return {
    ...item,
    loader, // 给子应用配置加上loader方法
    container: '#subapp-container', // 子应用挂载的div
    props: {
      developer: item.developer, // 下发基础路由
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState // 下发getGlobalState方法
    }
  }
})

registerMicroApps(apps, {
  beforeLoad: app => {
    console.log('before load app.name====>>>>>', app.name)
  },
  beforeMount: [
    app => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
    }
  ],
  afterMount: [
    app => {
      console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
    }
  ],
  afterUnmount: [
    app => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
    }
  ]
})

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp('/sub-vue2')

/**
 * Step4 启动应用
 */
start();

runAfterFirstMounted(() => {
  console.log("[MainApp] first app mounted");
});

export default apps
