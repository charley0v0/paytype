import { defineConfig, resolve } from 'vite'
import vue from '@vitejs/plugin-vue';
import path from 'path';
import {glob, globSync} from 'glob';

function getInputEntries() {
  const entries = {};
  const htmlFiles = globSync('src/payType/**/index.html');

  htmlFiles.forEach((file) => {
    const key = `${file.split('\\')[2]}\/${file.split('\\')[3]}`;
    entries[key] = path.resolve(__dirname, file);
  });
  return entries;
}


export default defineConfig({
  root:'./src/',
  base:'',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build:{
    outDir:'../dist',
    assetsDir:'assets',
    emptyOutDir:true,
    rollupOptions:{
      input: getInputEntries(),
      output: {
        dir: 'dist',
        chunkFileNames: 'js/fakePay/js/[name]-[hash].js',
        entryFileNames: 'js/fakePay/js/[name]-[hash].js',
        assetFileNames: 'js/fakePay/[ext]/[name]-[hash].[ext]'
      }
    },
  }
});

