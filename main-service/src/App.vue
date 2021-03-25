<template>
  <div class="layout-wrapper">
    <header class="layout-header">
      <div class="logo">QIANKUN-TEMPLATE-LJX</div>
      <div class="userinfo">主应用的state：子应用名称  {{ ignore }}</div>
    </header>
    <main class="layout-main">
      <aside class="layout-aside">
        <ul>
          <li v-for="item in microApps" :class="{active: item.activeRule === current}" :key="item.name" @click="goto(item)">{{ item.name }}</li>
        </ul>
      </aside>
      <section class="layout-section" id="subapp-container"></section>
    </main>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import microApps from './qiankun'
import store from './store'
export default {
  name: 'App',
  data () {
    return {
      isLoading: true,
      microApps,
      current: '/sub-vue2'
    }
  },
  computed: {
    ignore () {
      return store.getGlobalState('ignore')
    }
  },
  watch: {
    isLoading (val) {
      if (val) {
        NProgress.start()
      } else {
        this.$nextTick(() => {
          NProgress.done()
        })
      }
    }
  },
  components: {},
  methods: {
    goto (item) {
      history.pushState(null, item.activeRule, item.activeRule)
      // this.current = item.name
    },
    bindCurrent () {
      const path = window.location.pathname
      if (this.microApps.findIndex(item => item.activeRule === path) >= 0) {
        this.current = path
      }
    },
    listenRouterChange () {
      const _wr = function (type) {
        const orig = history[type]
        return function () {
          const rv = orig.apply(this, arguments)
          const e = new Event(type)
          e.arguments = arguments
          window.dispatchEvent(e)
          return rv
        }
      }
      history.pushState = _wr('pushState')

      window.addEventListener('pushState', this.bindCurrent)
      window.addEventListener('popstate', this.bindCurrent)

      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('pushState', this.bindCurrent)
        window.removeEventListener('popstate', this.bindCurrent)
      })
    }
  },
  created () {
    this.bindCurrent()
    NProgress.start()
  },
  mounted () {
    this.listenRouterChange()
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
html, body, .layout-wrapper{
  height: 100%;
  overflow: hidden;
}
.layout-wrapper{
  .layout-header{
    height: 50px;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    line-height: 50px;
    position: relative;
    .logo {
      float: left;
      margin: 0 50px;
    }
    .userinfo{
      position: absolute;
      right: 100px;
      top: 0;
    }
  }
  .layout-main{
    height: calc(100% - 50px);
    overflow: hidden;
    display: flex;
    justify-content: space-evenly;
    .layout-aside{
      width: 190px;
      ul {
        margin: 50px 0 0 20px;
        border-right: 2px solid #aaa;
        li{
          list-style: none;
          display: inline-block;
          padding: 0 20px;
          color: #aaa;
          margin: 20px 0;
          font-size: 18px;
          font-weight: 400;
          cursor: pointer;
          &.active{
            color: #42b983;
            text-decoration: underline;
          }
          &:hover {
            color: #444;
          }
        }
      }
    }
    .layout-section{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
