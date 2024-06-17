<template>
  <header id="header">
    <div id="logo">
      <img src="../../assets/logo/logo.svg" alt="Logo" height="46">
    </div>
    <nav id="menu">
      <router-link to="/" exact-active-class="selected">Главная</router-link>
      <router-link to="/courses" exact-active-class="selected">Все курсы</router-link>
      <router-link to="/tasks" exact-active-class="selected">Все задания</router-link>
      <router-link to="/contacts" exact-active-class="selected">Контакты</router-link>
    </nav>

    <a class="auth" href="/cabinet" v-if="auth">Личный кабинет</a>
    <a class="auth" v-else @click="$emit('change-page', 'auth')">Войти</a>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    auth: Boolean
  },
};
</script>

<style scoped>
@font-face {
  font-family: 'Gilroy-Light';
  src: url("../../assets/fonts/Gilroy-Light.otf") format('opentype');
}
@font-face {
  font-family: 'Gilroy-ExtraBold';
  src: url("../../assets/fonts/Gilroy-ExtraBold.otf") format('opentype');
}
@font-face {
  font-family: 'Gilroy-Bold';
  src: url("../../assets/fonts/gilroy-bold.ttf") format('opentype');
}
@font-face {
  font-family: 'Gilroy-Regular';
  src: url("../../assets/fonts/gilroy-regular.ttf") format('opentype');
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
.auth {
  padding: 14px 30px;
  background-color: #78258D;
  color: white;
  text-decoration: none;
  border-radius: 10px;
  cursor: pointer;
}
</style>
