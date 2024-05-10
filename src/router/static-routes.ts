import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/',
    component: () => import('@/views/home/home.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/tt',
    component: () => import('@/views/tt/tt.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/sub',
    component: () => import('@/subcontract/views/sub/sub.vue'),
    meta: {
      title: '分包',
    },
  },
  // {
  //   path: '/:pathMatch(.*)',
  //   meta: {
  //     title: '找不到页面',
  //   },
  //   component: () => import('~/views/exception/error.vue'),
  // },
] as RouteRecordRaw[];
