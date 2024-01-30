<template>
  <div>
    <!-- ส่วนบน: EmployeeForm -->
    <div>
      <h2>Add Employee</h2>
      <!-- ฟอร์มที่ให้กรอกข้อมูลพนักงาน -->
      <form @submit.prevent="addEmployee">
        <!-- องค์ประกอบฟอร์ม -->
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="newEmployee.name" />
        </div>

        <div>
          <label for="position">Position:</label>
          <input type="text" id="position" v-model="newEmployee.position" />
        </div>

        <div>
          <label for="salary">Salary:</label>
          <input type="number" id="salary" v-model="newEmployee.salary" />
        </div>

        <!-- ปุ่มส่งฟอร์ม -->
        <button type="submit">Add Employee</button>
      </form>
    </div>

    <!-- ส่วนล่าง: EmployeeDataTable -->
    <div>
      <h2>Employee List</h2>
      <!-- ตารางแสดงข้อมูลพนักงาน -->
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employee, index) in employees" :key="index">
            <td>{{ employee.name }}</td>
            <td>{{ employee.position }}</td>
            <td>{{ employee.salary }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// ทำให้เราไม่ต้องระบุ setup() และ export ตัวแปรและฟังก์ชัน
const employees = ref([]);
const newEmployee = ref({ name: "", position: "", salary: 0 });

const addEmployee = () => {
  employees.value.push({ ...newEmployee.value });
  // เคลียร์ข้อมูลในฟอร์มหลังจากเพิ่มพนักงาน
  newEmployee.value = { name: "", position: "", salary: 0 };
};
</script>

<style></style>
