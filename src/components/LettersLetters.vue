<script setup lang="ts">
  import { defineModel, defineProps, defineEmits, computed, watch } from 'vue'
  import type { Letter } from '@/types/types';

  interface Props {
    preview: string;
  }

  interface Emits {
    (e: 'selectLetterAtIndex', id: number): void;
  }

  const model = defineModel<Letter[]>({
    required: true
  })

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const previewIds = computed<number[]>(() => {
    let ids: number[] = []

    return (props.preview || "")
      .split("")
      .map((l: string) => {
        let modelLetter = model.value.find((e: Letter) => e.char == l && ids.indexOf(e.id) == -1)

        if (!modelLetter) {
          return -1
        }

        ids.push(modelLetter.id)

        return modelLetter.id
      })
  })

  watch(() => props.preview, () => {
    if (!props.preview) {
      model.value.sort((a, b) => a.id - b.id)
      return
    }

    model.value.sort((a, b) => {
      let aSort = previewIds.value.indexOf(a.id)
      let bSort = previewIds.value.indexOf(b.id)

      aSort = aSort > -1 ? aSort : 9 + a.id
      bSort = bSort > -1 ? bSort : 9 + b.id

      return aSort - bSort
    })
  })
</script>

<template>
  <TransitionGroup
    name="list-shuffle"
    tag="div"
    class="flex justify-center my-8"
  >
    <button
      v-for="(l, i) in model"
      :key="l.id"
      type="button"
      class="btn btn-square btn-xl m-1"
      :class="l.selected || !l.char || (previewIds.length > 0 && previewIds.indexOf(l.id) == -1) ? 'btn-default' : 'btn-primary'"
      @click="emit('selectLetterAtIndex', i)"
    >
      {{ l.char }}
    </button>
  </TransitionGroup>
</template>

<style scoped>
  .list-shuffle-item {
    transition: all 0.5s ease;
  }

  .list-shuffle-move {
    transition: transform 0.6s ease;
  }

  .list-shuffle-enter-active {
    transition: opacity 0.5s ease;
  }
</style>
