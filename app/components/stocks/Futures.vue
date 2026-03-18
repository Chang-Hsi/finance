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

    <section class="pt-4">
      <h2 class="mb-3 text-xl font-bold text-[#232d39]">Futures Chain</h2>

      <div class="overflow-x-auto rounded-md border border-[#d7dce2]">
        <table class="min-w-full border-collapse">
          <thead class="bg-white">
            <tr class="border-b border-[#d7dce2]">
              <th
                v-for="column in columns"
                :key="column.key"
                class="px-4 py-3 text-left text-xs font-medium text-[#232d39]"
                :class="column.align === 'right' ? 'text-right' : ''"
              >
                {{ column.label }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(row, index) in futuresChain"
              :key="row.contractName"
              class="cursor-pointer border-b border-[#d7dce2] transition-colors hover:bg-[#d9dee6]"
              :class="index % 2 === 0 ? 'bg-[#eef1f4]' : 'bg-white'"
              @click="openSummary"
            >
              <td class="px-4 py-3 text-sm font-semibold text-[#1b5fd0]">
                {{ row.contractName }}
              </td>
              <td class="px-4 py-3 text-sm text-[#232d39]">
                {{ row.settlementDate }}
              </td>
              <td class="px-4 py-3 text-right text-sm text-[#232d39]">
                {{ row.price }}
              </td>
              <td
                class="px-4 py-3 text-right text-sm"
                :class="isPositiveValue(row.change) ? 'text-[#0a8f69]' : 'text-[#cb2f2f]'"
              >
                {{ row.change }}
              </td>
              <td
                class="px-4 py-3 text-right text-sm"
                :class="
                  isPositiveValue(row.changePercent) ? 'text-[#0a8f69]' : 'text-[#cb2f2f]'
                "
              >
                {{ row.changePercent }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>

<script setup>
const props = defineProps({
  symbol: {
    type: String,
    default: "CL=F",
  },
});

const route = useRoute();
const router = useRouter();
const stockQuoteStore = useStockQuoteStore();
const stockFuturesStore = useStockFuturesStore();

const columns = [
  { key: "contractName", label: "Contract Name", align: "left" },
  { key: "settlementDate", label: "Settlement Date", align: "left" },
  { key: "price", label: "Price", align: "right" },
  { key: "change", label: "Change", align: "right" },
  { key: "changePercent", label: "Change %", align: "right" },
];

const normalizedSymbol = computed(() => stockQuoteStore.resolveSymbol(props.symbol));
const quote = computed(() => stockQuoteStore.getQuote(normalizedSymbol.value));
const futuresChain = computed(() =>
  stockFuturesStore.getFuturesChain(normalizedSymbol.value)
);
const isPositive = computed(() => String(quote.value.change).startsWith("+"));

const isPositiveValue = (value) => String(value).startsWith("+");

const openSummary = async () => {
  await router.push({
    path: route.path,
    query: {},
  });
};
</script>
