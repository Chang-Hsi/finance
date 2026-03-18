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

    <section class="mt-4 rounded border border-[#d7dce2] bg-[#f9fafc] p-4">
      <div
        class="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-[#d7dce2] pb-3"
      >
        <div class="flex items-center gap-2">
          <v-btn
            v-for="range in ranges"
            :key="range"
            size="x-small"
            variant="text"
            class="!min-w-0 !px-2 !text-sm !font-semibold"
            :class="
              activeRange === range
                ? '!rounded bg-[#e8f0fd] !text-blue-700'
                : '!text-[#2b3642]'
            "
            @click="activeRange = range"
          >
            {{ range }}
          </v-btn>
        </div>

        <div class="flex items-center gap-3">
          <v-menu location="bottom end">
            <template #activator="{ props: menuProps }">
              <v-btn
                v-bind="menuProps"
                variant="outlined"
                class="!rounded-full !border-[#cfd7e3] !px-3 !text-sm !font-semibold !normal-case !text-[#4f5966]"
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
                  @click="selectChartType(item.value)"
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
          <v-btn
            variant="text"
            class="!text-base !font-semibold !normal-case !text-[#2b3642]"
            @click="openAdvancedChart"
          >
            Advanced Chart
            <v-icon icon="mdi-arrow-top-right" size="14" class="mr-1" />
          </v-btn>
          <v-btn icon size="x-small" variant="text">
            <v-icon icon="mdi-cog-outline" />
          </v-btn>
        </div>
      </div>

      <div class="relative">
        <div ref="inlineChartRef" class="h-[260px] w-full" />

        <v-card
          v-show="tooltipVisible && !isAdvancedChartOpen"
          flat
          class="pointer-events-none absolute z-20 min-w-[170px] rounded border border-[#d7dce2] bg-white/95 p-3"
          :style="tooltipStyle"
        >
          <div class="grid grid-cols-2 gap-x-3 gap-y-1">
            <span class="text-sm text-[#4f5966]">Date:</span>
            <span class="text-sm font-semibold text-[#232d39]">{{
              tooltipData.date
            }}</span>
            <span class="text-sm text-[#4f5966]">Close:</span>
            <span class="text-sm font-semibold text-[#232d39]">{{
              tooltipData.close
            }}</span>
            <span class="text-sm text-[#4f5966]">Open:</span>
            <span class="text-sm font-semibold text-[#232d39]">{{
              tooltipData.open
            }}</span>
            <span class="text-sm text-[#4f5966]">High:</span>
            <span class="text-sm font-semibold text-[#232d39]">{{
              tooltipData.high
            }}</span>
            <span class="text-sm text-[#4f5966]">Low:</span>
            <span class="text-sm font-semibold text-[#232d39]">{{
              tooltipData.low
            }}</span>
            <span class="text-sm text-[#4f5966]">Volume:</span>
            <span class="text-sm font-semibold text-[#232d39]">{{
              tooltipData.volume
            }}</span>
          </div>
        </v-card>
      </div>
    </section>

    <v-dialog
      v-model="isAdvancedChartOpen"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card flat class="flex h-full flex-col bg-[#f4f7fb]">
        <div
          class="flex flex-wrap items-center justify-between gap-3 border-b border-[#d7dce2] bg-white px-4 py-3 md:px-6"
        >
          <div class="flex flex-wrap items-center gap-2">
            <p class="mr-2 text-lg font-bold text-[#232d39]">
              Advanced Chart · {{ quote.name }} ({{ quote.symbol }})
            </p>
            <v-btn
              v-for="range in ranges"
              :key="`dialog-${range}`"
              size="x-small"
              variant="text"
              class="!min-w-0 !px-2 !text-base !font-semibold"
              :class="
                activeRange === range
                  ? '!rounded bg-[#e8f0fd] !text-blue-700'
                  : '!text-[#2b3642]'
              "
              @click="activeRange = range"
            >
              {{ range }}
            </v-btn>
          </div>

          <div class="flex items-center gap-3">
            <v-menu location="bottom end">
              <template #activator="{ props: menuProps }">
                <v-btn
                  v-bind="menuProps"
                  variant="outlined"
                  class="!rounded-full !border-[#cfd7e3] !px-3 !text-sm !font-semibold !normal-case !text-[#4f5966]"
                >
                  {{ selectedChartTypeLabel }}
                  <v-icon icon="mdi-chevron-down" size="16" class="ml-1" />
                </v-btn>
              </template>

              <v-list class="min-w-[180px] !py-1">
                <template v-for="group in chartTypeGroups" :key="`dialog-${group.label}`">
                  <v-list-subheader class="!text-xs !font-semibold !text-[#7a8593]">
                    {{ group.label }}
                  </v-list-subheader>

                  <v-list-item
                    v-for="item in group.items"
                    :key="`dialog-${item.value}`"
                    rounded="lg"
                    class="mx-1 my-[2px]"
                    :class="
                      selectedChartType === item.value
                        ? 'bg-[#e8f0fd] text-blue-700'
                        : 'text-[#232d39]'
                    "
                    @click="selectChartType(item.value)"
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
        </div>

        <div class="flex-1 p-4 md:p-6">
          <div
            class="relative h-full min-h-[420px] rounded border border-[#d7dce2] bg-white p-3 md:p-4"
          >
            <div ref="dialogChartRef" class="h-full w-full" />

            <v-card
              v-show="tooltipVisible && isAdvancedChartOpen"
              flat
              class="pointer-events-none absolute z-20 min-w-[170px] rounded border border-[#d7dce2] bg-white/95 p-3"
              :style="tooltipStyle"
            >
              <div class="grid grid-cols-2 gap-x-3 gap-y-1">
                <span class="text-sm text-[#4f5966]">Date:</span>
                <span class="text-sm font-semibold text-[#232d39]">{{
                  tooltipData.date
                }}</span>
                <span class="text-sm text-[#4f5966]">Close:</span>
                <span class="text-sm font-semibold text-[#232d39]">{{
                  tooltipData.close
                }}</span>
                <span class="text-sm text-[#4f5966]">Open:</span>
                <span class="text-sm font-semibold text-[#232d39]">{{
                  tooltipData.open
                }}</span>
                <span class="text-sm text-[#4f5966]">High:</span>
                <span class="text-sm font-semibold text-[#232d39]">{{
                  tooltipData.high
                }}</span>
                <span class="text-sm text-[#4f5966]">Low:</span>
                <span class="text-sm font-semibold text-[#232d39]">{{
                  tooltipData.low
                }}</span>
                <span class="text-sm text-[#4f5966]">Volume:</span>
                <span class="text-sm font-semibold text-[#232d39]">{{
                  tooltipData.volume
                }}</span>
              </div>
            </v-card>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <div class="grid grid-cols-1 gap-3 border-b border-[#d7dce2] py-4 md:grid-cols-4">
      <div
        v-for="item in stats"
        :key="item.label"
        class="flex items-center justify-between gap-4 pr-2"
      >
        <p class="text-sm text-[#4f5966]">{{ item.label }}</p>
        <p class="text-sm font-semibold text-[#232d39]">{{ item.value }}</p>
      </div>
    </div>

    <section class="pt-4">
      <div class="mb-3 flex items-center justify-between">
        <h2 class="text-xl font-bold text-[#232d39]">Recent News: {{ quote.symbol }}</h2>
        <v-btn
          variant="text"
          class="!px-0 !text-lg !font-bold !normal-case !text-[#293544]"
          :to="newsTabHref"
        >
          View More
        </v-btn>
      </div>

      <div class="grid grid-cols-1 gap-0 border-t border-[#d7dce2] md:grid-cols-2">
        <NuxtLink
          v-for="item in recentNews"
          :key="item.slug"
          :to="`/news/${item.slug}`"
          class="flex items-center gap-3 border-b border-[#d7dce2] py-4 transition-colors hover:bg-[#f7f9fc] md:odd:pr-3 md:even:pl-3"
        >
          <div class="min-w-0 flex-1">
            <h3
              class="text-base font-bold leading-tight text-[#232d39] transition-colors hover:text-[#1b5fd0]"
            >
              {{ item.title }}
            </h3>
            <p class="mt-1 text-xs text-[#5f6976]">{{ item.source }} • {{ item.time }}</p>
          </div>
          <img
            :src="item.image"
            alt="news"
            class="h-[64px] w-[84px] rounded object-cover"
          />
        </NuxtLink>
      </div>
    </section>
  </section>
