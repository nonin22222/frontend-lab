<script setup>
import axios from "axios";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { useToast } from "primevue/usetoast";
const toast = useToast();

const store = useStore();
const router = useRouter();
const loginvisible = ref(false);
const visible = ref(false);

const user = ref("");
const password = ref("");

const showSuccess = () => {
  toast.add({
    severity: "success",
    summary: "เข้าสู่ระบบสำเร็จ",
    life: 3000,
  });
};

const showError = () => {
  toast.add({
    severity: "error",
    summary: "เข้าสู่ระบบไม่สำเร็จ",
    life: 3000,
  });
};
const showWarn = () => {
  toast.add({
    severity: "warn",
    summary: "กรุณากรอกข้อมูลให้ครบถ้วน",
    life: 3000,
  });
};
const handleKeyPress = (event) => {
  if (event.key === "Enter") {
    login();
  }
};

onMounted(() => {
  window.addEventListener("keypress", handleKeyPress);
});

onBeforeUnmount(() => {
  window.removeEventListener("keypress", handleKeyPress);
});
// const login = async () => {
//   if (
//     user.value === null ||
//     user.value === "" ||
//     password.value === null ||
//     password.value === ""
//   ) {
//     showWarn();
//   } else {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_VUE_APP_LAB_API}/login`,
//         {
//           username: user.value,
//           password: password.value,
//         }
//       );
//       console.log("response : ",response.data);
//       store.commit("setLogin", {
//         logedIn: true,
//         userName: response.data.userName,
//         level: response.data.level,
//         id: response.data.id,
//       });
//       if (response.data.status && response.data.level === "admin") {
//         store.commit("setToken", response.data.token);
//         localStorage.setItem("token", response.data.token);
//         showSuccess();
//         setTimeout(() => {
//           router.push("/admin");
//         }, 2000);
//       } else if (
//         response.data.level &&
//         response.data.level.includes("employee")
//       ) {
//         showSuccess();
//         setTimeout(() => {
//           router.push("/employee");
//         }, 2000);
//       } else if (response.data.level && response.data.level.includes("sale")) {
//         showSuccess();
//         setTimeout(() => {
//           router.push("/sale");
//         }, 2000);
//       } else {
//         console.log("ไม่พบบทบาทที่กำหนด");
//       }
//       console.log("เข้าสู่ระบบสำเร็จ");
//     } catch (error) {
//       showError();
//       console.error("Error : ", error);
//     }
//   }
// };

