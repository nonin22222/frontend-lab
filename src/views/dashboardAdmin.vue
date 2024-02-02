<template>
  <div class="bg-teal-100 h-full">
    <sidebar />
    <div class="relative md:ml-64">
      <admin-navbar />
      <div class="px-4 md:px-10 mx-auto w-full">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import AdminNavbar from "../components/Navbar/NavbarAdmin.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
</script>
