<template>
  <section>
    <p class="text-xs text-[#4f5966]">
      {{ quote.exchange }} - Delayed Quote · {{ quote.currency }}
    </p>

    <div class="mt-1 flex items-center gap-2 border-b border-[#d7dce2] pb-3">
      <h1 class="text-xl font-extrabold text-[#232d39]">
        {{ quote.name }} ({{ quote.symbol }})
      </h1>
      <v-btn icon size="x-small" variant="text">
        <v-icon icon="mdi-star-outline" />
      </v-btn>
    </div>

    <div class="mt-3">
      <p class="text-xl font-bold text-[#232d39]">
        {{ quote.price }}
        <span
          class="ml-1 text-xl"
          :class="isPositive ? 'text-[#0a8f69]' : 'text-[#cb2f2f]'"
        >
          {{ quote.change }} ({{ quote.changePercent }})
        </span>
      </p>
      <p class="mt-1 text-xs text-[#4f5966]">{{ quote.timestamp }}</p>
    </div>

    <div class="mt-5 flex items-center gap-2">
      <v-btn
        size="small"
        variant="text"
        class="!min-w-0 !rounded !px-3 !py-1 !text-sm !font-semibold !normal-case"
        :class="
          activeFilter === 'all' ? '!bg-[#e8f0fd] !text-blue-700' : '!text-[#2b3642]'
        "
        @click="activeFilter = 'all'"
      >
        All
      </v-btn>
      <v-btn
        size="small"
        variant="text"
        class="!min-w-0 !rounded !px-3 !py-1 !text-sm !font-semibold !normal-case"
        :class="
          activeFilter === 'news' ? '!bg-[#e8f0fd] !text-blue-700' : '!text-[#2b3642]'
        "
        @click="activeFilter = 'news'"
      >
        News
      </v-btn>
    </div>

    <section class="mt-4">
      <article
        v-for="item in filteredNewsList"
        :key="item.slug"
        class="flex gap-3 border-b border-[#d7dce2] py-5"
      >
        <NuxtLink :to="`/news/${item.slug}`" class="shrink-0">
          <img
            :src="item.image"
            alt="news list"
            class="h-[110px] w-[170px] rounded-md object-cover"
          />
        </NuxtLink>

        <div class="min-w-0">
          <NuxtLink :to="`/news/${item.slug}`" class="block">
            <h2
              class="text-lg font-extrabold leading-tight text-[#232d39] transition-colors hover:text-[#1b5fd0]"
            >
              {{ item.title }}
            </h2>
          </NuxtLink>

          <div class="mt-1 flex flex-wrap items-center gap-2 text-sm text-[#5f6976]">
            <v-chip
              v-if="item.hasNewsLabel"
              size="x-small"
              variant="flat"
              class="!h-5 !bg-[#e8f0fd] !px-2 !text-[11px] !font-semibold !text-blue-700"
            >
              News
            </v-chip>
            <p>{{ item.source }} • {{ item.time }}</p>
          </div>

          <div class="mt-2 flex flex-wrap gap-2">
            <v-chip
              v-for="tag in item.tags"
              :key="`${item.slug}-${tag.symbol}`"
              size="x-small"
              variant="outlined"
              class="!text-xs"
            >
              <span
                class="!rounded-full !border !border-gray-300 px-[8px] py-[1px]"
                :class="tag.positive ? 'text-[#0a8f69]' : 'text-[#cc2f2f]'"
              >
                {{ tag.symbol }} {{ tag.value }}
              </span>
            </v-chip>
          </div>
        </div>
      </article>
    </section>
  </section>
</template>

<script setup>
const props = defineProps({
  symbol: {
    type: String,
    default: "CL=F",
  },
});

const stockQuoteStore = useStockQuoteStore();
const stockNewsStore = useStockNewsStore();

const normalizedSymbol = computed(() => stockQuoteStore.resolveSymbol(props.symbol));
const quote = computed(() => stockQuoteStore.getQuote(normalizedSymbol.value));
const isPositive = computed(() => String(quote.value.change).startsWith("+"));
const activeFilter = ref("all");
const newsList = computed(() => stockNewsStore.getNews(normalizedSymbol.value));

const filteredNewsList = computed(() => {
  if (activeFilter.value === "news") {
    return newsList.value.filter((item) => item.hasNewsLabel);
  }
  return newsList.value;
});
</script>
