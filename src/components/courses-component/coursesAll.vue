  <template>
  <div class="courses-container">
    <h1 class="title">Курсы</h1>
    <div class="filters">
      <button
          @click="applyTypeFilter(null)"
          :class="['filter-button', { active: currentTypeFilter === null }]"
      >
        Все
      </button>
      <button
          v-for="direction in directions"
          :key="direction.id"
          @click="applyTypeFilter(direction.id)"
          :class="['filter-button', { active: currentTypeFilter === direction.id }]"
      >
        {{ direction.name }}
      </button>
    </div>
    <div class="courses-content">
      <div class="courses-list">
        <div
            class="course-block"
            v-for="course in filteredCourses"
            :key="course.id"
            :style="{ background: course.color }"
            @click = "this.$emit('openInfo', course.id)"


        >
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
    <div class="tariff-filter">
      <h2 class="tariff-title">Тариф</h2>
      <div class="tariff-options">
        <label v-for="tariff in sortedTariffs" :key="tariff.id" class="tariff-option">
          <input type="checkbox" :value="tariff.id" v-model="selectedTariffs">
          {{ tariff.name }}
        </label>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import supabase from '@/supabase';


export default {
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
  props:{
    check: Boolean
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
  methods: {
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
};
</script>

<style scoped>
.courses-container {
  letter-spacing: 0.5px;
  padding-bottom: 60px;
  font-family: 'Gilroy-Light', sans-serif;
}

.header h1 {
  font-size: 46px;
  font-family: Gilroy-ExtraBold;
}

.filters {
  margin-bottom: 30px;
  display: flex;
  gap: 5px;
}

.filter-button {
  padding: 10px 20px;
  font-size: 16px;
  border: 2px solid #ffffff;
  border-radius: 8px;
  background-color: white;
  color: black;
  cursor: pointer;
  font-family: 'Gilroy-Light', sans-serif;
}

.filter-button.active {
  background-color: #78258D;
  color: white;
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

.tariff-filter {
  flex-shrink: 0;
  width: 470px;
}

.tariff-title {
  font-size: 20px;
  margin-bottom: 20px;
}

.tariff-options {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tariff-option {
  font-size: 16px;
}



@media (max-width: 768px) {
  .course-block {
    flex: 1 1 100%;
    max-width: 100%;
  }

  .tariff-filter {
    margin-left: 0;
    width: 100%;
    margin-top: 20px;
  }
}
</style>
