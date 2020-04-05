import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('../components/Welcome.vue')
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import('../components/user/Users.vue')
      },
      {
        path: '/roles',
        name: 'Roles',
        component: () => import('../components/authority/Roles.vue')
      },
      {
        path: '/rights',
        name: 'Rights',
        component: () => import('../components/authority/Rights.vue')
      },
      {
        path: '/goods',
        name: 'Goods',
        component: () => import('../components/shop/Goods.vue')
      },
      {
        path: '/params',
        name: 'Params',
        component: () => import('../components/shop/Params.vue')
      },
      {
        path: '/categories',
        name: 'Categories',
        component: () => import('../components/shop/Categories.vue')
      },
      {
        path: '/orders',
        name: 'Orders',
        component: () => import('../components/order/Orders.vue')
      },
      {
        path: '/reports',
        name: 'Reports',
        component: () => import('../components/report/Reports.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // to将要访问的页面
  // from 代表从那个路劲跳转而来
  // next 是一个函数，表示放行
  // next():放行,next('/login')：强制跳转
  if (to.path === '/login') {
    return next()
  }
  const token = sessionStorage.getItem('token')
  if (!token) {
    return next('/login')
  }
  next()
})

export default router
