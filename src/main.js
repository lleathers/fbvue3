import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { getFirebase } from './firebase';
import { initializeApp } from 'firebase/app';

const initializeFirebase = new Promise((resolve, reject) => {
  resolve(getFirebase());
});

const appwork = initializeFirebase.then( () => {
  return( new Promise((resolve, reject) => {
           resolve(createApp(App));
           })
        );
  });

appwork.then( (app) => {
      app.use(router);
      app.mount('#app');
});




