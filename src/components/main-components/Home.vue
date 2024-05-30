<template>
  <div class="container">
    <div class="banner-wrapper">
      <Banner />
      <BannerCourses/>
      <BannerWithBlocks/>
    </div>

  </div>
</template>

<script>
import Banner from '@/components/home-components/banner.vue';
import BannerWithBlocks from '@/components/home-components/contentbanner.vue';
import BannerCourses from '@/components/home-components/cours.vue'

export default {
  name: 'Home',
  components: {
    Banner,
    BannerWithBlocks,
    BannerCourses// Убедитесь, что имя компонента соответствует импорту
  }
}
</script>

<style scoped>
.container {
  padding: 100px 240px; /* Общие отступы для всего контейнера */
  box-sizing: border-box; /* Учитывать отступы в ширину и высоту элемента */
}

.banner-wrapper {
  margin-bottom: 100px; /* Отступ снизу между компонентами */
}

.banner-wrapper:last-child {
  margin-bottom: 0; /* Убрать отступ у последнего компонента */
}
</style>
