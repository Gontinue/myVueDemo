import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Goods from '@/components/pages/Goods'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'
import Member from '@/components/pages/Member'

Vue.use(Router)

export default new Router({
  routes: [
    { path:'/main', name: 'Main', component:Main,
        children: [
          { path:'', name: 'ShoppingMall', component:ShoppingMall},
          { path:'/cart', name: 'Cart', component:Cart},
          { path:'/member', name: 'Member', component:Member},
        ]
    },
    { path:'/goods', name: 'Goods', component:Goods},
  ]
})
