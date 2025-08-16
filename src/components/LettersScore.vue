<script setup lang="ts">
  import { defineProps, defineEmits, ref, computed, watch, onMounted } from 'vue'

  interface Props {
    word?: string;
    letters: string;
  }

  interface Emits {
    (e: 'reset'): void;
    (e: 'preview', value: string): void;
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const loading = ref<boolean>(true)
  const anagrams = ref<string[]>([])
  const showAll = ref<boolean>(false)
  const previewWord = ref<string>("")
  const anagramsSlice = ref<number>(10)

  watch(previewWord, () => {
    emit("preview", previewWord.value)
  })

  onMounted(() => {
    previewWord.value = props.word || ""

    fetch(`https://ryandeba.com/anagrams/${props.letters}`)
      .then(r => r.json())
      .then(data => {
        anagrams.value = data
          .filter((e: string, i: number, a: string[]) => a.indexOf(e) == i) // TODO: this seems like it shouldn't be required here
          .map((a: string) => a.toUpperCase())

        loading.value = false
      })
      // TODO: catch
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
          <template v-if="word">
            <div class="text-center text-2xl">
              <template v-if="anagrams.indexOf(word) > -1">
                <span class="text-success">
                  {{ word.length }} points - {{ word }}
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
          </template>

          <div class="text-center text-lg">
            Best Words
          </div>

          <button
            v-for="a in anagrams.slice(0, showAll ? anagrams.length : anagramsSlice)"
            :key="a"
            type="button"
            class="btn btn-default justify-between"
            :class="{
              'btn-secondary': previewWord == a
            }"
            @click="previewWord = a"
          >
            <div
              class="tracking-[.4rem]"
            >
              {{ a }}
            </div>

            <span>
              {{ a.length }}
            </span>
          </button>

          <template v-if="anagrams.length == 0">
            <div class="text-center text-error">
              No words found
            </div>
          </template>

          <template v-if="!showAll && anagrams.length > anagramsSlice">
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
