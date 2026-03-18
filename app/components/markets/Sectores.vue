<template>
  <section class="py-8">
    <h2 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-[#232d39]">
      Sectors
    </h2>

    <div class="rounded-md border border-[#d7dce2] bg-white p-4 md:p-5">
      <div class="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div>
          <div class="mb-4 flex items-end justify-between gap-3">
            <h3 class="text-lg font-extrabold leading-tight text-[#232d39]">
              Select a Sector for a Visual Breakdown
            </h3>
            <p class="hidden text-sm text-[#5f6976] md:block">Market Weight</p>
          </div>

          <div
            class="grid grid-cols-[1.5fr_1fr_120px] gap-4 border-b border-[#d7dce2] pb-2 text-sm text-[#2f3844]"
          >
            <span>Sector</span>
            <span>Market Weight</span>
            <span class="text-right">YTD Return</span>
          </div>

          <button
            v-for="row in sectorRows"
            :key="row.name"
            type="button"
            class="grid w-full grid-cols-[1.5fr_1fr_120px] items-center gap-4 border-b border-[#d7dce2] px-4 py-4 text-left transition-colors last:border-b-0"
            :class="
              selectedSector === row.name
                ? 'bg-[#e8f4ff] ring-1 ring-inset ring-[#1d5fff]'
                : 'hover:bg-[#f7f9fc]'
            "
            @click="selectedSector = row.name"
          >
            <p class="text-sm font-bold text-[#232d39]">{{ row.name }}</p>

            <div class="flex items-center gap-3">
              <div class="h-4 w-full overflow-hidden bg-[#d8dee5]">
                <div
                  class="h-full bg-[#61a4d3]"
                  :style="{ width: `${Math.min(row.weight, 100)}%` }"
                />
              </div>
              <span class="min-w-[64px] text-sm text-[#2f3844]">
                {{ formatWeight(row.weight) }}111
              </span>
            </div>

            <p class="text-right text-sm" :class="changeClass(row.ytdReturn)">
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
              {{ selectedSector }}
            </h3>

            <v-btn
              v-if="selectedSector !== 'All Sectors'"
              variant="outlined"
              rounded="pill"
              class="!min-w-0 !border-[#2f3844] !px-4 !text-sm !font-semibold !normal-case !text-[#232d39]"
              @click="goToSelectedSector"
            >
              Go to Sector
            </v-btn>
          </div>

          <ClientOnly>
            <VChart
              class="h-[600px] w-full overflow-hidden rounded"
              :option="chartOption"
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
</template>

<script setup>
import { computed, ref } from "vue";
import VChart, { THEME_KEY } from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { TreemapChart } from "echarts/charts";
import { TooltipComponent } from "echarts/components";
import { sectorHeatmapGroups, sectorsData } from "@/data/marketsOverview";

use([CanvasRenderer, TreemapChart, TooltipComponent]);
provide(THEME_KEY, "light");

const sectorRows = sectorsData;
const selectedSector = ref("All Sectors");

const goToSelectedSector = () => {
  if (selectedSector.value === "All Sectors") {
    return;
  }

  navigateTo(`/markets/sectors?${encodeURIComponent(selectedSector.value)}`);
};

const legend = [
  { label: "<= -3", color: "#7b2943" },
  { label: "-2", color: "#b83b62" },
  { label: "-1", color: "#db4f6d" },
  { label: "0", color: "#6c7a86" },
  { label: "1", color: "#1eaa82" },
  { label: "2", color: "#168f77" },
  { label: ">= 3", color: "#116f63" },
];

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

const heatmapData = computed(() => {
  const rows = sectorHeatmapGroups[selectedSector.value] || [];

  return rows.map((item) => ({
    name: item.name,
    value: item.value,
    dayReturn: item.dayReturn,
    itemStyle: {
      color: getHeatmapColor(item.dayReturn),
      borderColor: "#ffffff",
      borderWidth: 1,
      gapWidth: 1,
    },
  }));
});

const chartOption = computed(() => ({
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
      `${data.name}<br/>Weight: ${formatWeight(
        data.value
      )}<br/>Day Return: ${formatDayReturn(data.dayReturn)}`,
  },
  series: [
    {
      type: "treemap",
      roam: false,
      nodeClick: false,
      breadcrumb: {
        show: false,
      },
      data: heatmapData.value,
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      leafDepth: 1,
      upperLabel: {
        show: false,
      },
      label: {
        show: true,
        color: "#ffffff",
        fontWeight: 700,
        fontSize: 12,
        lineHeight: 16,
        formatter: ({ data }) => `${data.name}\n${formatDayReturn(data.dayReturn)}`,
      },
      itemStyle: {
        borderColor: "#ffffff",
        borderWidth: 1,
        gapWidth: 1,
      },
      emphasis: {
        itemStyle: {
          borderColor: "#ffffff",
          borderWidth: 1,
        },
      },
    },
  ],
}));

const changeClass = (value) => {
  if (String(value).startsWith("-")) {
    return "text-[#da1e2f]";
  }

  if (String(value).startsWith("+")) {
    return "text-[#0a8f69]";
  }

  return "text-[#2f3844]";
};

const formatWeight = (value) => `${Number(value).toFixed(2)}%`;
const formatDayReturn = (value) => `${Number(value).toFixed(2)}%`;
</script>
