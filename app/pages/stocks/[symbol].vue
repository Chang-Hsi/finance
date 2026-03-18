<template>
  <section class="py-5">
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-12">
      <aside class="xl:col-span-2">
        <nav class="sticky top-6 flex flex-col items-start gap-1">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            class="rounded px-2 py-1 text-base font-semibold transition"
            :class="
              activeTab === tab.key
                ? 'bg-[#e8f0fd] text-blue-700'
                : 'text-[#2b3642] hover:bg-[#eceff3]'
            "
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </nav>
      </aside>

      <div class="xl:col-span-10">
        <Summary v-if="activeTab === 'summary'" :symbol="resolvedSymbol" />
        <News v-else-if="activeTab === 'news'" :symbol="resolvedSymbol" />
        <Chart v-else-if="activeTab === 'chart'" :symbol="resolvedSymbol" />
        <HistoricalData
          v-else-if="activeTab === 'historical-data'"
          :symbol="resolvedSymbol"
        />
        <Futures v-else :symbol="resolvedSymbol" />
      </div>
    </div>
  </section>
</template>

<script setup>
import Summary from "~/components/stocks/Summary.vue";
import News from "~/components/stocks/News.vue";
import Chart from "~/components/stocks/Chart.vue";
import HistoricalData from "~/components/stocks/HistoricalData.vue";
import Futures from "~/components/stocks/Futures.vue";

definePageMeta({
  keepalive: true,
});

const router = useRouter();
const route = useRoute();

const tabs = [
  { key: "summary", label: "Summary" },
  { key: "news", label: "News" },
  { key: "chart", label: "Chart" },
  { key: "historical-data", label: "Historical Data" },
  { key: "futures", label: "Futures" },
];

const defaultTab = "summary";
const activeTab = ref(defaultTab);
const newsScrollPositions = useState("stocks-news-scroll-positions", () => ({}));
const resolvedSymbol = computed(() =>
  decodeURIComponent(String(route.params.symbol || ""))
);
const stockStateKey = computed(() => resolvedSymbol.value || "__default__");

const isValidTab = (value) => tabs.some((tab) => tab.key === value);

const getRouteTab = () => {
  const routeTab = String(route.query.tab || "");
  return isValidTab(routeTab) ? routeTab : defaultTab;
};

const syncTabFromRoute = () => {
  const routeTab = getRouteTab();
  if (activeTab.value !== routeTab) {
    activeTab.value = routeTab;
  }
};

const saveNewsScrollPosition = () => {
  if (!import.meta.client) {
    return;
  }
  newsScrollPositions.value[stockStateKey.value] = window.scrollY;
};

const restoreNewsScrollPosition = async () => {
  if (!import.meta.client || activeTab.value !== "news") {
    return;
  }

  const savedPosition = newsScrollPositions.value[stockStateKey.value];
  if (typeof savedPosition !== "number") {
    return;
  }

  await nextTick();
  requestAnimationFrame(() => {
    window.scrollTo({ top: savedPosition, behavior: "auto" });
  });
};

watch(
  () => [resolvedSymbol.value, route.query.tab],
  async () => {
    syncTabFromRoute();
    await restoreNewsScrollPosition();
  },
  { immediate: true }
);

watch(activeTab, async (nextTab, previousTab) => {
  if (previousTab === "news" && nextTab !== "news") {
    saveNewsScrollPosition();
  }

  const routeTab = getRouteTab();
  if (nextTab !== routeTab) {
    const nextQuery = { ...route.query };
    if (nextTab === defaultTab) {
      delete nextQuery.tab;
    } else {
      nextQuery.tab = nextTab;
    }
    await router.replace({ query: nextQuery });
  }
});

onBeforeRouteLeave(() => {
  if (activeTab.value === "news") {
    saveNewsScrollPosition();
  }
});

onMounted(() => {
  restoreNewsScrollPosition();
});

onActivated(() => {
  restoreNewsScrollPosition();
});
</script>
