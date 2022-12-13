import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../components/DefaultLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Register from "../views/Register.vue";
import Surveys from "../views/Surveys.vue";
import store from './../store/index';
const routes = [
  {
    path: "/",
    redirect:"/dashboard",
    component: DefaultLayout,
    meta: {requireAuth: true},
    children: [
        {
            path: "/dashboard",
            name: "Dashboard",
            component: Dashboard,
        },
        {
            path: "/surveys",
            name: "Surveys",
            component: Surveys,
        },
    ],
  },
  {
    path:"/auth",
    redirect:"/login",
    meta: {isGuest:true},
    component: AuthLayout,
    children:[
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
      },
    ]
  }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  router.beforeEach((to, from, next) => {
    if(to.meta.requireAuth && !store.state.user.token){
      next({
        name:'Login',
      });
    }else if(store.state.user.token && (to.meta.isGuest)){
      next({
        name:'Dashboard',
      });
    }
    else{
      next();
    }
  })
export default router;
