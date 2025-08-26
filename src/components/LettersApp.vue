<script setup lang="ts">
  // TODO: http://www.thecountdownpage.com/letters.htm
  import { ref, computed, watch, onMounted } from 'vue'
  import KeyboardInput from './LettersKeyboardInput.vue'
  import LettersLetters from './LettersLetters.vue'
  import LettersVowelsAndConsonants from './LettersVowelsAndConsonants.vue'
  import LettersSubmissions from './LettersSubmissions.vue'
  import LettersScore from './LettersScore.vue'
  import LettersTimer from './LettersTimer.vue'
  import type { Letter } from '@/types/types';

  const letters = ref<Letter[]>([])
  const submissions = ref<string[]>([])
  const submittedWord = ref<string>("")
  const previewWord = ref<string>("")
  const timer = ref<number>(30)

  const gameStatus = computed<"LETTERS" | "WORDS" | "SUBMIT" | "SCORE">(() => {
    if (letters.value.filter((l: Letter) => Boolean(l.char)).length < 9) {
      return "LETTERS"
    }

    if (timer.value > 0) {
      return "WORDS"
    }

    if (submittedWord.value == "") {
      return "SUBMIT"
    }

    return "SCORE"
  })

  const selectedLetters = computed<string>(() => {
    return letters.value
      .filter(l => l.selected)
      .sort((a, b) => a.index - b.index)
      .map(l => l.char)
      .join("")
  })

  const maxIndex = computed<number>(() => {
    let result = letters.value
      .filter((l: Letter) => l.selected)
      .sort((a: Letter, b: Letter) => a.index - b.index)
      .pop()
      ?.index

    result = Number.isInteger(result) ? result as number : -1

    return result
  })

  watch(gameStatus, () => {
    unselectAllLetters()
  })

  const reset = (): void => {
    letters.value = new Array(9).fill("").map((e, i) => {
      return {
        char: "", index: -1, selected: false, id: i
      }
    })
    submissions.value = []
    submittedWord.value = ""
    previewWord.value = ""
    timer.value = 30
  }

  const addLetter = (l: string): void => {
    const index: number = letters.value.findIndex((l: Letter) => l.char == "")

    if (index == -1) {
      return
    }

    letters.value[index].char = l
  }

  const selectLetterAtIndex = (index: number) => {
    if (gameStatus.value !== 'WORDS') {
      return
    }

    letters.value[index].selected = !letters.value[index].selected

    if (letters.value[index].selected) {
      letters.value[index].index = maxIndex.value + 1
    } else {
      const letterIndex: number = letters.value[index].index

      letters.value.forEach(l => {
        if (l.index == letterIndex) {
          l.index = -1
        } else if (l.index > letterIndex) {
          l.index--
        }
      })
    }
  }

  const onKeyPressed = (key: string) => {
    key = key.toUpperCase()

    if (key == "BACKSPACE") {
      let letter = letters.value
        .find(l => l.index == maxIndex.value)

      if (letter) {
        letter.selected = false
        letter.index = -1
      }

      return
    }

    if (key == "ENTER") {
      addSubmission()
      return
    }

    let indexOfUnselectedLetter = letters.value.findIndex(l => !l.selected && l.char == key)

    if (indexOfUnselectedLetter > -1) {
      selectLetterAtIndex(indexOfUnselectedLetter)
    }
  }

  const unselectAllLetters = () => {
    letters.value
      .forEach(l => {
        l.selected = false
        l.index = -1
      })
  }

  const addSubmission = () => {
    let word = selectedLetters.value

    if (word.length == 0) {
      return
    }

    if (submissions.value.indexOf(word) == -1) {
      submissions.value.push(word)
    }

    unselectAllLetters()
  }

  onMounted(() => {
    reset()
  })
</script>

<template>
  <div class="flex justify-center">
    <LettersLetters
      v-model="letters"
      @select-letter-at-index="selectLetterAtIndex"
      :preview="previewWord"
    ></LettersLetters>
  </div>

  <template v-if="gameStatus == 'LETTERS'">
    <LettersVowelsAndConsonants
      @add="addLetter"
    ></LettersVowelsAndConsonants>
  </template>

  <template v-if="gameStatus == 'WORDS'">
    <LettersTimer
      v-model="timer"
      class="mb-4"
    ></LettersTimer>

    <div class="flex justify-center">
      <div class="card card-border bg-base-100 w-96 bg-neutral m-2">
        <div class="card-body">
          <input
            :value="selectedLetters"
            class="input input-lg w-full tracking-[.4rem]"
            @keydown.prevent
          >

          <div class="card-actions justify-between">
            <button
              type="button"
              class="btn btn-danger mr-5"
              @click="unselectAllLetters"
            >
              Clear
            </button>

            <button
              type="button"
              class="btn btn-primary"
              @click="addSubmission"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>

    <KeyboardInput
      @keyPressed="onKeyPressed"
    ></KeyboardInput>
  </template>

  <template v-if="gameStatus == 'SUBMIT'">
    <LettersSubmissions
      class="m-2"
      :words="submissions"
      :game-status="gameStatus"
      @submit="(word) => { submittedWord = word }"
      @preview="w => previewWord = w"
      @reset="reset"
    ></LettersSubmissions>
  </template>

  <template v-if="gameStatus == 'SCORE'">
    <LettersScore
      :word="submittedWord"
      :letters="letters.map(l => l.char).join('')"
      @preview="w => previewWord = w"
      @reset="reset"
    ></LettersScore>
  </template>
</template>
