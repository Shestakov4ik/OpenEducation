<template>
  <div class="courses-container">
    <div class="header">
      <h1>Курсы по IT-специальностям</h1>
      <button class="all-courses-button" @click="goToAllCourses">Все курсы</button>
    </div>
    <div class="slider-container">
      <div class="slider" ref="slider">
        <div class="data-block" v-for="item in items" :key="item.id" :style="{ backgroundColor: item.background }" @click="selectCourse(item.id)">
          <img :src="item.url_icon" alt="Icon" class="icon">
          <div class="content">
            <h2>{{ item.name }}</h2>
            <div class="details">
              <span class="course-tariff">{{ getTariffName(item.id_tariff) }}</span>
              <span class="course-type">{{ getDirectionName(item.id_direction) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="dots">
        <span
            v-for="(item, index) in Math.ceil(items.length / 3)"
            :key="index"
            class="dot"
            :class="{ active: currentIndex === index }"
            @click="scrollTo(index)">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import supabase from '@/supabase';

export default {
  data() {
    return {
      items: [],
      currentIndex: 0,
      tariffs: [],
      directions: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const { data: courses, error: coursesError } = await supabase.from('courses').select('*');
      console.log('Courses:', courses);
      if (coursesError) {
        console.error('Error fetching courses:', coursesError.message);
        return;
      }

      const { data: tariffs, error: tariffsError } = await supabase.from('tariff').select('*');
      console.log('Tariffs:', tariffs);
      if (tariffsError) {
        console.error('Error fetching tariffs:', tariffsError.message);
        return;
      }

      const { data: directions, error: directionsError } = await supabase.from('direction').select('*');
      console.log('Directions:', directions);
      if (directionsError) {
        console.error('Error fetching directions:', directionsError.message);
        return;
      }

      this.tariffs = tariffs;
      this.directions = directions;

      this.items = courses.map(course => {
        return {
          ...course,
        };
      }).slice(0, 3);
    },

    getTariffName(tariffId) {
      const tariff = this.tariffs.find(t => t.id === tariffId);
      return tariff ? tariff.name : '';
    },
    getDirectionName(directionId) {
      const direction = this.directions.find(d => d.id === directionId);
      return direction ? direction.name : '';
    },
    goToAllCourses() {
      this.$router.push({ name: 'courses' });
    },
    scrollTo(index) {
      this.currentIndex = index;
      const offset = index * this.$refs.slider.clientWidth;
      this.$refs.slider.scrollLeft = offset;
    },
    selectCourse(id) {
      this.$router.push({ name: 'CoursesInfo', params: { id: id } });
    }
  },
};
</script>

<style scoped>
.courses-container {
  padding-top: 60px;
  padding-bottom: 60px;
  letter-spacing: 0.5px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
}

.header h1 {
  font-size: 46px;
  font-family: Gilroy-ExtraBold;
}

.all-courses-button {
  font-size: 18px;
  padding: 10px 20px;
  background-color: white;
  color: #78258D;
  border: 2px solid #78258D;
  border-radius: 8px;
  font-family: 'Gilroy-Light', sans-serif;
  cursor: pointer;
}

.slider {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.data-block {
  display: inline-block;
  vertical-align: top;
  width: 440px;
  height: 260px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.icon {
  width: 48px;
  height: 48px;
  margin-bottom: 20px;
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

.course-tariff {
  font-size: 16px;
  color: black;
}

.course-type {
  font-size: 16px;
  color: #78258D;
}
</style>
