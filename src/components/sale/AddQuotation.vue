<!-- คอมโพเนนต์ที่ต้องการรับข้อมูล -->
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
  name_work: "",
  project_name: "",
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

const detail = ref([]);
const dialog = ref(false);

//ส่วนที่1
// v-model
const work = ref({
    index: null,
    name_work: "",
    project_name: "",
}); 
const list_expandeddetail = ref([]);
const addWork = () => {
    if(work.value.name_work === "" || work.value.project_name === ""){
        toast.add({severity:'error', summary: 'Error', detail: 'กรุณากรอกข้อมูลให้ครบถ้วน'});
        return"";
    };
    const data={
        name_work: work.value.name_work,
        work_details:[
            {
                project_name: work.value.project_name,
                project_details: [],
                name_work2:"",
                name_work3:"",
            }
        ],
        work_discount:0,
        work_processing_fee:0
        
    };
    
    work.value.name_work = ""; 
    work.value.project_name = "";
    detail.value.push(data);
    dialog.value = false;

}
const title_work = ref("");
const opendialogwork = (val,index, data) => {
    if(val === "add"){
        work.value.name_work = "";
        work.value.project_name = "";
        dialog.value = true;
        title_work.value = "เพิ่มรายละเอียดงาน";
        
    }
    if(val === "edit"){
        work.value.name_work = data.name_work;
        work.value.project_name = data.work_details[0].project_name;
        dialog.value = true;
        title_work.value = "แก้ไขรายละเอียดงาน";
        work.value.index = index;
  
    }
}

const editwork = () => {
    const index =work.value.index;
    detail.value[index].name_work = work.value.name_work;
    detail.value[index].work_details[0].project_name = work.value.project_name;
    work.value.name_work = "";
    work.value.project_name = "";
    dialog.value = false;
}

const deletework = (index) => {
    detail.value.splice(index, 1);
    list_expandeddetail.value = [];
}

//ส่วนที่2
// v-model
const project_details = ref({
    indexwork: null,
    index: null,
    detail_name: "",
});

const dialogproject_details = ref(false);
const list_expandedarea = ref([]);
const title_project_details = ref("");
const opendialogproject_details = (val,indexwork,index, data) => {
    if(val === "add"){
        project_details.value.detail_name = "";
        project_details.value.indexwork = indexwork;
        dialogproject_details.value = true;
        
        title_project_details.value = "เพิ่มบริเวณพื้นที่";
        
    }
    if(val === "edit"){
        project_details.value.detail_name = data.detail_name;
        project_details.value.indexwork = indexwork;
        dialogproject_details.value = true;
        title_project_details.value = "แก้ไขบริเวณพื้นที่";
        project_details.value.index = index;
  
    }
}
// เพิ่มบริเวณพื้นที่
const addArea = () => {
    if(project_details.value.detail_name === ""){
        toast.add({severity:'error', summary: 'Error', detail: 'กรุณากรอกข้อมูลให้ครบถ้วน'});
        return"";
    };
    const data={
        detail_name: project_details.value.detail_name,
        sub_detail: []
    };
    project_details.value.detail_name = "";
    detail.value[project_details.value.indexwork].work_details[0].project_details.push(data);
    dialogproject_details.value = false;
}
// แก้ไขบริเวณพื้นที่
const editarea = () => {
    const index =project_details.value.index;
    detail.value[project_details.value.indexwork].work_details[0].project_details[index].detail_name = project_details.value.detail_name;
    project_details.value.detail_name = "";
    dialogproject_details.value = false;
}
// ลบบริเวณพื้นที่
const deletearea = (index) => {
    detail.value[project_details.value.indexwork].work_details[0].project_details.splice(index, 1);
    list_expandedarea.value = [];
}

// ส่วนที่3
// v-model
const sub_detail = ref({
    indexwork: null,
    indexarea: null,
    index: null,
    sub_name: "",
    name_analysis: "",
    amount: 0,
    frequency: 0,
    price_umit: 0,
    price:0,
});

