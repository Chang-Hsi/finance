<template>
  <article class="mx-auto w-full max-w-3xl pb-8">
    <h1 class="mb-4 text-xl font-extrabold leading-tight text-[#232d39]">
      {{ article.title }}
    </h1>

    <div ref="heroMediaRef" class="overflow-hidden rounded-md">
      <video
        ref="mainVideoRef"
        :src="article.videoSrc"
        class="h-[420px] w-full bg-black object-cover"
        autoplay
        muted
        controls
        playsinline
        preload="auto"
        @timeupdate="syncFloatingVideo"
      />
    </div>

    <div class="mt-4 border-y border-[#d7dce2] py-3">
      <div class="flex items-center justify-between gap-4">
        <div class="flex min-w-0 items-center gap-3">
          <img
            :src="article.author.avatar"
            alt="author"
            class="h-10 w-10 rounded-full object-cover"
          />
          <div class="min-w-0">
            <p class="text-lg font-bold text-[#232d39]">
              {{ article.author.name }} ・ {{ article.author.role }}
            </p>
            <p class="text-sm text-[#5f6976]">{{ article.author.meta }}</p>
          </div>
        </div>
        <v-btn icon variant="text">
          <v-icon icon="mdi-share-variant-outline" />
        </v-btn>
      </div>
    </div>

    <section class="mt-5">
      <p class="mb-3 text-base font-semibold text-[#232d39]">In this article:</p>
      <v-chip size="small" variant="outlined" class="!text-sm">
        <span :class="article.articleTag.positive ? 'text-[#0a8f69]' : 'text-[#cc2f2f]'">
          {{ article.articleTag.text }}
        </span>
      </v-chip>
    </section>

    <section class="mt-6 space-y-5 text-xl leading-relaxed text-[#2d3743]">
      <p v-for="paragraph in article.introParagraphs" :key="paragraph">
        {{ paragraph }}
      </p>
    </section>

    <section class="mt-6 border-l-2 border-[#1ba59f] pl-3">
      <div class="mb-2 flex items-center justify-between">
        <p class="text-lg font-bold text-[#232d39]">More from Yippee Scout</p>
        <div class="flex items-center gap-1">
          <v-btn icon size="small" variant="text">
            <v-icon icon="mdi-chevron-left" />
          </v-btn>
          <v-btn icon size="small" variant="text">
            <v-icon icon="mdi-chevron-right" />
          </v-btn>
        </div>
      </div>
      <div class="flex gap-2 overflow-x-auto">
        <v-chip
          v-for="question in article.scoutQuestions"
          :key="question"
          size="small"
          variant="outlined"
          class="!text-sm"
        >
          {{ question }}
        </v-chip>
      </div>
    </section>

    <section class="mt-6 space-y-5 text-xl leading-relaxed text-[#2d3743]">
      <p class="italic">
        Read more:
        <a href="#" class="text-[#1b5fd0]">{{ article.readMoreTop }}</a>
      </p>
      <p>{{ article.midParagraph }}</p>
    </section>

    <figure class="mt-6">
      <img
        :src="article.inlineImage.src"
        :alt="article.inlineImage.alt"
        class="h-[430px] w-full rounded-md object-cover"
      />
      <figcaption class="mt-2 text-sm text-[#4f5966]">
        {{ article.inlineImage.caption }}
      </figcaption>
    </figure>

    <section class="mt-6 space-y-5 text-xl leading-relaxed text-[#2d3743]">
      <p v-for="paragraph in article.afterImageParagraphs" :key="paragraph">
        {{ paragraph }}
      </p>
      <p class="italic">
        Read more:
        <a href="#" class="text-[#1b5fd0]">{{ article.readMoreBottom }}</a>
      </p>
      <p v-for="paragraph in article.closingParagraphs" :key="paragraph">
        {{ paragraph }}
      </p>
      <p class="italic">
        {{ article.authorBio.prefix }}
        <a href="#" class="text-[#1b5fd0]">{{ article.authorBio.x }}</a>
        {{ article.authorBio.middle }}
        <a href="#" class="text-[#1b5fd0]">{{ article.authorBio.instagram }}</a>
        .
      </p>
    </section>

    <section class="mt-7 space-y-5 border-b border-[#d7dce2] pb-8">
      <a href="#" class="block text-xl font-bold text-[#1b5fd0]">{{
        article.ctaLinks[0]
      }}</a>
      <a href="#" class="block text-xl font-bold text-[#1b5fd0]">{{
        article.ctaLinks[1]
      }}</a>
      <div class="flex flex-wrap gap-6 text-sm text-[#4f5966]">
        <span>Terms and Privacy Policy</span>
        <span>Privacy Dashboard</span>
      </div>
    </section>
  </article>

  <Teleport to="body">
    <transition name="fade-float">
      <div
        v-if="showFloatingVideo && !dismissFloatingVideo"
        class="fixed bottom-4 right-4 z-[9999] w-[360px] overflow-hidden rounded-md border border-[#49515e] bg-[#111827] shadow-2xl"
      >
        <div class="flex justify-end bg-[#1f2937] px-1 py-1">
          <v-btn icon size="x-small" variant="text" @click="dismissFloating">
            <v-icon icon="mdi-close" color="white" />
          </v-btn>
        </div>
        <video
          ref="floatingVideoRef"
          :src="article.videoSrc"
          class="h-[190px] w-full bg-black object-cover"
          muted
          controls
          playsinline
          preload="auto"
        />
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
const route = useRoute();
const heroMediaRef = ref(null);
const mainVideoRef = ref(null);
const floatingVideoRef = ref(null);
const showFloatingVideo = ref(false);
const dismissFloatingVideo = ref(false);
let scrollHandler = null;
let resizeHandler = null;

