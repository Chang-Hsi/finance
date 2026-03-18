<template>
  <section class="rounded-md border border-[#d5dae1] bg-[#eceff3] px-6 py-6">
    <div class="mb-4 flex items-center justify-between gap-3">
      <h2 class="text-2xl font-extrabold text-[#232d39]">{{ title }}</h2>
    </div>

    <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
      <article v-for="show in shows" :key="show.id" class="rounded-md">
        <div class="overflow-hidden rounded-md border border-[#d5dae1] bg-black">
          <div class="relative h-[200px]">
            <video
              :src="show.video"
              muted
              loop
              autoplay
              playsinline
              class="h-full w-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/35 to-black/0" />
            <p class="absolute left-3 top-3 text-sm font-black text-white">
              {{ show.brand }}
            </p>
          </div>
        </div>

        <div class="pt-3">
          <h3 class="text-lg font-bold text-[#232d39]">
            {{ show.title }}
          </h3>
          <p class="mt-1 text-sm text-[#5f6976]">{{ show.schedule }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Yippee Finance Original Shows",
  },
  shows: {
    type: Array,
    default: () => [],
  },
});
</script>
