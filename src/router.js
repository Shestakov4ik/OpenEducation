import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/main-components/Home.vue';
import Courses from './components/main-components/Courses.vue';
import Tasks from './components/main-components/Tasks.vue';
import Contacts from './components/main-components/Contacts.vue';
import Auth from './components/authorization/auth.vue';
import Verification from './components/authorization/verification.vue';
import CoursesInfo from "@/components/course-info/CoursesInfo.vue";
import Cabinet from "@/Cabinet.vue";
import HomeCab from "@/components/cabinet/menu-home.vue"
import CoursesCab from "@/components/cabinet/menu-courses.vue"
import TasksCab from "components/cabinet/menu-tasks.vue"

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/courses', name: 'courses', component: Courses },
    { path: '/tasks', name: 'tasks', component: Tasks },
    { path: '/contacts', name: 'Contacts', component: Contacts },
    { path: '/auth', name: 'Auth', component: Auth },
    { path: '/verification', name: 'Verification', component: Verification },
    { path: '/courseinfo:id', name: 'courseinfo', component: CoursesInfo },
    { path: '/cabinet', name: 'cabinet', component: Cabinet },
    { path: '/cabHome', name: 'cabHome', component: HomeCab },
    { path: '/cabCourses', name: 'cabCourses', component: CoursesCab },
    { path: '/cabTasks', name: 'cabTasks', component: TasksCab },


];

const router = createRouter({
    history: createWebHistory(),
    routes
});

let previousRoute = null;

router.beforeEach((to, from, next) => {
    if (to.name !== 'Auth') {
        previousRoute = from;
    }
    next();
});

export default router;