const articles = {
  v1: {
    title:
      "Oil price spike likely to keep rates on hold but deepen divisions among Fed officials this week",
    videoSrc: "/videos/v1.mp4",
    author: {
      name: "Jennifer Schonberger",
      role: "Senior Reporter",
      meta: "Mon, March 16, 2026 at 5:00 PM GMT+8 ・ 6 min read",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    },
    articleTag: { text: "CL=F +0.47%", positive: true },
    introParagraphs: [
      "As Federal Reserve officials gather for their two-day policy meeting this week, the oil shock from the Iran war could deepen divisions with the central bank over the path forward on interest rates.",
      "“I would love to see them quit focusing on when they can resume rate cuts because the path of inflation and other things to me were already uncertain,” former Kansas City Fed president Esther George said in an interview.",
    ],
    scoutQuestions: [
      "Why are Fed officials divided on monetary policy direction?",
      "What inflation risks does oil price shock present?",
      "How could the Iran war shift Fed interest rate decisions?",
    ],
    readMoreTop:
      "How the Fed rate decision affects your bank accounts, loans, credit cards, and investments",
    midParagraph:
      "“Now is not the time to try to tease out where they think the economy is because you've got a lot going on in this economy that could go a lot of different directions.”",
    inlineImage: {
      src:
        "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1600&q=80",
      alt: "fed",
      caption:
        "Federal Reserve Chair Jerome Powell speaks during a press conference following the Federal Open Markets Committee meeting at the Federal Reserve.",
    },
    afterImageParagraphs: [
      "Now the picture is changing and will be defined largely by how long the war in Iran lasts and how long high oil prices linger.",
    ],
    readMoreBottom:
      "How oil price shocks ripple through your wallet, from gas to groceries",
    closingParagraphs: [
      "Tilley says he believes the job market has stagnated, not stabilized. He’s forecasting three rate cuts this year because he believes the job market is weak.",
      "“I don't think they feel good about either side of their mandate right now, even though the unemployment rate is low,” she said.",
    ],
    authorBio: {
      prefix:
        "Jennifer Schonberger is a veteran financial journalist covering markets, the economy, and investing. Follow her on X ",
      x: "@jenniferisms",
      middle: " and on ",
      instagram: "Instagram",
    },
    ctaLinks: [
      "Click here for the latest economic news and indicators to help inform your investing decisions",
      "Read the latest financial and business news from Yippee Finance",
    ],
  },
  v2: {
    title:
      "Tax season deadlines are approaching fast. Here are the key dates taxpayers should track this month",
    videoSrc: "/videos/v2.mp4",
    author: {
      name: "Myles Udland",
      role: "Reporter",
      meta: "Tue, March 17, 2026 at 8:20 AM GMT+8 ・ 5 min read",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    },
    articleTag: { text: "INTU +1.12%", positive: true },
    introParagraphs: [
      "US taxpayers are entering one of the busiest filing windows of the year as key deadlines for extensions, estimated payments, and refunds come into focus.",
      "Financial advisors say households that wait until the final week often miss deductions tied to retirement, education, and health savings accounts.",
    ],
    scoutQuestions: [
      "What if you miss the filing deadline?",
      "When should estimated taxes be paid?",
      "How can taxpayers speed up refunds?",
    ],
    readMoreTop: "What filers should know about extension requests and late penalties",
    midParagraph:
      "“The most common mistake we see is waiting too long to gather documents,” said one CPA. “That creates rushed filings and avoidable errors.”",
    inlineImage: {
      src:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
      alt: "tax filing",
      caption:
        "Tax forms are seen on a desk as filing season picks up across the United States.",
    },
    afterImageParagraphs: [
      "Households with side income should double-check withholding and estimated quarterly payments, especially if income rose from freelance or gig work.",
    ],
    readMoreBottom: "How to avoid common mistakes when filing this year",
    closingParagraphs: [
      "Many preparers also recommend e-filing with direct deposit to reduce processing delays and lower the chance of return errors.",
      "Tax experts add that early preparation next season can reduce stress and improve refund outcomes.",
    ],
    authorBio: {
      prefix:
        "Myles Udland covers US macro policy and household finance trends. Follow him on X ",
      x: "@mylesudland",
      middle: " and on ",
      instagram: "Instagram",
    },
    ctaLinks: [
      "Click here for more tax tools and personal finance explainers",
      "Read the latest personal finance and economy updates from Yippee Finance",
    ],
  },
  v3: {
    title:
      "What $150-per-barrel oil could mean for gas prices, inflation, and consumer spending in 2026",
    videoSrc: "/videos/v3.mp4",
    author: {
      name: "Jared Blikre",
      role: "Markets Reporter",
      meta: "Wed, March 18, 2026 at 10:05 PM GMT+8 ・ 7 min read",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    },
    articleTag: { text: "USO +2.31%", positive: true },
    introParagraphs: [
      "A prolonged move toward $150 oil would likely push US gasoline prices sharply higher and add fresh pressure to headline inflation this quarter.",
      "Strategists say consumer categories such as travel, restaurants, and discretionary retail could feel the impact first.",
    ],
    scoutQuestions: [
      "Which sectors benefit most from high oil?",
      "How quickly do pump prices react?",
      "Could higher energy costs delay Fed cuts?",
    ],
    readMoreTop: "How energy prices feed into CPI and household budgets",
    midParagraph:
      "“Energy shocks hit confidence and purchasing power at the same time,” one strategist said. “That combination tends to slow demand quickly.”",
    inlineImage: {
      src:
        "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=1600&q=80",
      alt: "gas prices",
      caption: "Fuel prices displayed at a gas station as crude markets remain volatile.",
    },
    afterImageParagraphs: [
      "Transportation-heavy businesses may pass through costs in stages, but households often feel the effect immediately at the pump.",
    ],
    readMoreBottom: "How rising oil can reshape portfolio positioning",
    closingParagraphs: [
      "Analysts caution that if wages do not keep pace with energy inflation, spending momentum could weaken in the second half of the year.",
      "For investors, the key question is whether high prices are temporary or part of a sustained supply shock.",
    ],
    authorBio: {
      prefix:
        "Jared Blikre reports on cross-asset market moves and macro themes. Follow him on X ",
      x: "@jaredblikre",
      middle: " and on ",
      instagram: "Instagram",
    },
    ctaLinks: [
      "Click here for the latest energy market dashboards and analysis",
      "Read the latest investing and business news from Yippee Finance",
    ],
  },
  v4: {
    title:
      "Strait of Hormuz risk is rising. Here's why global markets are watching the shipping corridor closely",
    videoSrc: "/videos/v4.mp4",
    author: {
      name: "Akiko Fujita",
      role: "Anchor",
      meta: "Thu, March 19, 2026 at 9:40 PM GMT+8 ・ 6 min read",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    },
    articleTag: { text: "XLE +1.05%", positive: true },
    introParagraphs: [
      "Escalating tension around the Strait of Hormuz is reviving concerns about shipping disruption in one of the world’s most critical energy chokepoints.",
      "Market participants say even short-lived interruptions could trigger sharp moves across oil, freight rates, and global equities.",
    ],
    scoutQuestions: [
      "How much global oil passes through Hormuz?",
      "Which assets react first to disruption?",
      "Could insurers raise shipping premiums?",
    ],
    readMoreTop: "What historical Hormuz disruptions can tell investors now",
    midParagraph:
      "“This is a route where headlines can move prices in minutes,” one geopolitical analyst said. “The risk premium can return very quickly.”",
    inlineImage: {
      src:
        "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1600&q=80",
      alt: "cargo route",
      caption:
        "Cargo traffic and marine routes in the Gulf region remain under close watch.",
    },
    afterImageParagraphs: [
      "Shipping and logistics operators are preparing contingency plans, while importers evaluate alternate routes and inventory buffers.",
    ],
    readMoreBottom: "How geopolitical risk premiums can spread across asset classes",
    closingParagraphs: [
      "If tensions remain elevated, economists expect energy-sensitive regions to face renewed inflation pressure and slower growth.",
      "Investors are monitoring whether policy makers treat the shock as temporary volatility or a broader structural threat.",
    ],
    authorBio: {
      prefix:
        "Akiko Fujita hosts Yippee Finance coverage on geopolitics and global markets. Follow her on X ",
      x: "@AkikoFujita",
      middle: " and on ",
      instagram: "Instagram",
    },
    ctaLinks: [
      "Click here for the latest geopolitical market updates and indicators",
      "Read the latest world economy and financial news from Yippee Finance",
    ],
  },
};

