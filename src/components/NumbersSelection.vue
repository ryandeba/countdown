<script setup lang="ts">
  import { ref } from 'vue'

  interface Emits {
    (e: 'select', value: number): void;
  }

  const emit = defineEmits<Emits>()

  const largeNumbersOptions = ref<number[]>([0, 1, 2, 3, 4])
</script>

<template>
  <div class="flex justify-center">
    <div class="card card-border bg-base-100 w-96 bg-neutral">
      <div class="card-body">
        <p class="text-center mb-3">
          Select the distribution of random numbers
        </p>

        <div
          v-for="o in largeNumbersOptions"
          :key="o"
          class="flex justify-center"
        >
          <button
            type="button"
            class="btn btn-primary my-2"
            @click="emit('select', o)"
          >
            {{ o }} Large - {{ 6 - o }} Small
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
