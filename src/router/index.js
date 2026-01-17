import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import AdminDashboard from '../views/admin/Dashboard.vue'
import EditHero from '../views/admin/EditHero.vue'
import EditAbout from '../views/admin/EditAbout.vue'
import EditExperiences from '../views/admin/EditExperiences.vue'
import EditSkills from '../views/admin/EditSkills.vue'
import EditProjects from '../views/admin/EditProjects.vue'
import EditContact from '../views/admin/EditContact.vue'
import EditFooter from '../views/admin/EditFooter.vue'
import EditVisibility from '../views/admin/EditVisibility.vue'
import EditColors from '../views/admin/EditColors.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/hero',
    name: 'EditHero',
    component: EditHero,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/about',
    name: 'EditAbout',
    component: EditAbout,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/experiences',
    name: 'EditExperiences',
    component: EditExperiences,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/skills',
    name: 'EditSkills',
    component: EditSkills,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/projects',
    name: 'EditProjects',
    component: EditProjects,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/contact',
    name: 'EditContact',
    component: EditContact,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/footer',
    name: 'EditFooter',
    component: EditFooter,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/visibility',
    name: 'EditVisibility',
    component: EditVisibility,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/colors',
    name: 'EditColors',
    component: EditColors,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.name === 'Login' && authStore.isAuthenticated) {
    next('/admin')
  } else {
    next()
  }
})

export default router
