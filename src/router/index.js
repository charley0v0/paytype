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
  {
    path: '/unionPay',
    name: 'payment',
    component: () => import('../views/unionPay.vue'),
    meta:{
      activeMenuName: "payment"
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  linkExactActiveClass: 'active',
  routes,
});

export default router;
