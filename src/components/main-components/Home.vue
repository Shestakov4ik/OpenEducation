<template>
  <div class="container">
    <div class="banner-wrapper">
      <Banner />
      <BannerCourses/>
      <BannerWithBlocks/>
      <BannerTasks/>
      <BannerTariff/>
    </div>

  </div>
</template>

<script>
import Banner from '@/components/home-components/banner.vue';
import BannerWithBlocks from '@/components/home-components/contentBanner.vue';
import BannerCourses from '@/components/home-components/coursBanner.vue'
import BannerTasks from '@/components/home-components/tasksBanner.vue'
import BannerTariff from '@/components/other-components/tariff.vue'

export default {
  name: 'Home',
  components: {
    Banner,
    BannerWithBlocks,
    BannerCourses,
    BannerTasks,
    BannerTariff
  }
}
</script>

<style scoped>
.container {
  padding: 100px 240px;
  box-sizing: border-box;
}

.banner-wrapper {
  margin-bottom: 100px;
}

.banner-wrapper:last-child {
  margin-bottom: 0;
}
</style>
