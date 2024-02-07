<template>
  <div class="text-white p-4">
    <div class="grid text-black grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label for="workDuration" class="block mb-1">ระยะเวลางาน</label>
        <input
          v-model="workData.workDuration"
          placeholder="ระบุระยะเวลางาน"
          type="text"
          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        />
      </div>
      <div>
        <label for="workDetails" class="block mb-1">รายละเอียดงาน</label>
        <input
          v-model="workData.workDetails"
          placeholder="ระบุรายละเอียดงาน"
          type="text"
          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        />
      </div>
      <div>
        <label for="analysisMethod" class="block mb-1">วิธีการวิเคราะห์</label>
        <input
          v-model="workData.analysisMethod"
          placeholder="ระบุวิธีการวิเคราะห์"
          type="text"
          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        />
      </div>
      <div class="relative w-full">
        <label class="block mb-1" for="grid-password"> จำนวน/ครั้ง </label>
        <div class="flex gap-x-4">
          <input
            v-model="workData.workAmount"
            placeholder="ระบุจำนวน"
            type="text"
            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
          <input
            v-model="workData.workAmountType"
            placeholder="ระบุประเภท"
            type="text"
            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
      </div>
      <div class="relative w-full">
        <label class="block mb-1" for="grid-password"> ความถี่ </label>
        <div class="flex gap-x-4">
          <input
            v-model="workData.frequencyNumber"
            placeholder="ระบุครั้ง"
            type="text"
            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
          <input
            v-model="workData.frequencyType"
            placeholder="ระบุประเภท"
            type="text"
            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
      </div>
      <div>
        <label for="unitPrice" class="block mb-1">ราคา/หน่วย</label>
        <input
          v-model="workData.unitPrice"
          placeholder="ระบุราคาต่อหน่วย"
          type="text"
          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        />
      </div>
      <div>
        <label for="totalAmount" class="block mb-1">จำนวนเงิน</label>
        <input
          v-model="workData.totalAmount"
          placeholder="ระบุราคา"
          type="text"
          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        />
      </div>
      <div>
        <div class="flex w-full h-full items-end justify-start">
          <div class="flex items-end">
            <button @click="addData" class="bg-sky-500 text-white py-2 px-4">
              เพิ่ม
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const workData = ref({
  workDuration: "",
  workDetails: "",
  analysisMethod: "",
  workAmount: "",
  workAmountType: "",
  frequencyNumber: "",
  frequencyType: "",
  unitPrice: "",
  totalAmount: "",
});

const addData = () => {
  // ใส่โค้ดที่คุณต้องการทำเมื่อปุ่มถูกคลิก
};
</script>

<style></style>
