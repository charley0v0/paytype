import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/creditOncePay.vue'),
  },
  {
    path: '/creditOncePay',
    name: 'payment',
    component: () => import('../views/creditOncePay.vue'),

  },
  {
    path: '/unionPay',
    name: 'payment',
    component: () => import('../views/unionPay.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
