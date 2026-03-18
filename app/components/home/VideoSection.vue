<template>
  <section class="border-b border-[#d7dce2] py-6">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div class="lg:col-span-7">
        <v-card class="overflow-hidden rounded-md bg-[#eef1f4]" flat>
          <video
            :src="activeVideo.src"
            class="h-[380px] w-full bg-black object-cover"
            controls
            preload="metadata"
            playsinline
          />
          <div class="p-4">
            <h2 class="text-xl font-bold text-[#232d39]">{{ activeVideo.title }}</h2>
            <p class="mt-2 text-base text-[#2f3945]">{{ activeVideo.summary }}</p>
            <div class="mt-2 flex items-center gap-2 text-sm text-[#5f6976]">
              <span>{{ activeVideo.time }}</span>
              <v-chip size="x-small" variant="outlined" class="!text-xs">
                <span
                  class="!rounded-full !border !border-gray-300 px-[8px] py-[1px]"
                  :class="activeVideo.tagPositive ? 'text-[#0a8f69]' : 'text-[#cb2f2f]'"
                >
                  {{ activeVideo.tag }}
                </span>
              </v-chip>
            </div>
          </div>
        </v-card>
      </div>

      <div class="lg:col-span-5">
        <article
          v-for="(item, index) in videos"
          :key="item.title"
          class="flex cursor-pointer gap-3 border-b border-[#d7dce2] py-3"
          @click="activeIndex = index"
        >
          <div class="relative w-[38%] shrink-0 overflow-hidden rounded-md">
            <video
              :src="item.src"
              class="h-[100px] w-full bg-black object-cover"
              muted
              playsinline
              preload="metadata"
            />
            <span
              class="absolute bottom-1 left-1 rounded bg-[#1f2937] px-1 text-xs text-white"
              >{{ item.duration }}</span
            >
          </div>
          <div class="w-[62%]">
            <h3
              class="text-lg font-semibold leading-tight"
              :class="activeIndex === index ? 'text-[#0a8b7c]' : 'text-[#232d39]'"
            >
              {{ item.title }}
            </h3>
            <p class="mt-1 text-sm text-[#5f6976]">{{ item.source }} • {{ item.time }}</p>
            <div class="mt-1">
              <v-chip v-if="item.tag" size="x-small" variant="outlined" class="!text-xs">
                <span
                  class="!rounded-full !border !border-gray-300 px-[8px] py-[1px]"
                  :class="item.tagPositive ? 'text-[#0a8f69]' : 'text-[#cb2f2f]'"
                  @click.stop.prevent="goStock(tagSymbol(item.tag))"
                  >{{ item.tag }}</span
                >
              </v-chip>
            </div>
          </div>
        </article>

        <v-btn
          variant="text"
          class="mt-2 !px-0 !text-base !font-bold !normal-case !text-[#293544]"
          >View More</v-btn
        >
      </div>
    </div>
  </section>
</template>

<script setup>
const stockHref = (symbol) => `/stocks/${encodeURIComponent(String(symbol || ""))}`;
const tagSymbol = (tagText) => String(tagText || "").split(" ")[0];
const goStock = (symbol) => navigateTo(stockHref(symbol));

const videos = [
  {
    src: "/videos/v1.mp4",
    title: "Apple's new lineup: A closer look at the MacBook Neo & iPhone 17e",
    summary:
      "Apple unveiled several new devices, including the $599 MacBook Neo, updated MacBook Air and Pro models, and the new iPhone 17e.",
    source: "Yippee Finance Video",
    time: "4d ago",
    duration: "03:46",
    tag: "AAPL -2.21%",
    tagPositive: false,
  },
  {
    src: "/videos/v2.mp4",
    title: "Tax season: The key dates taxpayers should know besides April 15",
    source: "Yippee Finance Video",
    time: "7d ago",
    duration: "01:38",
    tag: "",
    tagPositive: true,
    summary: "",
  },
  {
    src: "/videos/v3.mp4",
    title: "What $150-per-barrel oil would mean for gas prices",
    source: "Yippee Finance Video",
    time: "5d ago",
    duration: "02:34",
    tag: "COST +0.52%",
    tagPositive: true,
    summary: "",
  },
  {
    src: "/videos/v4.mp4",
    title: "Strait of Hormuz conflict makes US economy 'fragile'",
    source: "Yippee Finance Video",
    time: "4d ago",
    duration: "01:25",
    tag: "CL=F +1.67%",
    tagPositive: true,
    summary: "",
  },
];

const activeIndex = ref(0);
const activeVideo = computed(() => videos[activeIndex.value]);
</script>
