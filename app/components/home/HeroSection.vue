<template>
  <section class="border-b border-[#d7dce2] pb-6">
    <div class="grid grid-cols-1 gap-4 xl:grid-cols-12">
      <div class="xl:col-span-6">
        <NuxtLink :to="newsHref(hero.slug)" class="block">
          <v-card class="overflow-hidden rounded-md" flat>
            <img :src="hero.image" alt="hero" class="h-[320px] w-full object-cover" />
          </v-card>
          <h1 class="mt-4 text-xl font-bold leading-tight text-[#232d39]">
            {{ hero.title }}
          </h1>
          <p class="mt-3 text-base text-[#2f3945]">{{ hero.summary }}</p>
          <div class="mt-2 flex flex-wrap items-center gap-2 text-sm text-[#5f6976]">
            <span>{{ hero.source }}</span>
            <span>•</span>
            <span>{{ hero.time }}</span>
            <v-chip
              v-for="tag in hero.tags"
              :key="tag.symbol"
              size="x-small"
              variant="outlined"
              class="!text-xs"
            >
              <span
                class="!rounded-full !border !border-gray-300 px-[8px] py-[1px]"
                :class="tag.positive ? 'text-[#0a8f69]' : 'text-[#cc2f2f]'"
                @click.stop.prevent="goStock(tag.symbol)"
              >
                {{ tag.symbol }} {{ tag.value }}
              </span>
            </v-chip>
          </div>
        </NuxtLink>

        <div
          class="mt-4 grid grid-cols-1 gap-4 border-t border-[#d7dce2] pt-4 md:grid-cols-2"
        >
          <NuxtLink
            v-for="item in heroBottom"
            :key="item.title"
            :to="newsHref(item.slug)"
            class="block"
          >
            <article>
              <v-card class="overflow-hidden rounded-md" flat>
                <img :src="item.image" alt="news" class="h-[150px] w-full object-cover" />
              </v-card>
              <h3 class="mt-2 text-lg font-semibold leading-tight text-[#232d39]">
                {{ item.title }}
              </h3>
              <p class="mt-1 text-sm text-[#5f6976]">
                {{ item.source }} • {{ item.time }}
              </p>
              <div class="mt-1 flex flex-wrap">
                <v-chip
                  v-for="tag in item.tags"
                  :key="tag.symbol"
                  size="x-small"
                  variant="outlined"
                  class="!text-xs"
                >
                  <span
                    class="!rounded-full !border !border-gray-300 px-[8px] py-[1px]"
                    :class="tag.positive ? 'text-[#0a8f69]' : 'text-[#cc2f2f]'"
                    @click.stop.prevent="goStock(tag.symbol)"
                  >
                    {{ tag.symbol }} {{ tag.value }}
                  </span>
                </v-chip>
              </div>
            </article>
          </NuxtLink>
        </div>
      </div>

      <div class="xl:col-span-3">
        <NuxtLink :to="newsHref(centerTop.slug)" class="block">
          <article class="border-b border-[#d7dce2] pb-3">
            <v-card class="overflow-hidden rounded-md" flat>
              <img
                :src="centerTop.image"
                alt="center"
                class="h-[180px] w-full object-cover"
              />
            </v-card>
            <h3 class="mt-2 text-base font-semibold leading-tight text-[#232d39]">
              {{ centerTop.title }}
            </h3>
            <p class="mt-1 text-sm text-[#5f6976]">
              {{ centerTop.source }} • {{ centerTop.time }}
            </p>
            <div class="mt-1">
              <v-chip size="x-small" variant="outlined" class="!text-xs">
                <span
                  class="text-[#0a8f69] !rounded-full !border !border-gray-300 px-[8px] py-[1px]"
                  @click.stop.prevent="goStock(tagSymbol(centerTop.tag))"
                  >{{ centerTop.tag }}</span
                >
              </v-chip>
            </div>
          </article>
        </NuxtLink>

        <NuxtLink
          v-for="item in centerList"
          :key="item.title"
          :to="newsHref(item.slug)"
          class="block"
        >
          <article class="border-b border-[#d7dce2] py-2">
            <h3 class="text-base font-semibold leading-tight text-[#232d39]">
              {{ item.title }}
            </h3>
            <p class="mt-1 text-sm text-[#5f6976]">{{ item.source }} • {{ item.time }}</p>
            <div class="mt-1 flex flex-wrap">
              <v-chip
                v-for="tag in item.tags"
                :key="tag.symbol"
                size="x-small"
                variant="outlined"
                class="!text-xs"
              >
                <span
                  class="!rounded-full !border !border-gray-300 px-[8px] py-[1px]"
                  :class="tag.positive ? 'text-[#0a8f69]' : 'text-[#cc2f2f]'"
                  @click.stop.prevent="goStock(tag.symbol)"
                >
                  {{ tag.symbol }} {{ tag.value }}
                </span>
              </v-chip>
            </div>
          </article>
        </NuxtLink>

        <v-btn
          variant="text"
          class="mt-2 !px-0 !text-base !font-bold !normal-case !text-[#293544]"
          >View More</v-btn
        >
      </div>

      <div class="xl:col-span-3 xl:border-l xl:border-[#d7dce2] xl:pl-4">
        <h2 class="mb-2 text-xl font-bold text-[#232d39]">Latest</h2>
        <NuxtLink
          v-for="item in latest"
          :key="item.title"
          :to="newsHref(item.slug)"
          class="block"
        >
          <article class="border-b border-[#d7dce2] py-2">
            <h3 class="text-base font-semibold leading-tight text-[#232d39]">
              {{ item.title }}
            </h3>
            <p class="mt-1 text-sm text-[#5f6976]">{{ item.source }} • {{ item.time }}</p>
            <div class="mt-1 flex flex-wrap">
              <v-chip
                v-for="tag in item.tags"
                :key="tag.symbol"
                size="x-small"
                variant="outlined"
                class="!text-xs"
              >
                <span
                  class="!rounded-full !border !border-gray-300 px-[8px] py-[1px]"
                  :class="tag.positive ? 'text-[#0a8f69]' : 'text-[#cc2f2f]'"
                  @click.stop.prevent="goStock(tag.symbol)"
                >
                  {{ tag.symbol }} {{ tag.value }}
                </span>
              </v-chip>
            </div>
          </article>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const newsHref = (slug) => `/news/${slug}`;
