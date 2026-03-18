<template>
  <section class="space-y-8">
    <VideoHeroSection :items="heroVideos" />
    <OriginalSection :shows="originalShows" />
    <ListSection :sections="videoSections" />
  </section>
</template>

<script setup>
import VideoHeroSection from "~/components/videos/VideoHeroSection.vue";
import OriginalSection from "~/components/videos/OriginalSection.vue";
import ListSection from "~/components/videos/ListSection.vue";

const videoPool = [
  "/videos/v1.mp4",
  "/videos/v2.mp4",
  "/videos/v3.mp4",
  "/videos/v4.mp4",
];

const heroVideos = [
  {
    id: "hero-1",
    title: "Property Brothers explore the biggest roadblocks in US housing market",
    description:
      "Drew and Jonathan Scott sit down with Yippee Finance to talk about affordability roadblocks that prospective homebuyers must navigate in this market.",
    source: "Yippee Finance Video",
    time: "11h ago",
    duration: "02:44",
    video: videoPool[0],
    tags: [
      { symbol: "XLRE", value: "+0.33%", positive: true },
      { symbol: "XHB", value: "+0.40%", positive: true },
    ],
  },
  {
    id: "hero-2",
    title: "Lululemon beats Q4 earnings, former Levi Strauss CEO joins board",
    description:
      "Lululemon reports strong quarterly earnings while leadership changes give investors new long-term signals.",
    source: "Yippee Finance Video",
    time: "5h ago",
    duration: "02:10",
    video: videoPool[1],
    tags: [{ symbol: "LULU", value: "+1.24%", positive: true }],
  },
  {
    id: "hero-3",
    title: "Nvidia goes all in on AI vision at GTC: Takeaways from CEO keynote",
    description:
      "Nvidia's keynote focused on next-gen infrastructure, enterprise demand, and broader AI platform momentum.",
    source: "Yippee Finance Video",
    time: "yesterday",
    duration: "02:38",
    video: videoPool[2],
    tags: [{ symbol: "NVDA", value: "-0.69%", positive: false }],
  },
  {
    id: "hero-4",
    title: "Every joke from Nvidia CEO Jensen Huang's GTC keynote",
    description:
      "Highlights from Jensen Huang's keynote and why the presentation style keeps investors engaged.",
    source: "Yippee Finance Video",
    time: "11h ago",
    duration: "02:57",
    video: videoPool[3],
    tags: [{ symbol: "NVDA", value: "-0.69%", positive: false }],
  },
  {
    id: "hero-5",
    title: "Warner Bros. CEO set to receive big payday from Paramount deal",
    description:
      "Breakdown of media sector deal dynamics and executive compensation implications.",
    source: "Yippee Finance Video",
    time: "5h ago",
    duration: "04:33",
    video: videoPool[0],
    tags: [{ symbol: "WBD", value: "+0.47%", positive: true }],
  },
  {
    id: "hero-6",
    title: "The bark of Meta's potential layoffs are 'worse than the bite'",
    description:
      "Analysts discuss workforce discipline at mega-cap tech and the impact on operating margins.",
    source: "Yippee Finance Video",
    time: "11h ago",
    duration: "02:38",
    video: videoPool[1],
    tags: [{ symbol: "META", value: "+0.62%", positive: true }],
  },
  {
    id: "hero-7",
    title: "Fed decision, inflation data, Micron earnings: What to Watch",
    description:
      "Key macro and earnings catalysts investors are tracking over the next 48 hours.",
    source: "Yippee Finance Video",
    time: "2h ago",
    duration: "01:31",
    video: videoPool[2],
    tags: [{ symbol: "MU", value: "-0.28%", positive: false }],
  },
  {
    id: "hero-8",
    title: "Gecko Robotics wins $71M contract inspecting US Navy ships",
    description:
      "Defense-adjacent automation and industrial AI continue to gain adoption and capital.",
    source: "Yippee Finance Video",
    time: "3h ago",
    duration: "02:04",
    video: videoPool[3],
    tags: [{ symbol: "BA", value: "-0.12%", positive: false }],
  },
  {
    id: "hero-9",
    title: "SEC may propose shake-up to quarterly earnings reports: WSJ",
    description:
      "Potential changes to corporate reporting cycles could reshape guidance and volatility patterns.",
    source: "Yippee Finance Video",
    time: "4h ago",
    duration: "02:13",
    video: videoPool[0],
    tags: [{ symbol: "^GSPC", value: "+0.25%", positive: true }],
  },
];

