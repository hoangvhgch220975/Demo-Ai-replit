<template>
    <nav class="navbar">
      <div class="navbar-container">
        <!-- Logo and Shop Name -->
        <div class="logo-container">
          <router-link to="/admin" class="logo-link">
            <img src="@/assets/smartshop-high-resolution-logo.png" alt="SmartShop Logo" class="logo" />
            <span class="shop-name">SmartShop</span>
          </router-link>
        </div>
  
        <!-- Navigation Links -->
        <ul class="nav-links">
            <li><router-link to="/admin">Dashboard</router-link></li>
            <li><router-link to="/admin/devices">Manage Device</router-link></li>
            <li><router-link to="/admin/packages">Manage Package</router-link></li>
            <li><router-link to="/admin/combos">Manage Combo</router-link></li>
            <li><router-link to="/admin/users">Manage User</router-link></li>
              <li><a href="#" @click.prevent="logout">🚪 Logout</a></li>
          </ul>
  
        <!-- Hamburger Menu for Mobile -->
        <div class="hamburger" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "NavbarElement",
    methods: {
      toggleMenu() {
        this.$el.querySelector(".nav-links").classList.toggle("active");
      },
      logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push("/");
      window.location.reload();
    },
    }
  };
  </script>
  
  <style scoped>
  /* Basic Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  /* Navbar Styling */
  .navbar {
    position: fixed; /* Make navbar fixed */
    top: 0; /* Stick it to the top */
    left: 0;
    right: 0;
    background: linear-gradient(to right, #2fdd55, #2f8160, #000000);
    padding: 20px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000; /* Ensure it stays on top */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }
  
  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
  }
  
  .logo-link {
    display: flex;
    align-items: center;
    text-decoration: none; /* Remove underline */
  }
  
  .logo {
    height: 40px;
    width: 40px;
    border-radius: 50%; /* Make logo circular */
  }
  
  .shop-name {
    margin-left: 10px;
    font-size: 24px;
    font-weight: bold;
    color: #fff; /* White text color */
  }
  
  /* Navigation Links */
  .nav-links {
    color: #fff;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
  list-style-type: none;
  display: flex;
  }
  
  .nav-links li {
    margin: 0 15px;
  }
  
  .nav-links a {
    color: #fff;
  text-decoration: none;
  font-size: 16px;
  position: relative;
  transition: color 0.3s ease;
}
.nav-links a::after {
  content: '';
  position: absolute;
  width: 0%;
  height: 2px;
  background: #00ff99;
  bottom: -4px;
  left: 0;
  transition: 0.3s;
}
  
  .nav-links a:hover {
    color: #00b33c; /* Green on hover */
  }
  .nav-links a:hover::after {
  width: 100%;
}

  /* Hamburger Menu for Mobile */
  .hamburger {
    display: none;
  flex-direction: column;
  cursor: pointer;
  }
  
  .hamburger span {
    height: 3px;
  width: 25px;
  background: #fff;
  margin: 4px 0;
  border-radius: 2px;
  transition: all 0.3s ease;
  }
  .hamburger span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger span.open:nth-child(2) {
  opacity: 0;
}
.hamburger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

  
  /* Media Query for Mobile Devices */
  @media screen and (max-width: 768px) {
    .nav-links {
      position: absolute;
    top: 65px;
    left: 0;
    background: #1c1c1c;
    width: 100%;
    flex-direction: column;
    align-items: center;
    display: none;
    }
  
    .nav-links li {
      margin: 15px 0;
    }
  
    .hamburger {
      display: block;
    }
  
    .nav-links.active {
      display: block;
    }
  }
  
  /* Add padding to body to prevent content from being hidden behind fixed navbar */
  body {
    padding-top: 80px; /* Adjust this value based on navbar height */
  }
  </style>
  