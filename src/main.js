// src/main.js

// Import libraries and components
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Import PrimeVue components
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
import FileUpload from "primevue/fileupload";

// Import styles
import "tailwindcss/tailwind.css";
import "@headlessui/vue";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primevue/resources/themes/aura-light-green/theme.css";
import "./style.css";

// Import ToastService
import ToastService from "primevue/toastservice";

// Create Vue app
const app = createApp(App);

// Use plugins and components
app.use(PrimeVue);
app.use(router);
app.use(store);
app.use(ToastService);

// Register components
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
app.component("FileUpload", FileUpload);

// Mount the app
app.mount("#app");
