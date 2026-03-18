<template>
  <section class="border-b border-[#d7dce2] py-8">
    <NuxtLink
      to="/markets/assets"
      class="mb-4 inline-flex text-2xl font-extrabold leading-none tracking-tight text-[#232d39] transition-colors hover:text-blue-700"
    >
      Assets<span class="ml-1 text-[#4f5966]">→</span>
    </NuxtLink>

    <div class="grid gap-4 xl:grid-cols-3">
      <MarketsTableGroup
        v-for="group in assetGroups"
        :key="group.title"
        :title="group.title"
        :items="group.items"
      />
    </div>
  </section>
</template>

<script setup>
import MarketsTableGroup from "./MarketsTableGroup.vue";
import { assetGroups } from "@/data/marketsOverview";
</script>
