import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun';
import reactRefresh from '@vitejs/plugin-react-refresh'

// useDevMode 开启时与热更新插件冲突
const useDevMode = true

export default ({ mode }) => {
  
  const __DEV__ = mode === 'development'

  return defineConfig({
    server: {
      port: 7722,
      origin: '//localhost:7722'
    },
    base: __DEV__ ? '/' : '//localhost:7722',
    plugins: [
      ...(
        useDevMode ? [] : [
          reactRefresh()
        ]
      ),
      qiankun('sub-vite2-react', {
        useDevMode: true
      })
    ],
  })
}