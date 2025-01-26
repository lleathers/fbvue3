<template>
  <Container v-if="city">
    <h1><span class="accent">{{ city.name }}</span>, {{ city.country }}</h1>
    <h3>Budget Remaining This Hour: ${{ city.population.toLocaleString() }}</h3>
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

function useCity(routeCallback) {
  const route = useRoute()
  const cityId = routeCallback(route);
  return useDocument(doc(db, 'cities', cityId));
}

console.log("THIS IS USECITY: ", useCity);

const city = useCity(route => route.params.id);


console.log("RETURN CITY: ", city.name);
console.log("RETURN COUNTRY: ", city.country);



/* import Container from '../components/Container.vue'
import { useCity } from '../cities'

const city = useCity(route => route.params.id) */

</script>
