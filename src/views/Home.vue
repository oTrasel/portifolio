<template>
  <div>
    <NavBar />
    <main>
      <HeroSection />
      <AboutSection v-if="isSectionVisible('about')" />
      <ExperienceSection v-if="isSectionVisible('experiences')" />
      <SkillsSection v-if="isSectionVisible('skills')" />
      <ProjectsSection v-if="isSectionVisible('projects')" />
      <ContactSection v-if="isSectionVisible('contact')" />
    </main>
    <FooterSection />
  </div>
</template>

<script>
import { usePortfolioStore } from '../stores/portfolio'
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ExperienceSection from '../components/ExperienceSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import ContactSection from '../components/ContactSection.vue'
import FooterSection from '../components/FooterSection.vue'

export default {
  name: 'Home',
  components: {
    NavBar,
    HeroSection,
    AboutSection,
    ExperienceSection,
    SkillsSection,
    ProjectsSection,
    ContactSection,
    FooterSection
  },
  setup() {
    const portfolioStore = usePortfolioStore()
    
    const isSectionVisible = (key) => {
      return portfolioStore.isSectionVisible(key)
    }
    
    return { isSectionVisible }
  }
}
</script>

<style scoped>
main {
  padding-top: 70px;
}
</style>
