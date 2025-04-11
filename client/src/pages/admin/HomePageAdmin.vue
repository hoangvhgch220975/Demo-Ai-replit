<template>
    <div class="admin-homepage">
      <!-- Admin Header -->
      <header class="admin-header">
        <h1>Welcome, Admin</h1>
        <p>Manage your dashboard efficiently</p>
      </header>
  
      <!-- Admin Actions -->
      <section class="admin-actions">
        <div class="action-card" v-for="action in actions" :key="action.id">
          <h2>{{ action.title }}</h2>
          <p>{{ action.description }}</p>
          <button @click="navigateTo(action.route)">Go to {{ action.title }}</button>
        </div>
      </section>
      <!-- Footer -->
      <Footer/>
    </div>
  </template>
  
  <script>
  
  import Footer from '@/components/Footer.vue';
  
  export default {
    name: "AdminHomePage",
    components: {
      Footer  // Register the Footer component
    },
    data() {
      return {
        actions: [
            { id: 1, title: "Manage Divice", description: "View and manage user accounts", route: "/admin/devices" },
            { id: 2, title: "Manage Package", description: "View and manage packages", route: "/admin/packages" },
            { id: 3, title: "Manage Combo", description: "View and manage combo offers", route: "/admin/combos" },
            { id: 4, title: "Manage User", description: "View and manage user profiles", route: "/admin/users" },
            
        ],
      };
    },
    methods: {
      navigateTo(route) {
        this.$router.push(route);
      },
    },
  };
  </script>
  
  <style scoped>
  .admin-homepage {
  padding: 30px;
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(to bottom right, #f4f6f9, #dce3ea);
  min-height: 100vh;
  padding-top: 80px;
}

/* Admin Header */
.admin-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #1d3557, #457b9d);
  color: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.admin-header h1 {
  font-size: 36px;
  margin-bottom: 10px;
  font-weight: bold;
}

.admin-header p {
  font-size: 18px;
  color: #e0e0e0;
}

/* Admin Actions */
.admin-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.action-card {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 25px 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-align: center;
  border: 1px solid rgba(200, 200, 200, 0.3);
}

.action-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
}

.action-card h2 {
  font-size: 24px;
  color: #222;
  margin-bottom: 12px;
}

.action-card p {
  font-size: 15px;
  color: #555;
  margin-bottom: 20px;
}

/* Action Buttons */
.action-card button {
  background: linear-gradient(to right, #4facfe, #00f2fe);
  border: none;
  color: white;
  font-weight: 600;
  padding: 10px 20px;
  font-size: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.action-card button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* Mobile */
@media screen and (max-width: 768px) {
  .admin-header h1 {
    font-size: 28px;
  }

  .admin-header p {
    font-size: 16px;
  }

  .action-card {
    padding: 20px;
  }

  .action-card h2 {
    font-size: 20px;
  }

  .action-card button {
    font-size: 14px;
  }
}

  </style>
  