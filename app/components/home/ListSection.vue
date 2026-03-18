<template>
  <section class="py-6">
    <h2 v-if="!isNewPage" class="mb-4 text-xl font-bold text-[#232d39]">More News</h2>
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-12">
      <div class="xl:col-span-8">
        <NuxtLink
          v-for="item in list"
          :key="item.title"
          :to="`/news/${item.slug}`"
          class="block"
        >
          <article class="flex gap-3 border-b border-[#d7dce2] py-5">
            <img
              :src="item.image"
              alt="news list"
              class="h-[110px] w-[170px] shrink-0 rounded-md object-cover"
            />
            <div class="min-w-0">
              <h3 class="text-lg font-extrabold leading-tight text-[#232d39]">
                {{ item.title }}
              </h3>
              <p class="mt-1 text-sm text-[#5f6976]">
                {{ item.source }} • {{ item.time }}
              </p>
              <div class="mt-1 flex flex-wrap gap-2">
                <v-chip
                  v-for="tag in item.tags"
                  :key="tag.symbol"
                  size="x-small"
                  variant="outlined"
                  class="!text-xs"
                >
                  <span
                    class="!rounded-full !border !border-gray-300 px-[8px] py-[1px]"
                    :class="tag.positive ? 'text-[#0a8f69]' : 'text-[#cc2f2f]'"
                    @click.stop.prevent="goStock(tag.symbol)"
                  >
                    {{ tag.symbol }} {{ tag.value }}
                  </span>
                </v-chip>
              </div>
            </div>
          </article>
        </NuxtLink>
      </div>

      <div class="xl:col-span-4">
        <v-card
          v-if="!isNewPage"
          class="rounded-md border border-[#d2d8df] bg-[#f7f8fa] p-4 xl:sticky xl:top-6"
          flat
        >
          <div class="mb-3 flex items-center gap-3">
            <div class="h-12 w-12 rounded bg-[#1f2937]">
              <v-icon icon="mdi-access-point pl-4 pt-5" size="20" color="#0a8b7c" />
            </div>
            <p class="text-base font-semibold text-[#232d39]">
              Sign up for the Yippee Finance Morning Brief
            </p>
          </div>
          <v-text-field
            density="comfortable"
            hide-details
            prepend-inner-icon="mdi-email-outline"
            rounded="pill"
            variant="outlined"
            placeholder=" Email address"
            class="mb-3"
          />
          <v-btn
            block
            rounded="pill"
            color="#1f2937"
            class="!text-base !font-bold !normal-case text-white"
            >Subscribe</v-btn
          >
        </v-card>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
const stockHref = (symbol) => `/stocks/${encodeURIComponent(String(symbol || ""))}`;
const goStock = (symbol) => navigateTo(stockHref(symbol));
const stockNewsStore = useStockNewsStore();

const route = useRoute();

const list = computed(() => stockNewsStore.getAllNews);
const isNewPage = computed(() => {
  return route.path === "/news";
});
</script>
