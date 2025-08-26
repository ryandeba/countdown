<script setup lang="ts">
  import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="text-center text-2xl">
    Play
  </div>

  <div class="flex justify-center">
    <RouterLink
      to="/letters"
      class="btn btn-primary btn-xl m-8"
    >
      Letters
    </RouterLink>

    <RouterLink
      to="/numbers"
      class="btn btn-primary btn-xl m-8"
      disabled
    >
      Numbers
    </RouterLink>
  </div>

  <div
    class="divider"
  ></div>

  <div class="text-center text-2xl">
    Solve
  </div>

  <div class="flex justify-center">
    <RouterLink
      to="/solveLetters"
      class="btn btn-primary btn-xl m-8"
    >
      Letters
    </RouterLink>

    <RouterLink
      to="/solveNumbers"
      class="btn btn-primary btn-xl m-8"
    >
      Numbers
    </RouterLink>
  </div>
</template>
