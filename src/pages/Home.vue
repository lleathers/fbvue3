<template>
  <Container>

    <img alt="NeighborPays logo" class="logo" src="../assets/jmlwnb00.png" width="100" height="100" />

    <h1>NeighborPays <span class="accent">!</span></h1>
    <div>
      <button>
        <router-link :to="{ name: 'Firestore' }">Let's go</router-link>
      </button>
    </div>
    <h3>Find your neighbor.</h3>
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
        <router-link :to="{ name: 'Concierge', params: { id: '9LbSJcmqH3VNX64xjM4H'} }">Concierge</router-link>
      </li>
    </ul>
  </Container>
</template>

<script setup>
import Container from '../components/Container.vue'
</script>
