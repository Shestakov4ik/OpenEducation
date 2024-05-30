<template>
  <div class="courses-container">
    <div class="header">
      <h1>Популярные задания</h1>
      <button class="all-courses-button">Все задания</button>
    </div>
    <div class="slider-container">
      <div class="slider" ref="slider">
        <div class="data-block" v-for="item in items" :key="item.id">
          <div class="content">
            <h2>{{ item.title }}</h2>
            <h3>{{ item.description }}</h3>
            <div class="details">
              <span class="course-label">Задание</span>
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

      const { data, error } = await SP.from('Tasks').select('*');

      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        this.items = data.slice(0, 3);
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
  background-color: white;
  color: #78258D;
  border: 2px solid #78258D;
  border-radius: 8px;
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
  height: 264px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  box-sizing: border-box;
}



.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.content h2 {
  margin: 0;
  font-size: 24px;
  font-family: Gilroy-Bold;
}
.content h3{
  font-size: 16px;
  font-family: Gilroy-Light;
}

.details {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-family: 'Gilroy-Light', sans-serif;
}

.course-label {
  font-size: 16px;

  padding: 5px 0px;

}

.course-type {
  font-size: 16px;
  color: #78258D;
}
</style>
