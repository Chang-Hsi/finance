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

    <div class="mt-4 flex flex-wrap items-center gap-3">
      <v-menu
        v-model="isDateMenuOpen"
        :close-on-content-click="false"
        location="bottom start"
      >
        <template #activator="{ props: menuProps }">
          <v-btn
            v-bind="menuProps"
            variant="outlined"
            class="!rounded-full !border-[#c9cfd8] !bg-white !px-6 !py-2 !text-base !font-semibold !normal-case !text-[#2b3642]"
            @click="openDateMenu"
          >
            {{ appliedDateRangeLabel }}
            <v-icon icon="mdi-chevron-down" size="16" class="ml-2" />
          </v-btn>
        </template>

        <v-card min-width="300" rounded="xl" class="border border-[#d7dce2] p-4">
          <div class="historical-date-presets">
            <v-btn
              v-for="preset in datePresets"
              :key="preset.value"
              variant="outlined"
              rounded="xl"
              class="historical-date-preset-btn !w-full !min-w-0 !border-[#d7dce2] !px-0 !text-base !font-semibold !normal-case"
              :class="
                draftDatePreset === preset.value
                  ? '!border-[#1d5fff] !text-blue-700'
                  : '!text-[#2b3642]'
              "
              @click="applyDraftPreset(preset.value)"
            >
              {{ preset.label }}
            </v-btn>
          </div>

          <div class="mt-5">
            <p class="text-base font-medium text-[#2b3642]">Start Date</p>
            <v-text-field
              :model-value="draftStartLabel"
              readonly
              density="comfortable"
              class="historical-date-input mt-2"
              bg-color="#eef1f5"
              :class="
                activeDateField === 'start'
                  ? '[&_.v-field]:!ring-1 [&_.v-field]:!ring-[#1d5fff]'
                  : ''
              "
              @click="activeDateField = 'start'"
            >
              <template #append-inner>
                <v-icon icon="mdi-calendar-blank-outline" size="18" />
              </template>
            </v-text-field>
          </div>

          <div class="mt-4">
            <p class="text-base font-medium text-[#2b3642]">End Date</p>
            <v-text-field
              :model-value="draftEndLabel"
              readonly
              density="comfortable"
              class="historical-date-input mt-2"
              bg-color="#eef1f5"
              :class="
                activeDateField === 'end'
                  ? '[&_.v-field]:!ring-1 [&_.v-field]:!ring-[#1d5fff]'
                  : ''
              "
              @click="activeDateField = 'end'"
            >
              <template #append-inner>
                <v-icon icon="mdi-calendar-blank-outline" size="18" />
              </template>
            </v-text-field>
          </div>

          <div class="mt-4 overflow-hidden rounded-2xl border border-[#d7dce2] bg-white">
            <v-date-picker
              v-model="activePickerDate"
              color="primary"
              hide-header
              show-adjacent-months
              width="100%"
            />
          </div>

          <div class="mt-5 flex items-center gap-3">
            <v-btn
              rounded="xl"
              class="!bg-[#232d39] !px-4 !text-base !font-semibold !normal-case !text-white"
              @click="commitDraftDateRange"
            >
              Done
            </v-btn>
            <v-btn
              variant="outlined"
              rounded="xl"
              class="!border-[#d7dce2] !px-4 !text-base !font-semibold !normal-case !text-[#2b3642]"
              @click="cancelDraftDateRange"
            >
              Cancel
            </v-btn>
          </div>
        </v-card>
      </v-menu>

      <v-menu location="bottom start">
        <template #activator="{ props: menuProps }">
          <v-btn
            v-bind="menuProps"
            variant="outlined"
            class="!rounded-full !border-[#c9cfd8] !bg-white !px-6 !py-2 !text-base !font-semibold !normal-case !text-[#2b3642]"
          >
            {{ selectedFrequencyLabel }}
            <v-icon icon="mdi-chevron-down" size="16" class="ml-2" />
          </v-btn>
        </template>

        <v-list class="min-w-[160px] !py-1">
          <v-list-item
            v-for="item in frequencyOptions"
            :key="item.value"
            rounded="lg"
            class="mx-1 my-[2px]"
            :class="
              selectedFrequency === item.value
                ? 'bg-[#e8f0fd] text-blue-700'
                : 'text-[#232d39]'
            "
            @click="selectedFrequency = item.value"
          >
            <v-list-item-title class="text-base font-medium">
              {{ item.label }}
            </v-list-item-title>

            <template #append>
              <v-icon
                v-if="selectedFrequency === item.value"
                icon="mdi-check"
                size="16"
                class="text-blue-700"
              />
            </template>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div class="mt-6 flex items-center justify-end">
      <p class="text-sm text-[#2b3642]">Currency in USD</p>
    </div>

    <div class="mt-2 overflow-hidden rounded border border-[#c9cfd8]">
      <table v-if="displayRows.length" class="w-full border-collapse">
        <thead>
          <tr class="bg-[#f3f5f7]">
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-3 py-2 text-left text-xs font-normal text-[#2b3642] first:border-r first:border-[#d7dce2]"
              :class="column.numeric ? 'text-right' : ''"
            >
              <span class="inline-flex items-center gap-1">
                {{ column.label }}
                <v-icon
                  v-if="column.showInfo"
                  icon="mdi-information-outline"
                  size="14"
                  class="text-[#5f6976]"
                />
              </span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, index) in displayRows"
            :key="`${row.date}-${index}`"
            class="border-t border-[#d7dce2] text-sm text-[#2b3642]"
            :class="index % 2 === 0 ? 'bg-[#eef1f4]' : 'bg-white'"
          >
            <td class="border-r border-[#d7dce2] px-3 py-2">{{ row.date }}</td>
            <td class="px-3 py-2 text-right">{{ row.open }}</td>
            <td class="px-3 py-2 text-right">{{ row.high }}</td>
            <td class="px-3 py-2 text-right">{{ row.low }}</td>
            <td class="px-3 py-2 text-right">{{ row.close }}</td>
            <td class="px-3 py-2 text-right">{{ row.adjClose }}</td>
            <td class="px-3 py-2 text-right">{{ row.volume }}</td>
          </tr>
        </tbody>
      </table>

      <div
        v-else
        class="flex min-h-[160px] items-center justify-center bg-white px-4 py-10 text-base text-[#5f6976]"
      >
        No historical rows available for the selected filters.
      </div>
    </div>
  </section>
