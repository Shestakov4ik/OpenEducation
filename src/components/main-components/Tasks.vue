<template>
  <div class="container">
    <div class="banner-wrapper">
      <tasksAll />
    </div>

  </div>
</template>

<script>
import tasksAll from '@/components/tasks-components/tasksAll.vue';


export default {
  name: 'Home',
  components: {
    tasksAll
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
