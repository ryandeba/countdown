import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
    {
      path: '/solveNumbers',
      name: 'solveNumbers',
      component: () => import('../views/SolveNumbersView.vue'),
    },
  ],
})

export default router
