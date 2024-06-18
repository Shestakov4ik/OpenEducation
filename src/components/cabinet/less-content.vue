<template>
  <div class="lesscontent-wrapper">
    <div class="back-to-go">
      <img src="../../assets/back.svg" alt="Back to go" @click="backCourse">
    </div>
    <div class="read-column">
      <div class="lesscontent-title">
        <h1>
          <b>Урок 1: </b>
          <span>Быстрый старт с Postman</span>
        </h1>
      </div>
      <div class="lesscontent-content">
        <div class="section">
          <h2 class="section-title">Введение</h2>
          <div class="section-text">
            <p class="paragraph">В этом модуле мы познакомимся с приложением Postman. Рассмотрим его назначение, основные возможности и задачи, которые можно решать с его помощью. Затем перейдем к его установке. Познакомимся с пользовательским интерфейсом Postman и его главными элементами. В конце занятия отправим первый GET запрос с его помощью.</p>
          </div>
          <img src="../../assets/lessons/postman-lesson1-img1.png" alt="postman-lesson1-img1" class="section-img" width="346">
        </div>
        <div class="section">
          <h2 class="section-title">Что такое Postman?</h2>
          <div class="section-text">
            <p class="paragraph">Основное назначение Postman - облегчить разработку, тестирование и документирование API. С его помощью можно отправить данные в запросе и проверить полученный ответ. Также у него есть много других интересных возможностей. Можно например сохранять запросы в папки и коллекции, удобно параметризовывать запросы. Запускать коллекции с помощью Collection Runner и использовать их как автоматизированные тесты. Postman позволяет проектировать дизайн API и создавать на его основе Mock-сервер.</p>
            <p class="paragraph">Тестировщики, с помощью Postman могут отправлять HTTP/HTTPS запросы к сервисам и получать ответы от них. С помощью такого подхода можно протестировать бэкенд сервисы и убедиться, что они работают корректно. С помощью Postman можно выполнять запросы к различным типам API, таким как REST, SOAP и GraphQL.</p>
          </div>
          <img src="../../assets/lessons/postman-lesson1-img2.png" alt="postman-lesson1-img2" class="section-img" width="682">
        </div>
        <div class="section">
          <h2 class="section-title">Установка</h2>
          <div class="section-text">
            <p class="paragraph"><b>Для установки под Windows:</b></p>
            <ul class="paragraph">
              <li>1. Загрузите последнюю версию Postman.</li>
              <li>2. Запустите .exe файл для установки.</li>
              <li>3. После окончания процесса установки потребуется зарегистрироваться. Для простоты можно выбрать вариант регистрации с помощью существующего google аккаунта.</li>
            </ul>
            <p class="paragraph">Также у Postman есть web версия, которая работает прямо в браузере. Она доступна по этой ссылке. На данный момент эта версия находится в процессе доработок, поэтому часть возможностей настольной версии там недоступна.</p>
            <p class="paragraph">Попробуйте установить себе подходящую версию Postman, чтобы в дальнейшем была возможность практиковать полученные знания.</p>
          </div>
          <img src="../../assets/lessons/postman-lesson1-img3.png" alt="postman-lesson1-img3" class="section-img" width="682">
        </div>
      </div>
    </div>
    <div class="arrays">
      <div class="prev deactive-array">Предыдущий</div>
      <div class="next">Следующий</div>
    </div>
  </div>
</template>

<script>
import router from "@/router.js";

export default {
  name: "lesscontent",
  props: {
    idLess: Number,
  },
  created() {
    console.log("lesscon", this.idLess)
  },
  methods:{
    backCourse(){
      router.push("/cabinet/lessons")
    }
  }
}
</script>


<style scoped>
.lesscontent-wrapper {
  width: 75%;
  padding: 0 90px 100px;
  margin-left: 330px;
  height: 100%;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  font-family: Gilroy-Regular, sans-serif;
  font-weight: 500;
}
.lesscontent-title h1 {
  font-family: Gilroy-Light, sans-serif;
  font-size: 46px;
  margin: 0 0 50px;
}
.lesscontent-title h1 b {
  font-family: Gilroy-Bold, sans-serif;
}
.read-column {
  width: 60%;
  margin: auto;
}
.lesscontent-content {
  display: flex;
  flex-direction: column;
  gap: 50px;
}
.section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.section-title {
  font-family: Gilroy-Bold, sans-serif;
  font-size: 32px;
  margin: 0;
}
p {
  margin: 0;
  padding: 0;
}
.paragraph {
  font-family: Gilroy-Regular, sans-serif;
  font-size: 16px;
  letter-spacing: 0.1px;
  line-height: 24px;
  margin-bottom: 10px;
  list-style: none;
}

.arrays {
  display: flex;
  justify-content: space-between;
}
.arrays div {
  cursor: pointer;
}
.arrays .deactive-array {
  cursor: default;
  color: #0005;
}
.back-to-go{
  cursor: pointer;
}

</style>