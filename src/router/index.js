import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/Index'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home'),
      },
      {
        path: '/order',
        name: 'order',
        meta:{isAuthorization:true},
        component: () => import('@/views/Order'),
      },
      {
        path: '/my',
        name: 'my',
        meta:{isAuthorization:true},
        component: () => import('@/views/My'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
  },
  {
    path:"/Address",
    name:"Address",
    component:()=>import('@/views/Address')
  },
  {
    path:"/Study",
    name:"Study",
    component:()=>import('@/views/Study')
  },
  {
    path:"/Search",
    name:"Search",
    component:()=>import('@/views/Search')
  },{
    path:"/shopDetail/:shopid.html",
    name:"shopDetail",
    component:()=>import('@/views/shopDetail')
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'is-selected',
});
//全局守卫
router.beforeEach((to,from,next)=>{
  //meta 为true 时需要验证user
  if(to.meta.isAuthorization){
      if(localStorage.token){
        next()
      }else{
        next("/login")
      }
  }else{
    next()
  }
 
  })
  
export default router;