const stockHref = (symbol) => `/stocks/${encodeURIComponent(String(symbol || ""))}`;
const tagSymbol = (tagText) => String(tagText || "").split(" ")[0];
const goStock = (symbol) => navigateTo(stockHref(symbol));

const hero = {
  slug: "straw-that-stirs-the-drink-oil-impact",
  image:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  title: "'Straw that stirs the drink': Wall Street weighs impact of surging oil",
  summary:
    "Wall Street is factoring in the impact of rising energy prices on inflation, bond yields, and risk appetite.",
  source: "Yippee Finance",
  time: "12h ago",
  tags: [
    { symbol: "CL=F", value: "+1.67%", positive: true },
    { symbol: "^GSPC", value: "-0.61%", positive: false },
  ],
};

const heroBottom = [
  {
    slug: "us-stock-futures-climb-oil-rises",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    title: "US stock futures climb as oil rises with US and Iran war in focus",
    source: "Yippee Finance",
    time: "24m ago",
    tags: [
      { symbol: "^GSPC", value: "-0.61%", positive: false },
      { symbol: "NQ=F", value: "+0.52%", positive: true },
    ],
  },
  {
    slug: "nvidia-biggest-event-what-to-expect",
    image:
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=900&q=80",
    title: "Nvidia's biggest event of the year starts today: What to expect",
    source: "Yippee Finance",
    time: "12h ago",
    tags: [{ symbol: "NVDA", value: "-1.59%", positive: false }],
  },
];

const centerTop = {
  slug: "trump-secure-hormuz",
  image:
    "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=900&q=80",
  title: "Trump demands help from other countries to secure Hormuz",
  source: "Bloomberg",
  time: "6h ago",
  tag: "CL=F +1.67%",
};

const centerList = [
  {
    slug: "gold-wavers-near-5000-mideast-war",
    title: "Gold wavers near $5,000 as Mideast war drives oil rally",
    source: "Bloomberg",
    time: "2h ago",
    tags: [],
  },
  {
    slug: "bitcoin-trapped-iran-war-limbo",
    title: "How bitcoin is trapped in an Iran war limbo",
    source: "Bloomberg",
    time: "4h ago",
    tags: [
      { symbol: "BTC-USD", value: "+1.71%", positive: true },
      { symbol: "GC=F", value: "-1.24%", positive: false },
    ],
  },
  {
    slug: "china-chipmaking-ai-step-forward",
    title: "China chipmaking takes a big AI step forward",
    source: "Reuters",
    time: "4h ago",
    tags: [
      { symbol: "0981.HK", value: "+0.48%", positive: true },
      { symbol: "NVDA", value: "-1.59%", positive: false },
    ],
  },
  {
    slug: "trump-allies-foes-endgame-iran",
    title: "Trump leaves allies and foes guessing on endgame for Iran",
    source: "Bloomberg",
    time: "6h ago",
    tags: [{ symbol: "CL=F", value: "+1.67%", positive: true }],
  },
];

const latest = [
  {
    slug: "us-china-wrap-paris-talks",
    title:
      "US, China seek to wrap Paris talks on managed trade, agriculture deals for Xi-Trump summit",
    source: "Reuters",
    time: "58m ago",
    tags: [
      { symbol: "BA", value: "+2.51%", positive: true },
      { symbol: "NG=F", value: "-0.73%", positive: false },
    ],
  },
  {
    slug: "foxconn-forecasts-strong-revenue-growth",
    title:
      "Taiwan's Foxconn forecasts strong revenue growth even as profit lags forecasts",
    source: "Reuters",
    time: "2h ago",
    tags: [
      { symbol: "6138.SS", value: "+0.40%", positive: true },
      { symbol: "NVDA", value: "-1.59%", positive: false },
    ],
  },
  {
    slug: "yen-safe-haven-aura-fading",
    title: "How the yen's safe haven aura is fading",
    source: "Reuters",
    time: "2h ago",
    tags: [
      { symbol: "JPY=X", value: "-0.22%", positive: false },
      { symbol: "CL=F", value: "+1.67%", positive: true },
    ],
  },
  {
    slug: "gold-war-keeps-oil-prices-elevated",
    title: "Gold Wavers Near $5,000 as Mideast War Keeps Oil Prices Elevated",
    source: "Bloomberg",
    time: "2h ago",
    tags: [],
  },
  {
    slug: "ruthenium-prices-record-ai-supply",
    title: "Ruthenium prices hit record high as AI boom squeezes supply",
    source: "Reuters",
    time: "2h ago",
    tags: [
      { symbol: "PL=F", value: "+0.06%", positive: true },
      { symbol: "JMAT.L", value: "-0.31%", positive: false },
    ],
  },
];
</script>
