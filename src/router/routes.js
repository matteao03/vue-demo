import Layout from '@/views/Layout.vue'
import Home from '@/views/Home.vue'

export default [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/',
      component: Layout,
      children:[
        {
          path: 'home',
          component:Home
        },
        {
          path: 'topic',
          name: 'topic',
          component: () => import('@/views/Topic.vue')
        },
        {
          path: 'job',
          name: 'job',
          component: () => import('@/views/Job.vue')
        },
        {
          path: 'law',
          name: 'law',
          component: () => import('@/views/Law.vue')
        },
        {
          path: 'mine',
          name: 'mine',
          component: () => import('@/views/Mine.vue')
        }
      ]
    },
    {
      path: '/login',
      name:'login',
      component: () => import('@/views/auth/Login.vue')
    },
    {
      path: '/register',
      name:'register',
      component: () => import('@/views/auth/Register.vue')
    },
    {
      path: '/forgetPassword',
      name:'forgetPassword',
      component: () => import('@/views/auth/ForgetPassword.vue')
    },
    {
      path: '/myprofile',
      name:'myprofile',
      component: () => import('@/views/my/MyProfile.vue')
    },
    {
      path: '/setList',
      name:'setList',
      component: () => import('@/views/set/SetList.vue')
    },
    {
      path: '/resetPassword',
      name:'resetPassword',
      component: () => import('@/views/set/ResetPassword.vue')
    },
  ]