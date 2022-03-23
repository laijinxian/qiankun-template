import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun';
import { resolve  } from 'path';

export default ({ mode }) => {
  
  const __DEV__ = mode === 'development'

  return defineConfig({
    alias: {
      '@': resolve('src'),
    },
    server: {
      port: 7711,
      origin: '//localhost:7711'
    },
    base: __DEV__ ? '/' : '//localhost:7711',
    plugins: [ vue(),
      qiankun('sub-vite2-vue3', {
        useDevMode: true
    })],
  })
}

