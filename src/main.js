// src/main.js
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Button from "primevue/button";
import Sidebar from "primevue/sidebar";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";

import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import Paginator from "primevue/paginator";

import "tailwindcss/tailwind.css";
import "@headlessui/vue";
// import "primevue/resources/themes/saga-green/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primevue/resources/themes/aura-light-green/theme.css";

import "./style.css";
import ToastService from "primevue/toastservice";

const app = createApp(App);

app.use(PrimeVue);
app.use(router);
app.use(store);
app.use(ToastService);

app.component("Button", Button);
app.component("Sidebar", Sidebar);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("Dialog", Dialog);
app.component("Dropdown", Dropdown);
app.component("InputText", InputText);
app.component("Toast", Toast);
app.component("Paginator", Paginator);

app.mount("#app");
