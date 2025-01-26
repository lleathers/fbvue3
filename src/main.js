import { VueFire, VueFireAuth } from 'vuefire'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'
import { getFirebase } from './firebase';

import App from './App.vue'
import Home from './pages/Home.vue'
import Auth from './pages/Auth.vue'
import Firestore from './pages/Firestore.vue'
import Protected from './pages/Protected.vue'
import Forbidden from './pages/Forbidden.vue'
import City from './pages/City.vue'
import Concierge from './pages/Concierge.vue'
import Mouse from './pages/Mouse.vue'

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/auth', component: Auth, name: "Auth" },
  { path: '/firestore', component: Firestore, name: "Firestore", meta: { isProtected: true } },
  { path: '/protected', component: Protected, name: "Protected", meta: { isProtected: true } },
  { path: '/city/:id', component: City, name: 'City', meta: { isProtected: true } },
  { path: '/city/:id', component: Concierge, name: 'Concierge', meta: { isProtected: true } },
  { path: '/forbidden', component: Forbidden, name: 'Forbidden' },
  { path: '/mouse', component: Mouse, name: 'Mouse' },
]

const router = createRouter({ 
  history: createWebHistory(),
  routes
})


const initializeFirebase = new Promise((resolve, reject) => {
  resolve(getFirebase().firebaseApp);
  // reject(console.log("INITIALIZE FIREBASE FAILED."));
});

const appwork = initializeFirebase.then( (firebaseApp) => {
  return( createApp(App)
      .use(VueFire, {
        firebaseApp: firebaseApp,
          modules: [
          VueFireAuth(),
          ],
        })
      .use(router))
});

//  
// Do not mount App until routing is setup.
// Apparently getCurrentUser() takes some time
// to resolve each of the routes.
//
const work = appwork.then((app) => {

  function longestDependencyPromise(dependencies) {
    return new Promise((resolve, reject) => {
      Promise.all(dependencies)
        .then(results => {
          resolve(results)
        })
        .catch(error => {

          reject(error);
        });
    });
  };

  // const dependency1 = Promise.resolve(app);
  const dependency1 = new Promise(resolve => resolve(app));
  
  const dependency2 = new Promise((resolve, reject) => {
    resolve( 
      router.beforeEach(async (to, from) => {
      const user = await getCurrentUser()
      console.log("THIS IS A USER: ", user)
      to.meta.user = user
        if(to.meta.isProtected && !user) {
          return { name: 'Forbidden' }
        }
      })
    )
/*     reject(
      console.log("ROUTER SETUP FAILURE.") */
    
  }); 

  return longestDependencyPromise([dependency1, dependency2])
    .then(results => {
      console.log("THIS IS DEPENDENCY1: ", dependency1);
      console.log("THIS IS RESULTS: ", results);
      console.log("THIS IS APP: ", app);
      return(app);
    })
    .catch(error => {
      console.log("DEPENDENCY PROMISE ERROR.")
    })
  
});

work.then( (app) => { app.mount('#app') } );
