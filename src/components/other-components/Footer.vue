<template>
  <div class="footer-container">
    <div class="footer-left">
      <img src="../../assets/logo/logo-white.svg" alt="Logo" class="logo">
      <p class="description">Краткое описание сайта.</p>
      <div class="cards">
        <img src="@/assets/cards/visa.png" alt="Card1" class="card card1">
        <img src="@/assets/cards/mcard.png" alt="Card2" class="card card2">
        <img src="@/assets/cards/mir.png" alt="Card3" class="card card3">
      </div>
    </div>
    <div class="footer-middle">
      <h2 class="info-title">Информация</h2>
      <ul class="info-menu">
        <li>Главная</li>
        <li>Все курсы</li>
        <li>Все задания</li>
        <li>Регистрация</li>
        <li>Личный кабинет</li>
        <li>Контакты</li>
      </ul>
    </div>
    <div class="footer-right">
      <h2 class="contacts-title">Контакты</h2>
      <p class="phone">+123 456 789</p>
      <p class="email">email@example.com</p>
      <p class="address">ул. Примерная, д. 1, Москва, Россия</p>
      <div class="social-icons">
        <img src="@/assets/social-media/youtube.svg" alt="SocialIcon1" class="social-icon">
        <img src="@/assets/social-media/twitter.svg" alt="SocialIcon2" class="social-icon">
        <img src="@/assets/social-media/vk.svg" alt="SocialIcon3" class="social-icon">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
.footer-container {
  background-color: #78258D;
  padding: 100px 20px;
  display: flex;
  justify-content: space-between;
  color: white;
  letter-spacing: 0.5px;
  font-family: Gilroy-Light;
}

.footer-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.logo {
  margin-top: 25px;
  margin-left: 20px;
}

.description {
  margin-top: 37px;
  font-size: 14px;
  margin-left: 20px;
}

.cards {
  display: flex;
  margin-top: 38px;
  margin-left: 20px;
}

.card {
  margin-right: 10px;
}

.card1 {
  width: 47px;
  height: 15px;
}

.card2 {
  width: 29px;
  height: 23px;
}

.card3 {
  width: 55px;
  height: 15px;
}

.footer-middle {
  margin-left: 200px;
}

.info-title {
  font-size: 24px;
  font-family: Gilroy-Bold;
}

.info-menu {
  margin-top: 11px;
  font-size: 16px;
  list-style: none;
  padding: 0;
}

.info-menu li {
  margin-bottom: 11px;
}

.footer-right {
  display: flex;
  flex-direction: column;
}

.contacts-title {
  font-size: 24px;
  font-family: Gilroy-Bold;
}

.phone {
  margin-top: 0px;
  font-size: 18px;
  font-family: Gilroy-Bold;
}

.email, .address {
  margin-top: 0px;
  font-size: 16px;
}

.footer-right .social-icons {
  display: flex;

}

.social-icon {
  margin-right: 10px;
  margin-top: 50px;
  cursor: pointer;
}

.cards img {
  display: block;
}
</style>
