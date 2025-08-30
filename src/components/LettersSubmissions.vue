<script setup lang="ts">
  import { ref, computed, watch } from 'vue'

  const props = defineProps(['words', 'gameStatus'])

  const emit = defineEmits(['submit', 'reset', 'preview'])

  const selectedIndex = ref(-1)

  const selectedWord = computed(() => {
    return props.words[selectedIndex.value] || ""
  })

  watch(selectedWord, () => {
    emit('preview', selectedWord.value)
  })

  const submit = () => {
    emit("submit", props.words[selectedIndex.value])
  }
</script>

<template>
  <div class="flex justify-center">
    <div class="card card-border bg-base-100 w-96 bg-neutral">
      <div class="card-body">
        <template v-if="gameStatus == 'SUBMIT' && words.length == 0">
          <div class="text-center text-error text-lg">
            No words submitted
          </div>

          <div class="mt-3 text-center">
            <button
              type="button"
              class="btn btn-error btn-sm"
              @click="emit('reset')"
            >
              New Game
            </button>
          </div>
        </template>

        <template v-else>
          <p class="text-center mb-3">
            Select 1 word to submit for scoring. Longer words score more points.
          </p>

          <div
            v-for="(word, i) in words"
          >
            <button
              @click="selectedIndex = i"
              class="btn w-full justify-between"
              :class="selectedIndex == i ? 'btn-secondary btn-active' : 'btn-outline'"
            >
              <span class="tracking-[.2rem]">
                {{ word }}
              </span>

              <span class="opacity-75">
                {{ word.length }}
              </span>
            </button>
          </div>
        </template>

        <template v-if="selectedIndex > -1">
          <div class="card-actions justify-center tracking-normal min-h-12">
            <button
              type="button"
              class="btn btn-primary btn-wide mt-2"
              @click="submit"
            >
              Submit '{{ words[selectedIndex] }}'
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
