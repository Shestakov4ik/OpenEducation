<template>
  <div class="courses-container">
    <h1 class="title">Курсы</h1>
    <div class="filters">
      <button
          v-for="filter in filters"
          :key="filter"
          @click="applyFilter(filter)"
          :class="['filter-button', { active: currentFilter === filter }]"
      >
        {{ filter }}
      </button>
    </div>
    <div class="courses-content">
      <div class="courses-list">
        <div
            class="course-block"
            v-for="course in filteredCourses"
            :key="course.id"
            :style="{ backgroundColor: course.back_color }"
        >
          <img :src="course.icon_url" alt="Icon" class="icon">
          <div class="content">
            <h2>{{ course.title }}</h2>
            <div class="details">
              <span class="course-label">Курс</span>
              <span class="course-type">{{ course.type }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tariff-filter">
        <h2 class="tariff-title">Тариф</h2>
        <div class="tariff-options">
          <label v-for="tariff in tariffs" :key="tariff" class="tariff-option">
            <input type="checkbox" :value="tariff" v-model="selectedTariffs">
            {{ tariff }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js';

export default {
  data() {
    return {
      courses: [],
      filters: ['Все', 'Мобильная разработка', 'Веб-разработка', 'Разработка ПО', 'Общие', 'Администрирование'],
      currentFilter: 'Все',
      tariffs: ['Начальный', 'Стандарт', 'Премиум'],
      selectedTariffs: [],
    };
  },
  computed: {
    filteredCourses() {
      if (this.currentFilter === 'Все') {
        return this.courses;
      }
      return this.courses.filter(course => course.category === this.currentFilter);
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const Url = 'https://bvyrptbwohqfvfnsnduz.supabase.co/';
      const Key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2eXJwdGJ3b2hxZnZmbnNuZHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1ODcyNTEsImV4cCI6MjAzMDE2MzI1MX0.QlGpDnDw8JRkqhgVP-TsE0QhmMejPaDHbIEsllicuK0';
      const SP = createClient(Url, Key);

      const { data, error } = await SP.from('Courses').select('*');

      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        this.courses = data;
      }
    },
    applyFilter(filter) {
      this.currentFilter = filter;
    },
  },
};
</script>

<style scoped>
.courses-container {
  padding: 40px;
  font-family: 'Gilroy-Light', sans-serif;
  width: 100%;
  height: 100%;
  padding: 100px 520px 100px 240px;
  box-sizing: border-box;
  margin-bottom: 100px;
}

.title {
  font-size: 56px;
  margin-bottom: 30px;
}

.filters {
  margin-bottom: 30px;
  display: flex;
  gap: 5px;
}

.filter-button {
  padding: 10px 20px;
  font-size: 16px;
  border: 2px solid #000;
  border-radius: 8px;
  background-color: white;
  color: black;
  cursor: pointer;
}

.filter-button.active {
  background-color: #78258D;
  color: white;
}

.courses-content {
  display: flex;
  gap: 100px;
}

.courses-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.course-block {
  display: inline-block;
  vertical-align: top;
  width: 494px;
  height: 264px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  box-sizing: border-box;
}

.icon {
  width: 60px;
  height: 60px;
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
}

.course-label {
  font-size: 16px;
  background-color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.course-type {
  font-size: 16px;
  color: #78258D;
}

.tariff-filter {
  flex-shrink: 0;
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
</style>
