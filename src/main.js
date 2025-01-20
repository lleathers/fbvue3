// import './assets/main.css'

import { VueFire, VueFireAuth } from 'vuefire'


import { createApp } from 'vue'
import App from './App.vue'

// import router from './router'

import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'

import { getFirebase } from './firebase';

import Home from './pages/Home.vue'
import Auth from './pages/Auth.vue'
// import Firestore from './pages/Firestore.vue'
import Protected from './pages/Protected.vue'
import Forbidden from './pages/Forbidden.vue'
// import City from './pages/City.vue'
// import Concierge from './pages/Concierge.vue'
// import Mouse from './pages/Mouse.vue'

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/auth', component: Auth, name: "Auth" },
  // { path: '/firestore', component: Firestore, name: "Firestore", meta: { isProtected: true } },
  { path: '/protected', component: Protected, name: "Protected", meta: { isProtected: true } },
  // { path: '/city/:id', component: City, name: 'City', meta: { isProtected: true } },
  // { path: '/city/:id', component: Concierge, name: 'Concierge', meta: { isProtected: true } },
  { path: '/forbidden', component: Forbidden, name: 'Forbidden' },
  // { path: '/mouse', component: Mouse, name: 'Mouse' },
]

const router = createRouter({ 
  history: createWebHistory(),
  routes
})

const initializeFirebase = new Promise((resolve, reject) => {
  resolve(getFirebase().firebaseApp);
});

const appwork = initializeFirebase.then( (firebaseApp) => {
  return( new Promise((resolve, reject) => {
           console.log("THIS IS FIREBASEAPP: ", firebaseApp);
           resolve(createApp(App)
                     .use(VueFire, {
                       firebaseApp,
                         modules: [
                         VueFireAuth(),
                         ],
                       })
                     .use(router)
                  );
           })
        );
  });

appwork.then( (app) => {
      console.log("THIS IS APP: ", app);
      app.mount('#app');
});




