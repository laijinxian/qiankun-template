
// ref: https://umijs.org/config/
export default {
  mountElementId: 'sub-umi3',
  base: `sub-umi3`, // 子应用的 base，默认为 package.json 中的 name 字段
  treeShaking: true,
  routes: [
    { exact: false, path: '/', component: '../layouts/index',
      routes: [
        { exact: false, path: '/', component: '../pages/index' },
        { component: './404.js' }
      ],
    }
  ],
  plugins: [
    ['@umijs/plugin-qiankun', {
      keepOriginalRoutes: true
    }],
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'react',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
