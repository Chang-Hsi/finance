import {
  comparisonBenchmarkSeries,
  comparisonProfileSeries,
  comparisonRangeLabels,
} from "./sectorChartSeries";
import { sectorHeatmapGroups, sectorsData } from "./marketsOverview";

const sectorDescriptions = {
  Technology:
    "Companies engaged in the design, development, and support of computer operating systems and applications. This sector also includes companies that make computer equipment, data storage products, networking products, semiconductors, and components.",
  "Financial Services":
    "Companies in banking, capital markets, insurance, and payment infrastructure. This sector includes firms that provide financial intermediation, credit services, custody, asset management, and market data.",
  "Consumer Cyclical":
    "Companies tied to discretionary spending, including autos, travel, retail, restaurants, and home improvement. Performance often moves with consumer confidence and economic expansion.",
  "Communication Services":
    "Companies focused on digital platforms, entertainment, telecom, and media distribution. This sector spans internet content, advertising, interactive media, and wireless services.",
  Healthcare:
    "Companies involved in pharmaceuticals, biotechnology, medical devices, healthcare plans, and diagnostics. The group is shaped by innovation pipelines, reimbursement trends, and demographic demand.",
  Industrials:
    "Companies that build, transport, or support the physical economy. This sector includes aerospace, machinery, logistics, railroads, and industrial equipment manufacturers.",
  "Consumer Defensive":
    "Companies that sell essential household and staple products such as beverages, packaged foods, tobacco, and discount retail. Demand tends to remain more resilient across economic cycles.",
  Energy:
    "Companies involved in oil, gas, and energy infrastructure. This sector includes integrated producers, exploration firms, midstream operators, and oilfield services providers.",
  "Basic Materials":
    "Companies producing chemicals, metals, paper, and construction materials. Returns often respond to commodity prices, industrial activity, and global demand for raw inputs.",
  Utilities:
    "Companies providing regulated and diversified utility services, including electricity, natural gas, renewable power, and grid infrastructure. Cash flow tends to be steadier than cyclical sectors.",
  "Real Estate":
    "Companies engaged in commercial, industrial, residential, and specialty property ownership and services. This sector includes REITs and related operators across multiple property categories.",
};

const sectorMeta = {
  Technology: { marketCapTrillions: 22.543, companies: 826 },
  "Financial Services": { marketCapTrillions: 10.814, companies: 612 },
  "Consumer Cyclical": { marketCapTrillions: 8.237, companies: 489 },
  "Communication Services": { marketCapTrillions: 7.964, companies: 271 },
  Healthcare: { marketCapTrillions: 7.105, companies: 702 },
  Industrials: { marketCapTrillions: 6.248, companies: 594 },
  "Consumer Defensive": { marketCapTrillions: 3.722, companies: 244 },
  Energy: { marketCapTrillions: 3.114, companies: 156 },
  "Basic Materials": { marketCapTrillions: 2.531, companies: 211 },
  Utilities: { marketCapTrillions: 1.894, companies: 118 },
  "Real Estate": { marketCapTrillions: 1.706, companies: 183 },
};