</template>

<script setup>
const frequencyOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const datePresets = [
  { value: "1D", label: "1D" },
  { value: "5D", label: "5D" },
  { value: "3M", label: "3M" },
  { value: "6M", label: "6M" },
  { value: "YTD", label: "YTD" },
  { value: "1Y", label: "1Y" },
  { value: "5Y", label: "5Y" },
  { value: "MAX", label: "Max" },
];

const props = defineProps({
  symbol: {
    type: String,
    default: "CL=F",
  },
});

const stockQuoteStore = useStockQuoteStore();

const isDateMenuOpen = ref(false);
const selectedFrequency = ref("daily");
const draftDatePreset = ref("MAX");
const activeDateField = ref("start");
const draftStartDate = ref(null);
const draftEndDate = ref(null);
const appliedStartDate = ref(null);
const appliedEndDate = ref(null);

const normalizedSymbol = computed(() => stockQuoteStore.resolveSymbol(props.symbol));
const quote = computed(() => stockQuoteStore.getQuote(normalizedSymbol.value));
const rows = computed(
  () => stockQuoteStore.getHistoricalRows(normalizedSymbol.value) || []
);
const isPositive = computed(() => String(quote.value.change).startsWith("+"));
const selectedFrequencyLabel = computed(
  () =>
    frequencyOptions.find((item) => item.value === selectedFrequency.value)?.label ||
    "Daily"
);

const columns = [
  { key: "date", label: "Date", numeric: false, showInfo: false },
  { key: "open", label: "Open", numeric: true, showInfo: false },
  { key: "high", label: "High", numeric: true, showInfo: false },
  { key: "low", label: "Low", numeric: true, showInfo: false },
  { key: "close", label: "Close", numeric: true, showInfo: true },
  { key: "adjClose", label: "Adj Close", numeric: true, showInfo: true },
  { key: "volume", label: "Volume", numeric: true, showInfo: false },
];

const formatNumberLike = (value, digits = 2) => {
  const normalized = Number(String(value).replace(/,/g, ""));

  if (Number.isNaN(normalized)) {
    return value;
  }

  return normalized.toFixed(digits);
};

const formatVolumeLike = (value) => {
  const normalized = Number(String(value).replace(/,/g, ""));

  if (Number.isNaN(normalized)) {
    return value;
  }

  return normalized.toLocaleString("en-US");
};

