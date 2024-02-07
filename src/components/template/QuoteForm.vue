<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";

import OrderDetail from "../template/QuoteDetail.vue";

const store = useStore();
const loading = ref(store.state.loading);
const toast = useToast();
const qtvisible = ref(false);
const data = ref([]);
const visible = ref(true);
const formqtvisible = ref(false);
const taxId = ref("");
const allqt = ref([]);
const authtoken = store.getters.token;
const formData = ref({
  recipientName: "",
  companyName: "",
  address: "",
  phoneNumber: "",
  provinceValue: "",
  amphureValue: "",
  tambonValue: "",
  postcode: "",
  sampleLocation: "",
  period: "",
  projectDetails: "",
  analysisMethod: "",
  quantity: null,
  frequency: null,
  unitPrice: null,
  totalAmount: null,
});

const showButton = ref(true);

const provincedropdown = ref([]);
const amphuredropdown = ref([]);
const tambondropdown = ref([]);

const getprovince = async () => {
  try {
    const province = await axios.get(
      `${import.meta.env.VITE_VUE_APP_THAILAND}thailand/province`
    );
    provincedropdown.value = province.data;
  } catch (error) {
    console.log("error : ", error);
  }
};

const getamphure = async () => {
  try {
    if (type === "amphure") {
      const selectedProvinceObject = provincedropdown.value.find(
        (province) => province.name_th === formData.value.provinceValue
      );
      if (selectedProvinceObject) {
        const id = selectedProvinceObject.id;
        const amphure = await axios.get(
          `${
            import.meta.env.VITE_VUE_APP_THAILAND
          }thailand/amphure/by-province-id/${id}`
        );

        formData.value.selectedProvince = selectedProvinceObject;

        amphuredropdown.value = amphure.data;
      }
    }
    if (type === "tambon") {
      const selectedAmphureObject = amphuredropdown.value.find(
        (amphure) => amphure.name_th === formData.value.amphureValue
      );

      if (selectedAmphureObject) {
        const id = selectedAmphureObject.id;
        const tambon = await axios.get(
          `${
            import.meta.env.VITE_VUE_APP_THAILAND
          }thailand/tambon/by-amphure-id/${id}`
        );
        formData.value.selectedAmphure = selectedAmphureObject;

        tambondropdown.value = tambon.data;
      }
    }
  } catch (error) {
    console.error(error);
  }
};
// สนานะ
const approveqt = async (id) => {
  try {
    const authToken = store.getters.token;
    const response = await axios.put(
      `${
        import.meta.env.VITE_VUE_APP_LAB_API
      }/admin/quotation/ApproveQuotation/${id}`,
      null,
      {
        headers: {
          "auth-token": `Bearer ${authToken}`,
        },
      }
    );
    const res = response.data;
    console.log("res : ", res);
    showSuccess();
    getAllqt();
    window.location.reload();
  } catch (error) {
    console.log("error : ", error);
  }
};
const unapproveqt = async (id) => {
  try {
    const authToken = store.getters.token;
    console.log("authToken : ", authToken);
    const response = await axios.put(
      `${
        import.meta.env.VITE_VUE_APP_LAB_API
      }/admin/quotation/RejectQuotation/${id}`,
      null,
      {
        headers: {
          "auth-token": `Bearer ${authToken}`,
        },
      }
    );
    const res = response.data;
    console.log("res : ", res);
    showWarn();
    window.location.reload();
  } catch (error) {
    console.log("error : ", error);
  }
};
const delqt = async (id) => {
  try {
    const authToken = store.getters.token;
    loading.value = true;
    console.log("authToken : ", authToken);
    const response = await axios.delete(
      `${import.meta.env.VITE_VUE_APP_LAB_API}/admin/quotation/deleteQT/${id}`,
      {
        headers: {
          "auth-token": `Bearer ${authToken}`,
        },
      }
    );
    const res = response.data;
    console.log("res : ", res);
    showError();
    loading.value = false;
    window.location.reload();
  } catch (error) {
    console.log("error : ", error);
    loading.value = false;
  }
};

