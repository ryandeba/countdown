<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const vowels = ref<string[]>(`
    ${'A'.repeat(15)} ${'E'.repeat(21)} ${'I'.repeat(13)} ${'O'.repeat(13)} ${'U'.repeat(5)}
  `
    .replace(/\W/g, "")
    .split("")
  )

  const consonants = ref<string[]>(`
    ${'B'.repeat(2)} ${'C'.repeat(3)} ${'D'.repeat(6)} ${'F'.repeat(2)} ${'G'.repeat(3)}
    ${'H'.repeat(2)} ${'J'.repeat(1)} ${'K'.repeat(1)} ${'L'.repeat(5)} ${'M'.repeat(4)}
    ${'N'.repeat(8)} ${'P'.repeat(4)} ${'Q'.repeat(1)} ${'R'.repeat(9)} ${'S'.repeat(9)}
    ${'T'.repeat(9)} ${'V'.repeat(1)} ${'W'.repeat(1)} ${'X'.repeat(1)} ${'Y'.repeat(1)}
    ${'Z'.repeat(1)}
  `
    .replace(/\W/g, "")
    .split("")
  )

  const vowelCount = ref<number>(0)
  const consonantCount = ref<number>(0)

  const emit = defineEmits<{
    (e: 'add', value: string): void
  }>()

  const selectVowel = (): void => {
    vowelCount.value++
    emit("add", vowels.value.pop() || "")
  }

  const selectConsonant = (): void => {
    consonantCount.value++
    emit("add", consonants.value.pop() || "")
  }

  onMounted(() => {
    vowels.value = shuffle(vowels.value)
    consonants.value = shuffle(consonants.value)

    function shuffle(a: string[]): string[] {
      return a
        .map(l => ({l, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({l}) => l)
    }
  })
</script>

<template>
  <div class="flex justify-center">
    <div class="card card-border bg-base-100 w-96 bg-neutral">
      <div class="card-body">
        <p class="text-center mb-3">
          Select 9 random letters. Your selection must contain at least 3 vowels and at least 4 consonants.
        </p>

        <div class="flex flex-row justify-around">
          <button
            class="btn btn-info"
            @click="selectVowel"
            :disabled="vowelCount >= 5"
          >
            Vowel
          </button>

          <button
            class="btn btn-info"
            @click="selectConsonant"
            :disabled="consonantCount >= 6"
          >
            Consonant
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
