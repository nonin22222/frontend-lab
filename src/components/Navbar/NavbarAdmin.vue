<template>
  <!-- Navbar -->
  <nav class="w-full z-10 bg-teal-500 flex items-center p-4">
    <div
      class="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4"
    >
      <!-- Brand -->
      <a
        class="text-white text-sm uppercase hidden lg:inline-block font-semibold"
        href="javascript:void(0)"
      >
        Dashboard
      </a>
      <!-- Form -->
      <form class="flex items-center lg:ml-auto mr-3">
        <div class="flex w-full flex-wrap items-stretch">
          <span class="text-white font-semibold text-lg">{{ userName }}</span>
        </div>
      </form>
      <!-- User -->
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

// สร้าง ref สำหรับเก็บค่า userName
const userName = ref("");

// เรียกใช้ store
const store = useStore();

// ให้ userName เก็บค่าจาก store
userName.value = store.state.userName;
</script>
