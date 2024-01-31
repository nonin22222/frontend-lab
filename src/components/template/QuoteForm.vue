<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const dialogvisible = ref(false);
const qtvisible = ref(false);
const products = ref([]);

const data = ref([]);

const userEdit = ref(false);
const alertvisible = ref(false);
const alertfailvisible = ref(false);
const visible = ref(true);

const totalAmountAll = ref(null);
const discount = ref(null);
const remainingAmount = ref(null);
const processingFee = ref(null);
const operationCost = ref(null);
const vat = ref(null);
const grandTotal = ref(null);

const quotationNumber = ref("");
const quotationDate = ref("");
const quotationIssuer = ref("");
const mobileNumber = ref("");
const taxId = ref("");

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
});

const cancelForm = () => {
  resetForm();
  visible.value = false;
};
const submitForm = () => {
  console.log("Form data:", {
    analysisMethod: analysisMethod.value,
  });
};
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

const showSuccess = () => {
  toast.add({
    severity: "success",
    summary: "เพิ่มข้อมูลสำเร็จ",
    // detail: "Message Content",
    life: 3000,
  });
};
const exform = () => {
  qtvisible.value = true;
};
</script>

<template>
  <div class="py-1 h-full">
    <div class="w-full bg-red-200"></div>
    <div class="w-8/12 px-4 mx-auto mt-6">
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
        <div class="flex flex-col px-4 lg:px-10 py-10 pt-0">
          <form>
            <div class="flex w-full flex-col mt-3">
              <div class="flex gap-x-4">
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
              </div>
              <div>
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
            </div>

            <hr class="my-6 border-b-2 border-black" />

            <div>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlfor="grid-password"
                >
                  ระยะเวลางาน
                </label>
                <input
                  v-model="formData.period"
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
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
                  จำนวน
                </label>
                <input
                  placeholder="ระบุจำนวน"
                  v-model="formData.quantity"
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlfor="grid-password"
                >
                  ความถี่
                </label>
                <input
                  placeholder="ระบุความถี่"
                  v-model="formData.frequency"
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
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
  </div>
  <Dialog
    v-model:visible="qtvisible"
    modal
    class="flex w-3/5 card bg-white p-0"
  >
    <div class="flex flex-col w-full items-center justify-center p-0">
      <div
        class="w-4/5 bg-white flex flex-col border-2 border-black justify-center shadow-lg"
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
              <p>โทรสาร :</p>
            </div>
            <p>สถานที่การเก็บตัวอย่าง : {{ formData.sampleLocation }}</p>
          </div>
          <div class="py-1 flex w-full px-2">
            <div class="flex flex-col gap-y-2 w-full">
              <p>เลขที่/No. :</p>
              <p>วันที่/Date :</p>
              <p>ผู้เสนอราคา :</p>
              <p>เลขประจำตัวผู้เสียภาษี : {{ taxId }}</p>
            </div>
          </div>
        </div>
        <!-- ส่วนรายละเอียด -->
        <div class="flex justify-center p-4">
          <div class="border-b border-gray-200 shadow w-full">
            <table v-if="data && data.length > 0">
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>ระยะเวลางาน</th>
                  <th>รายละเอียดงาน</th>
                  <th>จำนวน</th>
                  <th>ความถี่</th>
                  <th>ราคา/หน่วย</th>
                  <th>จำนวนเงิน</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in data" :key="index">
                  <td></td>
                  <td>{{ item.period }}</td>
                  <td>{{ item.projectDetails }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.frequency }}</td>
                  <td>{{ item.unitPrice }}</td>
                  <td>{{ item.totalAmount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="w-full h-0.5 bg-black"></div>
        <div class="p-4">
          <div class="flex items-end justify-end space-x-3">
            <button class="px-4 py-2 text-sm text-green-600 bg-green-100">
              Print
            </button>
            <button class="px-4 py-2 text-sm text-blue-600 bg-blue-100">
              Save
            </button>
            <button class="px-4 py-2 text-sm text-red-600 bg-red-100">
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
