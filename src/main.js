import './assets/main.css'

import { VueFire, VueFireAuth } from 'vuefire'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { getFirebase } from './firebase';

const initializeFirebase = new Promise((resolve, reject) => {
  resolve(getFirebase().firebaseApp);
});

const appwork = initializeFirebase.then( (firebaseApp) => {
  return( new Promise((resolve, reject) => {
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
      app.mount('#app');
});