const articleSlugAlias = {
  "straw-that-stirs-the-drink-oil-impact": "v1",
  "us-stock-futures-climb-oil-rises": "v1",
  "nvidia-biggest-event-what-to-expect": "v1",
  "trump-secure-hormuz": "v4",
  "gold-wavers-near-5000-mideast-war": "v1",
  "bitcoin-trapped-iran-war-limbo": "v4",
  "china-chipmaking-ai-step-forward": "v3",
  "trump-allies-foes-endgame-iran": "v4",
  "us-china-wrap-paris-talks": "v4",
  "foxconn-forecasts-strong-revenue-growth": "v3",
  "yen-safe-haven-aura-fading": "v3",
  "gold-war-keeps-oil-prices-elevated": "v1",
  "ruthenium-prices-record-ai-supply": "v3",
  "millionaires-in-america-seven-figure-net-worth": "v2",
  "greg-abel-buffett-favorite-stock": "v2",
  "looking-like-1973-again-what-it-means": "v3",
  "spousal-social-security-benefit-rule": "v2",
  "will-tesla-release-optimus": "v4",
};

const resolvedKey = computed(() => {
  const slug = String(route.params.slug || "");
  if (slug in articles) {
    return slug;
  }
  return articleSlugAlias[slug] || "v1";
});

