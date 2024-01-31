<script setup>
import axios from "axios";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const employees = ref([]);
const employeeAll = ref([]);
const SalesAll = ref([]);
const empvisible = ref(false);
const data = ref([]);
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
        (amphure) => amphure.name_th === formData.value.districtValue
      );

      if (selectedAmphureObject) {
        try {
          const id = selectedAmphureObject.id;
          const tambon = await axios.get(
            `${
              import.meta.env.VITE_VUE_APP_THAILAND
            }thailand/tambon/by-amphure-id/${id}`
          );

          // ตรวจสอบว่า API ตอบกลับมีข้อมูลตำบล
          if (tambon.data && tambon.data.length > 0) {
            // เซ็ตตำบลที่เลือกใน FormData
            formData.value.selectedAmphure = selectedAmphureObject;

            // เซ็ต zip_code ใน FormData เป็น null
            formData.value.zip_code = null;

            // เซ็ต zip_code ใน Dropdown ตำบล
            tambondropdown.value = tambon.data;

            // console.log("formData.value: ", formData.value);
          } else {
            console.error("ไม่พบข้อมูลตำบล");
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const updateZipCode = () => {
  formData.value.zip_code = formData.value.zip_code;
};

const formData = ref({
  username: "",
  password: "",
  address: "",
  name: "",
  tel: "",
  card_number: "",
  employee_position: "",
  employee_subdepartment: "",
  house_number: "",
  moo_number: "",
  soi: "",
  name_road: "",
  tumbolValue: "",
  districtValue: "",
  provinceValue: "",
  zip_code: null,
});

const getUserall = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_VUE_APP_LAB_API}/employee/GetAllEmploee`
    );
    const alluser = response.data;
    // console.log("alluser : ", alluser);
    const allemployee = response.data.employees;
    // console.log("allemployee", allemployee);
    employeeAll.value = allemployee;
    const allsales = response.data.sales;
    SalesAll.value = allsales;
  } catch (error) {
    console.log("error", error);
  }
};

getUserall();
getprovince();

const addwork = () => {
  data.value.push({
    username: formData.value.username,
    password: formData.value.password,
    address: formData.value.address,
    name: formData.value.name,
    tel: formData.value.tel,
    card_number: formData.value.card_number,
    employee_position: formData.value.employee_position,
    employee_subdepartment: formData.value.employee_subdepartment,
    house_number: formData.value.house_number,
    moo_number: formData.value.moo_number,
    soi: formData.value.soi,
    name_road: formData.value.name_road,
    tumbol: formData.value.tumbolValue,
    district: formData.value.districtValue,
    province: formData.value.provinceValue,
    zip_code: formData.value.zip_code,
  });
  console.log("addwork : ", data.value);
};
const showAdd = () => {
  empvisible.value = true;
};

const SaveEmployee = () => {
  const newEmployee = {
    name: username.value,
    department: department.value,
    position: position.value,
  };

  employees.value.push(newEmployee);
  empvisible.value = false;
};

const Cancel = () => {
  empvisible.value = false;
};
</script>

<template>
  <div class="grid px-10 pt-3 px-5 w-full containter">
    <div>
      <Dialog
        v-model:visible="empvisible"
        modal
        header="เพิ่มพนักงาน"
        :style="{ width: '60rem' }"
        class="border-4 border-[#2a9d8f] rounded-5xl"
      >
        <span class="p-text-secondary block mb-5">รายละเอียดพนักงาน</span>
        <div class="flex w-full gap-x-4">
          <div class="flex w-full align-items-center gap-3 mb-3">
            <label for="username" class="font-semibold w-6rem"
              >ชื่อผู้ใช้งาน :</label
            >
            <InputText
              v-model="formData.username"
              id="username"
              class="flex-auto p-2 border-2"
              autocomplete="off"
            />
          </div>
          <div class="flex w-full align-items-center gap-3 mb-3">
            <label for="password" class="font-semibold w-6rem"
              >รหัสผ่าน :</label
            >
            <InputText
              v-model="formData.password"
              id="password"
              class="flex-auto p-2 border-2"
              autocomplete="off"
            />
          </div>
        </div>

        <div class="flex items-center gap-3 mb-3">
          <label for="address" class="font-semibold w-6rem">ที่อยู่ :</label>
          <InputText
            v-model="formData.address"
            id="address"
            class="flex-auto p-2 border-2"
            autocomplete="off"
          />
        </div>
        <div class="w-full flex py-2 items-center justify-between">
          <!-- จังหวัด -->
          <div class="flex w-full items-center">
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
          <div class="flex w-full items-center">
            <label for="amphure" class="pr-2"> อำเภอ :</label>
            <Dropdown
              v-model="formData.districtValue"
              :options="amphuredropdown"
              optionLabel="name_th"
              optionValue="name_th"
              placeholder="เลือกอำเภอ"
              @change="getamphure('tambon')"
              filter
            />
          </div>
          <!-- ตำบล -->
          <div class="flex w-full items-center">
            <label for="tambon" class="pr-2"> ตำบล :</label>
            <Dropdown
              v-model="formData.tumbolValue"
              :options="tambondropdown"
              optionLabel="name_th"
              optionValue="name_th"
              placeholder="เลือกตำบล"
              filter
              @change="getamphure('tambon')"
            />
          </div>
          <div class="flex items-center">
            <label for="zip_code" class="font-semibold w-6rem"
              >ไปรษณีย์ :</label
            >
            <Dropdown
              v-model="formData.zip_code"
              :options="tambondropdown"
              optionLabel="zip_code"
              optionValue="zip_code"
              placeholder="เลือกรหัสไปรษณีย์"
              @change="updateZipCode"
            />
          </div>
        </div>
        <div class="flex w-full gap-x-4 mb-2">
          <div class="flex w-full align-items-center gap-3">
            <label for="name" class="font-semibold w-6rem">ชื่อพนักงาน :</label>
            <InputText
              v-model="formData.name"
              id="name"
              class="flex-auto p-2 border-2"
              autocomplete="off"
            />
          </div>
          <div class="w-full flex align-items-center gap-3">
            <label for="tel" class="font-semibold w-6rem">แผนก :</label>
            <InputText
              v-model="formData.tel"
              id="tel"
              class="flex-auto p-2 border-2"
              autocomplete="off"
            />
          </div>
        </div>
        <div class="flex w-full gap-x-4 mb-2">
          <div class="flex w-full align-items-center gap-3">
            <label for="card_number" class="font-semibold w-6rem"
              >เบอร์โทรศัพท์ :</label
            >
            <InputText
              v-model="formData.card_number"
              id="card_number"
              class="flex-auto p-2 border-2"
              autocomplete="off"
            />
          </div>
          <div class="flex w-full align-items-center gap-3">
            <label for="employee_subdepartment" class="font-semibold w-6rem"
              >ตำแหน่ง :</label
            >
            <InputText
              v-model="formData.employee_subdepartment"
              id="employee_subdepartment"
              class="flex-auto p-2 border-2"
              autocomplete="off"
            />
          </div>
        </div>

        <div class="flex align-items-center gap-3 mb-3">
          <label for="employee_position" class="font-semibold w-6rem"
            >เลขประจำประชาชน :</label
          >
          <InputText
            v-model="formData.employee_position"
            id="employee_position"
            class="flex-auto p-2 border-2"
            autocomplete="off"
          />
        </div>
        <div class="flex w-full gap-x-2">
          <div class="flex align-items-center gap-3 mb-3 w-full">
            <label for="house_number" class="font-semibold">บ้านเลขที่</label>
            <InputText
              v-model="formData.house_number"
              id="house_number"
              class="flex-auto p-2 border-2"
              autocomplete="off"
            />
          </div>
          <div class="flex align-items-center gap-3 mb-3 w-full">
            <label for="moo_number" class="font-semibold">หมู่</label>
            <InputText
              v-model="formData.moo_number"
              id="moo_number"
              class="flex-auto p-2 border-2"
              autocomplete="off"
            />
          </div>
          <div class="flex align-items-center gap-3 mb-3 w-full">
            <label for="soi" class="font-semibold">ซอย</label>
            <InputText
              v-model="formData.soi"
              id="soi"
              class="flex-auto p-2 border-2"
              autocomplete="off"
            />
          </div>
        </div>
        <div class="flex align-items-center gap-3 mb-5">
          <label for="name_road" class="font-semibold">ถนน :</label>
          <InputText
            v-model="formData.name_road"
            id="name_road"
            class="flex-auto p-2 border-2"
            autocomplete="off"
          />
        </div>
        <div class="flex justify-content-end gap-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="Cancel()"
          ></Button>
          <Button type="button" label="Save" @click="addwork()"></Button>
        </div>
      </Dialog>
    </div>
    <div class="col-12 flex flex-col lg:col-12 border gap-y-2">
      <div class="text-center font-bold text-4xl">จัดการข้อมูลพนักงาน</div>
      <div class="text-right my-5">
        <Button
          @click="showAdd()"
          label="เพิ่มพนักงาน"
          severity="secondary"
          icon="pi pi-user-plus"
          text
          raised
          class="hover:text-white bg-[#2a9d8f] rounded-xl font-bold py-2.5 px-4"
        />
      </div>
      <div>
        <h1>ข้อมูลพนักงาน</h1>
        <DataTable
          stripedRows
          :paginator="true"
          :rows="20"
          selectionMode="single"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25, 50, 75, 100]"
          currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} พนักงานทั้งหมด"
          responsiveLayout="stack"
          :value="employeeAll"
          :key="JSON.stringify(employees)"
        >
          <!-- ตรวจสอบ-->
          <template #empty>
            <p
              class="font-italic text-center text-3xl text-center"
              style="color: #bd1616"
            >
              ไม่พบข้อมูลพนักงาน
            </p>
          </template>
          <Column
            field="name"
            class=""
            header="ชื่อ"
            style="width: 10%; cursor: default"
          ></Column>
          <Column
            field="employee_position"
            class=""
            header="แผนก"
            sortable
            style="width: 10%; cursor: default"
          ></Column>
          <Column
            field="employee_sub_department"
            class=""
            header="แผนกย่อย"
            sortable
            style="width: 10%; cursor: default"
          ></Column>
          <Column
            :exportable="false"
            style="width: 10%; cursor: default"
            header="เพิ่มเติม"
          >
            <template #body="item">
              <div class="flex justify-content-around gap-6">
                <updateadmin :data="item.data" />
                <i class="pi pi-trash cursor-pointer icon-style" />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>

      <div>
        <DataTable
          stripedRows
          :paginator="true"
          :rows="20"
          selectionMode="single"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25, 50, 75, 100]"
          currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} พนักงานทั้งหมด"
          responsiveLayout="stack"
          :value="SalesAll"
          :key="JSON.stringify(employees)"
        >
          <!-- ตรวจสอบ-->
          <template #empty>
            <p
              class="font-italic text-center text-3xl text-center"
              style="color: #bd1616"
            >
              ไม่พบข้อมูลพนักงาน
            </p>
          </template>
          <Column
            field="sale_name"
            class=""
            header="ชื่อ"
            style="width: 10%; cursor: default"
          ></Column>
          <Column
            field="sale_number"
            class=""
            header="รหัสประจำตัว"
            style="width: 10%; cursor: default"
          ></Column>
          <Column
            field="sale_position"
            class=""
            header="แผนก"
            style="width: 10%; cursor: default"
          ></Column>
          <Column
            field="sale_tel"
            class=""
            header="เบอร์โทรศัพท์"
            style="width: 10%; cursor: default"
          ></Column>
          <!-- <Column
            :exportable="false"
            style="width: 10%; cursor: default"
            header="เพิ่มเติม"
          >
            <template #body="item">
              <div class="flex justify-content-around gap-6">
                <updateadmin :data="item.data" />
                <i class="pi pi-trash cursor-pointer icon-style" />
              </div>
            </template>
          </Column> -->
        </DataTable>
      </div>
    </div>
  </div>
</template>