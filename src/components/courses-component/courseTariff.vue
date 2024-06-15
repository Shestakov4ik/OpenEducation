<template>
  <div class="course-info">
    <div class="desc">
      <div class="title">
        <span class="black-text">Тариф </span>
        <span class="purple-text">{{ tariff }}</span>
      </div>
      <div class="details">
        <span>{{ tasks }}</span>
        <span class="task"> Заданий</span>
        <span>{{ lessons }}</span>
        <span class="less"> Урока</span>
      </div>
    </div>
    <button class="register-button">Записаться на курс</button>
  </div>
</template>

<script>
export default {
  name: 'CourseInfo',
  props: {
    tariff: String,
    tasks: Number,
    lessons: Number
  }
};
</script>

<style scoped>
.course-info {
  padding: 40px 0px;
  width: 100%;
  height: 100%;
  letter-spacing: 0.5px;
  font-family: 'Gilroy-Light', sans-serif;

}

.title {
  font-family: Gilroy-ExtraBold, sans-serif;
  width: 75%;
}

.desc{
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  justify-content: space-between;
}

.details {
  font-family: Gilroy-Light, sans-serif;
  width: 25%;

}
.task{
  margin-right: 30px;
}

.less{

}

.black-text {
  color: black;
  font-size: 32px;
}

.purple-text {
  color: #78258D;
  font-size: 32px;
}

.register-button {
  background-color: #78258D;
  color: white;
  font-size: 18px;
  padding: 18px 260px;
  border: none;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  letter-spacing: 0.5px;
  font-family: Gilroy-Light, sans-serif;
}
</style>
