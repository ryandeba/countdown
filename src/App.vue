<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="navbar bg-base-300 shadow-sm mb-5">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
            <RouterLink
              to="/"
            >
              Home
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/letters"
            >
              Play: Letters
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/solveLetters"
            >
              Solve: Letters
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/solveNumbers"
            >
              Solve: Numbers
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="navbar-center text-xl font-medium">
      Countdown
    </div>

    <div class="navbar-end">
    </div>
  </div>

  <main id="main">
    <RouterView />
  </main>
</template>
