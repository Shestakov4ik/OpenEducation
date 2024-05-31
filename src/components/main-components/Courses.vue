<template>
  <div class="container">
    <div class="banner-wrapper">
      <CoursesAll />
    </div>

  </div>
</template>

<script>
import CoursesAll from '@/components/courses-component/coursesAll.vue';


export default {
  name: 'Home',
  components: {
    CoursesAll
  }
}
</script>

<style scoped>
.container {
  padding: 50px 240px 100px 240px;
  box-sizing: border-box;
}

.banner-wrapper {
  margin-bottom: 100px;
}

.banner-wrapper:last-child {
  margin-bottom: 0;
}
</style>
