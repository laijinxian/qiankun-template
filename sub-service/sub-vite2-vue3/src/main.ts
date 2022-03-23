// @ts-nocheck
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import routes from "./router";
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

let router = null;
let instance = null;

renderWithQiankun({
  mount(props) {
    storeTest(props);
    render(props);
    instance.config.globalProperties.$onGlobalStateChange =
      props.onGlobalStateChange;
    instance.config.globalProperties.$setGlobalState = props.setGlobalState;
  },
  bootstrap() {
    console.log("%c ", "color: green;", "sub-vite2-vue3 app bootstraped");
  },
  unmount(props: any) {
    instance.unmount();
    instance._container.innerHTML = "";
    instance = null;
    router = null;
  },
});

function render(props = {}) {
  const { container } = props;
  router = createRouter({
    history: createWebHistory(!qiankunWindow.__POWERED_BY_QIANKUN__ ? "/sub-vite2-vue3" : "/"),
    routes
  });

  instance = createApp(App);
  instance.use(router);
  instance.mount(container ? container.querySelector("#app") : "#app");
}

function storeTest(props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) =>
        console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true
    );
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name
      }
    });
}
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}