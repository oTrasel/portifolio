<template>
  <router-view />
</template>

<script>
import { watch } from 'vue'
import { usePortfolioStore } from './stores/portfolio'

export default {
  name: 'App',
  setup() {
    const portfolioStore = usePortfolioStore()
    
    // Atualizar título da página quando o nome mudar
    watch(() => portfolioStore.hero.name, (name) => {
      if (name) {
        document.title = `${name} - Portfolio`
      }
    })
  }
}
</script>

<style>
#app {
  min-height: 100vh;
}
</style>
