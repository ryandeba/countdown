<script setup lang="ts">
  import { defineProps, defineEmits, ref, computed, onMounted } from 'vue'

  const props = defineProps(['word', 'letters'])
  const emit = defineEmits(["reset"])

  const loading = ref(true)
  const anagrams = ref([])
  const showAll = ref(false)

  onMounted(() => {
    fetch(`https://ryandeba.com/anagrams/${props.letters}`)
      .then(r => r.json())
      .then(data => {
        anagrams.value = data
          .filter((e, i, a) => a.indexOf(e) == i) // TODO: this seems like it shouldn't be required here
          .map(a => a.toUpperCase())

        loading.value = false
      })
  })
</script>

<template>
  <div class="flex justify-center">
    <div class="card card-border bg-base-100 w-96 bg-neutral">
      <div class="card-body">
        <template v-if="loading">
          <span class="loading loading-spinner text-primary"></span>
        </template>

        <template v-else>
          <div class="text-center text-2xl">
            <template v-if="anagrams.indexOf(word) > -1">
              <span class="text-success">
                {{ word.length }} points
              </span>
            </template>

            <template v-else>
              <div class="text-error">
                0 points - Invalid word
              </div>
            </template>

            <div class="mt-5">
              <button
                type="button"
                class="btn btn-error btn-sm"
                @click="emit('reset')"
              >
                New Game
              </button>
            </div>
          </div>

          <div class="divider"></div>

          <div class="text-center text-lg">
            Best Words
          </div>

          <div
            v-for="a in anagrams.slice(0, showAll ? anagrams.length : 10)"
            :key="a"
            class="flex justify-between"
            :class="a == word ? 'text-success' : ''"
          >
            <div
              class="tracking-[.4rem]"
            >
              {{ a }}
            </div>

            <span>
              {{ a.length }}
            </span>
          </div>

          <template v-if="!showAll">
            <button
              type="button"
              class="btn btn-neutral btn-ghost"
              @click="showAll = true"
            >
              Show all
            </button>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