const originalShows = [
  {
    id: "show-1",
    title: "The Morning Brief",
    schedule: "Daily 9:00 - 10:00 AM ET",
    brand: "Yippee!finance MORNING BRIEF",
    video: videoPool[1],
  },
  {
    id: "show-2",
    title: "Market Catalysts",
    schedule: "Daily 10:00 - 11:00 AM ET",
    brand: "Yippee!finance MARKET CATALYSTS",
    video: videoPool[2],
  },
  {
    id: "show-3",
    title: "Opening Bid",
    schedule: "Weekdays 9:30 AM - 10 AM ET",
    brand: "Yippee!finance OPENING BID",
    video: videoPool[3],
  },
];

const videoSections = [
  {
    id: "editors-picks",
    title: "Editor's Picks",
    items: [
      {
        id: "pick-1",
        title: "Why the Iran war 'delays' Fed rate cuts, but not long-term",
        time: "7h ago",
        duration: "02:18",
        video: videoPool[0],
        tags: [{ symbol: "CL=F", value: "-1.42%", positive: false }],
      },
      {
        id: "pick-2",
        title: "Nvidia GTC: Why Dan Ives says it's impossible not to be bullish",
        time: "11h ago",
        duration: "02:14",
        video: videoPool[1],
        tags: [
          { symbol: "NVDA", value: "-0.69%", positive: false },
          { symbol: "PLTR", value: "+1.55%", positive: true },
        ],
      },
      {
        id: "pick-3",
        title: "Warner Bros. CEO set to receive big payday from Paramount deal",
        time: "5h ago",
        duration: "04:33",
        video: videoPool[2],
        tags: [
          { symbol: "PSKY", value: "-2.84%", positive: false },
          { symbol: "WBD", value: "+0.47%", positive: true },
        ],
      },
      {
        id: "pick-4",
        title: "Oil price spikes expected to have demand repercussions in 2026",
        time: "15h ago",
        duration: "01:14",
        video: videoPool[3],
        tags: [{ symbol: "CL=F", value: "-1.42%", positive: false }],
      },
    ],
  },
  {
    id: "insights",
    title: "Investing & Market Insights",
    items: [
      {
        id: "insight-1",
        title: "Tokenized assets could become opportunity for Circle. Here's how.",
        time: "5h ago",
        duration: "03:26",
        video: videoPool[0],
        tags: [
          { symbol: "CRCL", value: "+5.15%", positive: true },
          { symbol: "USDC-USD", value: "-0.01%", positive: false },
        ],
      },
      {
        id: "insight-2",
        title: "Fed rate cuts 2026: This is the only way 'we get more than 2'",
        time: "8h ago",
        duration: "01:52",
        video: videoPool[1],
        tags: [{ symbol: "CL=F", value: "-1.42%", positive: false }],
      },
      {
        id: "insight-3",
        title: "Risk-on trade, rally fuel, oil and transports: Market Takeaways",
        time: "1d ago",
        duration: "05:00",
        video: videoPool[2],
        tags: [
          { symbol: "DX-Y.NYB", value: "+0.01%", positive: true },
          { symbol: "CL=F", value: "-1.42%", positive: false },
        ],
      },
      {
        id: "insight-4",
        title: "US stocks still in a bull market in spite of Iran shocks: Strategist",
        time: "1d ago",
        duration: "03:00",
        video: videoPool[3],
        tags: [
          { symbol: "^GSPC", value: "+0.25%", positive: true },
          { symbol: "CL=F", value: "-1.42%", positive: false },
        ],
      },
    ],
  },
  {
    id: "tech-news",
    title: "Tech News",
    items: [
      {
        id: "tech-1",
        title: "Gecko Robotics wins $71M contract inspecting US Navy ships",
        time: "3h ago",
        duration: "02:04",
        video: videoPool[0],
        tags: [],
      },
      {
        id: "tech-2",
        title: "Nvidia to power Uber's autonomous fleet in new partnership",
        time: "4h ago",
        duration: "02:17",
        video: videoPool[1],
        tags: [
          { symbol: "UBER", value: "+4.19%", positive: true },
          { symbol: "NVDA", value: "-0.69%", positive: false },
        ],
      },
      {
        id: "tech-3",
        title: "Nvidia GTC: Why Jensen Huang's $1T forecast failed to impress",
        time: "9h ago",
        duration: "01:55",
        video: videoPool[2],
        tags: [
          { symbol: "NVDA", value: "-0.69%", positive: false },
          { symbol: "MSFT", value: "-0.14%", positive: false },
        ],
      },
      {
        id: "tech-4",
        title: "Is there still upside for Microsoft after stock sinks from highs?",
        time: "10h ago",
        duration: "02:09",
        video: videoPool[3],
        tags: [
          { symbol: "MSFT", value: "-0.14%", positive: false },
          { symbol: "^GSPC", value: "+0.25%", positive: true },
        ],
      },
    ],
  },
  {
    id: "ev-autos",
    title: "EV and Autos",
    items: [
      {
        id: "ev-1",
        title: "Bentley considers cutting hundreds of UK jobs: What to know",
        time: "4h ago",
        duration: "01:33",
        video: videoPool[0],
        tags: [
          { symbol: "VOW.DE", value: "+0.67%", positive: true },
          { symbol: "VOW3.DE", value: "+0.64%", positive: true },
        ],
      },
      {
        id: "ev-2",
        title: "How Aptera's solar powered EV could change transportation",
        time: "5d ago",
        duration: "25:35",
        video: videoPool[1],
        tags: [
          { symbol: "CRWD", value: "+2.21%", positive: true },
          { symbol: "F", value: "+1.96%", positive: true },
        ],
      },
      {
        id: "ev-3",
        title: "No dealership needed: How Aptera's EVs are built for self-repair",
        time: "5d ago",
        duration: "02:07",
        video: videoPool[2],
        tags: [{ symbol: "SEV", value: "+4.28%", positive: true }],
      },
      {
        id: "ev-4",
        title: "We test drove the new Corvette. Why it's a bargain at $200K",
        time: "11d ago",
        duration: "02:07",
        video: videoPool[3],
        tags: [{ symbol: "GM", value: "+1.49%", positive: true }],
      },
    ],
  },
  {
    id: "real-estate",
    title: "Real Estate",
    items: [
      {
        id: "estate-1",
        title: "Could mortgage rates rain on the housing market's parade this spring?",
        time: "6h ago",
        duration: "03:31",
        video: videoPool[0],
        tags: [
          { symbol: "XLRE", value: "+0.33%", positive: true },
          { symbol: "XHB", value: "+0.40%", positive: true },
        ],
      },
      {
        id: "estate-2",
        title: "Property Brothers helping US homebuyers 'under pressure' in new market",
        time: "8h ago",
        duration: "10:48",
        video: videoPool[1],
        tags: [{ symbol: "XLRE", value: "+0.33%", positive: true }],
      },
      {
        id: "estate-3",
        title: "Property Brothers explore the biggest roadblocks in US housing market",
        time: "11h ago",
        duration: "04:05",
        video: videoPool[2],
        tags: [
          { symbol: "ITB", value: "-0.45%", positive: false },
          { symbol: "XHB", value: "+0.40%", positive: true },
        ],
      },
      {
        id: "estate-4",
        title: "2026 tax season: Can I write off my rent, new car, or dog?",
        time: "1d ago",
        duration: "07:30",
        video: videoPool[3],
        tags: [{ symbol: "^GSPC", value: "+0.25%", positive: true }],
      },
    ],
  },
];
</script>
