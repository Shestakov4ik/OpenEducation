import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/main-components/Home.vue';
import Courses from './components/main-components/Courses.vue';
import Tasks from './components/main-components/Tasks.vue';
import Contacts from './components/main-components/Contacts.vue';
import Auth from './components/authorization/auth.vue';
import Verification from './components/authorization/verification.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/courses', name: 'courses', component: Courses },
    { path: '/tasks', name: 'Tasks', component: Tasks },
    { path: '/contacts', name: 'Contacts', component: Contacts },
    { path: '/auth', name: 'Auth', component: Auth },
    { path: '/verification/:phone', name: 'Verification', component: Verification }
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
