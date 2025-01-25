<template>
  <Container v-if="city">
    <h1><span class="accent">{{ city.name }}</span>, {{ city.country }}</h1>
    <h3>Your Concierge This Hour.</h3>
    <div>
      <router-link :to="{ name: 'Home' }">Go to Home</router-link>
    </div>
  </Container>
</template>

<script setup>

import Container from '../components/Container.vue'
import { useRouter, useRoute } from 'vue-router'
import { useCollection, useDocument } from 'vuefire'
import { getFirestore, collection, query, where, doc, getDocs } from 'firebase/firestore'

const db = getFirestore();

// import { getApps } from 'firebase/app';
// import { getFirebase } from './firebase';
// import { useCity } from '../cities'

// const useCity = new Promise(import('../cities'));



function useCity(routeCallback) {
  const route = useRoute()
  const cityId = routeCallback(route);
  return useDocument(doc(db, 'cities', cityId));
/*   return  {
    params: { id: '9LbSJcmqH3VNX64xjM4H'},
    name: "Bill Wald",
    country: "Flatbush"
    } */
}


// const useCity = () => import('../cities');

console.log("THIS IS USECITY: ", useCity);

const city = useCity(route => route.params.id);







/* function useCityImport() {
  return new Promise( (resolve, reject) {
    resolve (
      // import { useCity } from '../cities'
    )
  });
} */

/* const city = 
  {
  params: { id: '9LbSJcmqH3VNX64xjM4H'},
  name: "Bill Wald",
  country: "Flatbush"
  } */


// const city = useCity(route => route.params.id);
// const city = useCity(blahBlah);

console.log("RETURN CITY: ", city.name);
console.log("RETURN COUNTRY: ", city.country);


/* const city = (!getApps().at(0)) ? 
  {
  params: { id: '9LbSJcmqH3VNX64xjM4H'},
  name: "Bill Wald",
  country: "Flatbush"
  } : useCity(route => route.params.id) */


/* const fromCities = require('../cities')
const city = (firebase.apps.length === 0) ? 
  {
  params: { id: '9LbSJcmqH3VNX64xjM4H'},
  name: "Bill Wald",
  country: "Flatbush"
  } : fromCities.useCity(route => route.params.id) */

</script>