// แสดงเมื่อเริ่มต้น
onMounted(() => {
  console.log("authtoken : ", authtoken);
  getprovince();
  getAllqt();
});
const addwork = () => {
  showSuccess();
  data.value.push({
    recipientName: formData.value.recipientName,
    companyName: formData.value.companyName,
    address: formData.value.address,
    phoneNumber: formData.value.phoneNumber,
    provinceValue: formData.value.provinceValue,
    amphureValue: formData.value.amphureValue,
    tambonValue: formData.value.tambonValue,
    postcode: formData.value.postcode,
    sampleLocation: formData.value.sampleLocation,
    period: formData.value.period,
    projectDetails: formData.value.projectDetails,
    analysisMethod: formData.value.analysisMethod,
    quantity: formData.value.quantity,
    frequency: formData.value.frequency,
    unitPrice: formData.value.unitPrice,
    totalAmount: formData.value.totalAmount,
  });
};
const getAllqt = async () => {
  try {
    const authToken = store.getters.token;
    const response = await axios.get(
      `${import.meta.env.VITE_VUE_APP_LAB_API}/admin/quotation/getQuotationAll`,
      {
        headers: {
          "auth-token": `Bearer ${authToken}`,
        },
      }
    );
    const resdata = response.data.data;
    allqt.value = resdata;
    console.log("allqt", allqt.value);
  } catch (error) {
    console.log("error : ", error);
  }
};
const showSuccess = () => {
  toast.add({
    severity: "success",
    summary: "อนุมัติสำเร็จ",
    life: 3000,
  });
};
const showWarn = () => {
  toast.add({
    severity: "warn",
    summary: "ไม่อนุมัติ",
    life: 3000,
  });
};
const showError = () => {
  toast.add({
    severity: "error",
    summary: "ลบใบเสนอราคาสำเร็จ",
    life: 3000,
  });
};
const showqtvisible = () => {
  formqtvisible.value = true;
};
const exform = () => {
  qtvisible.value = true;
};
const lastStatus = (status) => {
  if (status && status.length > 0) {
    return status[status.length - 1].name;
  } else {
    return "";
  }
};
const statusColor = (status) => {
  switch (status) {
    case "รออนุมัติ":
      return "bg-yellow-100 border-1 border-yellow-500 text-yellow-500";
    case "อนุมัติ":
      return "bg-green-100 border-1 border-green-500 text-green-500";
    case "ไม่อนุมัติ":
      return "bg-red-100 border-1 border-red-500 text-red-500";
    default:
      return "";
  }
};
</script>

<template>
  <div class="py-1 h-full">
    <div
      v-if="loading"
      class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <ProgressSpinner />
    </div>
    <div class="w-full bg-red-200">
      <!-- DataTable for Quotations -->
      <DataTable
        v-model:expandedRows="expandedRows"
        :value="allqt"
        dataKey="id"
        tableStyle="min-width: 60rem"
      >
        <template #header>
          <div class="flex flex-wrap justify-content-end gap-2">
            <h1 class="text-2xl text-center w-full py-4 font-bold">
              รายการในเสนอ
            </h1>
          </div>
        </template>
        <Column field="quotation" header="เลขใบเสนอราคา"></Column>
        <Column field="employee_name" header="ชื่อพนักงาน"></Column>
        <Column field="start_date" header="วันที่ทำรายการ"></Column>
        <Column header="สถานะ" style="width: 15%">
          <template #body="item">
            <span
              :class="statusColor(lastStatus(item.data.status))"
              class="p-2 rounded-lg"
            >
              {{ lastStatus(item.data.status) }}
            </span>
          </template>
        </Column>
        <Column header="เพิ่มเติม" style="width: 25%">
          <template #body="slotProps">
            <Toast />
            <div class="flex gap-x-2">
              <!-- ปุ่มอนุมัติ -->
              <Button
                v-if="
                  lastStatus(slotProps.data.status) == 'รออนุมัติ'
                "
                @click="approveqt(slotProps.data._id)"
                label="อนุมัติ"
                icon="pi pi-check"
                class="p-button-success bg-green-500 text-white p-2 hover:bg-green-700"
              />
              <!-- ปุ่มไม่อนุมัติ -->
              <Button
                v-if="lastStatus(slotProps.data.status) == 'รออนุมัติ'"
                @click="unapproveqt(slotProps.data._id)"
                label="ไม่อนุมัติ"
                icon="pi pi-times"
                class="p-button-success bg-orange-500 text-white p-2 hover:bg-orange-700"
              />
              <!-- ปุ่มลบ -->
              <Button
                v-if="
                  lastStatus(slotProps.data.status) == 'อนุมัติ' ||
                  lastStatus(slotProps.data.status) == 'ไม่อนุมัติ'
                "
                @click="delqt(slotProps.data._id)"
                label="ลบ"
                icon="pi pi-trash"
                class="p-button-danger bg-red-500 p-2 text-white hover:bg-red-700"
              />
            </div>
          </template>
        </Column>
        <Column header="รายละเอียด">
          <template #body="item">
            <Button
              label="ยกเลิก"
              class="m-1"
              @click="cancelOrder(item.data._id)"
              v-if="lastStatus(item.data.status) === 'รอตรวจสอบ'"
            />
            <OrderDetail
              :order="item.data"
              :product_detail="item.data.product_detail"
            />
          </template>
        </Column>
      </DataTable>
      <Paginator
        :rows="5"
        :totalRecords="allqt.length"
        :rowsPerPageOptions="[5, 10, 20]"
      ></Paginator>
    </div>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-family: Arial, sans-serif;
}

th,
td {
  border: 1px solid #000000;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #ffffff;
}

tr:hover {
  background-color: #d0f4de;
}
</style>
