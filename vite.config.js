import { defineConfig, resolve } from 'vite';
import path from 'path';

import vue from '@vitejs/plugin-vue';


export default defineConfig({
  root:'./src/',
  base:'',
  envDir:'../',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build:{
   
    outDir:'../dist',
    assetsDir:'../assets',
    emptyOutDir:true,
    
    rollupOptions:{
      input: {
        index:path.resolve(__dirname, 'src/index.html'),
        creditAllinOne:path.resolve(__dirname, 'src/payType/creditAllinOne/index.html'),
        creditOne:path.resolve(__dirname, './src/payType/creditOnce/index.html'),
        creditInst:path.resolve(__dirname, './src/payType/creditInst/index.html'),
      },
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    },
  }
});