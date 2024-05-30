<template>
  <div>
    <Header @change-page="PageChange"/>
    <component :is="currentComponent"/>
    <Footer class="footer"/>
  </div>
</template>

<script>
import Header from './components/other-components/Header.vue';
import Footer from './components/other-components/Footer.vue';
import Home from './components/main-components/Home.vue';
import Courses from './components/main-components/Courses.vue';
import Tasks from './components/main-components/Tasks.vue';

export default {
  components: {
    Header,
    Footer,
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
.footer{
  padding: 100px 240px;
}
</style>
