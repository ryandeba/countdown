<script setup lang="ts">
  import { ref, computed, watch, onBeforeMount } from 'vue'

  const props = defineProps<{
    message: string
  }>()
</script>

<template>
  <div class="toast toast-center">
    <div class="alert alert-info">
      <span>{{ message }}</span>
    </div>
  </div>
</template>
