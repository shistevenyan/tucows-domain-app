import { createRouter, createWebHistory } from 'vue-router'
import DomainExplorerPage from '../pages/DomainExplorerPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'domain-explorer',
      component: DomainExplorerPage,
    },
  ],
})

export default router
