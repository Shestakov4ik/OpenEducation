<template>
  <div class="wrapper">
    <div class="menuCourses">
      <ul class="menu">
        <li @click="openStartedCourses">
          <span>Мои курсы</span>
        </li>
        <li @click="openAllCourses">
          <span>Доступные курсы</span>
        </li>
        <li @click="openCompletedCourses">
          <span>Пройденные курсы</span>
        </li>

      </ul>
    </div>
    <div class="content">
      <h1 class="title">Курсы</h1>
      <div class="courses-content">
        <div class="courses-list">
          <div
              class="course-block"
              v-for="course in filteredCourses"
              :courseId="course.id"
              @click="this.$emit('openLess', course.id)"
              :style="{ background: course.color }">
            <div class="icon-container">
              <img :src="course.url_icon" alt="Icon" class="icon">
            </div>
            <div class="contentBlock">
              <h2>{{ course.name }}</h2>
              <div class="details">
                <span class="course-type">{{ getTariffName(course.id_tariff) }}</span>
                <span class="tariff-type">{{ getTypeName(course.id_direction) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>

</template>

<script>
  import supabase from "@/supabase.js";
  import router from "@/router.js";

  export default {
    name: "cabCourses",
    data() {
      return {
        courses: [],
        completedCourses: [], // Новый массив для завершенных курсов
        directions: [],
        tariffs: [],
        currentTypeFilter: null,
        selectedTariffs: [],
        featuredCourse: null,
        randomPer: 25,
        courseStatus: 'started',
      };
    },
    computed: {
      filteredCourses() {
        let filtered = this.courses;

        if (this.currentTypeFilter !== null) {
          filtered = filtered.filter(course => course.id_direction === this.currentTypeFilter);
        }

        if (this.selectedTariffs.length > 0) {
          filtered = filtered.filter(course => this.selectedTariffs.includes(course.id_tariff));
        }

        this.courses.sort((a, b) => a.id - b.id);
        return filtered;
      },
      sortedTariffs() {
        return this.tariffs.sort((a, b) => a.id - b.id);
      }
    },
    created() {
      this.fetchData();
    },
    methods:{
      async openStartedCourses() {
        this.courseStatus = 'started';
        await this.fetchData();
      },
      openLessons(){
        router.push("/cabinet/lessons")
      },
      async openCompletedCourses() {
        this.courseStatus = 'completed';
        await this.fetchData();
      },
      async openAllCourses() {
        this.courseStatus = 'all';
        await this.fetchData();
      },
      async fetchData() {
        try {
          if (this.courseStatus === 'all') {
            const { data: allCoursesData, error: allCoursesError } = await supabase
                .from('courses')
                .select('*');

            if (allCoursesError) throw allCoursesError;

            this.courses = allCoursesData.map(course => ({
              id: course.id,
              name: course.name,
              description: course.description,
              id_tariff: course.id_tariff,
              id_direction: course.id_direction,
              color: course.background,
              url_icon: course.url_icon
            }));


            this.featuredCourse = this.courses.length > 0 ? this.courses[0] : null;

          } else {
            let statusFilter = 'Начатый';
            if (this.courseStatus === 'completed') {
              statusFilter = 'Пройденный';
            }

            const { data: myCoursesData, error: myCoursesError } = await supabase
                .from('myCourses')
                .select('id_course')
                .eq('id_user', 1)
                .eq('status', statusFilter);

            if (myCoursesError) throw myCoursesError;

            const courseIds = myCoursesData.map(mc => mc.id_course);

            if (courseIds.length > 0) {
              const { data: coursesData, error: coursesError } = await supabase
                  .from('courses')
                  .select('*')
                  .in('id', courseIds);

              if (coursesError) throw coursesError;

              this.courses = coursesData.map(course => ({
                id: course.id,
                name: course.name,
                description: course.description,
                id_tariff: course.id_tariff,
                id_direction: course.id_direction,
                color: course.background,
                url_icon: course.url_icon
              }));

              this.featuredCourse = this.courses.length > 0 ? this.courses[0] : null;

              const { data: directionsData, error: directionsError } = await supabase.from('direction').select('*');
              if (directionsError) throw directionsError;
              console.log("Directions Data:", directionsData);

              const { data: tariffsData, error: tariffsError } = await supabase.from('tariff').select('*');
              if (tariffsError) throw tariffsError;
              console.log("Tariffs Data:", tariffsData);

              this.directions = directionsData;
              this.tariffs = tariffsData;
            }
          }

          // дополнительный код для загрузки завершенных курсов, если нужно
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
  background: white;
  width: 100%;
  padding: 0 90px;
  margin-left: 330px;
  height: 100%;
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

.courses-content {
  display: flex;
  justify-content: space-between;
  max-width: 100%;
}

.courses-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-right: 40px;
  flex-grow: 1;
}

.course-block {
  display: inline-block;
  vertical-align: top;
  width: 435px;
  height: 264px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  box-sizing: border-box;
  cursor: pointer;
}

.icon-container {
  width: 48px;
  height: 48px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.title {
  font-family: Gilroy-ExtraBold;
  font-size: 46px;
}

.contentBlock {
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

.content{
  margin: 46px 0 100px 0;
}
.details {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-family: 'Gilroy-Light', sans-serif;
}

.course-type {
  font-size: 16px;
  color: #000000;
}

.tariff-type {
  color: #78258D;
}
</style>