const parseRowDate = (value) => {
  const raw = String(value || "").trim();

  if (!raw) {
    return null;
  }

  const nativeDate = new Date(raw);
  if (!Number.isNaN(nativeDate.getTime())) {
    return dayjs(nativeDate);
  }

  const normalized = raw.replace(/\./g, "/").replace(/-/g, "/");
  const [year, month, day] = normalized.split("/").map((item) => Number(item));

  if ([year, month, day].every((item) => Number.isFinite(item))) {
    return dayjs(new Date(year, month - 1, day));
  }

  return null;
};

const normalizedRows = computed(() => {
  return rows.value
    .map((row) => {
      const parsedDate = parseRowDate(row.date);

      return {
        ...row,
        parsedDate,
        timestamp: parsedDate ? parsedDate.valueOf() : null,
      };
    })
    .filter((row) => row.timestamp !== null)
    .sort((left, right) => right.timestamp - left.timestamp);
});

const latestRowDate = computed(() => normalizedRows.value[0]?.parsedDate || null);
const earliestRowDate = computed(
  () => normalizedRows.value[normalizedRows.value.length - 1]?.parsedDate || null
);

const formatMenuDate = (value) => (value ? value.format("YYYY/MM/DD") : "");
const formatLabelDate = (value) => (value ? value.format("MMM D, YYYY") : "--");
const draftStartLabel = computed(() => formatMenuDate(draftStartDate.value));
const draftEndLabel = computed(() => formatMenuDate(draftEndDate.value));
const clampStartDate = (candidate, earliest) => {
  if (!candidate || !earliest) {
    return candidate;
  }

  return candidate.isBefore(earliest, "day") ? earliest : candidate;
};

const appliedDateRangeLabel = computed(() => {
  return `${formatLabelDate(appliedStartDate.value)} - ${formatLabelDate(
    appliedEndDate.value
  )}`;
});

const buildPresetRange = (presetValue) => {
  const latest = latestRowDate.value;
  const earliest = earliestRowDate.value;

  if (!latest || !earliest) {
    return { start: null, end: null };
  }

  switch (presetValue) {
    case "1D":
      return { start: latest, end: latest };
    case "5D": {
      const fifthLatest =
        normalizedRows.value[Math.min(4, normalizedRows.value.length - 1)]?.parsedDate ||
        earliest;
      return { start: fifthLatest, end: latest };
    }
    case "3M":
      return {
        start: clampStartDate(latest.subtract(3, "month"), earliest),
        end: latest,
      };
    case "6M":
      return {
        start: clampStartDate(latest.subtract(6, "month"), earliest),
        end: latest,
      };
    case "YTD":
      return { start: clampStartDate(latest.startOf("year"), earliest), end: latest };
    case "1Y":
      return { start: clampStartDate(latest.subtract(1, "year"), earliest), end: latest };
    case "5Y":
      return { start: clampStartDate(latest.subtract(5, "year"), earliest), end: latest };
    default:
      return { start: earliest, end: latest };
  }
};

const syncDraftWithAppliedRange = () => {
  draftStartDate.value = appliedStartDate.value;
  draftEndDate.value = appliedEndDate.value;
};

const openDateMenu = () => {
  activeDateField.value = "start";
  syncDraftWithAppliedRange();
};

const applyDraftPreset = (presetValue) => {
  draftDatePreset.value = presetValue;

  const nextRange = buildPresetRange(presetValue);
  draftStartDate.value = nextRange.start;
  draftEndDate.value = nextRange.end;
};

const cancelDraftDateRange = () => {
  syncDraftWithAppliedRange();
  isDateMenuOpen.value = false;
};

const normalizeDateOrder = (startDate, endDate) => {
  if (!startDate || !endDate) {
    return { start: null, end: null };
  }

  if (startDate.isAfter(endDate)) {
    return { start: endDate, end: startDate };
  }

  return { start: startDate, end: endDate };
};

const commitDraftDateRange = () => {
  if (!draftStartDate.value || !draftEndDate.value) {
    syncDraftWithAppliedRange();
    isDateMenuOpen.value = false;
    return;
  }

  const orderedRange = normalizeDateOrder(draftStartDate.value, draftEndDate.value);
  appliedStartDate.value = orderedRange.start;
  appliedEndDate.value = orderedRange.end;
  isDateMenuOpen.value = false;
};

