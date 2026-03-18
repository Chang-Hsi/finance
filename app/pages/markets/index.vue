<template>
  <section class="mx-auto w-full max-w-[1460px] px-4 pb-8">
    <h1 class="mb-6 text-3xl font-extrabold leading-none tracking-tight text-[#232d39]">
      Markets Overview
    </h1>

    <WorldIndices />
    <Assets />
    <Sectores />
  </section>
</template>

<script setup>
import WorldIndices from "~/components/markets/WorldIndices.vue";
import Assets from "~/components/markets/Assets.vue";
import Sectores from "~/components/markets/Sectores.vue";
</script>
