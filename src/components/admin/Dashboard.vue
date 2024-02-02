<template>
  <div class="flex flex-wrap">
    <div class="w-full lg:w-8/12 px-4">
      <CardSettings />
    </div>
    <div class="w-full lg:w-4/12 px-4">
      <CardProfile />
    </div>
  </div>
</template>
<script setup>
import CardSettings from "../Cards/CardSettings.vue";
import CardProfile from "../Cards/CardProfile.vue";

</script>