const companyCatalog = {
  Technology: [
    { symbol: "NVDA", name: "NVIDIA Corporation", industry: "Semiconductors" },
    { symbol: "AAPL", name: "Apple Inc.", industry: "Consumer Electronics" },
    { symbol: "MSFT", name: "Microsoft Corporation", industry: "Software - Infrastructure" },
    { symbol: "AVGO", name: "Broadcom Inc.", industry: "Semico..." },
    { symbol: "MU", name: "Micron Technology, Inc.", industry: "Semiconductors" },
    { symbol: "ORCL", name: "Oracle Corporation", industry: "Software - Application" },
    { symbol: "PLTR", name: "Palantir Technologies Inc.", industry: "Software - Application" },
    { symbol: "AMD", name: "Advanced Micro Devices, Inc.", industry: "Semiconductors" },
    { symbol: "CSCO", name: "Cisco Systems, Inc.", industry: "Communication Equipment" },
    { symbol: "LRCX", name: "Lam Research Corporation", industry: "Semico..." },
  ],
  "Financial Services": [
    { symbol: "JPM", name: "JPMorgan Chase & Co.", industry: "Banks - Diversified" },
    { symbol: "V", name: "Visa Inc.", industry: "Credit Services" },
    { symbol: "MA", name: "Mastercard Incorporated", industry: "Credit Services" },
    { symbol: "BAC", name: "Bank of America Corporation", industry: "Banks - Diversified" },
    { symbol: "GS", name: "Goldman Sachs Group, Inc.", industry: "Capital Markets" },
    { symbol: "SPGI", name: "S&P Global Inc.", industry: "Financial Data" },
  ],
  "Consumer Cyclical": [
    { symbol: "AMZN", name: "Amazon.com, Inc.", industry: "Internet Retail" },
    { symbol: "TSLA", name: "Tesla, Inc.", industry: "Auto Manufacturers" },
    { symbol: "HD", name: "Home Depot, Inc.", industry: "Home Improvement" },
    { symbol: "MCD", name: "McDonald's Corporation", industry: "Restaurants" },
    { symbol: "BKNG", name: "Booking Holdings Inc.", industry: "Travel Services" },
    { symbol: "NKE", name: "NIKE, Inc.", industry: "Footwear & Accessories" },
  ],
  "Communication Services": [
    { symbol: "GOOG", name: "Alphabet Inc.", industry: "Internet Content" },
    { symbol: "META", name: "Meta Platforms, Inc.", industry: "Internet Content" },
    { symbol: "NFLX", name: "Netflix, Inc.", industry: "Entertainment" },
    { symbol: "TMUS", name: "T-Mobile US, Inc.", industry: "Telecom Services" },
    { symbol: "DIS", name: "Walt Disney Company", industry: "Entertainment" },
    { symbol: "TTD", name: "Trade Desk, Inc.", industry: "Advertising Agencies" },
  ],
  Healthcare: [
    { symbol: "LLY", name: "Eli Lilly and Company", industry: "Drug Manufacturers" },
    { symbol: "UNH", name: "UnitedHealth Group Inc.", industry: "Healthcare Plans" },
    { symbol: "JNJ", name: "Johnson & Johnson", industry: "Drug Manufacturers" },
    { symbol: "ISRG", name: "Intuitive Surgical, Inc.", industry: "Medical Devices" },
    { symbol: "MRK", name: "Merck & Co., Inc.", industry: "Drug Manufacturers" },
    { symbol: "REGN", name: "Regeneron Pharmaceuticals", industry: "Biotechnology" },
  ],
  Industrials: [
    { symbol: "GE", name: "GE Aerospace", industry: "Aerospace & Defense" },
    { symbol: "RTX", name: "RTX Corporation", industry: "Aerospace & Defense" },
    { symbol: "CAT", name: "Caterpillar Inc.", industry: "Farm & Heavy" },
    { symbol: "UNP", name: "Union Pacific Corporation", industry: "Railroads" },
    { symbol: "DE", name: "Deere & Company", industry: "Farm & Heavy" },
    { symbol: "UPS", name: "United Parcel Service, Inc.", industry: "Integrated Freight" },
  ],
  "Consumer Defensive": [
    { symbol: "WMT", name: "Walmart Inc.", industry: "Discount Stores" },
    { symbol: "COST", name: "Costco Wholesale Corporation", industry: "Discount Stores" },
    { symbol: "PG", name: "Procter & Gamble Company", industry: "Household Products" },
    { symbol: "KO", name: "Coca-Cola Company", industry: "Beverages - Non-Alcoholic" },
    { symbol: "PEP", name: "PepsiCo, Inc.", industry: "Beverages - Non-Alcoholic" },
    { symbol: "PM", name: "Philip Morris International", industry: "Tobacco" },
  ],
  Energy: [
    { symbol: "XOM", name: "Exxon Mobil Corporation", industry: "Oil & Gas Integrated" },
    { symbol: "CVX", name: "Chevron Corporation", industry: "Oil & Gas Integrated" },
    { symbol: "COP", name: "ConocoPhillips", industry: "Oil & Gas E&P" },
    { symbol: "SLB", name: "Schlumberger N.V.", industry: "Oil Equipment" },
    { symbol: "KMI", name: "Kinder Morgan, Inc.", industry: "Oil & Gas Midstream" },
    { symbol: "EOG", name: "EOG Resources, Inc.", industry: "Oil & Gas E&P" },
  ],
  "Basic Materials": [
    { symbol: "LIN", name: "Linde plc", industry: "Specialty Chemicals" },
    { symbol: "SHW", name: "Sherwin-Williams Company", industry: "Specialty Chemicals" },
    { symbol: "APD", name: "Air Products and Chemicals", industry: "Specialty Chemicals" },
    { symbol: "NEM", name: "Newmont Corporation", industry: "Gold" },
    { symbol: "FCX", name: "Freeport-McMoRan Inc.", industry: "Copper" },
    { symbol: "NUE", name: "Nucor Corporation", industry: "Steel" },
  ],
  Utilities: [
    { symbol: "NEE", name: "NextEra Energy, Inc.", industry: "Utilities - Renewable" },
    { symbol: "SO", name: "Southern Company", industry: "Utilities - Regulated Electric" },
    { symbol: "DUK", name: "Duke Energy Corporation", industry: "Utilities - Regulated Electric" },
    { symbol: "AEP", name: "American Electric Power", industry: "Utilities - Regulated Electric" },
    { symbol: "SRE", name: "Sempra", industry: "Utilities - Diversified" },
    { symbol: "CEG", name: "Constellation Energy", industry: "Utilities - Independent Power" },
  ],
  "Real Estate": [
    { symbol: "AMT", name: "American Tower Corporation", industry: "REIT - Telecom" },
    { symbol: "PLD", name: "Prologis, Inc.", industry: "REIT - Industrial" },
    { symbol: "EQIX", name: "Equinix, Inc.", industry: "REIT - Specialty" },
    { symbol: "O", name: "Realty Income Corporation", industry: "REIT - Retail" },
    { symbol: "PSA", name: "Public Storage", industry: "REIT - Self Storage" },
    { symbol: "SPG", name: "Simon Property Group, Inc.", industry: "REIT - Retail" },
  ],
};

