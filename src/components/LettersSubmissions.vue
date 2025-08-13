<script setup lang="ts">
  import { ref, defineModel } from 'vue'

  const props = defineProps(['words'])

  const emit = defineEmits(['submit'])

  const selectedIndex = ref(-1)

  const submit = () => {
    emit("submit", props.words[selectedIndex.value])
  }
</script>

<template>
  <div class="flex justify-center">
    <div class="card card-border bg-base-100 w-96 bg-neutral">
      <div class="card-body">
        <div
          v-for="(word, i) in words"
        >
          <button
            @click="selectedIndex = i"
            class="btn w-full justify-between"
            :class="selectedIndex == i ? 'btn-secondary btn-active' : 'btn-outline'"
          >
            <span class="tracking-[.2rem]">
              {{ word }}
            </span>

            <span class="opacity-75">
              {{ word.length }}
            </span>
          </button>
        </div>

        <div class="card-actions justify-center tracking-normal min-h-12">
          <template v-if="selectedIndex > -1">
            <button
              type="button"
              class="btn btn-primary btn-wide mt-2"
              @click="submit"
            >
              Submit '{{ words[selectedIndex] }}'
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
