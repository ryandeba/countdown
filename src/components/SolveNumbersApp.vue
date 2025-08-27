<script setup lang="ts">
  import { ref, computed, watch, onMounted } from 'vue'
  import NumbersSolutions from './NumbersSolutions.vue'

  const numbers = ref<string[]>(new Array(6).fill(''))
  const target = ref<string>('')
  const solutionsKey = ref<string>('')

  enum ValidationError {
    Numbers,
    Target
  }

  const targetAndNumbersAsString = computed(() => {
    return `${target.value}_${numbers.value.join('_')}`
  })

  const validationErrors = computed(() => {
    let result = []

    for (let n of numbers.value) {
      if (!isValidInteger(Number(n))) {
        result.push(ValidationError.Numbers)
        break
      }
    }

    if (!isValidInteger(Number(target.value))) {
      result.push(ValidationError.Target)
    }

    return result

    function isValidInteger(num: number) {
      return (
        !isNaN(num)
        && num > 0
        && Number.isInteger(num)
      )
    }
  })

  watch(targetAndNumbersAsString, () => {
    solutionsKey.value = ''
  })

  const reset = (): void => {
    solutionsKey.value = ''
  }

  onMounted((): void => {
    reset()
  })
</script>

<template>
  <div class="flex justify-center">
    <div class="card card-border bg-base-100 w-100 bg-neutral">
      <div class="card-body">

        <span class="font-bold">
          Target:
        </span>

        <input
          class="input m-1 w-full"
          v-model="target"
        >

        <span class="font-bold">
          Numbers:
        </span>

        <div class="flex items-center">
          <input
            v-for="i in numbers.length"
            :key="i"
            v-model="numbers[i - 1]"
            class="input m-1"
          >
        </div>

        <div
          :class="{
            'text-success': validationErrors.indexOf(ValidationError.Target) == -1
          }"
        >
          <span class="inline-block w-4">
            {{ validationErrors.indexOf(ValidationError.Target) == -1 ? '✓' : '•' }}
          </span>

          Target must be a integer greater than 0
        </div>

        <div
          :class="{
            'text-success': validationErrors.indexOf(ValidationError.Numbers) == -1
          }"
        >
          <span class="inline-block w-4">
            {{ validationErrors.indexOf(ValidationError.Numbers) == -1 ? '✓' : '•' }}
          </span>

          Each number must be an integer greater than 0
        </div>


        <div class="text-center">
          <button
            type="button"
            class="btn btn-primary btn-wide mt-2"
            @click="solutionsKey = targetAndNumbersAsString"
            :disabled="Object.keys(validationErrors).length > 0"
          >
            Show Solutions
          </button>
        </div>

        <template v-if="solutionsKey == targetAndNumbersAsString">
          <NumbersSolutions
            :numbers="numbers.map(Number)"
            :target="Number(target)"
            :key="solutionsKey"
          ></NumbersSolutions>
        </template>
      </div>
    </div>
  </div>
</template>
