<template>
  <section class="border-b border-[#d7dce2] pb-8">
    <NuxtLink
      to="/markets/world-indices"
      class="mb-4 inline-flex text-2xl font-extrabold leading-none tracking-tight text-[#232d39] transition-colors hover:text-blue-700"
    >
      World Indices<span class="ml-1 text-[#4f5966]">→</span>
    </NuxtLink>
    <div class="grid gap-4 xl:grid-cols-3">
      <MarketsTableGroup
        v-for="group in worldIndicesGroups"
        :key="group.title"
        :title="group.title"
        :items="group.items"
      />
    </div>
  </section>
</template>

<script setup>
import MarketsTableGroup from "./MarketsTableGroup.vue";
import { worldIndicesGroups } from "@/data/marketsOverview";
</script>
