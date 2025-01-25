<template>
  <Container>
    <h1>NeighborPays <span class="accent">login</span></h1>
    <div>
      <button v-if="!user" @click="signInWithRedirect(auth, new GoogleAuthProvider())">Sign In</button>
      <button v-if="user" @click="signOut(auth)">Sign Out</button>
    </div>
    <h3 v-if="!user">Logging in with Google</h3>
    <h3 v-else>And now you're logged in as {{ user.displayName }}</h3>
    <router-link :to="{ name: 'Home' }">Go to Home</router-link>
  </Container>
</template>

<script setup>
import Container from '../components/Container.vue'
import { signInWithRedirect, GoogleAuthProvider, signOut } from 'firebase/auth'
import { useCurrentUser, useFirebaseAuth } from 'vuefire';

const auth  = useFirebaseAuth();
const user = useCurrentUser();
</script>
