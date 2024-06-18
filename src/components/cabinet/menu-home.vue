<template>
  <div class="content">
    <div class="face">
      <div class="title">
        <h1>Добро пожаловать<br><span class="color-violet">в OpenEdu</span></h1>
        <p class="subtitle">Достигайте своих целей с современной и доступной образовательной платформой</p>
      </div>
      <div class="lc-img">
        <img src="@/assets/men-num2.png" alt="Smart Boy">
      </div>
    </div>
    <div class="infoblock tariff">
      <div class="infoblock-header">
        <h2>Ваш тариф</h2>
        <p class="tariff-name color-violet">Премиум</p>
      </div>
    </div>
    <div class="infoblock courses-current">
      <div class="infoblock-header">
        <h2>Прохожу сейчас</h2>
        <a class="infoblock-button color-violet" @click="openCourse">Все курсы</a>
      </div>
      <div class="courses-content">
        <div class="courses-list">
          <div
              class="course-block"
              v-for="course in filteredCourses"
              :key="course.id"
              :style="{ background: course.color }"
              @click="this.$emit('openInfo', course.id)">
            <div class="icon-container">
              <img :src="course.url_icon" alt="Icon" class="icon">
            </div>
            <div class="contentBlock">
              <h2>{{ course.name }}</h2>
              <div class="details">
                <span class="course-type">{{ getTariffName(course.id_tariff) }}</span>
                <span class="tariff-type">{{ getTypeName(course.id_direction) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="infoblock courses-ready">
      <div class="infoblock-header">
        <h2>Пройденные курсы</h2>
        <a class="infoblock-button color-violet" @click="openCourse">Все курсы</a>
      </div>
      <div class="courses-content">
        <div class="courses-list">
          <div
              class="course-block"
              v-for="course in completedCourses"
              :key="course.id"
              :style="{ background: course.color }"
              @click="this.$emit('openInfo', course.id)">
            <div class="icon-container">
              <img :src="course.url_icon" alt="Icon" class="icon">
            </div>
            <div class="contentBlock">
              <h2>{{ course.name }}</h2>
              <div class="details">
                <span class="course-type">{{ getTariffName(course.id_tariff) }}</span>
                <span class="tariff-type">{{ getTypeName(course.id_direction) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import supabase from "@/supabase.js";
import router from "@/router.js";

export default {
  name: "cabHome",
  props: {
    userId: Number
  },
  data() {
    return {
      courses: [],
      completedCourses: [], // Новый массив для завершенных курсов
      directions: [],
      tariffs: [],
      currentTypeFilter: null,
      selectedTariffs: [],
      featuredCourse: null,
      randomPer: 25
    };
  },
  computed: {
    filteredCourses() {
      let filtered = this.courses;

      if (this.currentTypeFilter !== null) {
        filtered = filtered.filter(course => course.id_direction === this.currentTypeFilter);
      }

      if (this.selectedTariffs.length > 0) {
        filtered = filtered.filter(course => this.selectedTariffs.includes(course.id_tariff));
      }

      this.courses.sort((a, b) => a.id - b.id);
      return filtered;
    },
    sortedTariffs() {
      return this.tariffs.sort((a, b) => a.id - b.id);
    }
  },
  created() {
    this.fetchData();
  },
  methods:{
    openCourse(){
      router.push("/cabinet/courses")
    },
    async fetchData() {
      try {
        // Загрузка текущих курсов
        const { data: myCoursesData, error: myCoursesError } = await supabase
            .from('myCourses')
            .select('id_course')
            .eq('id_user',1) // Используйте пропс userId
            .eq('status', 'Начатый');

        if (myCoursesError) throw myCoursesError;
        console.log("My Courses Data:", myCoursesData);

        const courseIds = myCoursesData.map(mc => mc.id_course);

        if (courseIds.length > 0) {
          const { data: coursesData, error: coursesError } = await supabase
              .from('courses')
              .select('*')
              .in('id', courseIds);

          if (coursesError) throw coursesError;
          console.log("Courses Data:", coursesData);

          this.courses = coursesData.map(course => ({
            id: course.id,
            name: course.name,
            description: course.description,
            id_tariff: course.id_tariff,
            id_direction: course.id_direction,
            color: course.background,
            url_icon: course.url_icon
          }));

          this.featuredCourse = this.courses.length > 0 ? this.courses[0] : null;
        }

        // Загрузка завершенных курсов
        const { data: completedCoursesData, error: completedCoursesError } = await supabase
            .from('myCourses')
            .select('id_course')
            .eq('id_user', 1) // Используйте пропс userId
            .eq('status', 'Пройденный');

        if (completedCoursesError) throw completedCoursesError;
        console.log("Completed Courses Data:", completedCoursesData);

        const completedCourseIds = completedCoursesData.map(mc => mc.id_course);

        if (completedCourseIds.length > 0) {
          const { data: completedCourses, error: completedCoursesError } = await supabase
              .from('courses')
              .select('*')
              .in('id', completedCourseIds);

          if (completedCoursesError) throw completedCoursesError;
          console.log("Completed Courses Details:", completedCourses);

          this.completedCourses = completedCourses.map(course => ({
            id: course.id,
            name: course.name,
            description: course.description,
            id_tariff: course.id_tariff,
            id_direction: course.id_direction,
            color: course.background,
            url_icon: course.url_icon
          }));
        }

        // Загрузка направлений и тарифов
        const { data: directionsData, error: directionsError } = await supabase.from('direction').select('*');
        if (directionsError) throw directionsError;
        console.log("Directions Data:", directionsData);

        const { data: tariffsData, error: tariffsError } = await supabase.from('tariff').select('*');
        if (tariffsError) throw tariffsError;
        console.log("Tariffs Data:", tariffsData);

        this.directions = directionsData;
        this.tariffs = tariffsData;
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error.message);
      }
    },
    applyTypeFilter(directionId) {
      this.currentTypeFilter = directionId;
    },
    getTypeName(directionId) {
      const direction = this.directions.find(d => d.id === directionId);
      return direction ? direction.name : '';
    },
    getTariffName(tariffId) {
      const tariff = this.tariffs.find(t => t.id === tariffId);
      return tariff ? tariff.name : '';
    }
  }
}
</script>

<style scoped>
.content {
  width: 100%;
  padding: 0 90px;
  height: 100vh;
  margin-left: 360px;
}
.color-violet {
  color: #78258D;
}
.infoblock {
  background-color: #F9F9F9;
  border-radius: 20px;
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
  font-family: Gilroy-Bold, sans-serif;
  margin: 0;
}
.infoblock-button {
  border-radius: 8px;
  border: 1px solid #78258D;
  padding: 12px 16px;
  font-weight: 600;
  font-family: Gilroy-Light, sans-serif;
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
  font-family: Gilroy-ExtraBold, sans-serif;
}
.subtitle {
  font-size: 20px;
  line-height: 35px;
  color: #828282;
  font-family: Gilroy-Light, sans-serif;
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

/* Тариф */
.tariff-name {
  font-size: 18px;
  font-family: Gilroy-Light,sans-serif;
}

.courses-content {
  display: flex;
  justify-content: space-between;
  max-width: 100%;
}

.courses-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-right: 40px;
  flex-grow: 1;
}

.course-block {
  display: inline-block;
  vertical-align: top;
  width: 435px;
  height: 264px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  box-sizing: border-box;
  cursor: pointer;
}

.icon-container {
  width: 48px;
  height: 48px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.title {
  font-family: Gilroy-ExtraBold;
  font-size: 46px;
}

.contentBlock {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.content h2 {
  margin: 0;
  font-size: 26px;
  font-family: Gilroy-Bold;
}

.details {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-family: 'Gilroy-Light', sans-serif;
}

.course-type {
  font-size: 16px;
  color: #000000;
}

.tariff-type {
  color: #78258D;
}
</style>
