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

    <section class="mt-4 rounded border border-[#d7dce2] bg-white p-4">
      <div
        class="mb-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[#4f5966]"
      >
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>O:{{ summaryPoint.open }}</span>
          <span>H:{{ summaryPoint.high }}</span>
          <span>L:{{ summaryPoint.low }}</span>
          <span>C:{{ summaryPoint.close }}</span>
          <span>V:{{ summaryPoint.volume }}</span>
        </div>

        <div class="flex items-center gap-2">
          <v-btn icon size="x-small" variant="text">
            <v-icon icon="mdi-chart-box-outline" size="16" />
          </v-btn>
          <v-btn icon size="x-small" variant="text">
            <v-icon icon="mdi-draw" size="16" />
          </v-btn>
          <v-btn icon size="x-small" variant="text">
            <v-icon icon="mdi-arrow-expand-all" size="16" />
          </v-btn>
          <v-btn icon size="x-small" variant="text">
            <v-icon icon="mdi-cog-outline" size="16" />
          </v-btn>
        </div>
      </div>

      <div class="relative">
        <div ref="chartRef" class="h-[500px] w-full" />
      </div>

      <div
        class="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#d7dce2] pt-4"
      >
        <div class="flex flex-wrap items-center gap-2">
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

        <div class="flex flex-wrap items-center gap-3">
          <v-menu location="top end">
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

          <v-chip
            size="small"
            variant="outlined"
            class="!rounded-full !border-[#cfd7e3] !text-[#4f5966]"
          >
            Interval: {{ intervalLabel }}
          </v-chip>
        </div>
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

const stockQuoteStore = useStockQuoteStore();

const chartRef = ref(null);
const selectedChartType = ref("baselineDelta");
const hoveredRow = ref(null);

let chart;
let priceSeries;
let volumeSeries;
let unsubscribeCrosshairMove;

const normalizedSymbol = computed(() => stockQuoteStore.resolveSymbol(props.symbol));
const quote = computed(() => stockQuoteStore.getQuote(normalizedSymbol.value));
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

const quoteMap = computed(() => {
  return new Map((rangeData.value?.points || []).map((row) => [row.time, row]));
});

const isPositive = computed(() => String(quote.value.change).startsWith("+"));
const selectedChartTypeLabel = computed(() => {
  for (const group of chartTypeGroups) {
    const matchedType = group.items.find(
      (item) => item.value === selectedChartType.value
    );

    if (matchedType) {
      return matchedType.label;
    }
  }

  return "Baseline delta";
});

const intervalLabel = computed(() => {
  if (rangeData.value?.intraday) {
    return "1 hour";
  }

  if (activeRange.value === "1W" || activeRange.value === "5D") {
    return "1 day";
  }

  return "1 day";
});

const activePoint = computed(() => {
  if (hoveredRow.value) {
    return hoveredRow.value;
  }

  const points = rangeData.value?.points || [];
  return points[points.length - 1] || null;
});

const summaryPoint = computed(() => {
  const point = activePoint.value;

  if (!point) {
    return {
      open: "--",
      high: "--",
      low: "--",
      close: "--",
      volume: "--",
    };
  }

  return {
    open: Number(point.open).toFixed(2),
    high: Number(point.high).toFixed(2),
    low: Number(point.low).toFixed(2),
    close: Number(point.close).toFixed(2),
    volume: Number(point.volume).toLocaleString("en-US"),
  };
});

const getChartHeight = () => 500;

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

const resetChart = () => {
  hoveredRow.value = null;

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
    case "step":
      return {
        series: chartInstance.addSeries(LineSeries, {
          color: trendColor,
          lineWidth: 2,
          lineType: LineType.WithSteps,
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
          topFillColor1: "rgba(10, 143, 105, 0.24)",
          topFillColor2: "rgba(10, 143, 105, 0.05)",
          topLineColor: "#0a8f69",
          bottomFillColor1: "rgba(218, 30, 47, 0.05)",
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
          topColor: isUpTrend ? "rgba(10, 143, 105, 0.24)" : "rgba(218, 30, 47, 0.22)",
          bottomColor: isUpTrend ? "rgba(10, 143, 105, 0.05)" : "rgba(218, 30, 47, 0.03)",
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

const buildChart = async () => {
  if (!chartRef.value || !rangeData.value?.points?.length) {
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

  chart = createChart(chartRef.value, {
    width: chartRef.value.clientWidth,
    height: getChartHeight(),
    layout: {
      background: { type: ColorType.Solid, color: "transparent" },
      textColor: "#4f5966",
      attributionLogo: false,
    },
    rightPriceScale: {
      borderVisible: true,
      borderColor: "#d7dce2",
      scaleMargins: { top: 0.04, bottom: 0.16 },
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
    },
    grid: {
      vertLines: { color: "#e6ebf2" },
      horzLines: { color: "#e6ebf2" },
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
      top: 0.78,
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

  if (selectedChartType.value === "baselineDelta") {
    priceSeries.createPriceLine({
      price: firstClose,
      color: "#232d39",
      lineWidth: 1,
      lineStyle: LineStyle.Dotted,
      axisLabelVisible: true,
      title: firstClose.toFixed(2),
    });
  }

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
  if (!chart || !chartRef.value) {
    return;
  }

  chart.applyOptions({
    width: chartRef.value.clientWidth,
    height: getChartHeight(),
  });
};

watch(
  [() => normalizedSymbol.value, () => activeRange.value, () => selectedChartType.value],
  async () => {
    await nextTick();
    resetChart();
    await buildChart();
    resizeChart();
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
