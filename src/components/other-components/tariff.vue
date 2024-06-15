<template>
  <div class="tariff-plans-container">
    <h1>Тарифные планы</h1>
    <div class="plans">
      <div class="plan-block" v-for="plan in plans" :key="plan.id" >
        <div class="plan-title" :style="{ backgroundColor: plan.color }">{{ plan.name }}</div>
        <div class="plan-details">
          <div class="price">{{ plan.cost }} руб/мес</div>
          <div class="courses">{{ plan.count_course }} курсов</div>
          <div class="tasks">{{ plan.count_task }} заданий</div>
        </div>
        <button class="try-button"   :style="{ backgroundColor: plan.color+'95'}">Попробовать</button>
      </div>
    </div>
  </div>
</template>

<script>
import supabase from '@/supabase';

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
      try {
        const { data, error } = await supabase.from('tariff').select('*').order('id');

        if (error) {
          throw error;
        } else {
          this.plans = data;
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
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
  padding: 20px 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 450px;
  box-sizing: border-box;
}

.plan-title {
  font-size: 18px;
  color: white;
  padding: 4px 10px;
  border-radius: 100px;
  width: 33%;
  text-align: center;
  margin-bottom: 30px;
  font-family: Gilroy-Light, sans-serif;
}

.plan-details {
  font-size: 18px;
  margin-bottom: 15px;
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
  padding: 5px 20px;
  color: #000000;
  border: none;
  font-family: Gilroy-Light, sans-serif, sans-serif;
  font-size: 16px;
  letter-spacing: 0.5px;
  border-radius: 4px;
  cursor: pointer;


}
</style>
