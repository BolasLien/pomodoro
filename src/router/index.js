import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  { path: '/', name: 'home', component: Home, meta: { title: '番茄鐘' } },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/List.vue'),
    meta: { title: '番茄鐘 | 清單' }
  },
  {
    path: '/finish',
    name: 'finish',
    component: () => import('../views/Finish.vue'),
    meta: { title: '番茄鐘 | 已完成' }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/Settings.vue'),
    meta: { title: '番茄鐘 | 設定' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
    meta: { title: '番茄鐘 | 404' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title ?? '番茄鐘'
})

export default router
