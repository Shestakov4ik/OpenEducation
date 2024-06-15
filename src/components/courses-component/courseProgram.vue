<template>
  <div>
    <h2>Программа курса</h2>
    <div class="lesson" v-for="(lesson, index) in lessons" :key="index">
      <span class="lesson-index">Урок {{ index + 1 }}:</span>
      <span class="lesson-title"> {{ lesson.name }}</span>
      <span class="lesson-duration">{{ lesson.time }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseProgram',
  props: {
    lessons: {
      type: Array,
      required: true,
      default: () => []
    }
  }
};
</script>

<style scoped>
h2 {
  font-size: 32px;
  font-family: Gilroy-ExtraBold, sans-serif;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
}

.lesson {
  padding: 24px 27px;
  margin-bottom: 10px;
  background-color: #F9F9F9;
  display: flex;

  align-items: center;
  border-radius: 8px;
}

.lesson-index {
  font-size: 16px;
  font-family: Gilroy-Light, sans-serif;
  color: #641F76;
  margin-right: 5px;
  width: 9%;
}

.lesson-title {
  font-size: 16px;
  font-family: Gilroy-Light, sans-serif;
  color: #232323;
  width: 76%;
}

.lesson-duration {
  font-size: 16px;
  font-family: Gilroy-Light, sans-serif;
  color: #828282;
  width: 15%;
}
</style>
