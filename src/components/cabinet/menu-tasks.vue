<template>
  <div class="wrapper">
    <div class="menuTasks">
      <ul class="menu">
        <li @click="openAssignedTasks">
          <span>Мои задачи</span>
        </li>
        <li @click="openCompletedTasks">
          <span>Завершенные задачи</span>
        </li>
        <li @click="openAllTasks">
          <span>Все задачи</span>
        </li>
      </ul>
    </div>
    <div class="slider-container">
      <h1 class="title">Задания</h1>
      <div class="slider" ref="slider">
        <div class="data-block" v-for="task in filteredTasks" :key="task.id">
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
    </div>
  </div>
</template>



<script>
import supabase from "@/supabase.js";

export default {
  name: "cabTasks",
  data() {
    return {
      tasks: [],
      directions: [],
      tariffs: [],
      currentTypeFilter: null,
      selectedTariffs: [],
      featuredTask: null,
      taskStatus: 'assigned', // Default status
    };
  },
  computed: {
    filteredTasks() {
      let filtered = this.tasks;

      if (this.currentTypeFilter !== null) {
        filtered = filtered.filter(task => task.id_direction === this.currentTypeFilter);
      }

      this.tasks.sort((a, b) => a.id - b.id);
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
    async openAssignedTasks() {
      this.taskStatus = 'assigned';
      await this.fetchData();
    },
    async openCompletedTasks() {
      this.taskStatus = 'completed';
      await this.fetchData();
    },
    async openAllTasks() {
      this.taskStatus = 'all';
      await this.fetchData();
    },
    async fetchData() {
      try {
        if (this.taskStatus === 'all') {
          const { data: allTasksData, error: allTasksError } = await supabase
              .from('tasks')
              .select('*');

          if (allTasksError) throw allTasksError;

          this.tasks = allTasksData.map(task => ({
            id: task.id,
            name: task.name,
            description: task.description,
            id_tariff: task.id_tariff,
            id_direction: task.id_direction,
            color: task.background,
            url_icon: task.url_icon
          }));

          this.featuredTask = this.tasks.length > 0 ? this.tasks[0] : null;

        } else {
          let statusFilter = 'Начатый';
          if (this.taskStatus === 'completed') {
            statusFilter = 'Пройденный';
          }

          const { data: myTasksData, error: myTasksError } = await supabase
              .from('myTasks')
              .select('id_task')
              .eq('id_user', 1)
              .eq('status', statusFilter);

          if (myTasksError) throw myTasksError;

          const taskIds = myTasksData.map(mt => mt.id_task);

          if (taskIds.length > 0) {
            const { data: tasksData, error: tasksError } = await supabase
                .from('tasks')
                .select('*')
                .in('id', taskIds);

            if (tasksError) throw tasksError;

            this.tasks = tasksData.map(task => ({
              id: task.id,
              name: task.name,
              description: task.description,
              id_tariff: task.id_tariff,
              id_direction: task.id_direction,
              color: task.background,
              url_icon: task.url_icon
            }));

            this.featuredTask = this.tasks.length > 0 ? this.tasks[0] : null;

            const { data: directionsData, error: directionsError } = await supabase.from('direction').select('*');
            if (directionsError) throw directionsError;

            const { data: tariffsData, error: tariffsError } = await supabase.from('tariff').select('*');
            if (tariffsError) throw tariffsError;

            this.directions = directionsData;
            this.tariffs = tariffsData;
          }
        }
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
    }
  }
}
</script>



<style scoped>
.wrapper {

  width: 100%;
  padding: 0 90px;
  margin-left: 330px;
  height: 100vh;
  margin-top: 50px;
  display: inline-block;
}

.menu {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  justify-content: flex-start;
  align-items: center;
}

.menu li {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 50px;
  padding: 10px 0px;
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;
}

.menu li img {
  width: 24px;
  height: 24px;
}

.menu li span {
  font-size: 20px;
  font-family: Gilroy-Light, sans-serif;
  margin-top: 5px; /* Расстояние между иконкой и текстом */
}
.slider{
  flex-wrap: wrap;
}

.menu li.active span {
  color: #800080; /* Цвет текста активного элемента */
}

.menu li.active::after {
  content: '';
  display: block;
  height: 2px;
  background-color: #800080; /* Фиолетовый цвет */
  position: absolute;
  bottom: -5px; /* Расположение подчеркивания */
  left: 0;
  right: 0;

}



.header h1 {
  font-size: 46px;
  font-family: Gilroy-ExtraBold;
}



.slider {
  display: flex;

  gap: 20px;
}

.data-block {
  display: inline-block;
  vertical-align: top;
  width: 435px;
  height: 264px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  padding: 0 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  box-sizing: border-box;
  background: white; /* изменение backgroundColor на background */
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.title {
  font-family: Gilroy-ExtraBold;
  font-size: 46px;

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


.content h2 {
  margin: 0;
  font-size: 26px;
  font-family: Gilroy-Bold;
}

.content{
  margin: 46px 0 40px 0;
}
.details {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-family: 'Gilroy-Light', sans-serif;
}


</style>