<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import NumbersSolutions from './NumbersSolutions.vue'

  const numbers = ref<string[]>([])
  const target = ref<string>('')
  const showSolutions = ref(false)

  const validationError = computed(() => {
    for (let n of numbers.value) {
      if (!isValidInteger(Number(n))) {
        console.log('invalid', n)
        return `Numbers must be valid integers greater than 0 (${n})`
      }
    }

    if (!isValidInteger(Number(target.value))) {
      return `Target must be a valid integer greater than 0`
    }

    function isValidInteger(num: number) {
      return (
        !isNaN(num)
        && num > 0
        && Number.isInteger(num)
      )
    }
  })

  const reset = (): void => {
    numbers.value = new Array(6).fill('')
    target.value = ''
    showSolutions.value = true
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

        <span class="font-bold">
          Target:
        </span>

        <input
          class="input m-1 w-full"
          v-model="target"
        >

        <template v-if="showSolutions">
          <NumbersSolutions
            :numbers="numbers.map(Number)"
            :target="Number(target)"
          ></NumbersSolutions>
        </template>

        <template v-if="validationError">
          <div class="text-error text-center">
            {{ validationError }}
          </div>
        </template>

        <div class="card-actions justify-center tracking-normal min-h-12">
          <template v-if="showSolutions">
            <button
              type="button"
              class="btn btn-primary btn-wide mt-2"
              @click="reset"
            >
              Reset
            </button>
          </template>

          <template v-else>
            <button
              type="button"
              class="btn btn-primary btn-wide mt-2"
              @click="showSolutions = true"
              :disabled="Boolean(validationError)"
            >
              Show Solutions
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
