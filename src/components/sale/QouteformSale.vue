<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const toast = useToast();
const router = useRouter();
const qtvisible = ref(false);
const data = ref([]);
const visible = ref(true);
const formqtvisible = ref(false);
const taxId = ref("");
const allqt = ref([]);
const qtstatus = ref([]);
const userName = ref("");

userName.value = store.state.userName;

const goPhasetime = () => {
  router.push("/phasetime");
};

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
  quantity: "สถานี",
  time1: "",
  time2: "",
  type: "",
  frequency: null,
  unitPrice: null,
  totalAmount: null,
});

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

const getamphure = async (type) => {
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

onMounted(() => {
  getprovince();
  getAllqt();
  console.log("userName : ", userName.value);
});
const cancelForm = () => {
  resetForm();
  visible.value = false;
};
const hideDetail = () => {
  qtvisible.value = false;
};
const submitForm = () => {
  console.log("Form data:", {
    analysisMethod: analysisMethod.value,
  });
};
const addwork = () => {
  showSuccess();
  data.value.pop();
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
    time1: formData.value.time1,
    time2: formData.value.time2,
    type: formData.value.type,
  });
};
const getAllqt = async () => {
  try {
    const authToken = store.getters.token;
    const response = await axios.get(
      `${import.meta.env.VITE_VUE_APP_LAB_API}/quotation/GetAllQuotation`,
      {
        headers: {
          "auth-token": `Bearer ${authToken}`,
        },
      }
    );
    const resdata = response.data.data;
    allqt.value = resdata;
    qtstatus.value = response.data.data.status;
    console.log("allqt : ", allqt.value);
    console.log("qtstatus : ", qtstatus.value);
  } catch (error) {
    console.log("error : ", error);
  }
};
const showSuccess = () => {
  toast.add({
    severity: "success",
    summary: "เพิ่มข้อมูลสำเร็จ",
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
      return "bg-yellow-500 text-white";
    case "อนุมัติ":
      return "bg-green-500 text-white";
    case "ไม่อนุมัติ":
      return "bg-red-500 text-white";
    default:
      return "";
  }
};
</script>

<template>
  <div class="py-1 h-full">
    <h1 class="text-[2rem] te text-center font-semibold">รายการในเสนอ</h1>
    <div class="w-full bg-red-200">
      <!-- DataTable for Quotations -->
      <DataTable
        v-model:expandedRows="expandedRows"
        :value="allqt"
        dataKey="id"
        tableStyle="min-width: 60rem"
        :style="{ padding: '0rem' }"
      >
        <template #header>
          <div class="flex flex-wrap justify-content-end gap-2">
            <!-- Button to add new quotation -->
            <Button
              @click="showqtvisible()"
              label="เพิ่มใบเสนอราคา"
              severity="secondary"
              icon="pi pi-user-plus"
              text
              raised
              class="bg-teal-500 text-white rounded-xl font-bold py-2.5 px-2"
            />
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
      </DataTable>
      <Paginator
        :rows="5"
        :totalRecords="allqt.length"
        :rowsPerPageOptions="[5, 10, 20]"
      ></Paginator>
    </div>
    <Dialog
      v-model:visible="formqtvisible"
      modal
      header="Form"
      :style="{ padding: '0rem 1rem', width: '50%' }"
    >
      <div class="w-full">
        <div
          class="relative bg-gray-100 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center flex justify-center">
              <h6 class="text-blueGray-700 text-xl font-bold">
                กรอกรายละเอียดใบเสนอราคา
              </h6>
            </div>
          </div>
          <!-- ส่วนเรียนผู้ค้า -->
          <div>
            <form class="p-2 bg-red-200">
              <div class="w-full">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    เรียน
                  </label>
                  <input
                    v-model="formData.recipientName"
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    บริษัท
                  </label>
                  <input
                    v-model="formData.companyName"
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <!-- ที่อยู่ -->
              <div class="mb-4">
                <label
                  for="address"
                  class="block text-sm font-medium text-gray-700"
                  >ที่อยู่</label
                >
                <input
                  type="text"
                  id="address"
                  v-model="formData.address"
                  class="mt-1 p-2 w-full border rounded-md bg-white text-black"
                  placeholder="กรอกที่อยู่"
                />
              </div>
              <div
                class="w-full flex py-2 justify-between items-center max-w-[1280px]:flex-col"
              >
                <!-- จังหวัด -->
                <div>
                  <label for="province" class="pr-2"> จังหวัด :</label>
                  <Dropdown
                    v-model="formData.provinceValue"
                    :options="provincedropdown"
                    optionLabel="name_th"
                    optionValue="name_th"
                    placeholder="เลือกจังหวัด"
                    @change="getamphure('amphure')"
                    filter
                  />
                </div>
                <!-- อำเภอ -->
                <div>
                  <label for="amphure" class="pr-2"> อำเภอ :</label>
                  <Dropdown
                    v-model="formData.amphureValue"
                    :options="amphuredropdown"
                    optionLabel="name_th"
                    optionValue="name_th"
                    placeholder="เลือกอำเภอ"
                    @change="getamphure('tambon')"
                    filter
                  />
                </div>
                <!-- ตำบล -->
                <div>
                  <label for="tambon" class="pr-2"> ตำบล :</label>
                  <Dropdown
                    v-model="formData.tumbolValue"
                    :options="tambondropdown"
                    optionLabel="name_th"
                    optionValue="name_th"
                    placeholder="เลือกตำบล"
                    filter
                  />
                </div>
              </div>
              <!-- postcode/tel -->
              <div class="flex grid-cols-2">
                <div class="w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    รหัสไปรษณีย์
                  </label>
                  <input
                    v-model="formData.postcode"
                    type="number"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div class="w-full px-4">
                  <div class="w-full mb-3">
                    <label
                      class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlfor="grid-password"
                    >
                      โทร
                    </label>
                    <input
                      v-model="formData.phoneNumber"
                      type="number"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
              </div>
              <div class="w-full">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    สถานที่การเก็บตัวอย่าง
                  </label>
                  <input
                    v-model="formData.sampleLocation"
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="flex flex-col px-4 lg:px-10 py-10 pt-0">
            <form>
              <hr class="my-6 border-b-2 border-black" />
              <div>
                <Phasetime />
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    ระยะเวลางาน
                  </label>
                  <div class="flex gap-x-4">
                    <input
                      v-model="formData.period"
                      type="text"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    <Button
                      @click="goPhasetime()"
                      class="bg-green-400 text-white p-2 hover:bg-green-700 w-[10%]"
                      label="ตกลง"
                    />
                  </div>
                </div>
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    รายละเอียดงาน
                  </label>
                  <input
                    v-model="formData.projectDetails"
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    วิธีการวิเคราะห์
                  </label>
                  <input
                    v-model="formData.analysisMethod"
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    จำนวน/ครั้ง
                  </label>
                  <div class="flex gap-x-4">
                    <input
                      placeholder="ระบุจำนวน"
                      v-model="formData.time1"
                      type="text"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    <input
                      placeholder="ระบุครั้ง"
                      v-model="formData.quantity"
                      type="text"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    ความถี่
                  </label>
                  <div class="flex gap-x-4">
                    <input
                      placeholder="ระบุครั้ง"
                      v-model="formData.time2"
                      type="text"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                    <input
                      placeholder="ระบุประเภท เดือน/ครั้ง"
                      v-model="formData.type"
                      type="text"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    ราคา/หน่วย
                  </label>
                  <input
                    placeholder="ระบุราคาต่อหน่วย"
                    v-model="formData.unitPrice"
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    จำนวนเงิน
                  </label>
                  <input
                    placeholder="ระบุราคา"
                    v-model="formData.totalAmount"
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <hr class="my-6 border-b-1 border-blueGray-300" />

              <div class="flex w-full justify-center gap-x-4">
                <Toast />
                <Button
                  class="bg-teal-300 hover:bg-teal-700 hover:text-white p-2 rounded-lg text-base font-medium"
                  type="button"
                  label="เพิ่ม"
                  @click="addwork()"
                />
                <Button
                  class="bg-sky-500 hover:bg-sky-700 hover:text-white p-2 rounded-lg text-base font-medium"
                  type="button"
                  label="แสดงตัวอย่าง"
                  @click="exform()"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
  <Dialog
    v-model:visible="qtvisible"
    modal
    class="flex w-3/5 card bg-white p-0"
  >
    <div class="flex flex-col w-full items-center justify-center p-0">
      <div
        class="w- bg-white flex flex-col border-2 border-black justify-center shadow-lg"
      >
        <!-- ส่วนบน -->
        <div>
          <div class="flex items-center justify-between p-4">
            <div class="w-2/5">
              <img src="../template/qt-img/spj.png" alt="" />
            </div>
            <div class="p-2 text-sm">
              <p>
                80 ซอยนักกีฬาแหลมทอง 3 แขวงทับช้าง เขตสะพานสูง กรุงเทพฯ 10250
              </p>
              <p>
                80 Soi Nakkilalaemthong 3, Thap Chang, Saphansoong, Bangkok
                10250
              </p>
              <p>
                โทร : 0 2735-7520-2 โทรสาร : 0 2735 7238 E-mail :
                spj.sci@gmail.com
              </p>
            </div>
            <div class="w-[5rem]">
              <img src="../template/qt-img/th.png" alt="" />
            </div>
          </div>
          <div>
            <h1 class="text-center text-xl font-semibold py-2">ใบเสนอราคา</h1>
          </div>
        </div>
        <!-- ส่วนเรียน -->
        <div
          class="flex py-4 justify-between px-4 border-t-2 border-b-2 border-black"
        >
          <div class="flex flex-col gap-y-2 w-full">
            <p>เรียน : {{ formData.recipientName }}</p>
            <p>บริษัท : {{ formData.companyName }}</p>
            <p>
              ที่อยู่ : {{ formData.address }} {{ formData.tambonValue }}
              {{ formData.amphureValue }} {{ formData.provinceValue }}
              {{ formData.postcode }}
            </p>
            <div class="flex grid-cols-2 justify-between">
              <p>โทร : {{ formData.phoneNumber }}</p>
            </div>
            <p>สถานที่การเก็บตัวอย่าง : {{ formData.sampleLocation }}</p>
          </div>
          <div class="py-1 flex w-full px-2">
            <div class="flex flex-col gap-y-2 w-full">
              <p>เลขที่/No. :</p>
              <p>วันที่/Date :</p>
              <p>ผู้เสนอราคา : {{ userName }}</p>
              <p>เลขประจำตัวผู้เสียภาษี : {{ taxId }}</p>
            </div>
          </div>
        </div>
        <!-- ส่วนรายละเอียด -->
        <div class="flex justify-center p-4 w-full overflow-x-auto">
          <table v-if="data && data.length > 0">
            <thead>
              <tr>
                <th class="py-2 px-2 border text-center border-gray-400">
                  ลำดับ
                </th>
                <th class="py-2 px-2 border text-center border-gray-400">
                  รายละเอียดโครงการ
                </th>
                <th class="py-2 px-2 border text-center border-gray-400">
                  วิธีการวิเคราะห์
                </th>
                <th
                  class="py-2 px-2 border text-center border-gray-400"
                  colspan="2"
                >
                  จำนวน
                </th>
                <th
                  class="py-2 px-2 border text-center border-gray-400"
                  colspan="2"
                >
                  ความถี่
                </th>
                <th class="py-2 px-2 border text-center border-gray-400">
                  ราคา/หน่วย
                </th>
                <th class="py-2 px-2 border text-center border-gray-400">
                  จำนวนเงิน
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="w-full h-0.5 bg-black"></div>
        <div class="p-4">
          <div class="flex items-end justify-end space-x-3">
            <!-- <button class="px-4 py-2 text-sm text-green-600 bg-green-100">
              Print
            </button>
            <button class="px-4 py-2 text-sm text-blue-600 bg-blue-100">
              Save
            </button> -->
            <button
              @click="hideDetail()"
              class="px-4 py-2 text-sm text-red-600 bg-red-100"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
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
