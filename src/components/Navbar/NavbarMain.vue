<script setup>
import axios from "axios";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const isPopupVisible = ref(false);
const user = ref("");
const password = ref("");
const showPassword = ref(false);
const showValidationError = ref(false);
const registerVisible = ref(false);

const login = async () => {
  if (
    user.value === null ||
    user.value === "" ||
    password.value === null ||
    password.value === ""
  ) {
    console.log("ล้มเหลว");
  } else {
    window.location.assign("/admin");
    console.log("seccess");
  }
};
const validateInput = () => {
  showValidationError.value = !/^[0-9]+$/.test(telephone.value);
};
</script>

<template>
  <div class="bg-[#2a9d8f] px-4 py-4 justify-between">
    <div class="w-full flex justify-between px-6">
      <div>
        <a
          href="#"
          class="inline-block py-2 text-[#d0f4de] text-2xl font-bold max-[640px]:hidden"
          >LAB PROJECT</a
        >
      </div>
      <div class="flex gap-x-2">
        <button class="btn glass" onclick="my_modal_3.showModal()">
          เข้าสู่ระบบ
        </button>

        <dialog id="my_modal_3" class="modal">
          <div class="modal-box flex flex-col w-full gap-y-2 p-4 glass">
            <form method="dialog" class="">
              <div class="flex items-center justify-end">
                <button class="btn btn-sm btn-circle btn-ghost">✕</button>
              </div>
            </form>
            <div class="w-full flex flex-col gap-y-4">
              <p>ชื่อผู้ใช้</p>
              <input
                type="text"
                v-model="user"
                placeholder="กรอกชื่อผู้ใช้"
                class="input input-bordered input-success w-full max-w-xs glass"
              />
              <p>รหัสผ่าน</p>
              <input
                type="password"
                v-model="password"
                placeholder="กรอกรหัสผ่าน"
                class="input input-bordered input-success w-full max-w-xs glass"
              />
            </div>
            <div class="flex w-full justify-end">
              <button @click="login()" class="btn btn-primary">
                เข้าสู่ระบบ
              </button>
            </div>
          </div>
        </dialog>
        <button class="btn" onclick="my_modal_2.showModal()">
          สมัครใช้งาน
        </button>
        <dialog id="my_modal_2" class="modal">
          <div class="modal-box">
            <h3 class="font-bold text-lg">Hello!</h3>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered input-success w-full max-w-xs"
            />
            <p class="py-4">Press ESC key or click the button below to close</p>
            <div class="modal-action">
              <form method="dialog">
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  </div>
</template>

<style></style>
