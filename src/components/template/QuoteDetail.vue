<template>
  <Button
    icon="pi pi-search-plus"
    severity="success"
    class="p-1 bg-sky-500 text-white"
    @click="openDetail()"
  />
  <Sidebar
    v-model:visible="sidebar"
    class="p-sidebar-lg w-full"
    position="right"
  >
    <div class="grid">
      <div class="col-12 text-center">
        <h1>รายละเอียด ออเดอร์</h1>
      </div>
      <div class="col-6">
        <h3>พนักงานที่ทำรายการ : {{ this.order.employee_name }}</h3>
      </div>
      <div class="col-6">
        <h3>วันที่ : {{ datetimeFormat(this.order.timestamps) }}</h3>
      </div>
      <div class="col-6">
        <h3>สถานะ : {{ lastStatus(this.order.status) }}</h3>
      </div>
      <div
        class="col-6"
        v-if="lastStatus(this.order.status) === 'ยืนยันการสั่งซื้อ'"
      >
        <h3>เลขออเดอร์ : {{ this.order.ordernumbershell }}</h3>
        <Button
          label="ก๊อปปี้ เลขออเดอร์"
          icon="pi pi-copy"
          class="mb-2"
          severity="info"
          @click="copyclipboard()"
        />
      </div>
    </div>
    <div class="grid">
      <div class="col-12">
        <DataTable :value="product_detail" :paginator="true" :rows="7">
          <template #empty>
            <p class="font-italic text-center text-2xl">ไม่พบรายการข้อมูล</p>
          </template>
          <Column header="ชื่อสินค้า">
            <template #body="item">
              {{ item.data.product_name }}
            </template>
          </Column>
          <Column header="จำนวน">
            <template #body="item">
              {{ item.data.product_amount }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </Sidebar>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: {
    order: Object,
    product_detail: Object,
  },
  data: () => ({
    loading: false,
    sidebar: false,
  }),
  methods: {
    openDetail() {
      this.sidebar = true;
    },
    lastStatus(status) {
      if (status.length > 0) {
        return status[status.length - 1].name;
      } else {
        return "";
      }
    },
    datetimeFormat(date) {
      return dayjs(date).format("DD/MM/YYYY เวลา HH:mm:ss");
    },
    copyclipboard() {
      navigator.clipboard.writeText(this.order.ordernumbershell);
      this.$toast.add({
        severity: "success",
        summary: "แจ้งเตือน",
        detail: "ก๊อปปี้ สำเร็จ",
        life: 3000,
      });
    },
  },
};
</script>

<style></style>
