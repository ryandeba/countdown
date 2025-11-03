<script setup lang="ts">
  import { ref, computed, watch, onBeforeMount } from 'vue'
  import type { CountdownNumber } from '@/types/types'
  import CountdownToast from './CountdownToast.vue'

  const props = defineProps<{
    numbers: CountdownNumber[],
    target: number,
  }>()

  const availableNumbers = ref<CountdownNumber[]>([])

  const operators = ref<string[]>(["+", "-", "×", "÷"])
  const operatorIndex = ref<number>(-1)

  const history = ref<object[]>([])

  const toast = ref<object>(undefined)

  const unselectAllAvailableNumbers = () => {
    availableNumbers.value
      .filter(e => e.selected)
      .forEach(e => e.selected = false)
  }

  const onClickNumber = (n): void => {
    if (n.selected) {
      n.selected = false
      return
    }

    let indexOfOtherSelectedNumber = availableNumbers.value.findIndex(n => n.selected)
    let operator = operators.value[operatorIndex.value]

    if (
      operatorIndex.value == -1
      || indexOfOtherSelectedNumber == -1
    ) {
      unselectAllAvailableNumbers()

      n.selected = true
      return
    }

    if (
      indexOfOtherSelectedNumber > -1
      && operatorIndex.value > -1
    ) {
      let otherNumber = availableNumbers.value[indexOfOtherSelectedNumber].number
      let result = n.number

      if (operator == "+") {
        result = otherNumber + result
      } else if (operator == "-") {
        result = otherNumber - result
      } else if (operator == "×") {
        result = otherNumber * result
      } else if (operator == "÷") {
        result = otherNumber / result
      }

      if (!Number.isInteger(result)) {
        setToast("ERROR: Must be a positive integer")
        return
      }

      if (result < 0) {
        setToast("ERROR: Must be a positive integer")
        return
      }

      history.value.push(
        availableNumbers.value
          .map(n => {
            return {id: n.id, number: n.number}
          })
      )

      availableNumbers.value[indexOfOtherSelectedNumber].number = undefined
      n.number = result

      unselectAllAvailableNumbers()
      operatorIndex.value = -1

      if (result === props.target) {
        setToast("You win!")
      }
    }
  }

  let toastTimeout = undefined
  const setToast = (message) => {
    toast.value = message
    clearTimeout(toastTimeout)
    toastTimeout = setTimeout(() => toast.value = undefined, 3000)
  }

  onBeforeMount(() => {
    availableNumbers.value = props.numbers.map(n => n)
  })
</script>

<template>
  <div
    class="flex justify-center my-8"
  >
    <button
      v-for="(n, i) in availableNumbers"
      :key="n.id"
      type="button"
      class="btn btn-square lg:btn-xl m-1"
      :class="{
        'btn-primary': n.number && !n.selected,
        'btn-success': n.selected,
        'btn-default': !n.number,
      }"
      :disabled="!n.number"
      @click="onClickNumber(n)"
    >
      {{ n.number }}
    </button>
  </div>

  <div class="flex justify-center mb-12">
    <button
      v-for="(o, i) in operators"
      :key="o"
      type="button"
      class="btn btn-circle text-2xl m-0.5"
      :class="operatorIndex === i ? 'btn-success' : 'btn-primary'"
      @click="operatorIndex === i ? operatorIndex = -1 : operatorIndex = i"
    >
      {{ o }}
    </button>
  </div>

  <div class="flex justify-center">
    <button
      type="button"
      class="btn btn-warning"
      :disabled="history.length == 0"
      @click="availableNumbers = history.pop()"
    >
      Undo
    </button>
  </div>

  <CountdownToast
    :message="toast"
    v-if="Boolean(toast)"
  ></CountdownToast>
</template>
