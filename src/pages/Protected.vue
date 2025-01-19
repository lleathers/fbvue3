<template>
  <Container>
    <h1><span class="accent">Members</span> profile</h1>
    <div>
      <button>
        <router-link :to="{ name: 'Home' }">Go Home</router-link>
      </button>
    </div>
    <h3 v-if="user">Hello, {{ user.displayName }}</h3>
  </Container>
</template>

<script setup>
import Container from '../components/Container.vue'
import { useRoute } from 'vue-router';

const route = useRoute();
const { user } = route.meta;
</script>
