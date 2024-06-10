<template>
  <div class="container">
    <div class="banner-wrapper">
      <div class="back">
        <p class="close" @click="this.$emit('closeInfo', 2)">Закрыть</p>
      </div>
      <CoursesTitle :title="cours.name" :url="cours.url_icon"/>

    </div>

  </div>
</template>

<script>
import supabase from '@/supabase.js';
import CoursesTitle from '@/components/courses-component/coursesTitle.vue';

export default {
  name: 'courseinfo',
  components: {
    CoursesTitle,
  },
  data(){
    return{
      cours: {},
      per: null

    }
  },
  props:{
    id: Number
  },
  created() {
    this.fetchData()
  },
  methods:{
    async fetchData() {
      try {

        this.per = this.id
        console.log("InfoID: " + this.per)
        const { data: courseData, error: courseError } = await supabase.from('courses').select('*').eq('id', this.per);
        if (courseError) throw courseError;
        this.cours = courseData[0];
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

.banner-wrapper {



}
</style>