const dialogsub_detail = ref(false);
const title_sub_detail = ref("");
const opendialogsub_detail = (val,indexwork,indexarea,index, data) => {
    if(val === "add"){
        sub_detail.value.sub_name = "";
        sub_detail.value.name_analysis = "";
        sub_detail.value.amount = 0;
        sub_detail.value.frequency = 0;
        sub_detail.value.price_umit = 0;
        sub_detail.value.price = 0;
        sub_detail.value.indexwork = indexwork;
        sub_detail.value.indexarea = indexarea;
        dialogsub_detail.value = true;
        title_sub_detail.value = "เพิ่มรายละเอียดงาน";
        
    }
    if(val === "edit"){
        sub_detail.value.sub_name = data.sub_name;
        sub_detail.value.name_analysis = data.name_analysis;
        sub_detail.value.amount = data.amount;
        sub_detail.value.frequency = data.frequency;
        sub_detail.value.price_umit = data.price_umit;
        sub_detail.value.price = data.price;
        sub_detail.value.indexwork = indexwork;
        sub_detail.value.indexarea = indexarea;
        sub_detail.value.index = index;
        dialogsub_detail.value = true;
        title_sub_detail.value = "แก้ไขรายละเอียดงาน";
  
    }
}
// เพิ่มรายละเอียดงาน

const addSubDetail = () => {
    if(sub_detail.value.sub_name === "" || sub_detail.value.name_analysis === "" || sub_detail.value.amount === 0 || sub_detail.value.frequency === 0 || sub_detail.value.price_umit === 0 || sub_detail.value.price === 0){
        toast.add({severity:'error', summary: 'Error', detail: 'กรุณากรอกข้อมูลให้ครบถ้วน'});
        return"";
    };
    const data={
        sub_name: sub_detail.value.sub_name,
        name_analysis: sub_detail.value.name_analysis,
        amount: sub_detail.value.amount,
        frequency: sub_detail.value.frequency,
        price_umit: sub_detail.value.price_umit,
        price: sub_detail.value.price
    };
    sub_detail.value.sub_name = "";
    sub_detail.value.name_analysis = "";
    sub_detail.value.amount = 0;
    sub_detail.value.frequency = 0;
    sub_detail.value.price_umit = 0;
    sub_detail.value.price = 0;
    detail.value[sub_detail.value.indexwork].work_details[0].project_details[sub_detail.value.indexarea].sub_detail.push(data);
    dialogsub_detail.value = false;
}
// แก้ไขรายละเอียดงาน
const editSubDetail = () => {
    const index =sub_detail.value.index;
    detail.value[sub_detail.value.indexwork].work_details[0].project_details[sub_detail.value.indexarea].sub_detail[index].sub_name = sub_detail.value.sub_name;
    detail.value[sub_detail.value.indexwork].work_details[0].project_details[sub_detail.value.indexarea].sub_detail[index].name_analysis = sub_detail.value.name_analysis;
    detail.value[sub_detail.value.indexwork].work_details[0].project_details[sub_detail.value.indexarea].sub_detail[index].amount = sub_detail.value.amount;
    detail.value[sub_detail.value.indexwork].work_details[0].project_details[sub_detail.value.indexarea].sub_detail[index].frequency = sub_detail.value.frequency;
    detail.value[sub_detail.value.indexwork].work_details[0].project_details[sub_detail.value.indexarea].sub_detail[index].price_umit = sub_detail.value.price_umit;
    detail.value[sub_detail.value.indexwork].work_details[0].project_details[sub_detail.value.indexarea].sub_detail[index].price = sub_detail.value.price;
    sub_detail.value.sub_name = "";
    sub_detail.value.name_analysis = "";
    sub_detail.value.amount = 0;
    sub_detail.value.frequency = 0;
    sub_detail.value.price_umit = 0;
    sub_detail.value.price = 0;
    dialogsub_detail.value = false;
}
// ลบรายละเอียดงาน
const deleteSubDetail = (index) => {
    detail.value[sub_detail.value.indexwork].work_details[0].project_details[sub_detail.value.indexarea].sub_detail.splice(index, 1);
    list_expandedarea.value = [];
}
onMounted(() => {
  getprovince();
});







</script>

