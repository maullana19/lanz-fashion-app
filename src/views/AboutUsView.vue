<script setup lang="ts">
/* ---------------------------- IMPORT STATEMENT ---------------------------- */
import AboutSection from '@/components/sections/AboutSection.vue'
import aboutus from '@/data/aboutus.json'

/* ----------------------------- LOGIC STATEMENT ---------------------------- */
const dataAboutUs = aboutus.find((item) => 'aboutUsData' in item)?.aboutUsData
const dataVissionAndMission = aboutus.find(
  (item) => 'vissionAndMissionData' in item,
)?.vissionAndMissionData
const dataAchievements = aboutus.find((item) => 'achievements' in item)?.achievements
</script>

<template>
  <AboutSection
    :title="dataAboutUs?.title"
    :subtitle="dataAboutUs?.subtitle"
    :image-src="dataAboutUs?.imageSrc"
    :vission="dataVissionAndMission?.vission"
    :mission="dataVissionAndMission?.mission"
    :values="dataVissionAndMission?.values"
    :achievementTitle="dataAchievements?.title"
    :achievementSold="dataAchievements?.sold"
    :achievementAward="dataAchievements?.awards"
    :achievementSatisfaction="dataAchievements?.satisfaction"
  />
</template>
