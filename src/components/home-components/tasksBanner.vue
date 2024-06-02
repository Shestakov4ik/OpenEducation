<template>
  <div class="courses-container">
    <div class="header">
      <h1>Популярные задания</h1>
      <button class="all-courses-button" @click="goToAllTasks">Все задания</button>
    </div>
    <div class="slider-container">
      <div class="slider" ref="slider">
        <div class="data-block" v-for="item in items" :key="item.id">
          <div class="content">
            <h2>{{ item.title }}</h2>
            <h3>{{ item.description }}</h3>
            <div class="details">
              <span class="task-tariff">{{ getTariffName(item.id_tariff) }}</span>
              <span class="task-type">{{ getTypeName(item.id_type) }}</span>
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
      tariffs: [],
      types: [],
      currentIndex: 0,
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const { data: tasks, error: tasksError } = await supabase.from('Tasks').select('*');
      if (tasksError) {
        console.error('Error fetching tasks:', tasksError.message);
        return;
      }

      const { data: tariffs, error: tariffsError } = await supabase.from('Tariff').select('*');
      if (tariffsError) {
        console.error('Error fetching tariffs:', tariffsError.message);
        return;
      }

      const { data: types, error: typesError } = await supabase.from('Types').select('*');
      if (typesError) {
        console.error('Error fetching types:', typesError.message);
        return;
      }

      this.items = tasks.slice(0, 3);
      this.tariffs = tariffs;
      this.types = types;
    },
    getTariffName(tariffId) {
      const tariff = this.tariffs.find(t => t.id === tariffId);
      return tariff ? tariff.name : '';
    },
    getTypeName(typeId) {
      const type = this.types.find(t => t.id === typeId);
      return type ? type.type : '';
    },
    goToAllTasks() {
      this.$router.push({ name: 'Tasks' });
    },
    scrollTo(index) {
      this.currentIndex = index;
      const offset = index * this.$refs.slider.clientWidth;
      this.$refs.slider.scrollLeft = offset;
    },
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

.content h3 {
  font-size: 16px;
  font-family: Gilroy-Light;
}

.details {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-family: 'Gilroy-Light', sans-serif;
}

.task-tariff {
  font-size: 16px;
  color: black;
}

.task-type {
  font-size: 16px;
  color: #78258D;
}

.dots {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}


</style>