const login = async () => {
  if (
    user.value === null ||
    user.value === "" ||
    password.value === null ||
    password.value === ""
  ) {
    showWarn();
  } else {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_VUE_APP_LAB_API}/login`,
        {
          username: user.value,
          password: password.value,
        }
      );
      console.log("response : ", response.data);

      // กำหนดค่า level ในการเรียกใช้ store.commit("setLogin", ...)
      const level = response.data.level;

      store.commit("setLogin", {
        logedIn: true,
        userName: response.data.userName,
        level: level,
        id: response.data.id,
      });

      if (response.data.status && level === "admin") {
        store.commit("setToken", response.data.token);
        localStorage.setItem("token", response.data.token);
        showSuccess();
        setTimeout(() => {
          router.push("/admin");
        }, 2000);
      } else if (level && level.includes("employee")) {
        store.commit("setToken", response.data.token);
        localStorage.setItem("token", response.data.token);
        showSuccess();
        setTimeout(() => {
          router.push("/employee");
        }, 2000);
      } else if (level && level.includes("sale")) {
        store.commit("setToken", response.data.token);
        localStorage.setItem("token", response.data.token);
        showSuccess();
        setTimeout(() => {
          router.push("/sale");
        }, 2000);
      } else {
        console.log("ไม่พบบทบาทที่กำหนด");
      }

      console.log("เข้าสู่ระบบสำเร็จ");
    } catch (error) {
      showError();
      console.error("Error : ", error);
    }
  }
};

const showlogin = () => {
  visible.value = true;
};

onMounted(() => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    store.commit("setToken", storedToken);
    // console.log("Token ถูกนำมาใช้งานหลังจากรีเฟรช");
  }
});
</script>

<template>
  <Toast />
  <div class="bg-[#2a9d8f] px-4 py-4 justify-between">
    <div class="w-full flex justify-between px-6">
      <div>
        <a
          href="#"
          class="inline-block py-2 text-[#d0f4de] text-2xl font-bold max-[640px]:hidden"
          >LAB SPJ</a
        >
      </div>
      <div class="flex gap-x-2">
        <div class="cursor-pointer flex items-center gap-x-2 text-xl font-bold text-[#fff]">
          <Button @click="showlogin()" label="เข้าสู่ระบบ" icon="px-2 m-0 pi pi-user text-lg font-bold" />
        </div>

        <Dialog
          v-model:visible="loginvisible"
          modal
          :pt="{
            root: 'border-none',
            mask: {
              style: 'backdrop-filter: blur(5px)',
            },
          }"
        >
          <template #container="{ closeCallback }">
            <div
              class="flex flex-col px-8 py-5 gap-4 bg-teal-300"
              style="border-radius: 12px"
            >
              <div class="inline-flex flex-column gap-2">
                <label for="username" class="text-primary-50 font-semibold"
                  >Username</label
                >
                <InputText
                  v-model="user"
                  id="username"
                  class="bg-white-alpha-20 border-none p-3 text-primary-50"
                ></InputText>
              </div>
              <div class="inline-flex flex-column gap-2">
                <label for="password" class="text-primary-50 font-semibold"
                  >Password</label
                >
                <InputText
                  v-model="password"
                  id="password"
                  class="bg-white-alpha-20 border-none p-3 text-primary-50"
                  type="password"
                ></InputText>
              </div>
              <div class="flex align-items-center justify-center-between gap-2">
                <Button label="Sign-In" @click="closeCallback" text />
                <Button label="Cancel" @click="closeCallback" text />
              </div>
            </div>
          </template>
        </Dialog>
      </div>
      <Dialog
        v-model:visible="visible"
        modal
        :style="{
          'backdrop-filter': 'blur(5px)',
          opacity: '0.9',
          background: '#2a9d8f',
        }"
        :pt="{
          root: 'border-none',
        }"
      >
        <template #container="{ closeCallback }">
          <div class="flex flex-column px-6 py-5 gap-4 rounded-xl">
            <h1 class="text-2xl text-white font-bold text-center">
              ระบบเข้าใช้งาน S.P.J.SCIENTIFIC
            </h1>
            <div class="flex justify-center">
              <img src="../template/qt-img/spjlogo.png" class="w-4" alt="" />
            </div>
            <div class="inline-flex flex-column gap-2">
              <label for="username" class="text-white font-semibold"
                >ชื่อผู้ใช้งาน</label
              >
              <InputText
                v-model="user"
                id="username"
                placeholder="กรอกชื่อผู้ใช้"
                class="bg-white-alpha-20 border-none p-2 text-primary-50"
              ></InputText>
            </div>
            <div class="inline-flex flex-column gap-2">
              <label for="password" class="text-white font-semibold"
                >รหัสผ่าน</label
              >
              <InputText
                v-model="password"
                placeholder="กรอกรหัสผ่าน"
                id="password"
                class="bg-white-alpha-20 border-none p-2 text-primary-50"
                type="password"
              ></InputText>
            </div>
            <div class="flex w-full items-center justify-end gap-x-2">
              <Button
                label="ยกเลิก"
                @click="closeCallback"
                text
                class="p-2 border-1 border-white-alpha-30 text-white bg-red-400 rounded-xl hover:bg-red-600"
              />
              <Button
                label="เข้าสู่ระบบ"
                @click="login()"
                text
                class="p-2 border-1 border-white-alpha-30 bg-teal-400 text-white rounded-xl hover:bg-teal-600"
              />
            </div>
          </div>
        </template>
      </Dialog>
    </div>
  </div>
</template>

<style></style>
