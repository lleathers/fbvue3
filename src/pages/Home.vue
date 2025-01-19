<template>
  <Container>
    <h1>NeighborPays <span class="accent">Dashboard</span></h1>
    <div>
      <button>
        <router-link :to="{ name: 'Firestore' }">Let's go</router-link>
      </button>
    </div>
    <h3>There's a lot to share.</h3>
    <ul class="gap-8">
      <li>
        <router-link :to="{ name: 'Auth'}">Authentication</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Protected'}">My Profile</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Firestore'}">Neighbors</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Concierge', params: { id: 'pfTiAN5q2k0UN8hVNW1a'} }">Concierge</router-link>
      </li>
    </ul>
  </Container>
</template>

<script setup>
import Container from '../components/Container.vue'
</script>
