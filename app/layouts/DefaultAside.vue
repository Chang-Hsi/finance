<template>
  <div class="p-4 lg:p-5">
    <v-text-field
      density="comfortable"
      hide-details
      prepend-inner-icon="mdi-magnify"
      rounded="pill"
      variant="outlined"
      placeholder="Quote Lookup"
      class="mb-4"
      bg-color="#f5f6f8"
    />

    <v-card class="mb-4 rounded-lg border border-[#d2d8df] bg-[#f7f8fa]" flat>
      <div class="p-4">
        <h3 class="text-lg font-bold text-[#2b3642]">Trending tickers</h3>
      </div>
      <div
        v-for="item in trending"
        :key="item.symbol"
        class="flex items-center border-t border-[#e2e6eb] px-4 py-2"
      >
        <div class="mr-2 min-w-0 flex-1">
          <p class="truncate text-xs font-semibold text-[#1c5ac8]">{{ item.symbol }}</p>
          <p class="truncate text-xs text-[#5c6774]">{{ item.name }}</p>
        </div>
        <div class="mr-2 w-[76px] shrink-0">
          <SparklineChart
            :data="item.spark"
            :positive="item.positive"
            :baseline="item.baseline"
          />
        </div>
        <div class="w-[88px] text-right">
          <p class="text-xs text-[#26303c]">{{ item.price }}</p>
          <p
            :class="item.positive ? 'text-[#0a8f69]' : 'text-[#cb2f2f]'"
            class="text-xs font-semibold"
          >
            {{ item.change }}
          </p>
        </div>
      </div>
    </v-card>

    <v-card
      class="mb-4 rounded-lg border border-[#d2d8df] bg-[#f7f8fa] p-4 text-center"
      flat
    >
      <h3 class="mb-8 text-left text-lg font-bold text-[#2b3642]">Portfolio</h3>
      <p class="mb-6 text-xs font-semibold text-[#26303b]">
        Sign in to access your portfolio
      </p>
      <v-btn
        variant="outlined"
        class="!rounded-full !border !border-[#2b3642] !px-6 !text-[#2b3642]"
        >Sign in</v-btn
      >
    </v-card>

    <v-card class="mb-4 rounded-lg border border-[#d2d8df] bg-[#f7f8fa]" flat>
      <div class="p-4">
        <h3 class="text-lg font-bold text-[#2b3642]">Recently viewed</h3>
      </div>
      <div
        v-for="item in recentlyViewed"
        :key="item.symbol"
        class="flex items-center border-t border-[#e2e6eb] px-4 py-3"
      >
        <div class="mr-2 min-w-0 flex-1">
          <p class="truncate text-xs font-semibold text-[#1c5ac8]">{{ item.symbol }}</p>
          <p class="truncate text-xs text-[#5c6774]">{{ item.name }}</p>
        </div>
        <div class="mr-2 w-[76px] shrink-0">
          <SparklineChart
            :data="item.spark"
            :positive="item.positive"
            :baseline="item.baseline"
          />
        </div>
        <div class="w-[88px] text-right">
          <p class="text-xs text-[#26303c]">{{ item.price }}</p>
          <p
            :class="item.positive ? 'text-[#0a8f69]' : 'text-[#cb2f2f]'"
            class="text-xs font-semibold"
          >
            {{ item.change }}
          </p>
        </div>
      </div>
    </v-card>

    <v-card class="rounded-lg border border-[#d2d8df] bg-[#f7f8fa]" flat>
      <div class="p-4">
        <h3 class="text-lg font-bold text-[#2b3642]">Top gainers</h3>
      </div>
      <div
        v-for="item in gainers"
        :key="item.symbol"
        class="flex items-center border-t border-[#e2e6eb] px-4 py-2"
      >
        <div class="mr-2 min-w-0 flex-1">
          <p class="truncate text-xs font-semibold text-[#1c5ac8]">{{ item.symbol }}</p>
          <p class="truncate text-xs text-[#5c6774]">{{ item.name }}</p>
        </div>
        <div class="mr-2 w-[76px] shrink-0">
          <SparklineChart
            :data="item.spark"
            :positive="item.positive"
            :baseline="item.baseline"
          />
        </div>
        <div class="w-[88px] text-right">
          <p class="text-xs text-[#26303c]">{{ item.price }}</p>
          <p
            :class="item.positive ? 'text-[#0a8f69]' : 'text-[#cb2f2f]'"
            class="text-xs font-semibold"
          >
            {{ item.change }}
          </p>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import SparklineChart from "../components/charts/SparklineChart.vue";