const companyWeightTemplates = [20.35, 16.97, 13.58, 7.04, 2.27, 2.05, 1.67, 1.46, 1.42, 1.26];
const ratingTemplates = [
  "STRONG BUY",
  "BUY",
  "STRONG BUY",
  "STRONG BUY",
  "BUY",
  "BUY",
  "BUY",
  "BUY",
  "BUY",
  "BUY",
];

const hashString = (value) =>
  [...value].reduce((total, char, index) => total + char.charCodeAt(0) * (index + 1), 0);

const formatSignedPercent = (value) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;

const formatTrillions = (value) => {
  if (value >= 1) {
    return `${value.toFixed(3)}T`;
  }

  return `${(value * 1000).toFixed(3)}B`;
};

const sectorProfileMap = {
  Technology: "growth",
  "Communication Services": "growth",
  "Financial Services": "financial",
  "Consumer Cyclical": "cyclical",
  Industrials: "cyclical",
  "Basic Materials": "cyclical",
  Healthcare: "defensive",
  "Consumer Defensive": "defensive",
  Utilities: "defensive",
  Energy: "energy",
  "Real Estate": "rateSensitive",
};

const buildComparisonSeries = (sectorName) => {
  const profile = sectorProfileMap[sectorName] || "growth";

  return Object.keys(comparisonRangeLabels).reduce((result, range) => {
    result[range] = {
      labels: comparisonRangeLabels[range],
      sectorSeries: comparisonProfileSeries[profile][range],
      benchmarkSeries: comparisonBenchmarkSeries[range],
    };

    return result;
  }, {});
};