const parsePickerValue = (value) => {
  const rawValue = Array.isArray(value) ? value[0] : value;

  if (!rawValue) {
    return null;
  }

  const parsed = dayjs(rawValue);
  return parsed.isValid() ? parsed : null;
};

const activePickerDate = computed({
  get() {
    return activeDateField.value === "start"
      ? draftStartDate.value?.toDate() || null
      : draftEndDate.value?.toDate() || null;
  },
  set(nextValue) {
    const parsed = parsePickerValue(nextValue);

    if (!parsed) {
      return;
    }

    draftDatePreset.value = null;

    if (activeDateField.value === "start") {
      draftStartDate.value = parsed;
      return;
    }

    draftEndDate.value = parsed;
  },
});

const aggregateRows = (sourceRows, unit) => {
  const groupedRows = new Map();
  const ascendingRows = [...sourceRows].sort(
    (left, right) => left.timestamp - right.timestamp
  );

  for (const row of ascendingRows) {
    const groupKey = row.parsedDate.startOf(unit).format("YYYY-MM-DD");
    const currentGroup = groupedRows.get(groupKey);
    const highValue = Number(String(row.high).replace(/,/g, ""));
    const lowValue = Number(String(row.low).replace(/,/g, ""));
    const volumeValue = Number(String(row.volume).replace(/,/g, ""));

    if (!currentGroup) {
      groupedRows.set(groupKey, {
        date: row.date,
        open: Number(String(row.open).replace(/,/g, "")),
        high: highValue,
        low: lowValue,
        close: Number(String(row.close).replace(/,/g, "")),
        adjClose: Number(String(row.adjClose).replace(/,/g, "")),
        volume: Number.isNaN(volumeValue) ? 0 : volumeValue,
        parsedDate: row.parsedDate,
        timestamp: row.timestamp,
      });
      continue;
    }

    currentGroup.high = Math.max(currentGroup.high, highValue);
    currentGroup.low = Math.min(currentGroup.low, lowValue);
    currentGroup.close = Number(String(row.close).replace(/,/g, ""));
    currentGroup.adjClose = Number(String(row.adjClose).replace(/,/g, ""));
    currentGroup.volume += Number.isNaN(volumeValue) ? 0 : volumeValue;
    currentGroup.date = row.date;
    currentGroup.parsedDate = row.parsedDate;
    currentGroup.timestamp = row.timestamp;
  }

  return [...groupedRows.values()]
    .sort((left, right) => right.timestamp - left.timestamp)
    .map((row) => ({
      date: row.date,
      open: formatNumberLike(row.open),
      high: formatNumberLike(row.high),
      low: formatNumberLike(row.low),
      close: formatNumberLike(row.close),
      adjClose: formatNumberLike(row.adjClose),
      volume: formatVolumeLike(row.volume),
    }));
};

const filteredDailyRows = computed(() => {
  if (!appliedStartDate.value || !appliedEndDate.value) {
    return normalizedRows.value;
  }

  return normalizedRows.value.filter((row) => {
    return (
      row.parsedDate.isSame(appliedStartDate.value, "day") ||
      row.parsedDate.isSame(appliedEndDate.value, "day") ||
      (row.parsedDate.isAfter(appliedStartDate.value, "day") &&
        row.parsedDate.isBefore(appliedEndDate.value, "day"))
    );
  });
});

const displayRows = computed(() => {
  if (selectedFrequency.value === "weekly") {
    return aggregateRows(filteredDailyRows.value, "week");
  }

  if (selectedFrequency.value === "monthly") {
    return aggregateRows(filteredDailyRows.value, "month");
  }

  return filteredDailyRows.value.map((row) => ({
    date: row.date,
    open: row.open,
    high: row.high,
    low: row.low,
    close: row.close,
    adjClose: row.adjClose,
    volume: row.volume,
  }));
});

watch(
  () => normalizedSymbol.value,
  () => {
    selectedFrequency.value = "daily";
    draftDatePreset.value = "MAX";

    const nextRange = buildPresetRange("MAX");
    appliedStartDate.value = nextRange.start;
    appliedEndDate.value = nextRange.end;
    syncDraftWithAppliedRange();
  },
  { immediate: true }
);
</script>

<style>
.historical-date-presets {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}

.historical-date-preset-btn {
  width: 100%;
}

.historical-date-input .v-field__input {
  padding-inline-start: 16px !important;
}
</style>
