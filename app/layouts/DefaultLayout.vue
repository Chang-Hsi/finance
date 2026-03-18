<template>
  <div class="min-h-screen bg-[#f1f3f5] text-[#232a31]">
    <!-- 頂部區塊 -->
    <!-- 固定頂部的Header(先做畫面功能不做) 圖1 -->
    <div class="fixed inset-x-0 top-0 z-30">
      <DefaultHeader />
    </div>

    <!-- 股市資訊Banner, 初始黏在Header下面但不用固定(先做畫面功能不做) 圖1-->
    <div class="pt-[110px] lg:pt-[110px]">
      <DefaultBanner />
    </div>

    <!-- 內容區塊 -->
    <main
      class="mx-auto flex max-w-[1460px] border-x border-[#d7dce2] min-[1025px]:min-h-[calc(100vh-202px)]"
    >
      <!-- 左區塊寬:85% 用來放各頁面 圖3-->
      <section class="w-full p-4 lg:w-[80%] lg:p-6">
        <slot />
      </section>

      <!-- 右區塊:剩餘寬度 圖4 Aside, 固定資料(先做畫面功能不做) -->
      <aside
        class="hidden border-l border-[#d7dce2] bg-[#f3f4f6] lg:block lg:w-[20%] lg:min-w-[310px]"
      >
        <DefaultAside />
      </aside>
    </main>

    <aside
      class="mx-auto max-w-[1460px] border-x border-t border-[#d7dce2] bg-[#f3f4f6] lg:hidden"
    >
      <DefaultAside />
    </aside>
  </div>
</template>

<script setup>
import DefaultHeader from "./DefaultHeader.vue";
import DefaultBanner from "./DefaultBanner.vue";
import DefaultAside from "./DefaultAside.vue";
</script>
