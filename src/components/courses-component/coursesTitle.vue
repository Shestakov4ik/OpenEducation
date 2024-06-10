<template>
  <div class="courses-title">
      <div class="icon-container">
        <img :src='this.url' alt="Course Icon" class="course-icon">
      </div>
      <div class="name-container">
        <h2 class="course-name">{{ title }}</h2>
      </div>
  </div>


</template>

<script>
export default {
  props:{
    title: String,
    url: String,
  },
  data(){
    return{

    }
  },
  created() {
    if (this.title!=null){
      console.log(this.title)
    }
  }

}
</script>

<style scoped>
.courses-title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-family: Gilroy-ExtraBold,serif;
}

.icon-container {
  width: 15%;
  height: 208px;

  margin-right: 50px;
}
.course-icon {
  width: 100%;
  height: 100%;

}

.name-container {
  width: 85%;
}

.course-name {
  font-size: 46px;

}
</style>
