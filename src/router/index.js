import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import AboutView from '../views/AboutView.vue'
import CareersView from '../views/CareersView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/CareersView',
    name: 'CareersView',
    component: CareersView,
  },
  {
    path: '/AboutView',
    name: 'AboutView',
    component: () => import(/* webpackChunkName: "AboutView" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