const article = computed(() => articles[resolvedKey.value]);

const syncFloatingVideo = () => {
  const main = mainVideoRef.value;
  const floating = floatingVideoRef.value;
  if (!main || !floating || !showFloatingVideo.value || dismissFloatingVideo.value) {
    console.log("[NewsFloating] sync skipped", {
      hasMain: Boolean(main),
      hasFloating: Boolean(floating),
      showFloating: showFloatingVideo.value,
      dismissed: dismissFloatingVideo.value,
    });
    return;
  }
  const timeDiff = Math.abs((floating.currentTime || 0) - (main.currentTime || 0));
  console.log("[NewsFloating] sync tick", {
    mainTime: main.currentTime,
    floatingTime: floating.currentTime,
    timeDiff,
  });
  if (timeDiff > 0.7) {
    floating.currentTime = main.currentTime;
    console.log("[NewsFloating] floating currentTime adjusted", floating.currentTime);
  }
  if (floating.paused) {
    console.log("[NewsFloating] floating play()");
    floating.play().catch(() => {});
  }
};

const updateFloatingVisibility = () => {
  if (dismissFloatingVideo.value || !heroMediaRef.value) {
    console.log("[NewsFloating] visibility skipped", {
      dismissed: dismissFloatingVideo.value,
      hasHeroMedia: Boolean(heroMediaRef.value),
    });
    showFloatingVideo.value = false;
    return;
  }

  const rect = heroMediaRef.value.getBoundingClientRect();
  const headerOffset = 120;
  const outOfView = rect.bottom <= headerOffset || rect.top >= window.innerHeight;
  console.log("[NewsFloating] visibility check", {
    rectTop: rect.top,
    rectBottom: rect.bottom,
    viewportHeight: window.innerHeight,
    headerOffset,
    outOfView,
    previousShow: showFloatingVideo.value,
  });
  showFloatingVideo.value = outOfView;

  if (outOfView) {
    console.log("[NewsFloating] show floating video");
    nextTick(() => {
      syncFloatingVideo();
    });
  } else if (floatingVideoRef.value) {
    console.log("[NewsFloating] hide floating video and pause");
    floatingVideoRef.value.pause();
  }
};

