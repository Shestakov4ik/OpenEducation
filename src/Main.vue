<template>
  <div>
    <Header @change-page="PageChange"/>
    <component :is="currentComponent"/>
    <Auth v-if="authOpened" @close="closeAuth" /> <!-- Добавляем условный рендеринг для компонента Auth -->
    <Footer class="footer"/>
  </div>
</template>

<script>
import Header from './components/other-components/Header.vue';
import Footer from './components/other-components/Footer.vue';
import Home from './components/main-components/Home.vue';
import Courses from './components/main-components/Courses.vue';
import Tasks from './components/main-components/Tasks.vue';
import Auth from './components/authorization/auth.vue';

export default {
  components: {
    Header,
    Footer,
    Home,
    Courses,
    Tasks,
    Auth
  },
  data() {
    return {
      currentComponent: 'Home',
      authOpened: false // Флаг для отслеживания открытия Auth
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
        case 'auth':
          this.authOpened = true; // Устанавливаем флаг authOpened в true
          break;
        default:
          this.currentComponent = 'Home';
      }
    },
    closeAuth() {
      this.authOpened = false; // Сбрасываем флаг authOpened при закрытии Auth
    }
  }
}
</script>

<style scoped>
.footer{
  padding: 100px 240px;
}
</style>
