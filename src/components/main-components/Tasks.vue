<template>
  <div class="container">
    <div class="banner-wrapper">
      <tasksAll  v-if="taskId==null" @openTask = "open"/>
      <TasksTest v-else @closeTest="close" :id="this.taskId"/>
    </div>

  </div>
</template>

<script>
import tasksAll from '@/components/tasks-components/tasksAll.vue';
import TasksTest from "@/components/tasks-components/taskTest.vue";


export default {
  name: 'Home',
  components: {
    tasksAll,
    TasksTest
  },
  data(){
    return{
      taskId: null
    }
  },
  methods:{
    open(id){
      this.taskId=id

    },
    close(id) {
      console.log(id);
      this.taskId = null;


    },
  }
}
</script>

<style scoped>
.container {
  padding: 50px 240px 100px 240px;
  box-sizing: border-box;
}

.banner-wrapper {
  margin-bottom: 100px;
}
.test{
  z-index: 1000;
}

.banner-wrapper:last-child {
  margin-bottom: 0;
}
</style>
