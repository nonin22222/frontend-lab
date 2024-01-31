<script setup>
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();



const logout = async () => {
  try {
    store.commit("setToken", null);
    store.commit("ClearLogin");
    localStorage.removeItem("token");
    router.push("/");
    console.log("ออกจากระบบเรียบร้อย");
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการออกจากระบบ:", error);
  }
};
</script>

<template>
  <div class="bg-[#2a9d8f] px-4 py-4 flex justify-between">
    <div>
      <h1>Employee</h1>
    </div>
    <div class="flex gap-x-2">
      <Button @click="logout" label="ออกจากระบบ" icon="pi pi-sign-out" />
    </div>
  </div>
</template>
