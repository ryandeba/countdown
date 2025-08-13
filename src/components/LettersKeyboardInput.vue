<script setup lang="ts">
  import { ref, reactive, watch, defineEmits, onMounted, onUnmounted } from 'vue'

  const emit = defineEmits(["keyPressed"])

  const pressedKeys = ref([])

  const onKeydown = e => {
    let key = e.key.toUpperCase()

    if (pressedKeys.value.indexOf(key) == -1) {
      pressedKeys.value.push(key);
      emit('keyPressed', key)
    }
  }

  const onKeyup = e => {
    let key = e.key.toUpperCase()

    let index = pressedKeys.value.indexOf(key)

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