const dismissFloating = () => {
  console.log("[NewsFloating] dismiss clicked");
  dismissFloatingVideo.value = true;
  showFloatingVideo.value = false;
  if (floatingVideoRef.value) {
    floatingVideoRef.value.pause();
  }
};

watch(
  () => resolvedKey.value,
  async () => {
    console.log("[NewsFloating] article changed", {
      slug: route.params.slug,
      resolvedKey: resolvedKey.value,
    });
    dismissFloatingVideo.value = false;
    showFloatingVideo.value = false;
    await nextTick();
    if (mainVideoRef.value) {
      mainVideoRef.value.currentTime = 0;
      console.log("[NewsFloating] main video reset and play");
      mainVideoRef.value.play().catch(() => {});
    }
    updateFloatingVisibility();
  }
);

onMounted(() => {
  console.log("[NewsFloating] mounted");
  if (mainVideoRef.value) {
    console.log("[NewsFloating] main play() on mount");
    mainVideoRef.value.play().catch(() => {});
  }

  scrollHandler = () => {
    console.log("[NewsFloating] window scroll");
    updateFloatingVisibility();
  };
  resizeHandler = () => {
    console.log("[NewsFloating] window resize");
    updateFloatingVisibility();
  };
  window.addEventListener("scroll", scrollHandler, { passive: true });
  window.addEventListener("resize", resizeHandler, { passive: true });
  updateFloatingVisibility();
});

onBeforeUnmount(() => {
  console.log("[NewsFloating] before unmount");
  if (scrollHandler) {
    window.removeEventListener("scroll", scrollHandler);
  }
  if (resizeHandler) {
    window.removeEventListener("resize", resizeHandler);
  }
});
</script>

<style scoped>
.fade-float-enter-active,
.fade-float-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-float-enter-from,
.fade-float-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
