<template>
  <section class="mx-auto w-full max-w-[1460px] px-4 py-8">
    <h1 class="text-3xl font-extrabold text-[#232d39]">{{ title }}</h1>
    <div class="mt-6 min-h-[60vh] rounded-md border border-dashed border-[#d7dce2] bg-white" />
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