const buildPerformanceCards = (sectorRow) => {
  const ytd = Number.parseFloat(String(sectorRow.ytdReturn).replace("%", ""));

  return [
    {
      title: "Day Return",
      sector: formatSignedPercent(sectorRow.dayReturn),
      benchmark: formatSignedPercent(1.01),
    },
    {
      title: "YTD Return",
      sector: sectorRow.ytdReturn,
      benchmark: formatSignedPercent(ytd + 0.41),
    },
    {
      title: "1-Year Return",
      sector: formatSignedPercent(ytd * -8.24),
      benchmark: formatSignedPercent(18.81),
    },
    {
      title: "3-Year Return",
      sector: formatSignedPercent(95 + sectorRow.weight * 0.46),
      benchmark: formatSignedPercent(72.14),
    },
    {
      title: "5-Year Return",
      sector: formatSignedPercent(82 + sectorRow.weight * 0.98),
      benchmark: formatSignedPercent(68.58),
    },
  ];
};

const buildIndustryRows = (sectorName, sectorRow) => {
  const industries = sectorHeatmapGroups[sectorName] || [];

  return [
    {
      name: "All Industries",
      marketWeight: 100,
      ytdReturn: sectorRow.ytdReturn,
      dayReturn: sectorRow.dayReturn,
    },
    ...industries.map((item, index) => {
      const ytdValue = item.dayReturn * (index % 2 === 0 ? 2.15 : -6.25);

      return {
        name: item.name,
        marketWeight: Number(((item.value / sectorRow.weight) * 100).toFixed(2)),
        ytdReturn: formatSignedPercent(ytdValue),
        dayReturn: item.dayReturn,
      };
    }),
  ];
};

const buildCompanyRows = (sectorName, industryRows) => {
  const companies = companyCatalog[sectorName] || [];
  const marketCapTrillions = sectorMeta[sectorName]?.marketCapTrillions || 1;
  const industryMap = Object.fromEntries(
    industryRows.filter((row) => row.name !== "All Industries").map((row) => [row.name, row])
  );

  return companies.map((company, index) => {
    const weight = companyWeightTemplates[index] || Math.max(0.7, 1.15 - index * 0.07);
    const industry = industryMap[company.industry];
    const basePrice = 40 + ((hashString(company.symbol) + index * 17) % 420);
    const dayChange = industry ? industry.dayReturn + (index % 3) * 0.42 : 0.84;
    const ytdBase = industry
      ? Number.parseFloat(String(industry.ytdReturn).replace("%", ""))
      : 4.5 - index * 1.4;

    return {
      ...company,
      lastPrice: basePrice.toFixed(2),
      targetPrice: (basePrice * (1.12 + (index % 4) * 0.06)).toFixed(2),
      marketWeight: `${weight.toFixed(2)}%`,
      marketWeightValue: weight,
      marketCap: formatTrillions((marketCapTrillions * weight) / 100),
      dayChangePercent: formatSignedPercent(dayChange),
      dayChangeValue: Number(dayChange.toFixed(2)),
      ytdReturn: formatSignedPercent(ytdBase),
      rating: ratingTemplates[index] || "BUY",
    };
  });
};

export const sectorNames = sectorsData
  .filter((item) => item.name !== "All Sectors")
  .map((item) => item.name);

export const getSectorPageData = (sectorName) => {
  const sectorRow = sectorsData.find((item) => item.name === sectorName) || sectorsData[1];
  const name = sectorRow.name;
  const industries = buildIndustryRows(name, sectorRow);
  const companies = buildCompanyRows(name, industries);
  const metric = sectorMeta[name];

  return {
    name,
    description: sectorDescriptions[name],
    stats: {
      marketCap: `${metric.marketCapTrillions.toFixed(3)}T`,
      marketWeight: `${sectorRow.weight.toFixed(2)}%`,
      industries: industries.length - 1,
      companies: metric.companies,
    },
    chartRanges: buildComparisonSeries(name),
    performanceCards: buildPerformanceCards(sectorRow),
    industryRows: industries,
    companyRows: companies,
    benchmark: {
      label: "S&P 500",
      symbol: "^GSPC",
    },
  };
};
