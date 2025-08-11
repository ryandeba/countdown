<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1 class="text-4xl text-center mb-6">
      Countdown
    </h1>

    <nav class="flex justify-center">
      <div role="tablist" class="tabs tabs-box tabs-lg">
        <RouterLink
          to="/letters"
          class="tab"
          :class="$route.path == '/letters' ? 'tab-active' : ''"
        >
          Letters
        </RouterLink>

        <RouterLink
          to="/numbers"
          class="tab"
          :class="$route.path == '/numbers' ? 'tab-active' : ''"
        >
          Numbers
        </RouterLink>
      </div>
    </nav>
  </header>

  <RouterView />
</template>
