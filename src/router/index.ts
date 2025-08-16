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
      path: '/letters',
      name: 'letters',
      component: () => import('../views/LettersView.vue'),
    },
    {
      path: '/numbers',
      name: 'numbers',
      component: () => import('../views/NumbersView.vue'),
    },
    {
      path: '/solveLetters',
      name: 'solveLetters',
      component: () => import('../views/SolveLettersView.vue'),
    },
  ],
})

export default router
