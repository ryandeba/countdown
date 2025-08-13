<script setup lang="ts">
  import { defineModel, defineProps, defineEmits, ref, computed, onMounted } from 'vue'

  const props = defineProps(['word', 'letters'])
  const emit = defineEmits(["reset"])

  // TODO const model = defineModel({})

  const loading = ref(true)
  const anagrams = ref([])

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
          <div class="text-center text-xl tracking-[.4rem]">
            {{ word }}
          </div>

          <div class="text-center text-lg">
            <template v-if="anagrams.indexOf(word) > -1">
              <span class="text-success">
                {{ word.length }} points
              </span>
            </template>

            <template v-else>
              <span class="text-error">
                0 points
              </span>
            </template>

            <div class="mt-3">
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
            v-for="a in anagrams.slice(0, 10)"
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
        </template>
      </div>
    </div>
  </div>
</template>
