<template>
  <Container>
    <h1>NeighborPays <span class="accent">Welcome!</span></h1>
    <router-link :to="{ name: 'Home' }">Go to Home</router-link>
    <h3>Filter by</h3>
    <div class="gap-8 button-list" v-if="lookup">
      <button v-for="name in lookup.names" @click="triggerChange">
        {{ name }}
      </button>
    </div>
    <ul class="gap-8 result-list">
      <li v-for="city in cities">
        <router-link :to="{ name: 'City', params: { id: city.id } }">
          {{ city.name }}, {{  city.country }}
        </router-link>
      </li>
    </ul>
  </Container>
</template>

<script setup>
import Container from '../components/Container.vue'
// import { useCitiesQuery, useCityLookup } from '../cities'
// import { useCitiesQuery } from '../cities'
import { getFirestore, collection, query, where, doc, getDocs } from 'firebase/firestore'
import { useRouter, useRoute } from 'vue-router'
// import { filterWhere } from '../cities'
import { ref, computed } from 'vue'
import { useCollection, useDocument } from 'vuefire'


const db = getFirestore();

function filterWhere(whereQuery) {
  return whereQuery
    .filter(v => v != null)
    .map(v => where(...v))
}


const cityCol = collection(db, 'cities');

function useCitiesQuery(queryCallback) {
  const router = useRouter()
  const route = useRoute()
  const criteriaList = filterWhere(queryCallback(route))
  const criteria = ref(criteriaList)
  const citySource = computed(() => query(cityCol, ...criteria.value))
  const cities = useCollection(citySource)
  function setQuery({ whereQuery, onRoute }) {
    const whereList = filterWhere(whereQuery);
    onRoute(router)
    // This sets the reactive ref and tells the query to recompute
    criteria.value = whereList
  }
  return { setQuery, cities }
}

const { cities, setQuery } = useCitiesQuery(route => [
  route.query.country && ['country', '==', route.query.country],
]);

const cityLookupCol = doc(db, 'lookups/cities')

function useCityLookup() {
  return useDocument(cityLookupCol)
}

const lookup = useCityLookup()

function triggerChange(clickEvent) {
  let country = clickEvent.target.textContent
  let query = { country }
  let whereList = ['country', '==', country];
  // Reset the Firestore Query
  if(clickEvent.target.nodeName !== 'BUTTON' || country === 'All Online') {
    whereList = null
    delete query.country
  }
  setQuery({
    whereQuery: [whereList],
    onRoute: router => router.replace({ name: 'Firestore', query })
  })
}
</script>
