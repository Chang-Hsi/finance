<template>
  <section class="border-t-2 border-t-[#068c7f]">
    <div class="mx-auto max-w-3xl px-4 pb-12 pt-10 md:pt-12">
      <div class="mx-auto text-center">
        <h1
          class="text-3xl font-extrabold leading-tight tracking-tight text-[#232d39] md:text-[60px]"
        >
          One place for your portfolios,
          <br class="hidden md:block" />
          metrics and more
        </h1>

        <p class="mx-auto mt-5 text-base leading-8 text-[#5f6976]">
          Gain insights, see trends and get real-time updates when you securely link or
          manually add your brokerage accounts.
        </p>

        <p class="mt-4 text-base text-[#5f6976]">
          Yippee does not store your broker credentials.
          <a href="#" class="font-semibold text-[#1b5fd0]">Learn more</a>
        </p>

        <v-btn
          rounded="pill"
          color="#232a33"
          class="mt-7 !h-[46px] !text-base !font-bold !normal-case text-white"
          style="padding-left: 22px; padding-right: 22px"
        >
          Sign in to get started
        </v-btn>
      </div>

      <div class="relative mx-auto mt-12 max-w-[1050px] md:mt-16">
        <div class="mx-auto max-w-[620px] p-2 md:max-w-[660px]">
          <div class="relative overflow-hidden shadow-[0_20px_50px_rgba(31,39,50,0.12)]">
            <img :src="top" alt="portfolio top" class="block w-full" />
            <img
              :src="middle"
              alt="portfolio middle"
              class="absolute inset-x-0 mx-auto"
              :style="{ top: `${middleImageOffset}px`, width: '90%' }"
            />
            <img
              :src="button"
              alt="portfolio widgets"
              class="absolute inset-x-0 mx-auto"
              :style="{ top: `${buttonImageOffset}px`, width: '120%' }"
            />
          </div>
        </div>

        <v-card
          flat
          class="portfolio-note portfolio-note-left border border-[#e6eaf0] bg-white p-5 shadow-[0_12px_30px_rgba(31,39,50,0.12)]"
        >
          <p class="text-xs leading-8 text-[#3f4957]">
            An easy-to-read view showing
            <span class="font-bold text-[#232d39]">your portfolio performance</span>
          </p>
        </v-card>

        <v-card
          flat
          class="portfolio-note portfolio-note-right border border-[#e6eaf0] bg-white p-5 shadow-[0_12px_30px_rgba(31,39,50,0.12)]"
        >
          <p class="text-xs leading-8 text-[#3f4957]">
            <span class="font-bold text-[#232d39]">Portfolio and Holdings List</span>
            gives you quick overviews and comparisons to analyze multiple investments with
            ease.
          </p>
        </v-card>

        <v-card
          flat
          class="portfolio-note portfolio-note-bottom-left border border-[#e6eaf0] bg-white p-5 shadow-[0_12px_30px_rgba(31,39,50,0.12)]"
        >
          <p class="text-xs leading-8 text-[#3f4957]">
            Dive deep into your portfolios with
            <span class="font-bold text-[#232d39]">Key Metrics</span>
            to monitor dividend amounts to asset allocation.
          </p>
        </v-card>

        <div class="portfolio-note-mobile mt-8 grid gap-4">
          <v-card flat class="border border-[#e6eaf0] p-4 shadow-sm">
            <p class="text-xs leading-7 text-[#3f4957]">
              An easy-to-read view showing
              <span class="font-bold text-[#232d39]">your portfolio performance</span>
            </p>
          </v-card>

          <v-card flat class="border border-[#e6eaf0] p-4 shadow-sm">
            <p class="text-xs leading-7 text-[#3f4957]">
              <span class="font-bold text-[#232d39]">Portfolio and Holdings List</span>
              gives you quick overviews and comparisons to analyze multiple investments
              with ease.
            </p>
          </v-card>

          <v-card flat class="border border-[#e6eaf0] p-4 shadow-sm">
            <p class="text-xs leading-7 text-[#3f4957]">
              Dive deep into your portfolios with
              <span class="font-bold text-[#232d39]">Key Metrics</span>
              to monitor dividend amounts to asset allocation.
            </p>
          </v-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import top from "../../../public/image/top.webp";
import middle from "../../../public/image/middle.webp";
import button from "../../../public/image/button.webp";

const middleImageOffset = 310;
const buttonImageOffset = 510;
</script>

<style scoped>
.portfolio-note {
  position: absolute;
  width: 235px;
  z-index: 10;
}

.portfolio-note-left {
  left: -158px;
  top: 120px;
}

.portfolio-note-right {
  right: -166px;
  top: 225px;
}

.portfolio-note-bottom-left {
  left: -158px;
  bottom: 36px;
}

.portfolio-note-mobile {
  display: none;
}

@media (max-width: 1023px) {
  .portfolio-note {
    display: none;
  }

  .portfolio-note-mobile {
    display: grid;
  }
}
</style>
