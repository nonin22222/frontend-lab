// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import PageView from "../components/PageView.vue";
import dashboardAdmin from "../views/dashboardAdmin.vue";
import QuoteForm from "../components/template/QuoteForm.vue";
import Adduser from "../views/Adduser.vue";
import EmployeeView from "../components/employee/EmployeeView.vue";
import ManageEmp from "../components/admin/ManageEmp.vue";
import ManageSales from "../components/admin/ManageSales.vue";
import Dashboard from "../components/admin/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: PageView },
    {
      path: "/admin",
      component: dashboardAdmin,
      name: "admin",
      children: [
        {
          path: "/dashboard",
          component: Dashboard,
        },
        {
          path: "/quoteForm",
          component: QuoteForm,
        },
        {
          path: "/adduser",
          component: Adduser,
        },
        {
          path: "/manageemp",
          component: ManageEmp,
        },
        {
          path: "/managesales",
          component: ManageSales,
        },
      ],
      meta: { requiresAuth: true },
    },
    { path: "/employee", component: EmployeeView },
  ],
});

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = store.getters.logedIn;

//   console.log("isAuthenticated:", isAuthenticated);

//   if (!isAuthenticated) {
//     if (to.meta.requiresAuth) {
//       next("/");
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
