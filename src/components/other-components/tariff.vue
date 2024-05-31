<template>
  <div class="tariff-plans-container">
    <h1>Тарифные планы</h1>
    <div class="plans">
      <div class="plan-block" v-for="plan in plans" :key="plan.id" >
        <div class="plan-title" :style="{ backgroundColor: plan.color }">{{ plan.name }}</div>
        <div class="plan-details">
          <div class="price">{{ plan.cost }} руб/мес</div>
          <div class="courses">{{ plan.count_courses }} курсов</div>
          <div class="tasks">{{ plan.counts_taks }} заданий</div>
        </div>
        <button class="try-button" :style="{ backgroundColor: plan.color }">Попробовать</button>
      </div>
    </div>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js';

export default {
  data() {
    return {
      plans: []
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

      const { data, error } = await SP.from('Tariff').select('*').order('id');

      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        this.plans = data;
      }
    },
    getButtonColor(hexColor) {
      if (hexColor.startsWith('#')) {
        const rgb = parseInt(hexColor.slice(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8) & 0xff;
        const b = (rgb >> 0) & 0xff;
        return `rgba(${r}, ${g}, ${b}, 0.25)`;
      }
      return hexColor;
    }
  }
}
</script>

<style scoped>
.tariff-plans-container {
  text-align: center;
  padding-top: 60px;
  font-family: Gilroy-Light;
  letter-spacing: 0.5px;
}

.tariff-plans-container h1 {
  font-size: 54px;
  margin-bottom: 60px;
  font-family: Gilroy-ExtraBold;
}

.plans {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.plan-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  box-sizing: border-box;
}

.plan-title {
  font-size: 18px;
  color: white;
  padding: 10px;
  border-radius: 100px;
  width: 50%;
  text-align: center;
  margin-bottom: 30px;
  font-family: Gilroy-Bold;
}

.plan-details {
  font-size: 18px;
  margin-bottom: 30px;
}

.price, .courses, .tasks {
  margin-bottom: 18px;
}
.price{
  font-family: Gilroy-Bold;
}


.try-button {
  width: 144px;
  height: 34px;
  padding: 10px 20px;
  color: white;
  border: none;
  margin-top: 16px;
  font-family: Gilroy-Light;

  border-radius: 4px;
  cursor: pointer;
}
</style>
