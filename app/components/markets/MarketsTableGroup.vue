<template>
  <div>
    <h3 class="mb-2 text-base font-bold text-[#232d39]">
      {{ title }}
    </h3>

    <div class="overflow-hidden rounded-md border border-[#d7dce2] bg-white">
      <table class="min-w-full">
        <thead class="border-b border-[#d7dce2] bg-white">
          <tr>
            <th class="px-3 py-2 text-left text-sm font-medium text-[#2b3642]">Symbol</th>
            <th class="w-[64px] px-2 py-2" />
            <th class="px-3 py-2 text-right text-sm font-medium text-[#2b3642]">
              <span class="inline-flex items-center gap-1">
                Price
                <v-icon icon="mdi-chevron-down" size="14" />
              </span>
            </th>
            <th class="pr-3 py-2 text-right text-sm font-medium text-[#2b3642]">
              Change %
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="item in items"
            :key="`${title}-${item.symbol}`"
            class="border-b border-[#d7dce2] last:border-b-0"
          >
            <td class="px-3 py-3 text-sm font-semibold text-blue-700">
              {{ item.symbol }}
            </td>
            <td class="px-2 py-3">
              <MiniSparkline :values="item.sparkline" :positive="item.positive" />
            </td>
            <td class="px-3 py-3 text-right text-sm text-[#2f3844]">
              {{ item.price }}
            </td>
            <td
              class="px-3 py-3 text-right text-sm"
              :class="changeClass(item.changePercent)"
            >
              {{ item.changePercent }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import MiniSparkline from "./MiniSparkline.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
});

const changeClass = (value) => {
  if (String(value).startsWith("-")) {
    return "text-[#da1e2f]";
  }

  if (String(value).startsWith("+")) {
    return "text-[#0a8f69]";
  }

  return "text-[#2f3844]";
};
</script>
