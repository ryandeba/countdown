<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'

  const model = defineModel<number>({
    required: true
  })

  let interval: number

  const decrement = (): void => {
    model.value = Math.max(0, model.value - 1)
  }

  onMounted(() => {
    interval = setInterval(decrement, 1000)
  })

  onUnmounted(() => {
    clearInterval(interval)
  })
</script>

<template>
  <div
    class="
      border
      text-primary-content
      text-xl
      font-bold
      rounded-full
      w-16
      aspect-1/1
      flex
      justify-center
      items-center
    "
  >
    {{ model }}
  </div>
</template>
