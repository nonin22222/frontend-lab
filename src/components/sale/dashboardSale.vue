<template>
  <div class="bg-teal-100 h-full">
    <SidebarSale />
    <div class="relative md:ml-64">
      <NavbarSale/>
      <div class="px-4 md:px-10 mx-auto w-full">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import NavbarSale from "../Navbar/NavbarSale.vue";
import SidebarSale from "../Sidebar/SidebarSale.vue";
</script>