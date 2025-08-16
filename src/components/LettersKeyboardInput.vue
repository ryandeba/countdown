<script setup lang="ts">
  import { ref, defineEmits, onMounted, onUnmounted } from 'vue'

  interface Emits {
    (e: 'keyPressed', key: string): void
  }

  const emit = defineEmits<Emits>()

  const pressedKeys = ref<string[]>([])

  const onKeydown = (e: KeyboardEvent): void => {
    const key: string = e.key.toUpperCase()

    if (pressedKeys.value.indexOf(key) == -1) {
      pressedKeys.value.push(key);
      emit('keyPressed', key)
    }
  }

  const onKeyup = (e: KeyboardEvent): void => {
    const key: string = e.key.toUpperCase()

    const index: number = pressedKeys.value.indexOf(key)

    if (index > -1) {
      pressedKeys.value.splice(index, 1)
    }
  }

  onMounted(() => {
    document.addEventListener("keydown", onKeydown)
    document.addEventListener("keyup", onKeyup)
  })

  onUnmounted(() => {
    document.removeEventListener("keydown", onKeydown)
    document.removeEventListener("keyup", onKeyup)
  })
</script>

<template>
</template>
