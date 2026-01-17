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

    // Aplicar cores dinamicamente como CSS custom properties
    watch(() => portfolioStore.colors, (colors) => {
      if (colors && Object.keys(colors).length > 0) {
        const root = document.documentElement
        
        // Função auxiliar para converter hex para RGB
        const hexToRgb = (hex) => {
          const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
          return result 
            ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
            : '0, 0, 0'
        }
        
        root.style.setProperty('--primary-color', colors.primary_color)
        root.style.setProperty('--primary-color-rgb', hexToRgb(colors.primary_color))
        root.style.setProperty('--secondary-color', colors.secondary_color)
        root.style.setProperty('--accent-color', colors.accent_color)
        root.style.setProperty('--dark-bg', colors.dark_bg)
        root.style.setProperty('--darker-bg', colors.darker_bg)
        root.style.setProperty('--light-text', colors.light_text)
        root.style.setProperty('--gray-text', colors.gray_text)
        root.style.setProperty('--card-bg', colors.card_bg)
      }
    }, { deep: true, immediate: true })
  }
}
</script>

<style>
#app {
  min-height: 100vh;
}
</style>
