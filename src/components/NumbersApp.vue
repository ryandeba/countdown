<script setup lang="ts">
  import { ref, computed, watch, onMounted } from 'vue'
  import NumbersSubmitter from './NumbersNumbers.vue'
  import NumbersSelection from './NumbersSelection.vue'

  const numbers = ref<number[]>([])
  const target = ref<number>(0)
  const smallNumbers = ref<number[]>([])
  const largeNumbers = ref<number[]>([])

  const gameStatus = computed<"NUMBERS" | "SCORE">(() => {
    if (numbers.value.length == 0) {
      return "NUMBERS"
    }

    return "SUBMIT"
  })

  const reset = (): void => {
    numbers.value = []
    target.value = 0

    smallNumbers.value = shuffle([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10])
    largeNumbers.value = shuffle([25, 50, 75, 100])

    function shuffle(a: number[]): number[] {
      return a
        .map(n => ({n, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({n}) => n)
    }
  }

  const selectNumbersAndTarget = (largeNumbersQuantity): void => {
    reset()

    let _numbers = []

    for (let i = 0; i < largeNumbersQuantity; i++) {
      _numbers.push(largeNumbers.value.pop())
    }

    while (_numbers.length < 6) {
      _numbers.push(smallNumbers.value.pop())
    }

    numbers.value = _numbers.map((n, i) => {
      return {
        number: n,
        id: i,
      }
    })

    target.value = Math.floor((Math.random() * 900) + 100)
  }

  onMounted(() => {
    reset()
  })
</script>

<template>
  <template v-if="gameStatus == 'NUMBERS'">
    <NumbersSelection
      @select="selectNumbersAndTarget"
    ></NumbersSelection>
  </template>

  <template v-if="gameStatus == 'SUBMIT'">
    <div class="flex justify-center">
      <div class="text-3xl bg-primary/80 p-5 rounded-sm">
        {{ target }}
      </div>
    </div>

    <NumbersSubmitter
      :numbers="numbers"
      :target="target"
    ></NumbersSubmitter>
  </template>
</template>