</template>

<script setup>
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
    items: [
      { value: "step", label: "Step" },
      { value: "baselineDelta", label: "Baseline delta" },
    ],
  },
];

const props = defineProps({
  symbol: {
    type: String,
    default: "CL=F",
  },
});

const route = useRoute();
const stockQuoteStore = useStockQuoteStore();
const stockNewsStore = useStockNewsStore();

const inlineChartRef = ref(null);
const dialogChartRef = ref(null);
const isAdvancedChartOpen = ref(false);
const selectedChartType = ref("mountain");
const tooltipVisible = ref(false);
const tooltipStyle = ref({ left: "0px", top: "0px" });
const tooltipData = ref({
  date: "",
  close: "",
  open: "",
  high: "",
  low: "",
  volume: "",
});

let chart;
let priceSeries;
let volumeSeries;
let unsubscribeCrosshairMove;

const normalizedSymbol = computed(() => stockQuoteStore.resolveSymbol(props.symbol));
const quote = computed(() => stockQuoteStore.getQuote(normalizedSymbol.value));
const ranges = computed(() => stockQuoteStore.getRangeKeys(normalizedSymbol.value));
const selectedChartTypeLabel = computed(() => {
  for (const group of chartTypeGroups) {
    const matchedType = group.items.find(
      (item) => item.value === selectedChartType.value
    );

    if (matchedType) {
      return matchedType.label;
    }
  }

  return "Mountain";
});

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

