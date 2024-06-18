<template>
  <div class="lessons-wrapper">
    <div class="course-info">
      <img :src="course.url_icon" alt="Course Icon" class="course-icon" v-if="course.url_icon">
      <span class="course-name">{{ course.name }}</span>
    </div>
    <ul class="lessons-list">
      <li v-for="(lesson, index) in lessons" :key="lesson.id" class="lesson-item">
        <span class="lesson-index">Урок {{ index + 1 }}:</span>
        <span class="lesson-name">{{ lesson.name }}</span>
      </li>
    </ul>
  </div>

</template>


<script>
import { createClient } from '@supabase/supabase-js';
import supabase from "@/supabase.js";

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
.course-name {
  font-family: Gilroy, sans-serif;
  font-size: 46px;
  font-weight: 900;
}
.lessons-wrapper {
  background: white;
  width: 100%;
  padding: 0 90px;
  margin-left: 330px;
  height: 100%;
  margin-top: 50px;
  display: inline-block;
  font-family: Gilroy-Light, sans-serif;
}

.lessons-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.lesson-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 20px 0;
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