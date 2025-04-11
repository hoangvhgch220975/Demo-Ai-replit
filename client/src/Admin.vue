<template>
    <div id="admin">
      <!-- Navbar Component -->
      <NavbarAdmin />
      <router-view></router-view> <!-- This is where the routed components will be displayed -->
    </div>
  </template>
  
  <script>
  // Import the Navbar component
  import NavbarAdmin from './components/NavbarAdmin.vue';
  
  export default {
    name: 'AdminDashboard',
    components: {
      NavbarAdmin  // Register the Navbar component
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
  
<!-- // This is the main entry point for the Vue application -->