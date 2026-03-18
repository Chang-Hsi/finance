<template>
  <section class="mx-auto w-full max-w-[1460px] px-4 pb-8">
    <div class="mb-3 flex items-center gap-2 text-[15px] text-[#2f3844]">
      <NuxtLink to="/markets" class="transition-colors hover:text-[#1d5fff]"
        >Sectors</NuxtLink
      >
      <span>/</span>
      <span class="font-semibold text-[#232d39]">{{ sectorDetail.name }}</span>
    </div>

    <div class="mb-8 grid gap-6 xl:grid-cols-[1.2fr_1fr]">
      <div>
        <h1
          class="mb-3 text-xl font-extrabold leading-none tracking-tight text-[#232d39]"
        >
          {{ sectorDetail.name }}
        </h1>
        <p class="max-w-[760px] text-sm leading-8 text-[#2f3844]">
          {{ descriptionText }}
        </p>
        <button
          type="button"
          class="mt-3 text-sm font-semibold text-[#232d39] transition-colors hover:text-[#1d5fff]"
          @click="descriptionExpanded = !descriptionExpanded"
        >
          {{ descriptionExpanded ? "Show Less" : "Show More" }}
        </button>
      </div>

      <div
        class="grid h-[96px] grid-cols-2 rounded-md border border-[#d7dce2] bg-white md:grid-cols-4"
      >
        <div
          v-for="(item, index) in statsCards"
          :key="item.label"
          class="relative flex flex-col items-center justify-center gap-2 px-1 text-center after:absolute after:right-0 after:top-4 after:bottom-4 after:w-px after:bg-[#d7dce2] last:after:hidden md:after:block after:hidden"
        >
          <p class="text-sm text-[#4f5966]">{{ item.label }}</p>

          <p class="text-sm font-semibold text-[#232d39]">{{ item.value }}</p>
        </div>
      </div>
    </div>

    <section class="border-b border-[#d7dce2] pb-8">
      <div class="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-wrap items-center gap-5">
          <div class="flex items-center gap-2 text-base font-bold text-[#232d39]">
            <span class="h-2 w-2 rounded-full bg-[#1d5fff]" />
            <span>{{ sectorDetail.name }}</span>
          </div>
          <div class="flex items-center gap-2 text-base font-bold text-[#232d39]">
            <span class="h-2 w-2 rounded-full bg-[#f4b654]" />
            <span>{{ sectorDetail.benchmark.label }}</span>
            <span class="text-base font-medium text-[#4f5966]">
              {{ sectorDetail.benchmark.symbol }}
            </span>
          </div>
        </div>
      </div>

      <div class="mb-4 flex flex-wrap items-center gap-2">
        <button
          v-for="range in chartRanges"
          :key="range"
          type="button"
          class="rounded-md px-3 py-1.5 text-sm font-semibold transition-colors"
          :class="
            selectedRange === range
              ? 'bg-[#e8f0ff] text-[#1d5fff]'
              : 'text-[#232d39] hover:bg-[#f3f6fb]'
          "
          @click="selectedRange = range"
        >
          {{ range }}
        </button>
      </div>

      <div class="rounded-md border border-[#d7dce2] bg-white px-4 py-5">
        <div class="mb-4 flex justify-end gap-3">
          <span
            class="rounded bg-[#ffd480] px-2 py-1 text-sm font-semibold text-[#232d39]"
          >
            {{ benchmarkLatest }}
          </span>
          <span class="rounded bg-[#0a8f69] px-2 py-1 text-sm font-semibold text-white">
            {{ sectorLatest }}
          </span>
        </div>

        <ClientOnly>
          <VChart class="h-[320px] w-full" :option="comparisonChartOption" autoresize />
        </ClientOnly>
      </div>

      <div class="mt-6 grid gap-4 lg:grid-cols-5">
        <div
          v-for="card in sectorDetail.performanceCards"
          :key="card.title"
          class="rounded-md border border-[#d7dce2] bg-white px-4 py-4"
        >
          <p class="text-[15px] font-bold text-[#232d39]">{{ card.title }}</p>
          <div class="mt-3 flex items-center justify-between text-sm text-[#4f5966]">
            <span>Sector</span>
            <span>{{ sectorDetail.benchmark.label }}</span>
          </div>
          <div class="mt-1 flex items-center justify-between text-lg font-semibold">
            <span :class="valueClass(card.sector)">{{ card.sector }}</span>
            <span :class="valueClass(card.benchmark)">{{ card.benchmark }}</span>
          </div>
        </div>
      </div>

      <p class="mt-4 text-sm text-[#4f5966]">
        Note: Sector performance is calculated based on the previous closing price of all
        sector constituents
      </p>
    </section>

    <section class="border-b border-[#d7dce2] py-8">
      <h2 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-[#232d39]">
        Industries in This Sector
      </h2>

      <div class="rounded-md border border-[#d7dce2] bg-white p-4 md:p-5">
        <div class="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div>
            <div class="mb-4 flex items-end justify-between gap-3">
              <h3 class="text-lg font-extrabold leading-tight text-[#232d39]">
                Select an Industry for a Visual Breakdown
              </h3>
              <p class="hidden text-sm text-[#5f6976] md:block">Market Weight</p>
            </div>

            <div
              class="grid grid-cols-[1.5fr_1fr_120px] gap-4 border-b border-[#d7dce2] pb-2 text-sm text-[#2f3844]"
            >
              <span>Industry</span>
              <span>Market Weight</span>
              <span class="text-right">YTD Return</span>
            </div>

            <button
              v-for="row in sectorDetail.industryRows"
              :key="row.name"
              type="button"
              class="grid w-full grid-cols-[1.5fr_1fr_120px] items-center gap-4 border-b border-[#d7dce2] px-4 py-4 text-left transition-colors last:border-b-0"
              :class="
                selectedIndustry === row.name
                  ? 'bg-[#e8f4ff] ring-1 ring-inset ring-[#1d5fff]'
                  : 'hover:bg-[#f7f9fc]'
              "
              @click="selectedIndustry = row.name"
            >
              <p class="truncate text-sm font-bold text-[#232d39]">{{ row.name }}</p>

              <div class="flex items-center gap-3">
                <div class="h-4 w-full overflow-hidden bg-[#d8dee5]">
                  <div
                    class="h-full bg-[#61a4d3]"
                    :style="{ width: `${Math.min(row.marketWeight, 100)}%` }"
                  />
                </div>
                <span class="min-w-[64px] text-sm text-[#2f3844]">
                  {{ row.marketWeight.toFixed(2) }}%
                </span>
              </div>

              <p class="text-right text-sm" :class="valueClass(row.ytdReturn)">
                {{ row.ytdReturn }}
              </p>
            </button>

            <p class="mt-5 text-sm text-[#3f4957]">
              Note: Percentage % data on heatmap indicates Day Return
            </p>
          </div>

          <div>
            <div class="mb-3 flex items-center justify-between gap-3">
              <h3 class="text-lg font-extrabold leading-tight text-[#232d39]">
                {{ selectedIndustry }}
              </h3>
            </div>

            <ClientOnly>
              <VChart
                class="h-[600px] w-full rounded"
                :option="industryChartOption"
                autoresize
              />
            </ClientOnly>

            <div class="mt-5 flex flex-col gap-2">
              <div class="flex overflow-hidden rounded-full">
                <div
                  v-for="item in legend"
                  :key="item.label"
                  class="h-4 flex-1"
                  :style="{ backgroundColor: item.color }"
                />
              </div>
              <div class="flex justify-between text-sm text-[#3f4957]">
                <span v-for="item in legend" :key="`${item.label}-text`">{{
                  item.label
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-8">
      <div class="mb-4 flex flex-wrap items-center justify-between gap-4">
        <h2 class="text-2xl font-extrabold leading-none tracking-tight text-[#232d39]">
          Largest Companies in This Sector
        </h2>
      </div>

      <div class="mb-4 inline-flex rounded-full border border-[#cfd6de] p-1">
        <button
          type="button"
          class="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors"
          :class="
            companyView === 'table'
              ? 'border border-[#cfd6de] bg-[#f3f6fb] text-[#1d5fff]'
              : 'text-[#232d39]'
          "
          @click="companyView = 'table'"
        >
          Table View
        </button>
        <button
          type="button"
          class="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors"
          :class="
            companyView === 'heatmap'
              ? 'border border-[#cfd6de] bg-[#f3f6fb] text-[#1d5fff]'
              : 'text-[#232d39]'
          "
          @click="companyView = 'heatmap'"
        >
          Heatmap View
        </button>
      </div>

      <div
        v-if="companyView === 'table'"
        class="overflow-x-auto rounded-[18px] border border-[#d7dce2] bg-white"
      >
        <table class="min-w-[1060px] w-full table-fixed border-separate border-spacing-0">
          <thead>
            <tr class="text-left text-sm text-[#2f3844]">
              <th class="px-5 py-4 font-medium">Name</th>
              <th class="px-4 py-4 font-medium">Last Price</th>
              <th class="px-4 py-4 font-medium">1Y Target Est.</th>
              <th class="px-4 py-4 font-medium">Market Weight</th>
              <th class="px-4 py-4 font-medium">Market Cap</th>
              <th class="px-4 py-4 font-medium">Day Change %</th>
              <th class="px-4 py-4 font-medium">YTD Return</th>
              <th class="px-4 py-4 font-medium">Avg. Analyst Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="company in sectorDetail.companyRows"
              :key="company.symbol"
              class="transition-colors odd:bg-[#f7f9fc] hover:bg-[#eef6ff]"
            >
              <td class="px-5 py-4">
                <div class="font-semibold text-[#1d5fff]">{{ company.symbol }}</div>
                <div class="text-[15px] text-[#2f3844]">{{ company.name }}</div>
              </td>
              <td class="px-4 py-4 text-[15px] text-[#2f3844]">
                {{ company.lastPrice }}
              </td>
              <td class="px-4 py-4 text-[15px] text-[#2f3844]">
                {{ company.targetPrice }}
              </td>
              <td class="px-4 py-4 text-[15px] text-[#2f3844]">
                {{ company.marketWeight }}
              </td>
              <td class="px-4 py-4 text-[15px] text-[#2f3844]">
                {{ company.marketCap }}
              </td>
              <td
                class="px-4 py-4 text-[15px]"
                :class="valueClass(company.dayChangePercent)"
              >
                {{ company.dayChangePercent }}
              </td>
              <td class="px-4 py-4 text-[15px]" :class="valueClass(company.ytdReturn)">
                {{ company.ytdReturn }}
              </td>
              <td class="px-4 py-4">
                <span
                  class="inline-flex min-w-[122px] justify-center rounded bg-[#0b8a73] px-3 py-1 text-sm font-bold text-white"
                >
                  {{ company.rating }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="rounded-[18px] border border-[#d7dce2] bg-white p-4">
        <div class="mb-5 flex justify-end">
          <div class="w-full max-w-[390px]">
            <div class="flex overflow-hidden rounded-full">
              <div
                v-for="item in legend"
                :key="`${item.label}-company`"
                class="h-4 flex-1"
                :style="{ backgroundColor: item.color }"
              />
            </div>
            <div class="mt-2 flex justify-between text-sm text-[#3f4957]">
              <span v-for="item in legend" :key="`${item.label}-company-text`">
                {{ item.label }}
              </span>
            </div>
          </div>
        </div>

        <ClientOnly>
          <VChart class="h-[480px] w-full" :option="companyChartOption" autoresize />
        </ClientOnly>
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, provide, ref, watch } from "vue";
import VChart, { THEME_KEY } from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { GridComponent, TooltipComponent } from "echarts/components";
import { LineChart, TreemapChart } from "echarts/charts";
import { getSectorPageData, sectorNames } from "@/data/sectorDetails";

use([CanvasRenderer, GridComponent, TooltipComponent, LineChart, TreemapChart]);
provide(THEME_KEY, "light");

const route = useRoute();
const chartRanges = ["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y", "All"];
const selectedRange = ref("6M");
const descriptionExpanded = ref(false);
const selectedIndustry = ref("All Industries");
const companyView = ref("table");

const legend = [
  { label: "<= -3", color: "#7b2943" },
  { label: "-2", color: "#b83b62" },
  { label: "-1", color: "#db4f6d" },
  { label: "0", color: "#6c7a86" },
  { label: "1", color: "#1eaa82" },
  { label: "2", color: "#168f77" },
  { label: ">= 3", color: "#116f63" },
];

const treemapPadding = {
  top: 10,
  right: 12,
  bottom: 12,
  left: 12,
};

const resolvedSectorName = computed(() => {
  const querySector =
    typeof route.query.sector === "string" && sectorNames.includes(route.query.sector)
      ? route.query.sector
      : null;

  if (querySector) {
    return querySector;
  }

  const [, rawQuery = ""] = route.fullPath.split("?");
  const decoded = decodeURIComponent(rawQuery);

  if (sectorNames.includes(decoded)) {
    return decoded;
  }

  return "Technology";
});

const sectorDetail = computed(() => getSectorPageData(resolvedSectorName.value));

watch(
  () => resolvedSectorName.value,
  () => {
    selectedRange.value = "6M";
    selectedIndustry.value = "All Industries";
    companyView.value = "table";
    descriptionExpanded.value = false;
  },
  { immediate: true }
);

const statsCards = computed(() => [
  { label: "Market Cap", value: sectorDetail.value.stats.marketCap },
  { label: "Market Weight", value: sectorDetail.value.stats.marketWeight },
  { label: "Industries", value: String(sectorDetail.value.stats.industries) },
  { label: "Companies", value: String(sectorDetail.value.stats.companies) },
]);

const descriptionText = computed(() => {
  if (descriptionExpanded.value) {
    return sectorDetail.value.description;
  }

  return `${sectorDetail.value.description.slice(0, 205)}...`;
});

const currentRangeData = computed(
  () =>
    sectorDetail.value.chartRanges[selectedRange.value] ||
    sectorDetail.value.chartRanges["6M"]
);

const sectorLatest = computed(() => {
  const value = currentRangeData.value.sectorSeries.at(-1) || 0;
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
});

const benchmarkLatest = computed(() => {
  const value = currentRangeData.value.benchmarkSeries.at(-1) || 0;
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
});

const comparisonChartOption = computed(() => ({
  animation: false,
  grid: {
    left: 22,
    right: 68,
    top: 14,
    bottom: 48,
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(35, 45, 57, 0.94)",
    borderWidth: 0,
    textStyle: {
      color: "#ffffff",
      fontSize: 13,
    },
    valueFormatter: (value) => `${Number(value).toFixed(2)}%`,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: currentRangeData.value.labels,
    axisTick: { show: false },
    axisLine: { lineStyle: { color: "#d7dce2" } },
    axisLabel: {
      color: "#4f5966",
      margin: 12,
    },
  },
  yAxis: {
    type: "value",
    position: "right",
    min: -6,
    max: 10,
    interval: 5,
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: {
      lineStyle: {
        color: "#d7dce2",
        type: "dashed",
      },
    },
    axisLabel: {
      color: "#4f5966",
      margin: 14,
      formatter: (value) => `${value > 0 ? "+" : ""}${Number(value).toFixed(2)}%`,
    },
  },
  series: [
    {
      type: "line",
      data: currentRangeData.value.sectorSeries,
      smooth: false,
      symbol: "none",
      lineStyle: { color: "#1d5fff", width: 1.5 },
      markLine: {
        symbol: "none",
        label: { show: false },
        lineStyle: { color: "#3b9f93", type: "dashed" },
        data: [{ yAxis: 0 }],
      },
    },
    {
      type: "line",
      data: currentRangeData.value.benchmarkSeries,
      smooth: false,
      symbol: "none",
      lineStyle: { color: "#f4b654", width: 2 },
    },
  ],
}));

const getHeatmapColor = (value) => {
  if (value <= -3) return "#7b2943";
  if (value <= -2) return "#b83b62";
  if (value <= -1) return "#db4f6d";
  if (value < 0) return "#e53d6e";
  if (value === 0) return "#6c7a86";
  if (value < 1) return "#1eaa82";
  if (value < 2) return "#159e7d";
  if (value < 3) return "#168974";
  return "#116f63";
};

const industryTreemapRows = computed(() => {
  if (selectedIndustry.value === "All Industries") {
    return sectorDetail.value.industryRows
      .filter((row) => row.name !== "All Industries")
      .map((row) => ({
        name: row.name,
        value: row.marketWeight,
        dayReturn: row.dayReturn,
      }));
  }

  const matchedCompanies = sectorDetail.value.companyRows.filter(
    (company) => company.industry === selectedIndustry.value
  );

  if (!matchedCompanies.length) {
    const selectedRow = sectorDetail.value.industryRows.find(
      (row) => row.name === selectedIndustry.value
    );

    return [
      {
        name: selectedIndustry.value,
        value: selectedRow?.marketWeight || 100,
        dayReturn: selectedRow?.dayReturn || 0,
      },
    ];
  }

  return matchedCompanies.map((company) => ({
    name: `${company.symbol} - ${company.name}`,
    value: company.marketWeightValue,
    dayReturn: company.dayChangeValue,
  }));
});

const industryChartOption = computed(() => ({
  animation: false,
  tooltip: {
    trigger: "item",
    backgroundColor: "rgba(35, 45, 57, 0.94)",
    borderWidth: 0,
    textStyle: {
      color: "#ffffff",
      fontSize: 13,
    },
    formatter: ({ data }) =>
      `${data.name}<br/>Weight: ${Number(data.value).toFixed(2)}%<br/>Day Return: ${
        data.dayReturn >= 0 ? "+" : ""
      }${Number(data.dayReturn).toFixed(2)}%`,
  },
  series: [
    {
      type: "treemap",
      ...treemapPadding,
      roam: false,
      nodeClick: false,
      breadcrumb: { show: false },
      data: industryTreemapRows.value.map((item) => ({
        ...item,
        itemStyle: {
          color: getHeatmapColor(item.dayReturn),
          borderColor: "#ffffff",
          borderWidth: 1,
          gapWidth: 1,
        },
      })),
      label: {
        show: true,
        color: "#ffffff",
        fontWeight: 700,
        fontSize: 12,
        lineHeight: 16,
        padding: [6, 8],
        overflow: "truncate",
        formatter: ({ data }) =>
          `${data.name}\n${data.dayReturn >= 0 ? "+" : ""}${Number(
            data.dayReturn
          ).toFixed(2)}%`,
      },
      itemStyle: {
        borderColor: "#ffffff",
        borderWidth: 1,
        gapWidth: 1,
      },
    },
  ],
}));

const companyChartOption = computed(() => ({
  animation: false,
  tooltip: {
    trigger: "item",
    backgroundColor: "rgba(35, 45, 57, 0.94)",
    borderWidth: 0,
    textStyle: {
      color: "#ffffff",
      fontSize: 13,
    },
    formatter: ({ data }) =>
      `${data.name}<br/>Market Weight: ${Number(data.value).toFixed(
        2
      )}%<br/>Day Change: ${data.dayReturn >= 0 ? "+" : ""}${Number(
        data.dayReturn
      ).toFixed(2)}%`,
  },
  series: [
    {
      type: "treemap",
      ...treemapPadding,
      roam: false,
      nodeClick: false,
      breadcrumb: { show: false },
      data: sectorDetail.value.companyRows.map((company) => ({
        name: `${company.symbol} - ${company.name}`,
        value: company.marketWeightValue,
        dayReturn: company.dayChangeValue,
        itemStyle: {
          color: getHeatmapColor(company.dayChangeValue),
          borderColor: "#ffffff",
          borderWidth: 1,
          gapWidth: 1,
        },
      })),
      label: {
        show: true,
        color: "#ffffff",
        fontWeight: 700,
        fontSize: 12,
        lineHeight: 16,
        padding: [6, 8],
        overflow: "truncate",
        formatter: ({ data }) =>
          `${data.name}\n${data.dayReturn >= 0 ? "+" : ""}${Number(
            data.dayReturn
          ).toFixed(2)}%`,
      },
      itemStyle: {
        borderColor: "#ffffff",
        borderWidth: 1,
        gapWidth: 1,
      },
    },
  ],
}));

const valueClass = (value) => {
  if (String(value).startsWith("-")) {
    return "text-[#da1e2f]";
  }

  if (String(value).startsWith("+")) {
    return "text-[#0a8f69]";
  }

  return "text-[#232d39]";
};
</script>
