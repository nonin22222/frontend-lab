// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import PageView from "../components/PageView.vue";
import dashboardAdmin from "../views/dashboardAdmin.vue";
import QuoteForm from "../components/template/QuoteForm.vue";
import Adduser from "../views/Adduser.vue";
import EmployeeView from "../components/employee/EmployeeView.vue";
import Settings from "../views/Settings.vue";
import ManageEmp from "../components/admin/ManageEmp.vue";

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
          path: "/settings",
          component: Settings,
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
      ],
    },
    { path: "/employee", component: EmployeeView },
  ],
});
export default router;
