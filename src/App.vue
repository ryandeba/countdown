<script setup lang="ts">
  import { ref } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'

  const links = ref<object[]>([
    { path: "/", label: "Home", },
    { path: "/letters", label: "Play Letters", },
    { path: "/solveLetters", label: "Solve Letters", },
    { path: "/solveNumbers", label: "Solve Numbers", },
  ])

  const dropdown = ref<HTMLInputElement | null>(null)

  const closeDropdown = () => {
    dropdown.value && dropdown.value.removeAttribute('open')
  }
</script>

<template>
  <div class="navbar bg-base-300 shadow-sm mb-5">
    <div class="navbar-start">
      <details class="dropdown" ref="dropdown">
        <summary class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </summary>

        <ul
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li v-for="l in links">
            <RouterLink
              :to="l.path"
              :class="{
                'underline': $route.path === l.path,
              }"
              @click="closeDropdown"
            >
              {{ l.label }}
            </RouterLink>
          </li>
        </ul>
      </details>
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
