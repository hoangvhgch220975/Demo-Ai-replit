<template>
  <div id="app">
    <!-- Navbar Component -->
    <Navbar />
    <router-view></router-view> <!-- This is where the routed components will be displayed -->
  </div>
</template>

<script>
// Import the Navbar component
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar  // Register the Navbar component
  }
}
</script>

<style scoped>
/* Global styles (if needed) */
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
}
</style>
