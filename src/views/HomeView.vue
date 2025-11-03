<script setup lang="ts">
  import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex justify-center">
    <div class="card card-border bg-base-100 w-96 bg-neutral">
      <div class="card-body py-5">
        <p class="text-center text-lg">
          Welcome!
          Here, you can play the letters and numbers rounds from the British game show
          <a href="https://en.wikipedia.org/wiki/Countdown_(game_show)" target="_blank" class="link">Countdown</a>.
        </p>

        <div
          class="divider"
        ></div>

        <p class="text-center">
          Challenge yourself to find the longest word in a Letters round, or hit the target number in a Numbers round.
        </p>

        <div class="flex justify-around">
          <RouterLink
            to="/letters"
            class="btn btn-info"
          >
            Play Letters
          </RouterLink>

          <RouterLink
            to="/numbers"
            class="btn btn-info"
          >
            Play Numbers
          </RouterLink>
        </div>

        <div
          class="divider"
        ></div>

        <p class="text-center">
          Manually enter letters or numbers to find the best solutions.
        </p>

        <div class="flex justify-around">
          <RouterLink
            to="/solveLetters"
            class="btn btn-success"
          >
            Solve Letters
          </RouterLink>

          <RouterLink
            to="/solveNumbers"
            class="btn btn-success"
          >
            Solve Numbers
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
