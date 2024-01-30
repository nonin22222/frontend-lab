// src/main.js
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Button from "primevue/button";
import Sidebar from "primevue/sidebar";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import Dialog from "primevue/dialog";

import "tailwindcss/tailwind.css";
import "@headlessui/vue";
import "daisyui/dist/full.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "./style.css";

const app = createApp(App);

app.use(PrimeVue);
app.use(router);
app.use(store);

app.component("Button", Button);
app.component("Sidebar", Sidebar);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("Dialog", Dialog);

app.mount("#app");