const quoteMap = computed(() => {
  return new Map((rangeData.value?.points || []).map((row) => [row.time, row]));
});

const isPositive = computed(() => String(quote.value.change).startsWith("+"));

const stats = computed(() => {
  const stat = stockQuoteStore.getStats(normalizedSymbol.value);

  return [
    { label: "Pre. Settlement", value: stat.preSettlement },
    { label: "Open", value: stat.open },
    { label: "Last Price", value: stat.lastPrice },
    { label: "Volume", value: stat.volume },
    { label: "Settlement Date", value: stat.settlementDate },
    { label: "Bid", value: stat.bid },
    { label: "Day's Range", value: stat.dayRange },
    { label: "Ask", value: stat.ask },
  ];
});

const recentNews = computed(() => stockNewsStore.getSummaryNews(normalizedSymbol.value));
const newsTabHref = computed(() => ({
  path: route.path,
  query: {
    tab: "news",
  },
}));

const formatPrice = (value) => Number(value).toFixed(2);

const formatTooltipTime = (timestamp) => {
  if (rangeData.value?.intraday) {
    return dayjs.unix(timestamp).format("M/D h:mm A");
  }

  return dayjs.unix(timestamp).format("YYYY/MM/DD");
};

const getChartHost = () =>
  (isAdvancedChartOpen.value ? dialogChartRef.value : inlineChartRef.value) || null;

const getChartHeight = (host) => {
  if (!isAdvancedChartOpen.value) {
    return 260;
  }

  if (host?.clientHeight) {
    return host.clientHeight;
  }

  if (import.meta.client) {
    return Math.max(window.innerHeight - 220, 420);
  }

  return 420;
};

const openAdvancedChart = () => {
  isAdvancedChartOpen.value = true;
};

const closeAdvancedChart = () => {
  isAdvancedChartOpen.value = false;
};

const selectChartType = (nextType) => {
  selectedChartType.value = nextType;
};

const queueResizeChart = () => {
  if (!import.meta.client) {
    return;
  }

  window.requestAnimationFrame(() => {
    resizeChart();
  });
};

const resetChart = () => {
  tooltipVisible.value = false;

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
  if (!rangeData.value.intraday || points.length <= 1) {
    return [];
  }

  const step = points[1].time - points[0].time;
  const lastTime = points[points.length - 1].time;

  return Array.from({ length: 8 }, (_, index) => ({
    time: lastTime + step * (index + 1),
  }));
};

