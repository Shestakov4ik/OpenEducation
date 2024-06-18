<template>
  <div class="container">
    <div class="banner-wrapper">
      <div class="back">
        <p class="close" @click="this.$emit('closeInfo', 2)">Закрыть</p>
      </div>
      <CoursesTitle :title="cours.name" :url="cours.url_icon"/>
      <CourseDescription :description="cours.description"></CourseDescription>
      <CourseTariff class="tariFF" :tariff="tariffName" :tasks="cours.tasks" :lessons="cours.lessons" :chReg="reg"></CourseTariff>
      <CourseProgram class="Program" :lessons="lessons"></CourseProgram>
      <CourseReview class="review" :reviews="reviews"></CourseReview>
    </div>
  </div>
</template>

<script>
import supabase from '@/supabase.js';
import CoursesTitle from '@/components/courses-component/coursesTitle.vue';
import CourseDescription from "@/components/courses-component/courseDescription.vue";
import CourseTariff from "@/components/courses-component/courseTariff.vue";
import CourseProgram from "@/components/courses-component/courseProgram.vue";
import CourseReview from "@/components/courses-component/courseRewiew.vue"; // Обновлено

export default {
  name: 'courseinfo',
  components: {
    CoursesTitle,
    CourseDescription,
    CourseTariff,
    CourseProgram,
    CourseReview
  },
  data() {
    return {
      cours: {},
      per: null,
      tariffName: '',
      lessons: [],
      reviews: []
    };
  },
  props: {
    id: Number,
    reg: Number
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.per = this.id;
        console.log("InfoID: " + this.per);

        const { data: courseData, error: courseError } = await supabase.from('courses').select('*').eq('id', this.per);
        if (courseError) throw courseError;
        this.cours = courseData[0];

        const { data: tariffData, error: tariffError } = await supabase.from('tariff').select('name').eq('id', this.cours.id_tariff);
        if (tariffError) throw tariffError;
        this.tariffName = tariffData[0].name;

        const { data: lessonData, error: lessonError } = await supabase.from('lessons').select('*').eq('id_course', this.per);
        if (lessonError) throw lessonError;
        this.lessons = lessonData.map(lesson => ({
          id: lesson.id,
          name: lesson.name,
          description: lesson.description,
          content: lesson.content,
          id_course: lesson.id_course,
          time: lesson.time
        }));

        // Получение данных отзывов
        const { data: reviewData, error: reviewError } = await supabase
            .from('rewiews') // Проверьте правильность названия таблицы
            .select('id, rating, body, id_user')
            .eq('id_course', this.per);
        if (reviewError) throw reviewError;

        // Получение имен пользователей и объединение данных
        this.reviews = await Promise.all(reviewData.map(async (review) => {
          const { data: userData, error: userError } = await supabase
              .from('users')
              .select('name')
              .eq('id', review.id_user)
              .single();
          if (userError) throw userError;

          return {
            id: review.id,
            username: userData.name,
            rating: review.rating,
            body: review.body
          };
        }));

        console.log("Reviews:", this.reviews);

      } catch (error) {
        console.error('Ошибка при загрузке данных:', error.message);
      }
    }
  },
}
</script>

<style scoped>


.container {
  margin : 75px 50px;
  box-sizing: border-box;

}
.close{
  font-family: Gilroy-Light, sans-serif;
  font-size: 20px;
  letter-spacing: 0.5px;
  margin: 0;
  text-decoration: underline;
  cursor: pointer;
}
.tariFF{
  width: 100%;
  height: 100%;
}




</style>