const parseNumeric = (text) => Number(String(text).replace(/,/g, ""));

const parseChange = (text) => {
  const matched = String(text).match(/[-+]?\d[\d,]*(?:\.\d+)?/);
  return matched ? Number(matched[0].replace(/,/g, "")) : 0;
};

const formatSparkValue = (value, price) => {
  if (price >= 1000) {
    return Math.round(value * 100) / 100;
  }
  return Math.round(value * 1000) / 1000;
};

const buildSparkline = (price, change, symbol, points = 28) => {
  const previousClose = price - change;
  const seed = Array.from(symbol).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const amplitude = Math.max(Math.abs(change) * 0.22, Math.max(price * 0.003, 0.12));
  const data = [];

  for (let i = 0; i < points; i += 1) {
    const t = i / (points - 1);
    const trend = previousClose + (price - previousClose) * t;
    const wave1 = Math.sin(t * 12 + seed * 0.013) * amplitude * 0.35;
    const wave2 = Math.cos(t * 26 + seed * 0.007) * amplitude * 0.16;
    const startDip = change > 0 && t < 0.22 ? -amplitude * 0.45 * (1 - t / 0.22) : 0;
    const endDrop = change < 0 && t > 0.72 ? -amplitude * 0.2 * ((t - 0.72) / 0.28) : 0;
    const value =
      i === 0
        ? previousClose
        : i === points - 1
        ? price
        : trend + wave1 + wave2 + startDip + endDrop;
    data.push(formatSparkValue(Math.max(0.0001, value), price));
  }

  return {
    spark: data,
    baseline: previousClose,
  };
};

const enrichTicker = (item) => {
  const priceValue = parseNumeric(item.price);
  const changeValue = parseChange(item.change);
  const positive = changeValue >= 0;
  const { spark, baseline } = buildSparkline(priceValue, changeValue, item.symbol);

  return {
    ...item,
    positive,
    spark,
    baseline,
  };
};

const trending = [
  {
    symbol: "ADBE",
    name: "Adobe Inc.",
    price: "249.32",
    change: "-20.46 (-7.58%)",
  },
  {
    symbol: "BTC-USD",
    name: "Bitcoin USD",
    price: "73,166.44",
    change: "+1,613.63 (+2.26%)",
  },
  {
    symbol: "XYZ",
    name: "Block, Inc.",
    price: "59.79",
    change: "-0.11 (-0.18%)",
  },
  {
    symbol: "ULTA",
    name: "Ulta Beauty, Inc.",
    price: "535.72",
    change: "-88.98 (-14.24%)",
  },
  {
    symbol: "RBRK",
    name: "Rubrik, Inc.",
    price: "53.43",
    change: "-0.59 (-1.09%)",
  },
].map(enrichTicker);

const recentlyViewed = [
  {
    symbol: "LITE",
    name: "Lumentum Holdings",
    price: "622.50",
    change: "+6.41 (+1.04%)",
  },
].map(enrichTicker);

const gainers = [
  {
    symbol: "NP",
    name: "Neptune Insuranc...",
    price: "21.87",
    change: "+3.68 (+20.23%)",
  },
  {
    symbol: "PAYP",
    name: "PayPay Corporat...",
    price: "21.14",
    change: "+2.98 (+16.41%)",
  },
  {
    symbol: "VEON",
    name: "VEON Ltd.",
    price: "50.60",
    change: "+6.29 (+14.20%)",
  },
  {
    symbol: "KLAR",
    name: "Klarna Group plc",
    price: "15.91",
    change: "+1.29 (+8.82%)",
  },
].map(enrichTicker);
</script>
