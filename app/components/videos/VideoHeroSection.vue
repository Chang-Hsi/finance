<template>
  <section class="grid grid-cols-1 gap-4 lg:grid-cols-12">
    <article class="lg:col-span-8">
      <div class="overflow-hidden rounded-t-md border border-[#d5dae1] bg-black">
        <div class="relative h-[280px] sm:h-[360px] lg:h-[500px]">
          <video
            :key="activeVideo.id"
            :src="activeVideo.video"
            autoplay
            muted
            loop
            playsinline
            class="h-full w-full object-cover"
          />

          <div
            class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/45"
          />

          <p
            class="absolute left-3 top-3 text-xl font-extrabold leading-tight text-white drop-shadow-md"
          >
            {{ activeVideo.title }}
          </p>
        </div>
      </div>

      <div
        class="rounded-b-md border border-t-0 border-[#d5dae1] bg-[#eceff3] px-5 py-6 text-center"
      >
        <h2
          class="mx-auto max-w-[760px] text-xl font-extrabold leading-tight text-[#232d39] md:text-3xl"
        >
          {{ activeVideo.title }}
        </h2>

        <p class="mx-auto mt-3 max-w-[820px] text-base leading-[1.5] text-[#2d3642]">
          {{ activeVideo.description }}
        </p>

        <div
          class="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm text-[#4e5966]"
        >
          <span>{{ activeVideo.source }}</span>
          <span>•</span>
          <span>{{ activeVideo.time }}</span>
        </div>

        <div class="mt-2 flex flex-wrap items-center justify-center gap-2">
          <span
            v-for="tag in activeVideo.tags"
            :key="`${activeVideo.id}-${tag.symbol}`"
            class="rounded-full border border-[#bfc8d3] bg-white px-2 py-[2px] text-xs font-semibold"
            :class="tag.positive ? 'text-[#0a8f69]' : 'text-[#cb2f2f]'"
          >
            {{ tag.symbol }} {{ tag.value }}
          </span>
        </div>
      </div>
    </article>

    <aside class="lg:col-span-4">
      <div
        class="max-h-[700px] overflow-y-auto rounded-md border border-[#d5dae1] bg-[#f6f8fb]"
      >
        <button
          v-for="item in items"
          :key="item.id"
          type="button"
          class="group flex w-full items-start gap-3 border-b border-[#d5dae1] px-3 py-2 text-left transition-colors hover:bg-[#edf3ff]"
          :class="item.id === activeVideo.id ? 'bg-[#e9f1ff]' : ''"
          @click="activeVideoId = item.id"
        >
          <div
            class="relative h-[70px] w-[120px] shrink-0 overflow-hidden rounded-sm bg-black"
          >
            <video
              :src="item.video"
              muted
              loop
              autoplay
              playsinline
              class="h-full w-full object-cover"
            />

            <div
              class="absolute bottom-1 left-1 flex items-center gap-1 rounded bg-black/75 px-1 py-[1px] text-[12px] font-semibold text-white"
            >
              <v-icon icon="mdi-play" size="12" />
              <span>{{ item.duration }}</span>
            </div>
          </div>

          <div class="min-w-0 flex-1">
            <p
              class="line-clamp-2 text-base font-bold leading-tight text-[#232d39] transition-colors group-hover:text-[#1d5fff]"
              :class="item.id === activeVideo.id ? 'text-[#1d5fff]' : ''"
            >
              {{ item.title }}
            </p>
            <p class="mt-1 text-xs text-[#5f6976]">{{ item.time }}</p>
          </div>
        </button>
      </div>
    </aside>
  </section>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const activeVideoId = ref(props.items[0]?.id || null);

watch(
  () => props.items,
  (nextItems) => {
    if (!nextItems.length) {
      activeVideoId.value = null;
      return;
    }

    if (!nextItems.some((item) => item.id === activeVideoId.value)) {
      activeVideoId.value = nextItems[0].id;
    }
  },
  { immediate: true }
);

const activeVideo = computed(() => {
  return (
    props.items.find((item) => item.id === activeVideoId.value) ||
    props.items[0] || {
      id: "empty",
      video: "",
      title: "",
      description: "",
      source: "",
      time: "",
      tags: [],
    }
  );
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
