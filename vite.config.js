import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  // server:{
  //   // https:false,
  //   cors:true,
  //   host:'127.0.0.1',
  //   proxy:{
  //     '/api':{
  //       target:'https://lwww.newebpay.com/js/sdk.js',
  //       changeOrigin:true,
  //       rewrite:(path) => path.replace(/^\/api/,'')
  //     },
  //   },
  //   headers:{
  //     "Access-Control-Allow-Origin":"*",
  //     "Access-Control-Allow":"Origin,X-Requested-With,Content-Type,Accept",
  //     "Access-Control-Allow-Methods":"GET,POST,DELETE,OPTIONS",
  //   }
  // },
  build:{
    rollupOptions:{
      input:{
        creditOncePay:path.resolve(__dirname, 'creditOncePay/index.html'),
        unionPay:path.resolve(__dirname, 'unionPay/index.html')
      },
      output: {
          entryFileNames:'[name]/[name].js',
          assetFileNames: 'assets/[name]-[hash][extname]'
        }
      }
    },
})
