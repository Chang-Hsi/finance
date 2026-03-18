<template>
  <section class="border-b border-[#d7dce2] bg-[#f3f4f6]">
    <div class="mx-auto flex h-[92px] max-w-[1460px] items-center px-4">
      <div
        class="mr-6 hidden min-w-[150px] items-center gap-2 text-xs font-semibold text-[#28343f] lg:flex"
      >
        <v-icon icon="mdi-access-point" size="20" color="#0a8b7c" />
        <span class="text-lg">US Markets</span>
        <v-icon icon="mdi-chevron-down" size="18" color="#68727d" />
      </div>

      <div class="flex flex-1 items-stretch overflow-x-auto">
        <article
          v-for="item in markets"
          :key="item.name"
          class="min-w-[160px] border-l border-[#e1e5ea] px-4 first:border-l-0"
        >
          <a href="#" class="block text-xs font-semibold text-[#1c5ac8]">{{
            item.name
          }}</a>
          <p class="mt-1 text-xs leading-none text-[#1e2732]">{{ item.value }}</p>
          <p
            :class="item.positive ? 'text-[#098a63]' : 'text-[#cc2f2f]'"
            class="mt-2 text-xs font-semibold"
          >
            {{ item.change }}
          </p>
        </article>
      </div>

      <div class="ml-4 hidden items-center gap-1 lg:flex">
        <v-btn icon size="small" variant="text">
          <v-icon icon="mdi-chevron-left" />
        </v-btn>
        <v-btn icon size="small" variant="text">
          <v-icon icon="mdi-chevron-right" />
        </v-btn>
      </div>
    </div>
  </section>
</template>

<script setup>
const markets = [
  { name: "S&P Futures", value: "6,667.25", change: "+31.25 (+0.47%)", positive: true },
  { name: "Dow Futures", value: "47,034.00", change: "+148.00 (+0.32%)", positive: true },
  {
    name: "Nasdaq Futures",
    value: "24,520.75",
    change: "+126.50 (+0.52%)",
    positive: true,
  },
  {
    name: "Russell 2000 Futures",
    value: "2,511.20",
    change: "+14.60 (+0.58%)",
    positive: true,
  },
  { name: "VIX", value: "25.93", change: "-1.26 (-4.64%)", positive: false },
  { name: "Gold", value: "4,999.00", change: "-62.70 (-1.24%)", positive: false },
  {
    name: "Bitcoin USD",
    value: "73,166.44",
    change: "+1,613.63 (+2.26%)",
    positive: true,
  },
];
</script>
