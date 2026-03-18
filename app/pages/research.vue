<template>
  <section class="mx-auto w-full max-w-[1460px] px-4 py-6">
    <div
      class="rounded-[18px] border border-[#d7dce2] bg-white px-4 py-4 shadow-[0_8px_28px_rgba(25,35,52,0.04)] md:px-6"
    >
      <div
        class="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#e6ebf2] pb-4"
      >
        <div class="flex flex-wrap items-center gap-3">
          <v-text-field
            v-model="searchInput"
            density="comfortable"
            hide-details
            variant="outlined"
            rounded="pill"
            prepend-inner-icon="mdi-magnify"
            class="research-search"
            @keydown.enter.prevent="applySearch"
          />

          <v-menu location="bottom start">
            <template #activator="{ props: menuProps }">
              <v-btn
                v-bind="menuProps"
                variant="text"
                class="!min-w-0 !px-2 !text-sm !font-semibold !normal-case !text-[#4f5966]"
              >
                {{ selectedChartTypeLabel }}
                <v-icon icon="mdi-chevron-down" size="16" class="ml-1" />
              </v-btn>
            </template>

            <v-list class="min-w-[180px] !py-1">
              <template v-for="group in chartTypeGroups" :key="group.label">
                <v-list-subheader class="!text-xs !font-semibold !text-[#7a8593]">
                  {{ group.label }}
                </v-list-subheader>

                <v-list-item
                  v-for="item in group.items"
                  :key="item.value"
                  rounded="lg"
                  class="mx-1 my-[2px]"
                  :class="
                    selectedChartType === item.value
                      ? 'bg-[#e8f0fd] text-blue-700'
                      : 'text-[#232d39]'
                  "
                  @click="selectedChartType = item.value"
                >
                  <v-list-item-title class="text-sm font-medium">
                    {{ item.label }}
                  </v-list-item-title>

                  <template #append>
                    <v-icon
                      v-if="selectedChartType === item.value"
                      icon="mdi-check"
                      size="16"
                      class="text-blue-700"
                    />
                  </template>
                </v-list-item>
              </template>
            </v-list>
          </v-menu>

          <div class="hidden h-6 w-px bg-[#d7dce2] md:block" />

          <div class="flex items-center gap-1">
            <v-menu
              v-model="indicatorMenuOpen"
              :close-on-content-click="false"
              location="bottom start"
            >
              <template #activator="{ props: menuProps }">
                <v-tooltip text="Indicators" location="bottom">
                  <template #activator="{ props: tooltipProps }">
                    <v-btn
                      v-bind="{ ...menuProps, ...tooltipProps }"
                      icon
                      size="small"
                      variant="text"
                      :class="
                        activeIndicators.length
                          ? '!bg-[#e8f0fd] !text-[#1d5fff]'
                          : '!text-[#596473]'
                      "
                    >
                      <v-icon icon="mdi-sigma" size="18" />
                    </v-btn>
                  </template>
                </v-tooltip>
              </template>

              <v-card rounded="xl" class="indicator-menu w-[360px] max-w-[90vw]">
                <div class="border-b border-[#e6ebf2] px-4 py-3">
                  <p class="text-sm font-semibold text-[#7a8593]">Applied</p>
                </div>

                <div class="px-2 py-2">
                  <div
                    v-for="item in appliedIndicatorEntries"
                    :key="item.id"
                    class="flex items-center justify-between rounded-lg px-2 py-2"
                  >
                    <span class="text-[15px] font-medium text-[#232d39]">
                      {{ item.label }}
                    </span>

                    <div class="flex items-center gap-1">
                      <v-btn
                        v-if="item.removable"
                        icon
                        size="x-small"
                        variant="text"
                        class="!text-[#6c7683]"
                        @click="removeIndicator(item.id)"
                      >
                        <v-icon icon="mdi-trash-can-outline" size="18" />
                      </v-btn>

                      <v-icon v-else icon="mdi-check" size="18" class="text-[#1d5fff]" />
                    </div>
                  </div>
                </div>

                <div class="border-t border-[#e6ebf2] px-4 py-3">
                  <v-text-field
                    v-model="indicatorSearch"
                    density="comfortable"
                    hide-details
                    variant="outlined"
                    rounded="pill"
                    prepend-inner-icon="mdi-magnify"
                    placeholder="Search indicators"
                    class="indicator-search"
                  />
                </div>

                <div class="px-4 pb-2">
                  <p class="text-sm font-semibold text-[#7a8593]">Popular</p>
                </div>

                <div class="max-h-[300px] overflow-y-auto px-2 pb-3">
                  <v-list-item
                    v-for="item in filteredIndicatorOptions"
                    :key="item.id"
                    rounded="lg"
                    class="mx-1 my-[2px]"
                    :class="
                      isIndicatorActive(item.id)
                        ? 'bg-[#e8f0fd] text-blue-700'
                        : 'text-[#232d39]'
                    "
                    @click="toggleIndicator(item.id)"
                  >
                    <v-list-item-title class="text-[15px] font-medium">
                      {{ item.label }}
                    </v-list-item-title>

                    <template #append>
                      <v-icon
                        v-if="isIndicatorActive(item.id)"
                        icon="mdi-check"
                        size="16"
                        class="text-blue-700"
                      />
                    </template>
                  </v-list-item>

                  <p
                    v-if="!filteredIndicatorOptions.length"
                    class="px-3 py-2 text-sm text-[#7a8593]"
                  >
                    No matching indicators
                  </p>
                </div>
              </v-card>
            </v-menu>

            <v-tooltip text="Table view" location="bottom">
              <template #activator="{ props: tooltipProps }">
                <v-btn
                  v-bind="tooltipProps"
                  icon
                  size="small"
                  variant="text"
                  :class="
                    isTableView ? '!bg-[#e8f0fd] !text-[#1d5fff]' : '!text-[#596473]'
                  "
                  @click="isTableView = !isTableView"
                >
                  <v-icon icon="mdi-table-large" size="18" />
                </v-btn>
              </template>
            </v-tooltip>

            <v-tooltip text="Open full screen" location="bottom">
              <template #activator="{ props: tooltipProps }">
                <v-btn
                  v-bind="tooltipProps"
                  icon
                  size="small"
                  variant="text"
                  class="!text-[#596473]"
                  :disabled="isTableView"
                  @click="fitChartToView"
                >
                  <v-icon icon="mdi-fit-to-page-outline" size="18" />
                </v-btn>
              </template>
            </v-tooltip>
          </div>
        </div>
      </div>

      <div class="mb-4 text-[14px] text-[#4f5966]">
        <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span>O:{{ summaryPoint.open }}</span>
          <span>H:{{ summaryPoint.high }}</span>
          <span>L:{{ summaryPoint.low }}</span>
          <span>C:{{ summaryPoint.close }}</span>
          <span>V:{{ summaryPoint.volume }}</span>
        </div>
        <div class="mt-2 flex items-center gap-3">
          <span>vol undr {{ summaryPoint.volumeLong }}</span>
          <button
            type="button"
            class="rounded text-[#4f5966] transition-colors hover:text-[#1d5fff]"
          >
            <v-icon icon="mdi-chevron-up" size="16" />
          </button>
        </div>
      </div>

      <div v-if="!isTableView" class="relative">
        <div ref="inlineChartRef" class="h-[620px] w-full" />
        <div
          class="pointer-events-none absolute bottom-[90px] right-0 z-10 rounded bg-[#5f6873] px-2 py-1 text-sm font-semibold text-white"
        >
          {{ summaryPoint.volumeShort }}
        </div>
      </div>

      <div v-else class="overflow-hidden rounded-[18px] border border-[#d7dce2] bg-white">
        <div
          class="flex flex-wrap items-center justify-between gap-3 border-b border-[#e6ebf2] px-4 py-4"
        >
          <div>
            <h2 class="text-[17px] font-extrabold text-[#232d39]">
              Symbol: {{ normalizedSymbol }}
            </h2>
            <p class="mt-1 text-sm text-[#6c7683]">
              {{ tableRows.length }} rows in {{ activeRange }}
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <v-btn
              size="small"
              variant="outlined"
              class="!min-w-0 !border-[#cfd7e3] !px-3 !text-sm !font-semibold !normal-case !text-[#232d39]"
              @click="copyTable"
            >
              Copy
            </v-btn>

            <v-btn
              size="small"
              variant="outlined"
              class="!min-w-0 !border-[#cfd7e3] !px-3 !text-sm !font-semibold !normal-case !text-[#232d39]"
              @click="downloadTable"
            >
              Download
            </v-btn>

            <v-switch
              v-model="showAdditionalColumns"
              color="#1d5fff"
              density="compact"
              hide-details
              inset
              class="table-switch"
            >
              <template #label>
                <span class="text-sm font-medium text-[#232d39]">
                  Show Additional Columns
                </span>
              </template>
            </v-switch>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse text-left">
            <thead>
              <tr class="border-b border-[#e6ebf2] bg-[#fbfcfe] text-sm text-[#232d39]">
                <th
                  v-for="column in tableColumns"
                  :key="column.key"
                  class="whitespace-nowrap px-4 py-3 font-semibold"
                >
                  {{ column.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in tableRows"
                :key="row.time"
                class="border-b border-[#eef2f6] text-sm text-[#232d39] transition-colors hover:bg-[#f8fbff]"
              >
                <td
                  v-for="column in tableColumns"
                  :key="`${row.time}-${column.key}`"
                  class="whitespace-nowrap px-4 py-3"
                >
                  {{ row[column.key] ?? "--" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        class="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#e6ebf2] pt-4"
      >
        <div class="flex flex-wrap items-center gap-1">
          <v-btn
            v-for="range in ranges"
            :key="range"
            size="small"
            variant="text"
            class="!min-w-0 !rounded-md !px-3 !text-sm !font-semibold"
            :class="
              activeRange === range ? 'bg-[#e8f0fd] !text-[#1d5fff]' : '!text-[#2b3642]'
            "
            @click="activeRange = range"
          >
            {{ range }}
          </v-btn>
        </div>

        <div class="flex items-center gap-2 text-sm font-semibold text-[#4f5966]">
          <span>Interval:</span>

          <v-chip
            size="small"
            variant="outlined"
            class="!rounded-full !border-[#cfd7e3] !text-[#4f5966]"
          >
            {{ intervalLabel }}
          </v-chip>
        </div>
      </div>
    </div>

    <v-dialog
      v-model="isAdvancedChartOpen"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card flat class="flex h-full flex-col bg-[#f4f7fb]">
        <div
          class="flex flex-wrap items-center justify-between gap-3 border-b border-[#d7dce2] bg-white px-4 py-3 md:px-6"
        >
          <div class="flex flex-wrap items-center gap-3">
            <p class="text-lg font-bold text-[#232d39]">
              Research Chart · {{ normalizedSymbol }}
            </p>

            <v-chip
              size="small"
              variant="outlined"
              class="!rounded-full !border-[#cfd7e3] !text-[#4f5966]"
            >
              {{ selectedChartTypeLabel }}
            </v-chip>
          </div>

          <v-btn
            icon
            variant="text"
            size="small"
            aria-label="Close advanced chart"
            @click="closeAdvancedChart"
          >
            <v-icon icon="mdi-close" />
          </v-btn>
        </div>

        <div class="flex-1 p-4 md:p-6">
          <div
            class="flex h-full min-h-[420px] flex-col rounded border border-[#d7dce2] bg-white p-3 md:p-4"
          >
            <div class="mb-4 text-[14px] text-[#4f5966]">
              <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span>O:{{ summaryPoint.open }}</span>
                <span>H:{{ summaryPoint.high }}</span>
                <span>L:{{ summaryPoint.low }}</span>
                <span>C:{{ summaryPoint.close }}</span>
                <span>V:{{ summaryPoint.volume }}</span>
              </div>
            </div>

            <div class="relative min-h-0 flex-1">
              <div ref="dialogChartRef" class="h-full w-full" />
              <div
                class="pointer-events-none absolute bottom-[18px] right-0 z-10 rounded bg-[#5f6873] px-2 py-1 text-sm font-semibold text-white"
              >
                {{ summaryPoint.volumeShort }}
              </div>
            </div>

            <div
              class="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#e6ebf2] pt-4"
            >
              <div class="flex flex-wrap items-center gap-1">
                <v-btn
                  v-for="range in ranges"
                  :key="`dialog-${range}`"
                  size="small"
                  variant="text"
                  class="!min-w-0 !rounded-md !px-3 !text-sm !font-semibold"
                  :class="
                    activeRange === range
                      ? 'bg-[#e8f0fd] !text-[#1d5fff]'
                      : '!text-[#2b3642]'
                  "
                  @click="activeRange = range"
                >
                  {{ range }}
                </v-btn>
              </div>

              <div class="flex items-center gap-2 text-sm font-semibold text-[#4f5966]">
                <span>Interval:</span>

                <v-chip
                  size="small"
                  variant="outlined"
                  class="!rounded-full !border-[#cfd7e3] !text-[#4f5966]"
                >
                  {{ intervalLabel }}
                </v-chip>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </section>
</template>

<script setup>
import dayjs from "dayjs";

const chartTypeGroups = [
  {
    label: "Popular",
    items: [
      { value: "line", label: "Line" },
      { value: "candle", label: "Candle" },
      { value: "bar", label: "Bar" },
      { value: "mountain", label: "Mountain" },
      { value: "baseline", label: "Baseline" },
    ],
  },
  {
    label: "All",
    items: [{ value: "baselineDelta", label: "Baseline delta" }],
  },
];

const indicatorOptions = [
  {
    id: "ma50",
    label: "Moving average",
    appliedLabel: "ma (50,ma,0)",
  },
  {
    id: "maEnvelope",
    label: "Moving average envelope",
    appliedLabel: "ma envelope (20,2%)",
  },
  {
    id: "bollinger",
    label: "Bollinger bands",
    appliedLabel: "bollinger (20,2)",
  },
];

const defaultSymbol = "^GSPC";
const defaultRange = "6M";

const router = useRouter();
const route = useRoute();
const stockQuoteStore = useStockQuoteStore();

const inlineChartRef = ref(null);
const dialogChartRef = ref(null);
const searchInput = ref(defaultSymbol);
const selectedChartType = ref("baselineDelta");
const hoveredRow = ref(null);
const indicatorMenuOpen = ref(false);
const indicatorSearch = ref("");
const activeIndicators = ref([]);
const isTableView = ref(false);
const isAdvancedChartOpen = ref(false);
const showAdditionalColumns = ref(false);

let chart;
let priceSeries;
let volumeSeries;
let overlaySeries = [];
let unsubscribeCrosshairMove;

const requestedSymbol = computed(() => {
  const routeSymbol = String(route.query.symbol || "").trim();
  return routeSymbol || defaultSymbol;
});

const normalizedSymbol = computed(() =>
  stockQuoteStore.resolveSymbol(requestedSymbol.value)
);
const ranges = computed(() => stockQuoteStore.getRangeKeys(normalizedSymbol.value));

const activeRange = computed({
  get() {
    return stockQuoteStore.getActiveRange(normalizedSymbol.value);
  },
  set(nextRange) {
    stockQuoteStore.setActiveRange(normalizedSymbol.value, nextRange);
  },
});

const rangeData = computed(() =>
  stockQuoteStore.getRangeData(normalizedSymbol.value, activeRange.value)
);

const quoteMap = computed(
  () => new Map((rangeData.value?.points || []).map((row) => [row.time, row]))
);

const filteredIndicatorOptions = computed(() => {
  const keyword = indicatorSearch.value.trim().toLowerCase();

  if (!keyword) {
    return indicatorOptions;
  }

  return indicatorOptions.filter((item) => item.label.toLowerCase().includes(keyword));
});

const appliedIndicatorEntries = computed(() => [
  { id: "volume", label: "vol undr", removable: false },
  ...indicatorOptions
    .filter((item) => activeIndicators.value.includes(item.id))
    .map((item) => ({
      id: item.id,
      label: item.appliedLabel,
      removable: true,
    })),
]);

const selectedChartTypeLabel = computed(() => {
  for (const group of chartTypeGroups) {
    const match = group.items.find((item) => item.value === selectedChartType.value);
    if (match) {
      return match.label;
    }
  }

  return "Baseline delta";
});

const intervalLabel = computed(() => (rangeData.value?.intraday ? "1 hour" : "1 day"));

const activePoint = computed(() => {
  if (hoveredRow.value) {
    return hoveredRow.value;
  }

  const points = rangeData.value?.points || [];
  return points[points.length - 1] || null;
});

const formatPrice = (value) => {
  if (!Number.isFinite(Number(value))) {
    return "--";
  }

  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatVolumeCompact = (value) => {
  if (!Number.isFinite(value)) {
    return "--";
  }

  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`;
  }

  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`;
  }

  return `${value.toFixed(0)}`;
};

const formatTimestamp = (time) =>
  dayjs
    .unix(Number(time))
    .format(rangeData.value?.intraday ? "M/D/YYYY h:mm A" : "M/D/YYYY");

const summaryPoint = computed(() => {
  const point = activePoint.value;

  if (!point) {
    return {
      open: "--",
      high: "--",
      low: "--",
      close: "--",
      volume: "--",
      volumeLong: "--",
      volumeShort: "--",
    };
  }

  const volume = Number(point.volume);

  return {
    open: formatPrice(point.open),
    high: formatPrice(point.high),
    low: formatPrice(point.low),
    close: formatPrice(point.close),
    volume: formatVolumeCompact(volume),
    volumeLong: volume.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    volumeShort: formatVolumeCompact(volume),
  };
});

const buildSmaData = (points, period) => {
  let rollingSum = 0;

  return points
    .map((point, index) => {
      rollingSum += Number(point.close);

      if (index >= period) {
        rollingSum -= Number(points[index - period].close);
      }

      if (index < period - 1) {
        return null;
      }

      return {
        time: point.time,
        value: Number((rollingSum / period).toFixed(2)),
      };
    })
    .filter(Boolean);
};

const buildEnvelopeData = (points, period = 20, percentage = 0.02) => {
  const middle = buildSmaData(points, period);

  return {
    upper: middle.map((row) => ({
      time: row.time,
      value: Number((row.value * (1 + percentage)).toFixed(2)),
    })),
    lower: middle.map((row) => ({
      time: row.time,
      value: Number((row.value * (1 - percentage)).toFixed(2)),
    })),
  };
};

const buildBollingerData = (points, period = 20, multiplier = 2) => {
  const bands = [];

  for (let index = period - 1; index < points.length; index += 1) {
    const window = points
      .slice(index - period + 1, index + 1)
      .map((point) => Number(point.close));
    const mean = window.reduce((sum, value) => sum + value, 0) / period;
    const variance = window.reduce((sum, value) => sum + (value - mean) ** 2, 0) / period;
    const deviation = Math.sqrt(variance);

    bands.push({
      time: points[index].time,
      middle: Number(mean.toFixed(2)),
      upper: Number((mean + deviation * multiplier).toFixed(2)),
      lower: Number((mean - deviation * multiplier).toFixed(2)),
    });
  }

  return {
    upper: bands.map((row) => ({ time: row.time, value: row.upper })),
    middle: bands.map((row) => ({ time: row.time, value: row.middle })),
    lower: bands.map((row) => ({ time: row.time, value: row.lower })),
  };
};

const indicatorSeriesMaps = computed(() => {
  const points = rangeData.value?.points || [];
  const maps = {};

  if (activeIndicators.value.includes("ma50")) {
    maps.ma50 = new Map(
      buildSmaData(points, 50).map((row) => [row.time, formatPrice(row.value)])
    );
  }

  if (activeIndicators.value.includes("maEnvelope")) {
    const envelope = buildEnvelopeData(points);
    maps.maEnvelopeUpper = new Map(
      envelope.upper.map((row) => [row.time, formatPrice(row.value)])
    );
    maps.maEnvelopeLower = new Map(
      envelope.lower.map((row) => [row.time, formatPrice(row.value)])
    );
  }

  if (activeIndicators.value.includes("bollinger")) {
    const bollinger = buildBollingerData(points);
    maps.bollingerUpper = new Map(
      bollinger.upper.map((row) => [row.time, formatPrice(row.value)])
    );
    maps.bollingerMiddle = new Map(
      bollinger.middle.map((row) => [row.time, formatPrice(row.value)])
    );
    maps.bollingerLower = new Map(
      bollinger.lower.map((row) => [row.time, formatPrice(row.value)])
    );
  }

  return maps;
});

const tableRows = computed(() =>
  (rangeData.value?.points || [])
    .slice()
    .reverse()
    .map((row) => ({
      time: row.time,
      date: formatTimestamp(row.time),
      open: formatPrice(row.open),
      high: formatPrice(row.high),
      low: formatPrice(row.low),
      close: formatPrice(row.close),
      volume: Number(row.volume).toLocaleString("en-US"),
      ma50: indicatorSeriesMaps.value.ma50?.get(row.time) || "--",
      maEnvelopeUpper: indicatorSeriesMaps.value.maEnvelopeUpper?.get(row.time) || "--",
      maEnvelopeLower: indicatorSeriesMaps.value.maEnvelopeLower?.get(row.time) || "--",
      bollingerUpper: indicatorSeriesMaps.value.bollingerUpper?.get(row.time) || "--",
      bollingerMiddle: indicatorSeriesMaps.value.bollingerMiddle?.get(row.time) || "--",
      bollingerLower: indicatorSeriesMaps.value.bollingerLower?.get(row.time) || "--",
    }))
);

const tableColumns = computed(() => {
  const columns = [
    { key: "date", label: "Date" },
    { key: "close", label: "Close" },
    { key: "volume", label: "Volume" },
  ];

  if (showAdditionalColumns.value) {
    columns.splice(
      1,
      0,
      { key: "open", label: "Open" },
      { key: "high", label: "High" },
      { key: "low", label: "Low" }
    );
  }

  if (activeIndicators.value.includes("ma50")) {
    columns.push({ key: "ma50", label: "MA ma (50,ma,0)" });
  }

  if (activeIndicators.value.includes("maEnvelope")) {
    columns.push({ key: "maEnvelopeUpper", label: "MA Env Upper" });
    columns.push({ key: "maEnvelopeLower", label: "MA Env Lower" });
  }

  if (activeIndicators.value.includes("bollinger")) {
    columns.push({ key: "bollingerUpper", label: "Boll Upper" });
    columns.push({ key: "bollingerMiddle", label: "Boll Middle" });
    columns.push({ key: "bollingerLower", label: "Boll Lower" });
  }

  return columns;
});

const getChartHeight = () => {
  if (isAdvancedChartOpen.value && import.meta.client) {
    return Math.max(window.innerHeight - 250, 420);
  }

  return 620;
};

const getLineSeriesData = (points) =>
  points.map((row) => ({
    time: row.time,
    value: Number(row.close),
  }));

const getOhlcSeriesData = (points) =>
  points.map((row) => ({
    time: row.time,
    open: Number(row.open),
    high: Number(row.high),
    low: Number(row.low),
    close: Number(row.close),
  }));

const getWhitespaceData = (points) => {
  if (!rangeData.value?.intraday || points.length <= 1) {
    return [];
  }

  const step = points[1].time - points[0].time;
  const lastTime = points[points.length - 1].time;

  return Array.from({ length: 8 }, (_, index) => ({
    time: lastTime + step * (index + 1),
  }));
};

const getBaselinePrice = (points) => {
  if (selectedChartType.value === "baselineDelta") {
    return Number(points[0].close);
  }

  const closeValues = points.map((row) => Number(row.close));
  const highestClose = Math.max(...closeValues);
  const lowestClose = Math.min(...closeValues);

  return Number(((highestClose + lowestClose) / 2).toFixed(2));
};

const isIndicatorActive = (id) => activeIndicators.value.includes(id);

const toggleIndicator = (id) => {
  if (isIndicatorActive(id)) {
    activeIndicators.value = activeIndicators.value.filter((item) => item !== id);
    return;
  }

  activeIndicators.value = [...activeIndicators.value, id];
};

const removeIndicator = (id) => {
  activeIndicators.value = activeIndicators.value.filter((item) => item !== id);
};

const resetChart = () => {
  hoveredRow.value = null;
  overlaySeries = [];

  if (unsubscribeCrosshairMove) {
    unsubscribeCrosshairMove();
    unsubscribeCrosshairMove = null;
  }

  if (chart) {
    chart.remove();
    chart = null;
    priceSeries = null;
    volumeSeries = null;
  }
};

const fitChartToView = () => {
  if (isTableView.value) {
    return;
  }

  isAdvancedChartOpen.value = true;
};

const applySearch = async () => {
  const nextSymbol = searchInput.value.trim() || defaultSymbol;
  await router.replace({
    query: {
      ...route.query,
      symbol: nextSymbol,
    },
  });
};

const closeAdvancedChart = () => {
  isAdvancedChartOpen.value = false;
};

const getChartHost = () =>
  (isAdvancedChartOpen.value ? dialogChartRef.value : inlineChartRef.value) || null;

const createMainSeries = ({
  AreaSeries,
  BarSeries,
  BaselineSeries,
  CandlestickSeries,
  LineSeries,
  LineType,
  chartInstance,
  points,
  isUpTrend,
  trendColor,
}) => {
  switch (selectedChartType.value) {
    case "line":
      return {
        series: chartInstance.addSeries(LineSeries, {
          color: trendColor,
          lineWidth: 2,
          lineType: LineType.Simple,
          crosshairMarkerVisible: false,
          priceLineVisible: false,
          lastValueVisible: false,
        }),
        data: getLineSeriesData(points),
        whitespace: getWhitespaceData(points),
      };
    case "baseline":
    case "baselineDelta":
      return {
        series: chartInstance.addSeries(BaselineSeries, {
          baseValue: {
            type: "price",
            price: getBaselinePrice(points),
          },
          topFillColor1: "rgba(10, 143, 105, 0.26)",
          topFillColor2: "rgba(10, 143, 105, 0.05)",
          topLineColor: "#0a8f69",
          bottomFillColor1: "rgba(218, 30, 47, 0.04)",
          bottomFillColor2: "rgba(218, 30, 47, 0.22)",
          bottomLineColor: "#da1e2f",
          lineWidth: 2,
          lineType: LineType.Simple,
          crosshairMarkerVisible: false,
          priceLineVisible: false,
          lastValueVisible: false,
        }),
        data: getLineSeriesData(points),
        whitespace: getWhitespaceData(points),
      };
    case "candle":
      return {
        series: chartInstance.addSeries(CandlestickSeries, {
          upColor: "#0a8f69",
          downColor: "#da1e2f",
          borderUpColor: "#0a8f69",
          borderDownColor: "#da1e2f",
          wickUpColor: "#0a8f69",
          wickDownColor: "#da1e2f",
          priceLineVisible: false,
          lastValueVisible: false,
        }),
        data: getOhlcSeriesData(points),
        whitespace: [],
      };
    case "bar":
      return {
        series: chartInstance.addSeries(BarSeries, {
          upColor: "#0a8f69",
          downColor: "#da1e2f",
          openVisible: true,
          thinBars: false,
          priceLineVisible: false,
          lastValueVisible: false,
        }),
        data: getOhlcSeriesData(points),
        whitespace: [],
      };
    default:
      return {
        series: chartInstance.addSeries(AreaSeries, {
          lineColor: trendColor,
          topColor: isUpTrend ? "rgba(10, 143, 105, 0.24)" : "rgba(218, 30, 47, 0.18)",
          bottomColor: isUpTrend ? "rgba(10, 143, 105, 0.04)" : "rgba(218, 30, 47, 0.03)",
          lineWidth: 2,
          crosshairMarkerVisible: false,
          priceLineVisible: false,
          lastValueVisible: false,
        }),
        data: getLineSeriesData(points),
        whitespace: getWhitespaceData(points),
      };
  }
};

const applyIndicatorSeries = (LineSeries, LineStyle, points) => {
  overlaySeries = [];

  if (activeIndicators.value.includes("ma50")) {
    const series = chart.addSeries(LineSeries, {
      color: "#ff5b3a",
      lineWidth: 1.5,
      crosshairMarkerVisible: false,
      priceLineVisible: false,
      lastValueVisible: false,
    });
    series.setData(buildSmaData(points, 50));
    overlaySeries.push(series);
  }

  if (activeIndicators.value.includes("maEnvelope")) {
    const envelope = buildEnvelopeData(points);

    for (const data of [envelope.upper, envelope.lower]) {
      const series = chart.addSeries(LineSeries, {
        color: "#4b74ff",
        lineWidth: 1.25,
        lineStyle: LineStyle.Dashed,
        crosshairMarkerVisible: false,
        priceLineVisible: false,
        lastValueVisible: false,
      });
      series.setData(data);
      overlaySeries.push(series);
    }
  }

  if (activeIndicators.value.includes("bollinger")) {
    const bollinger = buildBollingerData(points);
    const entries = [
      { data: bollinger.upper, color: "#8c6ae8" },
      { data: bollinger.middle, color: "#4f5966" },
      { data: bollinger.lower, color: "#8c6ae8" },
    ];

    for (const entry of entries) {
      const series = chart.addSeries(LineSeries, {
        color: entry.color,
        lineWidth: 1.2,
        crosshairMarkerVisible: false,
        priceLineVisible: false,
        lastValueVisible: false,
      });
      series.setData(entry.data);
      overlaySeries.push(series);
    }
  }
};

const buildChart = async () => {
  const chartHost = getChartHost();

  if (!chartHost || !rangeData.value?.points?.length) {
    return;
  }

  const {
    createChart,
    AreaSeries,
    BarSeries,
    BaselineSeries,
    CandlestickSeries,
    HistogramSeries,
    ColorType,
    CrosshairMode,
    LineSeries,
    LineStyle,
    LineType,
  } = await import("lightweight-charts");

  const points = rangeData.value.points;
  const firstClose = Number(points[0].close);
  const lastClose = Number(points[points.length - 1].close);
  const isUpTrend = lastClose >= firstClose;
  const trendColor = isUpTrend ? "#0a8f69" : "#da1e2f";

  chart = createChart(chartHost, {
    width: chartHost.clientWidth,
    height: getChartHeight(),
    layout: {
      background: { type: ColorType.Solid, color: "transparent" },
      textColor: "#4f5966",
      attributionLogo: false,
    },
    rightPriceScale: {
      borderVisible: true,
      borderColor: "#d7dce2",
      scaleMargins: { top: 0.02, bottom: 0.18 },
    },
    leftPriceScale: {
      visible: false,
      borderVisible: false,
    },
    timeScale: {
      borderVisible: true,
      borderColor: "#d7dce2",
      timeVisible: true,
      secondsVisible: false,
      rightOffset: 3,
      barSpacing: rangeData.value?.intraday ? 7 : 10,
    },
    grid: {
      vertLines: { color: "#d7dce2" },
      horzLines: { color: "#d7dce2" },
    },
    crosshair: {
      mode: CrosshairMode.Normal,
      vertLine: {
        visible: true,
        labelVisible: true,
        color: "rgba(49, 60, 72, 0.45)",
        lineStyle: LineStyle.Dashed,
      },
      horzLine: {
        visible: true,
        labelVisible: true,
        color: "rgba(49, 60, 72, 0.45)",
        lineStyle: LineStyle.Dashed,
      },
    },
    handleScale: true,
    handleScroll: true,
  });

  const mainSeries = createMainSeries({
    AreaSeries,
    BarSeries,
    BaselineSeries,
    CandlestickSeries,
    LineSeries,
    LineType,
    chartInstance: chart,
    points,
    isUpTrend,
    trendColor,
  });

  priceSeries = mainSeries.series;
  priceSeries.setData([...mainSeries.data, ...mainSeries.whitespace]);

  volumeSeries = chart.addSeries(HistogramSeries, {
    color: "rgba(181, 189, 203, 0.45)",
    priceFormat: { type: "volume" },
    priceScaleId: "",
    lastValueVisible: false,
    priceLineVisible: false,
  });

  volumeSeries.priceScale().applyOptions({
    visible: false,
    scaleMargins: {
      top: 0.74,
      bottom: 0,
    },
  });

  volumeSeries.setData(
    points.map((row) => ({
      time: row.time,
      value: Number(row.volume),
      color:
        Number(row.close) >= Number(row.open)
          ? "rgba(10, 143, 105, 0.55)"
          : "rgba(218, 30, 47, 0.55)",
    }))
  );

  (rangeData.value.referenceLines || []).forEach((line) => {
    priceSeries.createPriceLine({
      price: Number(line.price),
      color: line.color || "#2f3945",
      lineWidth: 1,
      lineStyle: line.style === "solid" ? LineStyle.Solid : LineStyle.Dashed,
      axisLabelVisible: true,
      title: formatPrice(line.price),
    });
  });

  if (selectedChartType.value === "baselineDelta") {
    priceSeries.createPriceLine({
      price: firstClose,
      color: "#232d39",
      lineWidth: 1,
      lineStyle: LineStyle.Dotted,
      axisLabelVisible: true,
      title: formatPrice(firstClose),
    });
  }

  applyIndicatorSeries(LineSeries, LineStyle, points);

  const onCrosshairMove = (param) => {
    if (!param.point || !param.time || typeof param.time !== "number") {
      hoveredRow.value = null;
      return;
    }

    hoveredRow.value = quoteMap.value.get(param.time) || null;
  };

  chart.subscribeCrosshairMove(onCrosshairMove);
  unsubscribeCrosshairMove = () => chart.unsubscribeCrosshairMove(onCrosshairMove);
  chart.timeScale().fitContent();
};

const resizeChart = () => {
  const chartHost = getChartHost();

  if (!chart || !chartHost) {
    return;
  }

  chart.applyOptions({
    width: chartHost.clientWidth,
    height: getChartHeight(),
  });
};

const getTableExportText = (delimiter = ",") => {
  const header = tableColumns.value.map((column) => column.label).join(delimiter);
  const rows = tableRows.value.map((row) =>
    tableColumns.value.map((column) => row[column.key] ?? "--").join(delimiter)
  );

  return [header, ...rows].join("\n");
};

const copyTable = async () => {
  if (!import.meta.client || !navigator.clipboard) {
    return;
  }

  await navigator.clipboard.writeText(getTableExportText("\t"));
};

const downloadTable = () => {
  if (!import.meta.client) {
    return;
  }

  const blob = new Blob([getTableExportText(",")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${normalizedSymbol.value}-${activeRange.value}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

watch(
  () => requestedSymbol.value,
  (symbol) => {
    searchInput.value = symbol;
  },
  { immediate: true }
);

watch(
  () => normalizedSymbol.value,
  () => {
    const nextRange = ranges.value.includes(defaultRange)
      ? defaultRange
      : ranges.value[0];

    if (nextRange) {
      stockQuoteStore.setActiveRange(normalizedSymbol.value, nextRange);
    }
  },
  { immediate: true }
);

watch(
  [
    () => normalizedSymbol.value,
    () => activeRange.value,
    () => selectedChartType.value,
    () => activeIndicators.value.join(","),
    () => isTableView.value,
    () => isAdvancedChartOpen.value,
  ],
  async () => {
    await nextTick();
    resetChart();

    if (!isTableView.value) {
      await buildChart();
      resizeChart();
    }
  }
);

onMounted(async () => {
  await nextTick();
  await buildChart();
  window.addEventListener("resize", resizeChart, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
  resetChart();
});
</script>

<style scoped>
:deep(.research-search .v-field) {
  border-radius: 999px;
  min-width: 220px;
}

:deep(.research-search .v-field__input) {
  padding-left: 2px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #232d39;
}

:deep(.research-search .v-field__prepend-inner) {
  opacity: 0.8;
}

:deep(.indicator-search .v-field) {
  border-radius: 999px;
}

:deep(.indicator-search .v-field__input) {
  font-size: 0.95rem;
}

:deep(.table-switch .v-selection-control) {
  min-height: auto;
}

.indicator-menu {
  border: 1px solid #d7dce2;
  box-shadow: 0 18px 40px rgba(25, 35, 52, 0.14);
}
</style>
