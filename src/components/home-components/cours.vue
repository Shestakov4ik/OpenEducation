<template>
  <div class="courses-container">
    <div class="header">
      <h1>Курсы по IT-специальностям</h1>
      <button class="all-courses-button">Все курсы</button>
    </div>
    <div class="slider-container">
      <div class="slider" ref="slider">
        <div class="data-block" v-for="item in items" :key="item.id" :style="{ backgroundColor: item.back_color }">
          <img :src="item.icon_url" alt="Icon" class="icon">
          <div class="content">
            <h2>{{ item.title }}</h2>
            <div class="details">
              <span class="course-label">Курс</span>
              <span class="course-type">{{ item.type }}</span>
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
import { createClient } from '@supabase/supabase-js';

export default {
  data() {
    return {
      items: []
    }
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
        this.items = data;
      }
    }
  }
}

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
  background-color: #78258D;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.slider {
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
  gap: 20px;
}

.data-block {
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
}

.icon {
  width: 60px;
  height: 60px;
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
</style>
