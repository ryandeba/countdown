<script setup lang="ts">
  // TODO: http://www.thecountdownpage.com/letters.htm
  import { ref, computed, watch, onMounted } from 'vue'
  import KeyboardInput from './LettersKeyboardInput.vue'
  import LettersSubmissions from './LettersSubmissions.vue'
  import LettersScore from './LettersScore.vue'

  const vowels = `
    ${'A'.repeat(15)} ${'E'.repeat(21)} ${'I'.repeat(13)} ${'O'.repeat(13)} ${'U'.repeat(5)}
  `
    .replace(/\W/g, "")
    .split("")

  const consonants = `
    ${'B'.repeat(2)} ${'C'.repeat(3)} ${'D'.repeat(6)} ${'F'.repeat(2)} ${'G'.repeat(3)}
    ${'H'.repeat(2)} ${'J'.repeat(1)} ${'K'.repeat(1)} ${'L'.repeat(5)} ${'M'.repeat(4)}
    ${'N'.repeat(8)} ${'P'.repeat(4)} ${'Q'.repeat(1)} ${'R'.repeat(9)} ${'S'.repeat(9)}
    ${'T'.repeat(9)} ${'V'.repeat(1)} ${'W'.repeat(1)} ${'X'.repeat(1)} ${'Y'.repeat(1)}
    ${'Z'.repeat(1)}
  `
    .replace(/\W/g, "")
    .split("")

  const letters = ref([])
  const submissions = ref([])
  const input = ref("")
  const submittedWord = ref("")

  const selectedLetters = computed(() => {
    return letters.value
      .filter(l => l.selected)
      .sort((a, b) => a.index - b.index)
      .map(l => l.char)
      .join("")
  })

  const maxIndex = computed(() => {
    let result = letters.value
      .filter(l => l.selected)
      .sort((a, b) => a.index - b.index)
      .pop()
      ?.index

    result = Number.isInteger(result) ? result : -1

    return result
  })

  watch(selectedLetters, () => {
    input.value = selectedLetters.value
  })

  const reset = () => {
    randomizeLetters()
    submissions.value = []
    submittedWord.value = ""
  }

  const randomizeLetters = () => {
    let numberOfVowels = Math.floor(Math.random() * 2.7) + 3 // between 3-5, with a lower probability for 5
    let numberOfConsonants = 9 - numberOfVowels

    let result = shuffle(vowels).slice(0, numberOfVowels)

    result = result.concat(
      shuffle(consonants).slice(0, numberOfConsonants)
    )

    letters.value = shuffle(result)
      .map(l => ({char: l, selected: false, index: -1}))

    function shuffle(a) {
      return a
        .map(l => ({l, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({l}) => l)
    }
  }

  const selectLetterAtIndex = index => {
    letters.value[index].selected = !letters.value[index].selected

    if (letters.value[index].selected) {
      letters.value[index].index = maxIndex.value + 1
    } else {
      let letterIndex = letters.value[index].index

      letters.value.forEach(l => {
        if (l.index == letterIndex) {
          l.index = -1
        } else if (l.index > letterIndex) {
          l.index--
        }
      })
    }
  }

  const onKeyPressed = key => {
    // TODO: only in 1 game state (TODO: implement game state)
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
  <div class="flex justify-center my-5">
    
  </div>

  <div class="flex justify-center my-8">
    <button
      v-for="(l, i) in letters"
      :key="i"
      type="button"
      class="btn btn-square btn-xl m-1"
      :class="l.selected ? 'scale-75 btn-default' : 'btn-primary'"
      @click="selectLetterAtIndex(i)"
    >
      {{ l.char }}
    </button>
  </div>

  <template v-if="submittedWord.length == 0">
    <div class="flex justify-center">
      <div class="card card-border bg-base-100 w-96 bg-neutral m-2">
        <div class="card-body">
          <p>
            <input
              v-model="input"
              class="input input-lg w-full tracking-[.4rem]"
              readonly
            >
          </p>

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
  </template>

  <template v-if="submittedWord.length > 0">
    <LettersScore
      :word="submittedWord"
      :letters="letters.map(l => l.char).join('')"
      @reset="reset"
    ></LettersScore>
  </template>

  <template v-else-if="submissions.length > 0">
    <LettersSubmissions
      class="m-2"
      :words="submissions"
      @submit="(word) => { submittedWord = word }"
    ></LettersSubmissions>
  </template>

  <KeyboardInput
    @keyPressed="onKeyPressed"
  ></KeyboardInput>
</template>