<template>
  <div class="py-1 h-full">
    <h1 class="text-[2rem] te text-center font-semibold">เพิ่มใบเสนอราคา</h1>
    <div class="w-full bg-white">
        <div class="flex justify-end">
            <button @click="opendialogwork('add')" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-3 mx-3">เพิ่มระยะเวลางาน</button>
        </div>
        <DataTable
        :value="detail"
        v-model:expandedRows="list_expandeddetail"
        dataKey="name_work"
        tableStyle="min-width: 60rem"
        :style="{ padding: '0rem' }"
        >
        <template #empty>
          <p class="font-italic text-center text-2xl">ไม่มีข้อมูล</p>
        </template>
        <Column expander style="width: 5rem" />
        <Column field="name_work" header="ระยะเวลางาน"  />
        <Column  header="รายละเอียด" >
            <template #body="item">
                {{ item.data.work_details[0].project_name}}
            </template>
        </Column>
        <Column header="Action" >
          <template #body="item">
           
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success p-button-outlined"
                @click="opendialogwork('edit',item.index, item.data)"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-danger p-button-outlined"
                @click="deletework(item.index)"
              />
            
          </template>
        </Column>
        <!--เพิ่มส่วน2-->
        <template #expansion="itemarea">
            <div class="flex justify-end">
                <button @click="opendialogproject_details('add',itemarea.index)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-3 mx-3">เพิ่มบริเวณพื้นที่</button>
            </div>
 
            <DataTable :value="itemarea.data.work_details[0].project_details" v-model:expandedRows="list_expandedarea" dataKey="detail_name"  tableStyle="min-width: 60rem" :style="{ padding: '0rem' }" >
                    <template #empty>
                        <p class="font-italic text-center text-2xl">ไม่มีข้อมูล</p>
                    </template>
                    <Column expander style="width: 5rem" />
                    <Column field="detail_name" header="บริเวณพื้นที่" />
                    <Column header="Action" >
                        <template #body="item">
                            <Button
                                icon="pi pi-pencil"
                                class="p-button-rounded p-button-success p-button-outlined"
                                @click="opendialogproject_details('edit',itemarea.index,item.index, item.data)"
                            />
                            <Button
                                icon="pi pi-trash"
                                class="p-button-rounded p-button-danger p-button-outlined"
                                @click="deletearea(itemarea.index,item.index)"
                            />
                        </template>
                    </Column>
                    <template #expansion="itemsubdetail">
                        <!--ส่วนที่ 3 -->
                        <div class="flex justify-end">
                            <button @click="opendialogsub_detail('add',itemarea.index,itemsubdetail.index)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-3 mx-3">เพิ่มรายละเอียดงาน</button>
                        </div>
                        <!--สร้าง Datatable-->
                        <DataTable :value="itemsubdetail.data.sub_detail" tableStyle="min-width: 60rem" :style="{ padding: '0rem' }" >
                            <template #empty>
                                <p class="font-italic text-center text-2xl">ไม่มีข้อมูล</p>
                            </template>
                            <Column field="sub_name" header="บริเวณพื้นที่" />
                            <Column field="name_analysis" header="วิธีการวิเคราะห์" />
                            <Column field="amount" header="จำนวน" />
                            <Column field="frequency" header="ความถี่" />
                            <Column field="price_umit" header="ราคาต่อหน่วย" />
                            <Column field="price" header="ราคา" />
                            <Column header="Action" >
                                <template #body="item">
                                    <Button
                                        icon="pi pi-pencil"
                                        class="p-button-rounded p-button-success p-button-outlined"
                                        @click="opendialogsub_detail('edit',itemarea.index,itemsubdetail.index, item.index, item.data)"
                                    />
                                    <Button
                                        icon="pi pi-trash"
                                        class="p-button-rounded p-button-danger p-button-outlined"
                                        @click="deleteSubDetail(item.index)"
                                    />
                                </template>
                            </Column>
                        </DataTable>
                    </template>

            </DataTable>
            <div class="flex">
                <div class="w-full mx-5">
                    <p>รายเอียดงาน2:</p>
                    <input v-model="itemarea.data.work_details[0].name_work2" type="text" class="mt-3 border-1 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "/>
                </div>
                <div class="w-full mx-5">
                    <p>รายเอียดงาน3:</p>
                    <input v-model="itemarea.data.work_details[0].name_work3" type="text" class="mt-3 border-1 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "/>
                </div>
            </div>
            <div class="flex">
                
                <div class="w-full mx-5">
                    <p>ส่วนลด:</p>
                    <input v-model="itemarea.data.work_discount" type="number" class="mt-3 border-1 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "/>
                </div>
                <div class="w-full">
                    <p>ค่าธรรมเนียมการดำเนินงาน:</p>
                    <input v-model="itemarea.data.work_processing_fee" type="number" class="mt-3 border-1 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "/>
                </div>
            </div>
        </template>
      </DataTable>
    </div>
   
  </div>
    <!--ส่วนที่1-->
  <Dialog
      v-model:visible="dialog"     
      :style="{ padding: '0rem 1rem', width: '50%' }"
    >
    <template #header>
      <span class=" font-bold" style="font-size: 1.25rem; font-weight: 700">{{title_work }}</span>
    </template>
    <div class="grid">
        <div class="col-12">
            <p>ระยะเวลางาน :</p>
            <input v-model="work.name_work" type="text" class="mt-3 border-1 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "/>
        </div>
        <div class="col-12">
            <p>รายละเอียด :</p>
            <input v-model="work.project_name" type="text" class="mt-3 border-1 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "/>
        </div>

        <div class="col-12 text-center">
            <button @click="title_work === 'เพิ่มรายละเอียดงาน' ? addWork() : editwork()" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-3 mx-3">บันทึก</button>
            <button @click="dialog = false" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-3 mx-3">ยกเลิก</button>
        </div>   
    </div>
    
 </Dialog>
    <!--ส่วนที่2-->
    <Dialog
      v-model:visible="dialogproject_details"     
      :style="{ padding: '0rem 1rem', width: '50%' }"
    >
    <template #header>
      <span class=" font-bold" style="font-size: 1.25rem; font-weight: 700">{{title_project_details }}</span>
    </template>
    <div class="grid">
        <div class="col-12">
            <p>บริเวณพื้นที่ :</p>
            <input v-model="project_details.detail_name" type="text" class="mt-3 border-1 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "/>
        </div>
        <div class="col-12 text-center">
            <button @click="title_project_details === 'เพิ่มบริเวณพื้นที่' ? addArea() : editarea()" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-3 mx-3">บันทึก</button>
            <button @click="dialogproject_details = false" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-3 mx-3">ยกเลิก</button>
        </div>
    </div>
    </Dialog>
    <!--ส่วนที่3-->
    <Dialog
      v-model:visible="dialogsub_detail"     
      :style="{ padding: '0rem 1rem', width: '50%' }"
    >
    <template #header>
      <span class=" font-bold" style="font-size: 1.25rem; font-weight: 700">{{title_sub_detail }}</span>
    </template>
    <div class="grid">
        <div class="col-12">
            <p>รายละเอียดโครงการ :</p>
            <input v-model="sub_detail.sub_name" type="text" class="mt-3 border-1 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "/>
        </div>
        <div class="col-12">
            <p>วิธีการวิเคราะห์ :</p>
            <input v-model="sub_detail.name_analysis" type="text" class="mt-3 border-1 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "/>
        </div>
        <div class="col-12">
            <p>จำนวน :</p>
            <input v-model="sub_detail.amount" type="number" class="mt-3 border-1 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "/>
        </div>
        <div class="col-12">
            <p>ความถี่ :</p>
            <input v-model="sub_detail.frequency" type="number" class="mt-3 border-1 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "/>
        </div>
        <div class="col-12">
            <p>ราคาต่อหน่วย :</p>
            <input v-model="sub_detail.price_umit" type="number" class="mt-3 border-1 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "/>
        </div>
        <div class="col-12">
            <p>ราคา :</p>
            <input v-model="sub_detail.price" type="number" class="mt-3 border-1 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "/>
        </div>
        <div class="col-12 text-center">
            <button @click="title_sub_detail === 'เพิ่มรายละเอียดงาน' ? addSubDetail() : editSubDetail()" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-3 mx-3">บันทึก</button>
            <button @click="dialogsub_detail = false" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-3 mx-3">ยกเลิก</button>
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
/* // ใส่ css datatable ให้หน่อย */
.p-datatable .p-datatable-tbody > tr > td {
  border: 1px solid #000000;
  text-align: left;
  padding: 8px;
}
.p-datatable .p-datatable-tbody > tr:hover {
  background-color: #d0f4de;
}
.p-datatable .p-datatable-tbody > tr > td {
  border: 1px solid #000000;
  text-align: left;
  padding: 8px;
}


</style>

<style >
.p-datatable .p-datatable-thead > tr > th {
  background-color: #295bac !important;
  color: #effcef;
}

</style>
