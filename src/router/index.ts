import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about', // TODO
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/letters',
      name: 'letters',
      component: () => import('../views/LettersView.vue'),
    },
    {
      path: '/numbers',
      name: 'numbers',
      component: () => import('../views/NumbersView.vue'),
    },
  ],
})

export default router
