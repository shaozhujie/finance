import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/logIn/logIn'
import register from '@/views/register/register'
import forget from '@/views/forget/forget'
import index from '@/views/index/index'
import product from '@/views/product/product'
import asset from '@/views/asset/asset'
import phase from '@/views/phase/phase'
import record from '@/views/record/record'
import risk from '@/views/risk/risk'
import message from '@/views/message/message'
import center from '@/views/center/center'
import productInfo from '@/views/product/productInfo'
import account from '@/views/account/account'
import error404 from '@/views/error/404'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/forget',
    name: 'forget',
    component: forget,
  },
  {
    path: '/',
    name: 'index',
    component: index,
  },
  {
    path: '/product',
    name: 'product',
    component: product,
  },
  {
    path: '/asset',
    name: 'asset',
    component: asset,
  },
  {
    path: '/phase',
    name: 'phase',
    component: phase,
  },
  {
    path: '/record',
    name: 'record',
    component: record,
  },
  {
    path: '/risk',
    name: 'risk',
    component: risk,
  },
  {
    path: '/message',
    name: 'message',
    component: message,
  },
  {
    path: '/center',
    name: 'center',
    component: center,
  },
  {
    path: '/productInfo',
    name: 'productInfo',
    component: productInfo,
  },
  {
    path: '/account',
    name: 'account',
    component: account,
  },
  {
    path: '/404',
    name: '404',
    component: error404,
  },
  { 
    path: '/:pathMatch(.*)',
    redirect: '/404'
  },
]

// 防止连续点击多次路由报错
let routerPush = VueRouter.prototype.push;
let routerReplace = VueRouter.prototype.replace;
// push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location) {
  return routerReplace.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
