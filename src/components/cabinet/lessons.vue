<template>
  <div class="lessons-wrapper">
    <div class="go-to-back">
      <img src="../../assets/back.svg" @click="back" alt="Go to back">
    </div>
    <div class="course-info">
      <div class="course-icon">
        <img :src="course.url_icon" alt="Course Icon" class="course-icon" v-if="course.url_icon">
      </div>
      <span class="course-name">{{ course.name }}</span>
    </div>
    <ul class="lessons-list">
      <h2>Программа курса</h2>
      <li v-for="(lesson, index) in lessons"
          :key="lesson.id"
          class="lesson-item"
          @click="this.$emit('openContent', lesson.id)">
        <span class="lesson-index">Урок {{ index + 1 }}:</span>
        <span class="lesson-name">{{ lesson.name }}</span>
      </li>
    </ul>
  </div>

</template>


<script>
import { createClient } from '@supabase/supabase-js';
import supabase from "@/supabase.js";
import router from "@/router.js";

export default {
  name:"less",
  props: {
    id: Number,
  },
  data() {
    return {
      lessons: [],
      course: {},
    };
  },
  created() {
    this.fetchData();
    this.fetchCourseInfo();
  },
  methods: {
    openContent(){
      router.push("/cabinet/less");
    },
    async fetchData() {
           try {
        const { data: lessonsData, error } = await supabase
            .from('lessons')
            .select('*')
            .eq('id_course', this.id);

        if (error) throw error;


        this.lessons = lessonsData;
      } catch (error) {
        console.error('Ошибка при загрузке уроков:', error.message);
      }
    },
    back(){
      router.push("/cabinet/courses")
    },
    async fetchCourseInfo() {
      try {
        const { data: courseData, error } = await supabase
            .from('courses')
            .select('*')
            .eq('id', this.id)
            .single();

        if (error) {
          throw error;
        }

        this.course = courseData;
      } catch (error) {
        console.error('Ошибка при загрузке информации о курсе:', error.message);
      }
    },


  },

}
</script>



<style scoped>
.go-to-back {
  cursor: pointer;
}
.course-name {
  font-family: Gilroy-ExtraBold, sans-serif;
  font-size: 46px;
  font-weight: 900;
}
.lessons-wrapper {
  width: 75%;
  padding: 0 90px;
  margin-left: 330px;
  height: 100%;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  font-family: Gilroy-Regular, sans-serif;
  font-weight: 500;
}
.course-info {
  display: flex;
  align-items: center;
  gap: 30px;
}
.course-icon {
  width: 100px;
  height: 100px;
}
.course-icon img {
  width: 100%;
  height: 100%;
}
.lessons-list h2 {
  font-family: Gilroy-ExtraBold, sans-serif;
  font-weight: 900;
  font-size: 32px;
}
.lessons-list {
  list-style: none;
  padding: 0;
  margin: 0 0 100px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.lesson-item {
  display: flex;
  align-items: center;
  padding: 25px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px 0 #EEEDF2;
  cursor: pointer;
}

.lesson-index {
  color: #800080; /* Фиолетовый цвет */
  font-weight: bold;
  margin-right: 10px;
}

.lesson-name {
  font-size: 18px;
}
</style>