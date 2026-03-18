<template>
  <section class="mx-auto w-full max-w-[1460px] px-4 pb-8">
    <h1 class="mb-6 text-3xl font-extrabold leading-none tracking-tight text-[#232d39]">
      Assets
    </h1>

    <div class="overflow-x-auto rounded-md border border-[#d7dce2] bg-white">
      <table class="min-w-[1280px] table-fixed border-separate border-spacing-0">
        <thead>
          <tr class="bg-white text-left text-sm text-[#2f3844]">
            <th
              class="sticky left-0 z-20 w-[150px] border-b border-r border-[#d7dce2] bg-white px-3 py-2 font-medium"
            >
              Symbol
            </th>
            <th class="w-[180px] border-b border-[#d7dce2] px-3 py-2 font-medium">
              Name
            </th>
            <th class="w-[92px] border-b border-[#d7dce2] px-3 py-2 font-medium"></th>
            <th class="w-[110px] border-b border-[#d7dce2] px-3 py-2 font-medium">
              Price
            </th>
            <th class="w-[95px] border-b border-[#d7dce2] px-3 py-2 font-medium">
              Change
            </th>
            <th class="w-[95px] border-b border-[#d7dce2] px-3 py-2 font-medium">
              Change %
            </th>
            <th class="w-[100px] border-b border-[#d7dce2] px-3 py-2 font-medium">
              Volume
            </th>
            <th class="w-[160px] border-b border-[#d7dce2] px-3 py-2 font-medium">
              Day Range
            </th>
            <th class="w-[160px] border-b border-[#d7dce2] px-3 py-2 font-medium">
              52 Wk Range
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="row in worldIndicesDetailRows"
            :key="row.symbol"
            class="group cursor-pointer transition-colors hover:bg-[#eef6ff] text-sm"
            @click="openStock(row)"
          >
            <td
              class="sticky left-0 z-10 border-b border-r border-[#d7dce2] bg-white px-3 py-2 transition-colors group-hover:bg-[#eef6ff]"
            >
              <span class="font-bold text-blue-700">{{ row.symbol }}</span>
            </td>
            <td class="border-b border-[#d7dce2] px-3 py-2 text-sm text-[#2f3844]">
              <div class="truncate">{{ row.name }}</div>
            </td>
            <td class="border-b border-[#d7dce2] px-3 py-2">
              <MiniSparkline :values="row.sparkline" :positive="row.positive" />
            </td>
            <td class="border-b border-[#d7dce2] px-3 py-2 text-sm text-[#2f3844]">
              {{ row.priceText }}
            </td>
            <td
              class="border-b border-[#d7dce2] px-3 py-2 text-sm"
              :class="row.positive ? 'text-[#0a8f69]' : 'text-[#da1e2f]'"
            >
              {{ row.changeText }}
            </td>
            <td
              class="border-b border-[#d7dce2] px-3 py-2 text-sm"
              :class="row.positive ? 'text-[#0a8f69]' : 'text-[#da1e2f]'"
            >
              {{ row.changePercentText }}
            </td>
            <td class="border-b border-[#d7dce2] px-3 py-2 text-sm text-[#2f3844]">
              {{ row.volumeText }}
            </td>
            <td class="border-b border-[#d7dce2] px-3 py-2">
              <PriceRangeIndicator
                :low="row.dayRange.low"
                :high="row.dayRange.high"
                :current="row.priceValue"
                :decimals="row.rangeDecimals"
              />
            </td>
            <td class="border-b border-[#d7dce2] px-3 py-2">
              <PriceRangeIndicator
                :low="row.fiftyTwoWeekRange.low"
                :high="row.fiftyTwoWeekRange.high"
                :current="row.priceValue"
                :decimals="row.rangeDecimals"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import MiniSparkline from "~/components/markets/MiniSparkline.vue";
import PriceRangeIndicator from "~/components/markets/PriceRangeIndicator.vue";
import { worldIndicesDetailRows } from "@/data/marketsOverview";

const openStock = (row) => navigateTo(`/stocks/${encodeURIComponent(row.routeSymbol)}`);
</script>
