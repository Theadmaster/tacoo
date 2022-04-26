import Vue from 'vue'
import Router from 'vue-router'

import Login from 'views/login/Login'

import Layout from '@/layout/index' 

Vue.use(Router)

const routes = [
    {
        path: '',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Layout,
        redirect: '/role',
        children: [
            {
                path: '/user',
                component: () => import('views/base/user')
            },
            {
                path: '/role',
                component: () => import('views/base/role')
            },
            {
                path: '/menu',
                component: () => import('views/base/menu')
            },
            {
                path: '/dict',
                component: () => import('views/base/dict')
            }
        ]
    }


]

const router = new Router({
    routes,
    mode: 'history'
})

export default router