<script setup>
import { ref, onMounted } from "vue";

const dialogvisible = ref(false);
const products = ref([]);

const userEdit = ref(false);
const alertvisible = ref(false);
const alertfailvisible = ref(false);
const visible = ref(true);

const recipientName = ref("");
const companyName = ref("");
const address = ref("");
const phoneNumber = ref("");
const sampleLocation = ref("");

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

const projectDetails = ref("");
const analysisMethod = ref("");
const quantity = ref(0);
const frequency = ref("");
const unitPrice = ref(0);
const totalAmount = ref(0);

const submitForm = () => {
  // Handle form submission logic here
  console.log("Form submitted:", {
    recipientName: recipientName.value,
    companyName: companyName.value,
    address: address.value,
    phoneNumber: phoneNumber.value,
    sampleLocation: sampleLocation.value,
    quotationNumber: quotationNumber.value,
    quotationDate: quotationDate.value,
    quotationIssuer: quotationIssuer.value,
    mobileNumber: mobileNumber.value,
    taxId: taxId.value,
    projectDetails: projectDetails.value,
    analysisMethod: analysisMethod.value,
    quantity: quantity.value,
    frequency: frequency.value,
    unitPrice: unitPrice.value,
    totalAmount: totalAmount.value,
  });

  // Reset form fields
  resetForm();
};
const cancelForm = () => {
  resetForm();
  visible.value = false;
};
const resetForm = () => {
  recipientName.value = "";
  companyName.value = "";
  address.value = "";
  phoneNumber.value = "";
  sampleLocation.value = "";
  quotationNumber.value = "";
  quotationDate.value = "";
  quotationIssuer.value = "";
  mobileNumber.value = "";
  taxId.value = "";
  projectDetails.value = "";
  analysisMethod.value = "";
  quantity.value = 0;
  frequency.value = "";
  unitPrice.value = 0;
  totalAmount.value = 0;
  products.value = "";
};
const alertvisiblebtn = () => {
  if (recipientName.value !== "" || grandTotal.value !== "") {
    alertvisible.value = true;
    setTimeout(() => {
      alertvisible.value = false;
    }, 2000);
  } else {
    alertfailvisible.value = true;
    console.log("ไม่มีข้อมูล");
    setTimeout(() => {
      alertfailvisible.value = false;
    }, 2000);
  }
};
const exform = () => {
  dialogvisible.value = true;
};
</script>

