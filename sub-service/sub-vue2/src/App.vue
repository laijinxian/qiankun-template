<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <a href="#" @click="gotoSubReact" style="marin: 0 0 0 10px">跳转到sub-react</a>
    </div>
    <div>
      从vuex的global module的state： {{ JSON.stringify(user) }}
    </div>

    <div @click="onLogin"> button </div>

    <div class="login-iframe">
      <!-- <iframe src="https://juejin.cn/" width="400" height="300" sandbox="allow-scripts allow-same-origin"></iframe> -->
      <iframe ref="iframe" name="iframe" width="400" height="300" sandbox="allow-scripts allow-same-origin"></iframe>
    </div>

    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      html: require("static/login.html")
    }
  },
  mounted() {
    this.$refs.iframe.srcdoc = this.html
    console.log(localStorage.getItem('userInfo'))
  },
  computed: {
    // 通过global获取user的信息
    ...mapState('global', {
      user: state => state.user
    })
  },
  methods: {
    onLogin () {
      console.log(111111)
    },
    gotoSubReact () {
      history.pushState(null, 'sub-react', '/sub-react');
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.login-iframe{
  margin-top: 20px;
}
</style>
