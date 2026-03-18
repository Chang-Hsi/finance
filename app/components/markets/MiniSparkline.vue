<template>
  <div class="h-[24px] w-[48px]">
    <svg viewBox="0 0 48 24" class="h-full w-full overflow-visible">
      <line x1="0" y1="22" x2="48" y2="22" :stroke="lineColor" stroke-dasharray="1.5 2" />
      <path :d="areaPath" :fill="fillColor" />
      <polyline
        :points="points"
        fill="none"
        :stroke="lineColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  values: {
    type: Array,
    default: () => [],
  },
  positive: {
    type: Boolean,
    default: true,
  },
});

const lineColor = computed(() => (props.positive ? "#0a8f69" : "#da1e2f"));
const fillColor = computed(() =>
  props.positive ? "rgba(10, 143, 105, 0.12)" : "rgba(218, 30, 47, 0.12)"
);

const normalizedValues = computed(() => {
  if (!props.values.length) {
    return [12, 12];
  }

  const minValue = Math.min(...props.values);
  const maxValue = Math.max(...props.values);
  const range = maxValue - minValue || 1;

  return props.values.map((value) => {
    const ratio = (value - minValue) / range;
    return 20 - ratio * 16;
  });
});

const points = computed(() => {
  if (!normalizedValues.value.length) {
    return "";
  }

  return normalizedValues.value
    .map((value, index) => {
      const x = (48 / Math.max(normalizedValues.value.length - 1, 1)) * index;
      return `${x},${value}`;
    })
    .join(" ");
});

const areaPath = computed(() => {
  if (!points.value) {
    return "";
  }

  const firstX = 0;
  const lastX = 48;
  return `M ${firstX} 22 L ${points.value
    .split(" ")
    .join(" L ")} L ${lastX} 22 Z`;
});
</script>
