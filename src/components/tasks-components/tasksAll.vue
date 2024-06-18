<template>
  <div class="tasks-container">
    <h1 class="title">Задания</h1>
    <div class="filters">
      <button
          @click="applyTypeFilter(null)"
          :class="['filter-button', { active: currentTypeFilter === null }]"
      >
        Все
      </button>
      <button
          v-for="type in types"
          :key="type.id"
          @click="applyTypeFilter(type.id)"
          :class="['filter-button', { active: currentTypeFilter === type.id }]"
      >
        {{ type.name }}
      </button>
    </div>
    <div class="tasks-content">
      <div class="tasks-list">
        <div
            class="task-block"
            v-for="task in filteredTasks"
            :key="task.id"
            @click = "this.$emit('openTask', task.id)"
        >
          <div class="content">
            <h2>{{ task.name }}</h2>
            <h3>{{ task.description }}</h3>
            <div class="details">
              <span class="task-tariff">{{ getTariffName(task.id_tariff) }}</span>
              <span class="task-type">{{ getTypeName(task.id_direction) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tariff-filter">
        <h2 class="tariff-title">Тариф</h2>
        <div class="tariff-options">
          <label v-for="tariff in tariffs" :key="tariff.id" class="tariff-option">
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
      tasks: [],
      types: [],
      tariffs: [],
      currentTypeFilter: null,
      selectedTariffs: [],
    };
  },
  computed: {
    filteredTasks() {
      let filtered = this.tasks;

      if (this.currentTypeFilter !== null) {
        filtered = filtered.filter(task => task.id_direction === this.currentTypeFilter);
      }

      if (this.selectedTariffs.length > 0) {
        filtered = filtered.filter(task => this.selectedTariffs.includes(task.id_tariff));
      }

      return filtered;
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const { data: tasksData, error: tasksError } = await supabase.from('tasks').select('*');
        if (tasksError) throw tasksError;

        const { data: typesData, error: typesError } = await supabase.from('direction').select('*');
        if (typesError) throw typesError;

        const { data: tariffsData, error: tariffsError } = await supabase.from('tariff').select('*');
        if (tariffsError) throw tariffsError;


        this.tasks = tasksData.map(task => ({
          id: task.id,
          name: task.name,
          description: task.description,
          id_tariff: task.id_tariff,
          id_direction: task.id_direction,
        }));

        this.types = typesData;
        this.tariffs = tariffsData;
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    },
    applyTypeFilter(id_direction) {
      this.currentTypeFilter = id_direction;
    },
    getTypeName(id_direction) {
      const type = this.types.find(t => t.id === id_direction);
      return type ? type.name : '';
    },
    getTariffName(id_tariff) {
      const tariff = this.tariffs.find(t => t.id ===id_tariff);
      return tariff ? tariff.name : '';
    },
  },
};
</script>

<style scoped>
.tasks-container {
  padding-bottom: 60px;
  letter-spacing: 0.5px;
  justify-content: space-between;

  font-family: 'Gilroy-Light', sans-serif;
}

.title {
  font-family: Gilroy-ExtraBold;
  font-size: 46px;
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
  font-family: Gilroy-Regular, sans-serif;
  font-weight: 500;
  border: 2px solid #ffffff;
  border-radius: 8px;
  background-color: white;
  color: black;
  cursor: pointer;
}

.filter-button.active {
  background-color: #78258D;
  color: white;
}

.tasks-content {
  display: flex;
  justify-content: space-between;
}

.tasks-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  flex-grow: 1;
  max-width: calc(100% - 50px);

}

.task-block {
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
  background-color: #fff;
  justify-content: space-between;
  cursor: pointer;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.content h2 {
  margin: 0;
  font-size: 24px;
  font-family: Gilroy-Bold;
  padding-bottom: 10px;
}

.content h3 {
  font-size: 16px;
  padding-bottom: 25px;
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

@media (max-width: 1200px) {
  .task-block {
    flex: 1 1 calc(50% - 20px);
    max-width: calc(50% - 20px);
  }

  .tariff-filter {
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .task-block {
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
