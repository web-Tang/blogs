import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    // 前台展示页面
    path: '/',
    name: 'template',
    component: () => import('@/components/Template'),
    redirect: '/',
    children: [
      { path: '/', name: 'home', component: () => import('@/components/front/Home') },
      { path: '/about', name: 'about', component: () => import('@/components/front/About') },
      { path: '/forum', name: 'forum', component: () => import('@/components/front/Forums') },
      { path: '/column', name: 'column', component: () => import('@/components/front/Columns') },
      { path: '/laboratory', name: 'laboratory', component: () => import('@/components/front/Laboratory') },
      { path: '/UserHome', name: 'UserHome', component: () => import('@/components/front/UserHome') },
      {
        path: '/ArticleHome', name: 'ArticleHome', component: () => import('@/components/front/ArticleHome'),
        beforeEnter: (to, from, next) => {
          if (to.params.id) {
            next()
          } else {
            next('/')
          }
        }
      },
    ]
  },
  { path: '/login', name: 'login', component: () => import('@/components/front/Login') },  // 后台登录
  {
    // 后台页面管理
    path: '/admin',
    name: 'admin',
    component: () => import('@/components/admin/Admin'),
    children: [
      { path: 'index', name: 'index', component: () => import('@/components/admin/Index') },
      { path: 'page', name: 'page', component: () => import('@/components/admin/Page') },
      { path: 'publish', name: 'publish', component: () => import('@/components/admin/Publish') },
      { path: 'article', name: 'article', component: () => import('@/components/admin/Article') },
      { path: 'file', name: 'file', component: () => import('@/components/admin/File') },
      { path: 'label', name: 'label', component: () => import('@/components/admin/Label') },
      { path: 'columnz', name: 'columnz', component: () => import('@/components/admin/Columnz') },
      { path: 'settings', name: 'settings', component: () => import('@/components/admin/Settings') },
      { path: 'user', name: 'user', component: () => import('@/components/admin/User') },
      { path: 'checkout', name: 'checkout', component: () => import('@/components/admin/Checkout') },
    ],
    beforeEnter(to, from, next) {
      // 登录状态
      if (store.state.userdata) {
        next()
      } else {
        next('/login')
      }
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
