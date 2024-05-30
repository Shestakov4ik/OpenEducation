<template>
  <div>
    <Header @change-page="PageChange"/>
    <component :is="currentComponent"/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Home from './components/main-components/Home.vue';
import Courses from './components/main-components/Courses.vue';
import Tasks from './components/main-components/Tasks.vue';

export default {
  components: {
    Header,
    Home,
    Courses,
    Tasks
  },
  data() {
    return {
      currentComponent: 'Home'
    }
  },
  methods: {
    PageChange(page) {
      switch (page) {
        case 'home':
          this.currentComponent = 'Home';
          break;
        case 'courses':
          this.currentComponent = 'Courses';
          break;
        case 'tasks':
          this.currentComponent = 'Tasks';
          break;
        default:
          this.currentComponent = 'Home';
      }
    }
  }
}
</script>

<style scoped>

</style>
