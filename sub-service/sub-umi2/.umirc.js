// ref: https://umijs.org/config/
export default {
  mountElementId: 'sub-umi2',
  base: `sub-umi2`, // 子应用的 base，默认为 package.json 中的 name 字段
  treeShaking: true,
  // history: 'hash',
  routes: [
    { exact: false, path: '/', component: '../layouts/index',
      routes: [
        { exact: false, path: '/', component: '../pages/index' },
        { exact: true, path: '/users', component: '../pages/user.js' },
        { component: './404.js' }
      ],
    }
  ],
  plugins: [
    ['@umijs/plugin-qiankun'],
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
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