<template>
  <section class="py-1 bg-blueGray-50">
    <div class="w-full lg:w-8/12 px-4 mx-auto mt-6">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
      >
        <div class="rounded-t bg-white mb-0 px-6 py-6">
          <div class="text-center flex justify-center">
            <h6 class="text-blueGray-700 text-xl font-bold">
              กรอกรายละเอียดใบเสนอราคา
            </h6>
          </div>
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <!-- <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              เรียน
            </h6> -->
            <div class="flex flex-wrap mt-3">
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    เรียน
                  </label>
                  <input
                    v-model="recipientName"
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    บริษัท
                  </label>
                  <input
                    v-model="companyName"
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    ที่อยู่
                  </label>
                  <input
                    v-model="address"
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    โทร
                  </label>
                  <input
                    v-model="phoneNumber"
                    type="number"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    สถานที่การเก็บตัวอย่าง
                  </label>
                  <input
                    v-model="sampleLocation"
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>

            <hr class="mt-6 border-b-1 border-blueGray-300" />

            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Contact Information
            </h6>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-4/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    City
                  </label>
                  <input
                    type="email"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-4/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div class="w-full lg:w-4/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>

            <hr class="mt-6 border-b-1 border-blueGray-300" />

            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              About Me
            </h6>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    About me
                  </label>
                  <textarea
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>
            <div>
              <Button label="Show" @click="dialogvisible = true" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  <Dialog v-model:visible="dialogvisible" class="flex 3/5 justify-center p-4">
    <div
      class="flex flex-col w-full bg-white justify-center items-center text-black rounded-md"
    >
      <div class="flex flex-col gap-4 mb-6">
        <div class="flex w-full justify-center text-2xl font-semibold">
          <h1>ใบเสนอราคา</h1>
        </div>
        <div class="grid grid-cols-2 w-full gap-x-4">
          <!-- ฝั่งซ้าย -->
          <div class="flex flex-col w-full gap-y-4">
            <div class="flex items-center gap-x-2 w-full">
              <label
                for="recipientName"
                class="block text-sm font-medium w-3/12"
                >เรียน :</label
              >
              <input
                v-model="recipientName"
                type="text"
                id="recipientName"
                class="bg-transparent"
                :class="{
                  'border-2': userEdit,
                }"
                :readonly="!userEdit"
                :disabled="!userEdit"
              />
            </div>
            <div class="flex items-center gap-x-2">
              <label for="companyName" class="block text-sm font-medium w-3/12"
                >บริษัท :</label
              >
              <input
                v-model="companyName"
                type="text"
                id="companyName"
                class="bg-transparent"
                :class="{
                  'border-2': userEdit,
                }"
                :readonly="!userEdit"
                :disabled="!userEdit"
              />
            </div>
            <div class="flex items-center gap-x-2">
              <label for="address" class="block text-sm font-medium w-3/12"
                >ที่อยู่ :</label
              >
              <input
                v-model="address"
                type="text"
                id="address"
                class="bg-transparent"
                :class="{
                  'border-2': userEdit,
                }"
                :readonly="!userEdit"
                :disabled="!userEdit"
              />
            </div>
            <div class="flex items-center gap-x-2">
              <label for="phoneNumber" class="block text-sm font-medium w-3/12"
                >โทร :</label
              >
              <input
                v-model="phoneNumber"
                id="phoneNumber"
                class="bg-transparent"
                :class="{
                  'border-2': userEdit,
                }"
                :readonly="!userEdit"
                :disabled="!userEdit"
              />
            </div>
            <div class="flex items-center gap-x-2">
              <label
                for="sampleLocation"
                class="block text-sm font-medium w-full"
                >สถานที่การเก็บตัวอย่าง :</label
              >
              <input
                v-model="sampleLocation"
                id="sampleLocation"
                type="text"
                class="bg-transparent"
                :class="{
                  'border-2': userEdit,
                }"
                :readonly="!userEdit"
                :disabled="!userEdit"
              />
            </div>
          </div>
          <!-- ฝั่งขวา -->
          <div class="flex flex-col w-full gap-y-4">
            <div class="flex items-center gap-x-2">
              <label
                for="quotationNumber"
                class="block text-sm font-medium w-3/12"
                >เลขที่ :</label
              >
              <input
                v-model="quotationNumber"
                type="text"
                id="quotationNumber"
                class="bg-transparent"
                :class="{
                  'border-2': userEdit,
                }"
                :readonly="!userEdit"
                :disabled="!userEdit"
              />
            </div>
            <div class="flex items-center gap-x-2">
              <label
                for="quotationDate"
                class="block text-sm font-medium w-3/12"
                >วันที่/Date :</label
              >
              <input
                v-model="quotationDate"
                type="text"
                id="quotationDate"
                class="bg-transparent"
                :class="{
                  'border-2': userEdit,
                }"
                :readonly="!userEdit"
                :disabled="!userEdit"
              />
            </div>
            <div class="flex items-center gap-x-2">
              <label
                for="quotationIssuer"
                class="block text-sm font-medium w-3/12"
                >ผู้เสนอราคา :</label
              >
              <input
                v-model="quotationIssuer"
                type="text"
                id="quotationIssuer"
                class="bg-transparent"
                :class="{
                  'border-2': userEdit,
                }"
                :readonly="!userEdit"
                :disabled="!userEdit"
              />
            </div>
            <div class="flex items-center gap-x-2">
              <label for="mobileNumber" class="block text-sm font-medium w-3/12"
                >มือถือ :</label
              >
              <input
                v-model="mobileNumber"
                type="text"
                id="mobileNumber"
                class="bg-transparent"
                :class="{
                  'border-2': userEdit,
                }"
                :readonly="!userEdit"
                :disabled="!userEdit"
              />
            </div>
            <div class="flex items-center gap-x-2">
              <label for="taxId" class="block text-sm font-medium w-full"
                >เลขประจำตัวผู้เสียภาษี :</label
              >
              <input
                v-model="taxId"
                id="taxId"
                type="text"
                class="bg-transparent"
                :class="{
                  'border-2': userEdit,
                }"
                :readonly="!userEdit"
                :disabled="!userEdit"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-full flex-col gap-y-2">
        <div>
          <DataTable
            :value="products"
            resizableColumns
            columnResizeMode="expand"
            showGridlines
            tableStyle="min-width: 50rem"
          >
            <Column field="code" header="ลำดับ"></Column>
            <Column field="projectDetails" header="รายละเอียดโครงการ"></Column>
            <Column field="analysisMethod" header="วิธีการวิเคราะห์"></Column>
            <Column field="quantity" header="จำนวน"></Column>
            <Column field="frequency" header="ความถี่"></Column>
            <Column field="unitPrice" header="ราคา/หน่วย"></Column>
            <Column field="totalAmount" header="จำนวนเงิน"></Column>
          </DataTable>
        </div>
        <div class="flex w-full">
          <div class="flex flex-col w-full p-4 gap-y-2 items-center">
            <div class="flex items-center gap-x-2 w-full justify-end">
              <label
                for="totalAmountAll"
                class="block text-sm font-medium w-3/12"
                >รวมเป็นเงิน :</label
              >
              <input
                v-model="totalAmountAll"
                type="text"
                id="totalAmountAll"
                class="bg-transparent"
                :class="{
                  'border-2': userEdit,
                }"
                :readonly="!userEdit"
                :disabled="!userEdit"
              />
            </div>
            <div class="flex items-center gap-x-2 w-full justify-end">
              <label for="discount" class="block text-sm font-medium w-3/12"
                >ส่วนลด :</label
              >
              <input
                v-model="discount"
                type="text"
                id="discount"
                class="bg-transparent"
                :class="{
                  'border-2': userEdit,
                }"
                :readonly="!userEdit"
                :disabled="!userEdit"
              />
            </div>
            <div class="flex items-center gap-x-2 w-full justify-end">
              <label
                for="remainingAmount"
                class="block text-sm font-medium w-3/12"
                >คงเหลือ :</label
              >
              <input
                v-model="remainingAmount"
                type="text"
                id="remainingAmount"
                class="bg-transparent"
                :class="{
                  'border-2': userEdit,
                }"
                :readonly="!userEdit"
                :disabled="!userEdit"
              />
            </div>
            <div class="flex items-center gap-x-2 w-full justify-end">
              <label
                for="processingFee"
                class="block text-sm font-medium w-3/12"
                >ค่าดำเนินการ :</label
              >
              <input
                v-model="processingFee"
                type="text"
                id="processingFee"
                class="bg-transparent"
                :class="{
                  'border-2': userEdit,
                }"
                :readonly="!userEdit"
                :disabled="!userEdit"
              />
            </div>
            <div class="flex items-center gap-x-2 w-full justify-end">
              <label
                for="operationCost"
                class="block text-sm font-medium w-3/12"
                >รวมเป็นเงิน :</label
              >
              <input
                v-model="operationCost"
                type="text"
                id="operationCost"
                class="bg-transparent"
                :class="{
                  'border-2': userEdit,
                }"
                :readonly="!userEdit"
                :disabled="!userEdit"
              />
            </div>
            <div class="flex items-center gap-x-2 w-full justify-end">
              <label for="vat" class="block text-sm font-medium w-3/12"
                >ภาษีมูลค่าเพิ่ม 7% :</label
              >
              <input
                v-model="vat"
                type="text"
                id="vat"
                class="bg-transparent"
                :class="{
                  'border-2': userEdit,
                }"
                :readonly="!userEdit"
                :disabled="!userEdit"
              />
            </div>
            <div class="flex items-center gap-x-2 w-full justify-end">
              <label for="grandTotal" class="block text-sm font-medium w-3/12"
                >จำนวนเงินรวมทั้งสิ้น :</label
              >
              <input
                v-model="grandTotal"
                type="text"
                id="grandTotal"
                class="bg-transparent"
                :class="{
                  'border-2': userEdit,
                }"
                :readonly="!userEdit"
                :disabled="!userEdit"
              />
            </div>
          </div>
        </div>
        <!-- btn -->
        <div>
          <div class="flex items-center justify-between gap-x-8 px-12">
            <button
              type="button"
              class="btn btn-error flex-1 ml-4"
              @click="cancelForm"
            >
              ยกเลิก
            </button>
            <button
              @click="alertvisiblebtn"
              type="submit"
              class="btn btn-primary flex-1"
            >
              ส่งใบเสนอราคา
            </button>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<style></style>
