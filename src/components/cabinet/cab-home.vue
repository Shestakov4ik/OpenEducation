<template>
  <div class="content">
    <div class="face">
      <div class="title">
        <h1>Добро пожаловать<br><span class="color-violet">в OpenEdu</span></h1>
        <p class="subtitle">Достигайте своих целей с современной и доступной образовательной платформой</p>
      </div>
      <div class="lc-img">
        <img src="../src/assets/smart-boy.png" alt="Smart Boy">
      </div>
    </div>
    <div class="infoblock tariff">
      <div class="infoblock-header">
        <h2>Ваш тариф</h2>
        <p class="tariff-name color-violet">Начальный</p>
      </div>
    </div>
    <div class="infoblock courses-current">
      <div class="infoblock-header">
        <h2>Прохожу сейчас</h2>
        <a class="infoblock-button color-violet">Все курсы</a>
      </div>
      <div class="courses-list">
        <div class="course">Course</div>
        <div class="course">Course</div>
        <div class="course">Course</div>
      </div>
    </div>
    <div class="infoblock courses-ready">
      <div class="infoblock-header">
        <h2>Пройденные курсы</h2>
        <a class="infoblock-button color-violet">Все курсы</a>
      </div>
      <div class="courses-list">
        <div class="course">Course</div>
        <div class="course">Course</div>
        <div class="course">Course</div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.content {
  width: 100%;
  padding: 0 90px;
  margin-left: 360px;
}
.color-violet {
  color: #78258D;
}
.infoblock {
  background-color: #F9F9F9;
  border-radius: 20px;
  /*box-shadow: 0 4px 10px 0 #F9F9F9;*/
  display: flex;
  flex-direction: column;
  margin: 40px 0;
  padding: 20px 40px;
}
.infoblock-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.infoblock h2 {
  color: #232323;
  font-size: 32px;
  font-weight: 900;
  margin: 0;
}
.infoblock-button {
  border-radius: 8px;
  border: 1px solid #78258D;
  padding: 12px 16px;
  font-weight: 600;
  cursor: pointer;
}
.courses-list {
  display: flex;
  padding: 30px 0 0;
}

.face{
  display: flex;
  padding: 125px 110px;
  align-items: center;
}
.title {
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 100px;
}
.title h1, .title span {
  font-size: 60px;
  font-weight: 900;
}
.subtitle {
  font-size: 20px;
  line-height: 35px;
  color: #828282;
  margin: 0;
}
.lc-img {
  width: 40%;
  display: flex;
  justify-content: center;
}
.lc-img img {
  width: 100%;
}


/*тариф*/
.tariff-name {
  font-size: 18px;
}

</style>