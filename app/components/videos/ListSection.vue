<template>
  <section class="space-y-7">
    <article
      v-for="section in sections"
      :key="section.id"
      class="border-b border-[#d7dce2] pb-6"
    >
      <div class="mb-4 flex items-center justify-between gap-3">
        <h2 class="text-2xl font-extrabold text-[#232d39]">{{ section.title }}</h2>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article v-for="item in section.items" :key="item.id" class="group">
          <div
            class="relative overflow-hidden rounded-md border border-[#d6dce4] bg-black"
          >
            <video
              :src="item.video"
              muted
              loop
              autoplay
              playsinline
              class="h-[160px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />

            <div
              class="absolute bottom-1 left-1 flex items-center gap-1 rounded bg-black/75 px-1 py-[1px] text-sm font-semibold text-white"
            >
              <v-icon icon="mdi-play" size="12" />
              <span>{{ item.duration }}</span>
            </div>
          </div>

          <h3
            class="mt-2 line-clamp-2 text-base font-bold leading-tight text-[#232d39] transition-colors group-hover:text-[#1d5fff]"
          >
            {{ item.title }}
          </h3>

          <div class="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#5f6976]">
            <span>{{ item.time }}</span>
          </div>

          <div class="mt-1 flex flex-wrap gap-2">
            <span
              v-for="tag in item.tags"
              :key="`${item.id}-${tag.symbol}`"
              class="rounded-full border border-[#c3ccd7] bg-[#f7f9fc] px-2 py-[2px] text-xs font-semibold"
              :class="tag.positive ? 'text-[#0a8f69]' : 'text-[#cb2f2f]'"
            >
              {{ tag.symbol }} {{ tag.value }}
            </span>
          </div>
        </article>
      </div>
    </article>
  </section>
</template>

<script setup>
defineProps({
  sections: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
