<script setup lang="ts">
  import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <nav class="flex justify-center">
      <RouterLink
        to="/letters"
        class="btn btn-primary btn-xl mr-5"
      >
        Letters
      </RouterLink>

      <RouterLink
        to="/numbers"
        class="btn btn-primary btn-xl mr-5"
      >
        Numbers
      </RouterLink>
    </nav>
  </main>
</template>
