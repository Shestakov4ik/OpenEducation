<template>
  <div class="wrapperok">
    <div class="sidebar">
      <div class="logo">
        <a href="#">
          <img src="@/assets/logo/logo.svg" alt="OpenEdu Logo">
        </a>
      </div>
      <nav class="menu">
        <router-link to="/cabhome" exact-active-class="selected" class="active">
          <img src="@/assets/cabinet/home.svg" alt="Sleep">
          <span>Главная</span>
        </router-link>
        <router-link to="/cabcourses" exact-active-class="selected">
          <img src="@/assets/cabinet/cours.svg" alt="Learn">
          <span>Курсы</span>
        </router-link>
        <router-link to="/cabtasks" exact-active-class="selected">
          <img src="@/assets/cabinet/tasks.svg" alt="Train">
          <span>Задания</span>
        </router-link>
      </nav>
      <div class="buttons">
        <router-link to="/">
          <img src="@/assets/cabinet/backtosait.svg" alt="Go To General Site">
          <span>Перейти на основной сайт</span>
        </router-link>
        <a href="#" class="tech-support">
          <img src="@/assets/cabinet/phonecall.svg" alt="Help Me">
          <span>Связаться с техподдержкой</span>
        </a>
      </div>
    </div>



  </div>
</template>

<script>

</script>

<style scoped>
.sidebar {
  width: 300px;
  height: 100vh;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  padding: 40px 30px;
  position: fixed;
  font-family: Gilroy-Light, sans-serif;
}
.logo a {
  cursor: pointer;
}
.buttons {
  display: flex;
  flex-direction: column;
}
.buttons a {
  display: flex;
  align-items: center;
  padding: 15px;
  color: #78258D;
}
.menu {
  padding: 0;
  margin: 50px 0 450px;
}
.menu li {
  list-style: none;
  padding: 12px;
  margin: 8px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.menu li.active, .menu li:hover, .menu li:active {
  background-color: #EFEFFF;
  border-radius: 10px;
  color: #78258D;
}
.menu li.active img path {
  fill: #78258D;
}
.menu li img, .buttons a img {
  margin-right: 10px;
}
.tech-support {
  border: 1px solid #78258D;
  border-radius: 10px;
}

.selected {
  color: #78258D !important;
}
</style>