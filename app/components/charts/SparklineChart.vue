<template>
  <div
    ref="chartRef"
    :style="{ width: `${width}px`, height: `${height}px` }"
    class="pointer-events-none shrink-0 select-none"
  />
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  positive: {
    type: Boolean,
    default: true,
  },
  baseline: {
    type: Number,
    default: null,
  },
  width: {
    type: Number,
    default: 72,
  },
  height: {
    type: Number,
    default: 24,
  },
});

const chartRef = ref(null);
let chart;
let series;

const topLineColor = "#0a8f69";
const topFillColor1 = "rgba(10, 143, 105, 0.26)";
const topFillColor2 = "rgba(10, 143, 105, 0.04)";
const bottomLineColor = "#cb2f2f";
const bottomFillColor1 = "rgba(203, 47, 47, 0.05)";
const bottomFillColor2 = "rgba(203, 47, 47, 0.24)";

const setSeriesData = () => {
  if (!series) {
    return;
  }
  const source = Array.isArray(props.data) ? props.data : [];
  const points = source.map((value, index) => ({
    time: index + 1,
    value: Number(value),
  }));
  series.setData(points);
  chart.timeScale().fitContent();
};

onMounted(async () => {
  if (!chartRef.value) {
    return;
  }

  try {
    const { createChart, BaselineSeries, ColorType, CrosshairMode } = await import(
      "lightweight-charts"
    );

    chart = createChart(chartRef.value, {
      width: props.width,
      height: props.height,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "transparent",
        attributionLogo: false,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      rightPriceScale: {
        visible: false,
        borderVisible: false,
      },
      leftPriceScale: {
        visible: false,
        borderVisible: false,
      },
      timeScale: {
        visible: false,
        borderVisible: false,
      },
      crosshair: {
        mode: CrosshairMode.Hidden,
        vertLine: { visible: false },
        horzLine: { visible: false },
      },
      handleScroll: false,
      handleScale: false,
    });

    series = chart.addSeries(BaselineSeries, {
      baseValue: {
        type: "price",
        price: Number.isFinite(props.baseline) ? props.baseline : Number(props.data?.[0] || 0),
      },
      topLineColor,
      topFillColor1,
      topFillColor2,
      bottomLineColor,
      bottomFillColor1,
      bottomFillColor2,
      lineWidth: 1,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: false,
    });

    setSeriesData();
  } catch (error) {
    console.error("[SparklineChart] init failed", error);
  }
});

watch(
  () => props.data,
  () => {
    setSeriesData();
  },
  { deep: true }
);

watch(
  () => props.baseline,
  () => {
    if (!series) {
      return;
    }
    series.applyOptions({
      baseValue: {
        type: "price",
        price: Number.isFinite(props.baseline) ? props.baseline : Number(props.data?.[0] || 0),
      },
    });
  }
);

onBeforeUnmount(() => {
  if (chart) {
    chart.remove();
    chart = null;
    series = null;
  }
});
</script>
