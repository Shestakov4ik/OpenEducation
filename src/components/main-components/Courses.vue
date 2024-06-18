<template>
  <div class="container">
    <div class="banner-wrapper">
      <CoursesAll @openInfo = "open"/>
    </div>
    <div class="info" v-if="courseId" >

      <div class="shadow" @click="close"></div>
      <div class="sidebar">
        <CoursesInfo @closeInfo="close" :id="this.courseId" :reg="checkReg"/>
      </div>
    </div>

  </div>
</template>

<script>
import CoursesAll from '@/components/courses-component/coursesAll.vue';
import CoursesInfo from "@/components/course-info/CoursesInfo.vue";
import {ref} from "vue";
import router from "@/router.js";



export default {
  name: 'courses',
  components: {
    CoursesAll,
    CoursesInfo
  },
  data(){
    return{
      courseId: null
    }
  },
  props:{
    checkReg:Number
  },
  methods:{
    open(id){
      this.courseId=id
      console.log("ID курса:", id);
      document.querySelector("body").style.overflowY="hidden";

    },
    close(id) {
      console.log(id);
      this.courseId = null;
      document.querySelector("body").style.overflowY="scroll";

    },
    hide(){

    }
  },
}
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
}

.banner-wrapper {
  padding: 50px 240px 100px 240px;
  box-sizing: border-box;
  margin-bottom: 0;
}

.banner-wrapper:last-child {
  margin-bottom: 0;
}

.shadow {
  display: none;
  width: 55%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}



.sidebar {
  background: #fff;
  width: 45%;
  height: 100%;
  right: -45%;
  opacity: 0;
  overflow-y: scroll;
  transition: right 2s ease, opacity 2s ease;
}

.info {
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
}

.info .shadow {
  display: block;
}

.info .sidebar {
  right: 0;
  opacity: 1;
}


</style>
