<script setup lang="ts">
  // TODO: http://www.thecountdownpage.com/letters.htm
  import { ref, computed, watch, onMounted } from 'vue'

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
  const candidateWords = ref([])

  const selectedLetters = computed(() => {
    return letters.value
      .filter(l => l.selected)
      .sort((a, b) => a.index - b.index)
      .map(l => l.char)
  })

  const nextIndex = computed(() => {
    let result = letters.value
      .filter(l => l.selected)
      .sort((a, b) => a.index - b.index)
      .pop()
      .index + 1

    result = Number.isInteger(result) ? result : 0

    return result
  })

  const reset = () => {
    randomizeLetters()
    candidateWords.value = []
  }

  const randomizeLetters = () => {
    let numberOfVowels = Math.floor(Math.random() * 3) + 3
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

  const onClickLetter = index => {
    letters.value[index].selected = !letters.value[index].selected

    if (letters.value[index].selected) {
      letters.value[index].index = nextIndex.value
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

  const unselectAllLetters = () => {
    letters.value
      .forEach(l => {
        l.selected = false;
        l.index = -1
      })
  }

  const addSubmission = () => {
    candidateWords.value.push(selectedLetters.value.join(""))
    unselectAllLetters()
  }

  onMounted(() => {
    reset()
  })
</script>

<template>
  <div class="flex justify-center mt-5">
    <button
      type="button"
      class="btn btn-error btn-sm ml-5"
      @click="randomizeLetters"
    >
      New Game
    </button>
  </div>

  <div class="flex justify-center">
    <button
      v-for="(l, i) in letters"
      :key="i"
      type="button"
      class="btn btn-square btn-xl m-2"
      :class="l.selected ? 'scale-75 btn-default' : 'btn-primary'"
      @click="onClickLetter(i)"
    >
      {{ l.char }}
    </button>
  </div>

  <div class="flex justify-center mt-6 text-4xl">
    <template v-if="selectedLetters.length == 0">
      &nbsp;
    </template>

    <template v-else>
      {{ selectedLetters.join(" ") }}
    </template>
  </div>

  <div class="flex justify-center my-6">
    <template v-if="selectedLetters.length == 0">
      TODO: instructions
    </template>

    <template v-else>
      <button
        type="button"
        class="btn btn-danger mr-5"
        @click="unselectAllLetters"
      >
        Unselect all
      </button>

      <button
        type="button"
        class="btn btn-primary"
        @click="addSubmission"
      >
        Submit
      </button>
    </template>
  </div>

  <div class="my-6">
    <div
      v-for="w in candidateWords"
      class="flex justify-center"
    >
      {{ w }}
    </div>
  </div>
</template>
