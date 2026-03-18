<template>
  <div class="min-w-[140px]">
    <div class="relative h-4 mt-1">
      <div class="absolute left-0 right-0 top-2 h-[2px] bg-[#d7dce2]" />
      <div
        class="absolute left-0 top-2 h-[2px] bg-[#1d5fff]"
        :style="{ width: `${markerOffset}%` }"
      />
      <div
        class="absolute top-0 h-0 w-0 -translate-x-1/2 border-l-[4px] border-r-[4px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#1d5fff]"
        :style="{ left: `${markerOffset}%` }"
      />
    </div>

    <div class="flex items-center justify-between text-[10px] text-[#4f5966]">
      <span>{{ formatValue(low) }}</span>
      <span>{{ formatValue(high) }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  low: {
    type: Number,
    required: true,
  },
  high: {
    type: Number,
    required: true,
  },
  current: {
    type: Number,
    required: true,
  },
  decimals: {
    type: Number,
    default: 2,
  },
});

const markerOffset = computed(() => {
  const range = props.high - props.low;

  if (range <= 0) {
    return 0;
  }

  const ratio = ((props.current - props.low) / range) * 100;
  return Math.max(0, Math.min(100, ratio));
});

const formatValue = (value) =>
  Number(value).toLocaleString("en-US", {
    minimumFractionDigits: props.decimals,
    maximumFractionDigits: props.decimals,
  });
</script>
