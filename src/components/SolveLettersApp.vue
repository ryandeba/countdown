<script setup lang="ts">
  // TODO: http://www.thecountdownpage.com/letters.htm
  import { ref, watch, onMounted } from 'vue'
  import LettersLetters from './LettersLetters.vue'
  import LettersScore from './LettersScore.vue'

  const letters = ref([])
  const input = ref("")
  const previewWord = ref("")

  watch(input, () => {
    input.value = input.value.toUpperCase()
    input.value = input.value.replace(/[^A-Z]/g, "")
  })

  const reset = () => {
    letters.value = []
    input.value = ""
    previewWord.value = ""
  }

  const setLettersFromInput = () => {
    if (input.value.length < 2) {
      return
    }

    letters.value = input.value
      .split("")
      .map((l, i) => {
        return {
          char: l,
          index: -1,
          selected: false,
          id: i,
        }
      })
  }

  onMounted(() => {
    reset()
  })
</script>

<template>
  <template v-if="letters.length == 0">
    <div class="flex justify-center">
      <div class="card card-border bg-base-100 w-96 bg-neutral">
        <div class="card-body">
          <input
            v-model="input"
            class="input w-full"
            placeholder="Enter letters"
            @keydown.enter="setLettersFromInput"
          >

          <div class="text-right text-sm">
            {{ input.length }} / 9
          </div>

          <div class="card-actions justify-center tracking-normal min-h-12">
            <button
              type="button"
              class="btn btn-primary btn-wide mt-2"
              @click="setLettersFromInput"
              :disabled="input.length < 2"
            >
              Show Solutions
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>

  <template v-if="letters.length > 0">
    <div class="flex justify-center">
      <LettersLetters
        v-model="letters"
        :preview="previewWord"
      ></LettersLetters>
    </div>

    <LettersScore
      :letters="letters.map(l => l.char).join('')"
      @preview="w => previewWord = w"
      class="mb-5"
    ></LettersScore>

    <div class="flex justify-center">
      <button
        type="button"
        class="btn btn-error"
        @click="reset"
      >
        Reset
      </button>
    </div>
  </template>
</template>