const getBaselinePrice = (points, chartType) => {
  if (chartType === "baselineDelta") {
    return Number(points[0].close);
  }

  const closeValues = points.map((row) => Number(row.close));
  const highestClose = Math.max(...closeValues);
  const lowestClose = Math.min(...closeValues);

  return Number(((highestClose + lowestClose) / 2).toFixed(2));
};

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
          crosshairMarkerVisible: true,
          crosshairMarkerRadius: 3,
          crosshairMarkerBackgroundColor: trendColor,
          crosshairMarkerBorderColor: trendColor,
          priceLineVisible: false,
          lastValueVisible: false,
        }),
        data: getLineSeriesData(points),
        marker: true,
        whitespace: getWhitespaceData(points),
      };
    case "step":
      return {
        series: chartInstance.addSeries(LineSeries, {
          color: trendColor,
          lineWidth: 2,
          lineType: LineType.WithSteps,
          crosshairMarkerVisible: true,
          crosshairMarkerRadius: 3,
          crosshairMarkerBackgroundColor: trendColor,
          crosshairMarkerBorderColor: trendColor,
          priceLineVisible: false,
          lastValueVisible: false,
        }),
        data: getLineSeriesData(points),
        marker: true,
        whitespace: getWhitespaceData(points),
      };
    case "baseline":
    case "baselineDelta":
      return {
        series: chartInstance.addSeries(BaselineSeries, {
          baseValue: {
            type: "price",
            price: getBaselinePrice(points, selectedChartType.value),
          },
          topFillColor1: "rgba(10, 143, 105, 0.20)",
          topFillColor2: "rgba(10, 143, 105, 0.04)",
          topLineColor: "#0a8f69",
          bottomFillColor1: "rgba(218, 30, 47, 0.05)",
          bottomFillColor2: "rgba(218, 30, 47, 0.20)",
          bottomLineColor: "#da1e2f",
          lineWidth: 2,
          lineType: LineType.Simple,
          crosshairMarkerVisible: true,
          crosshairMarkerRadius: 3,
          crosshairMarkerBackgroundColor: trendColor,
          crosshairMarkerBorderColor: trendColor,
          priceLineVisible: false,
          lastValueVisible: false,
        }),
        data: getLineSeriesData(points),
        marker: true,
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
        marker: false,
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
        marker: false,
        whitespace: [],
      };
    default:
      return {
        series: chartInstance.addSeries(AreaSeries, {
          lineColor: trendColor,
          topColor: isUpTrend ? "rgba(10, 143, 105, 0.20)" : "rgba(218, 30, 47, 0.20)",
          bottomColor: isUpTrend ? "rgba(10, 143, 105, 0.03)" : "rgba(218, 30, 47, 0.02)",
          lineWidth: 1,
          crosshairMarkerVisible: true,
          crosshairMarkerRadius: 3,
          crosshairMarkerBackgroundColor: trendColor,
          crosshairMarkerBorderColor: trendColor,
          priceLineVisible: false,
          lastValueVisible: false,
        }),
        data: getLineSeriesData(points),
        marker: true,
        whitespace: getWhitespaceData(points),
      };
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
    LineStyle,
    LineSeries,
    LineType,
    CrosshairMode,
    createSeriesMarkers,
  } = await import("lightweight-charts");

  const points = rangeData.value.points;
  const firstClose = Number(points[0].close);
  const lastClose = Number(points[points.length - 1].close);
  const isUpTrend = lastClose >= firstClose;
  const trendColor = isUpTrend ? "#0a8f69" : "#da1e2f";

  chart = createChart(chartHost, {
    width: chartHost.clientWidth,
    height: getChartHeight(chartHost),
    layout: {
      background: { type: ColorType.Solid, color: "transparent" },
      textColor: "#5f6976",
      attributionLogo: false,
    },
    rightPriceScale: {
      borderVisible: false,
      scaleMargins: { top: 0.1, bottom: 0.18 },
    },
    leftPriceScale: {
      visible: false,
      borderVisible: false,
    },
    timeScale: {
      borderVisible: false,
      timeVisible: true,
      secondsVisible: false,
    },
    grid: {
      vertLines: { visible: false },
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
  });

  volumeSeries.priceScale().applyOptions({
    visible: false,
    scaleMargins: {
      top: 0.88,
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
      title: Number(line.price).toFixed(2),
    });
  });

  if (mainSeries.marker) {
    const markerPoint = points[points.length - 1];

    createSeriesMarkers(priceSeries, [
      {
        time: markerPoint.time,
        position: "atPriceMiddle",
        price: Number(markerPoint.close),
        shape: "circle",
        color: trendColor,
      },
    ]);
  }

  const onCrosshairMove = (param) => {
    const activeHost = getChartHost();

    if (!param.point || !param.time || !activeHost) {
      tooltipVisible.value = false;
      return;
    }

    if (typeof param.time !== "number") {
      tooltipVisible.value = false;
      return;
    }

    const row = quoteMap.value.get(param.time);
    if (!row) {
      tooltipVisible.value = false;
      return;
    }

    tooltipData.value = {
      date: formatTooltipTime(row.time),
      close: formatPrice(row.close),
      open: formatPrice(row.open),
      high: formatPrice(row.high),
      low: formatPrice(row.low),
      volume: Number(row.volume).toLocaleString("en-US"),
    };

    const tooltipWidth = 176;
    const tooltipHeight = 188;
    const left = Math.min(
      Math.max(param.point.x + 16, 8),
      activeHost.clientWidth - tooltipWidth
    );
    const top = Math.min(
      Math.max(param.point.y - tooltipHeight - 10, 8),
      getChartHeight(activeHost) - tooltipHeight - 8
    );

    tooltipStyle.value = {
      left: `${left}px`,
      top: `${top}px`,
    };
    tooltipVisible.value = true;
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
    height: getChartHeight(chartHost),
  });
};

watch(
  [
    () => normalizedSymbol.value,
    () => activeRange.value,
    () => isAdvancedChartOpen.value,
    () => selectedChartType.value,
  ],
  async () => {
    await nextTick();
    resetChart();
    await buildChart();
    queueResizeChart();
  }
);

watch(
  () => isAdvancedChartOpen.value,
  () => {
    tooltipVisible.value = false;
  }
);

onMounted(async () => {
  await nextTick();
  await buildChart();
  queueResizeChart();
  window.addEventListener("resize", resizeChart, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
  resetChart();
});
</script>
