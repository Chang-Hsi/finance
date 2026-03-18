<template>
  <header class="w-full border-b border-[#d8dde3] bg-[#f6f7f9]">
    <div class="mx-auto flex h-[58px] max-w-[1460px] items-center gap-4 px-4">
      <NuxtLink
        to="/"
        class="shrink-0 text-xl font-extrabold leading-none tracking-tight text-[#7538f6]"
      >
        yippee!<span class="text-[#1f2732]">finance</span>
      </NuxtLink>

      <v-text-field
        class="header-search hidden min-w-[260px] flex-1 lg:block"
        density="comfortable"
        hide-details
        variant="solo-filled"
        rounded="pill"
        flat
        prepend-inner-icon="mdi-magnify"
        placeholder="Search for news, tickers or companies"
      >
        <template #append-inner>
          <v-btn
            icon="mdi-magnify"
            size="small"
            color="#038f83"
            class="!h-9 !w-9 !min-w-9 !rounded-full !text-white"
          />
        </template>
      </v-text-field>

      <nav class="hidden items-center gap-5 xl:flex">
        <a
          v-for="item in quickNav"
          :key="item"
          href="#"
          class="text-base font-semibold text-[#293544]"
        >
          {{ item }}
        </a>
      </nav>

      <div class="ml-auto flex items-center gap-2">
        <v-btn icon variant="text" size="small">
          <v-icon icon="mdi-bell-outline" />
        </v-btn>
        <v-btn
          prepend-icon="mdi-email-outline"
          variant="outlined"
          class="hidden !rounded-full !border-[#1d5fff] !px-3 !text-blue-700 md:inline-flex"
        >
          Mail
        </v-btn>
        <v-btn
          variant="outlined"
          class="!rounded-full !border-[#c9d0d8] !px-3 !text-[#202a35]"
        >
          Sign in
        </v-btn>
      </div>
    </div>

    <div class="border-t border-[#e5e8ec] border-b-[3px] border-b-[#068c7f]">
      <div class="mx-auto flex h-[52px] max-w-[1460px] items-center overflow-x-auto px-4">
        <NuxtLink
          v-for="item in sectionNav"
          :key="item.label"
          :to="item.to"
          class="mr-7 whitespace-nowrap text-base font-semibold text-[#293544] last:mr-0"
        >
          {{ item.label }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
const quickNav = ["News", "Finance", "Sports", "More"];
const sectionNav = [
  { label: "My Portfolio", to: "/my-portfolio" },
  { label: "News", to: "/news" },
  { label: "Markets", to: "/markets" },
  { label: "Research", to: "/research" },
  // { label: "Personal Finance", to: "/personal-finance" },
  { label: "Videos", to: "/videos" },
];
</script>

<style scoped>
:deep(.header-search .v-field) {
  background-color: #eceff2 !important;
  box-shadow: none !important;
}
</style>
