<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  interface Props {
    numbers: number[];
    target: number;
  }

  const props = defineProps<Props>()

  const solutions = ref<string[]>([])
  const showAll = ref<boolean>(false)
  const solutionsSlice = ref<number>(10)

  const calculateSolutions = () => {
    const validSolutions: Set<string> = new Set()

    function recurse(total: number, remainingNumbers: number[], expression: string) {
      if (total == props.target) {
        validSolutions.add(expression)
      }

      if (remainingNumbers.length == 0) {
        return
      }

      for (let i = 0; i < remainingNumbers.length; i++) {
        const currentNumber = remainingNumbers[i]
        const newRemainingNumbers = remainingNumbers.slice(0, i).concat(remainingNumbers.slice(i + 1))

        if (expression === '') {
          recurse(currentNumber, newRemainingNumbers, String(currentNumber))
          continue
        } else {
          let newTotal = 0

          for (let operator of '+-*/'.split('')) {
            if (operator === '+') {
              newTotal = total + currentNumber
            } else if (operator === '-') {
              newTotal = total - currentNumber
            } else if (operator === '*') {
              newTotal = total * currentNumber
            } else if (operator === '/') {
              newTotal = total / currentNumber
            }

            recurse(newTotal, newRemainingNumbers, `(${expression} ${operator} ${currentNumber})`)
          }
        }
      }
    }

    recurse(0, props.numbers, '')

    solutions.value = Array.from(validSolutions)
  }

  onMounted((): void => {
    calculateSolutions();
  })
</script>

<template>
    <div class="font-bold">
      Solutions:
    </div>

    <template v-if="solutions.length == 0">
      <div class="text-center text-error">
        No solutions found
      </div>
    </template>

    <button
      v-for="s in solutions.slice(0, showAll ? solutions.length : solutionsSlice)"
      :key="s"
      type="button"
      class="btn btn-default"
    >
      {{ s }}
    </button>

    <template v-if="!showAll && solutions.length > solutionsSlice">
        <button
          type="button"
          class="btn btn-neutral"
          @click="showAll = true"
        >
          Show all {{ solutions.length }} solutions
        </button>
    </template>
</template>
