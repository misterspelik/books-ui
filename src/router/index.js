import VueRouter from 'vue-router'

import Login from '../pages/Login'
import PageNotFound from '../pages/PageNotFound'

import AdminLayout from '../components/AdminLayout'

const routes = [
  {
    path: '/admin/login',
    name: 'login',
    component: Login
  },
  // ADMIN ROUTES
  {
    path: '/admin/users',
    component: AdminLayout,
    children: [{
      path: '',
      name: 'admin.dashboard.users',
      component: () => import('@/pages/admin/Users'),
      meta: { title: 'Users', breadcrumbs: false }
    }]
  },
  {
    path: '/admin/reports',
    component: AdminLayout,
    children: [{
      path: '',
      name: 'admin.dashboard.reports',
      component: () => import('@/pages/admin/Reports'),
      meta: { title: 'Reports', breadcrumbs: false }
    }]
  },
  {
    path: "*",
    component: PageNotFound
  }
]

export default new VueRouter({
  history: true,
  mode: 'history',
  routes,
})