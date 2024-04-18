import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/creditOncePay',
    name: 'payment',
    component: () => import('../views/creditOncePay.vue'),
    meta:{
      activeMenuName: "payment"
    }
  },
  // {
  //   path: '/unionPay',
  //   name: 'unionPay',
  //   component: () => import('../views/unionPay.vue'),
  //   meta:{
  //     activeMenuName: "payment"
  //   }
  // },
  // {
  //   path: '/result',
  //   name: 'result',
  //   component: () => import('../views/Result.vue'),
  //   meta:{
  //     activeMenuName: "result"
  //   }
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  linkExactActiveClass: 'active',
  routes,
});

export default router;
