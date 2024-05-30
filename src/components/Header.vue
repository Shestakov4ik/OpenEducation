<template>
  <header id="header">
    <div id="logo">
      <img src="../assets/logo.svg" alt="Logo" height="46">
    </div>
    <nav id="menu">
      <a :class="{ 'selected': page === 'home' }" @click="getPage('home')">Главная</a>
      <a :class="{ 'selected': page === 'courses' }" @click="getPage('courses')">Все курсы</a>
      <a :class="{ 'selected': page === 'tasks' }" @click="getPage('tasks')">Все задания</a>
      <a :class="{ 'selected': page === 'contacts' }" @click="getPage('contacts')" href="#contacts">Контакты</a>
    </nav>
    <a href="#auth" id="auth">Войти</a>
  </header>
</template>

<script>
export default {
  data(){
    return {
      page: 'home',
    }
  },
  methods:{
    getPage(page){
      this.page = page;
      this.$emit('change-page', page);
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'Gilroy-Light';
  src: url("../assets/fonts/Gilroy-Light.otf") format('opentype');
}
@font-face {
  font-family: 'Gilroy-ExtraBold';
  src: url("../assets/fonts/Gilroy-ExtraBold.otf") format('opentype');
}
@font-face {
  font-family: 'Gilroy-Bold';
  src: url("../assets/fonts/gilroy-bold.ttf") format('opentype');
}

.selected {
  color: #78258D !important;
}
#header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 70px;
  background-color: #FFFFFF;
  font-family: 'Gilroy-Light', sans-serif;
  font-weight: 600;
  letter-spacing: 0.5px;
}
#logo {
  margin-right: 100px;
}
#menu {
  flex-grow: 1;
  justify-content: center;

}
#menu a {
  margin: 0 15px;
  text-decoration: none;
  line-height: 16px;
  color: #333333;
  cursor: pointer;
}
#auth {
  padding: 14px 30px;
  background-color: #78258D;
  color: white;
  text-decoration: none;
  border-radius: 10px;
}
</style>
