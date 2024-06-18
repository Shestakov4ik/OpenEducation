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
        <a class="infoblock-button color-violet">Все курсы</a>
      </div>
      <div class="courses-content">
        <div class="courses-list">
          <div
              class="course-block"
              v-for="course in filteredCourses"
              :key="course.id"
              :style="{ background: course.color }"
              @click = "this.$emit('openInfo', course.id)">
            <div class="icon-container">
              <img :src="course.url_icon" alt="Icon" class="icon">
            </div>
            <div class="content">
              <h2>{{ course.name }}</h2>
              <div class="details">
                <span class="course-type">{{ getTariffName(course.id_tariff) }}</span>
                <span class="tariff-type">{{ getTypeName(course.id_direction) }}</span>
              </div>
            </div>
          </div>
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
  </div>
</template>

<script>
import supabase from "@/supabase.js";

export default {
  name: "cabHome",
  props: {
    userId: Number
  },
  data() {
    return {
      courses: [],
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
    async fetchData() {
      try {
        const { data: coursesData, error: coursesError } = await supabase.from('courses').select('*');
        if (coursesError) throw coursesError;

        const { data: directionsData, error: directionsError } = await supabase.from('direction').select('*');
        if (directionsError) throw directionsError;

        const { data: tariffsData, error: tariffsError } = await supabase.from('tariff').select('*');
        if (tariffsError) throw tariffsError;

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
    },
    
  }
}

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
  font-family: Gilroy-Bold, sans-serif;
  margin: 0;
}
.infoblock-button {
  border-radius: 8px;
  border: 1px solid #78258D;
  padding: 12px 16px;
  font-weight: 600;
  font-family: Gilroy-Lightб, sans-serif;
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


/*тариф*/
.tariff-name {
  font-size: 18px;
  font-family: Gilroy-Light,sans-serif;
}

.courses-content {
  display: flex;
  justify-content: space-between;
}

.courses-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-right: 40px;
  flex-grow: 1;
  max-width: calc(100% - 50px);
}

.course-block {
  display: inline-block;
  vertical-align: top;
  width: 440px;
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

.content {
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