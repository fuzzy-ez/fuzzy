<script setup lang="ts">
import { ref, version as vueVersion } from 'vue'
import { version as fuzzyVersion } from 'fuzzy-ui'

const msg = ref('Hello World!')
</script>

<template>
  <h1>{{ msg }}</h1>
  <p>
    fuzzy-ui {{ fuzzyVersion }} + Vue {{ vueVersion }}
  </p>
</template>

