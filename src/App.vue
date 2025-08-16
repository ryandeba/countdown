<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="mb-6">
    <RouterLink
      to="/"
      class="text-5xl font-black flex justify-center"
    >
      <div
        v-for="c in 'COUNTDOWN'"
        class="
          rounded-box

          bg-linear-to-t from-indigo-500 to-blue-900

          border
          border-gray-500

          w-15
          aspect-1/1

          flex
          items-center
          justify-center

          m-0.5
        "
      >
        {{ c }}
      </div>
    </RouterLink>
  </header>

  <RouterView />
</template>
