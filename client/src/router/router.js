import Vue from 'vue';
import Router from 'vue-router';

// Import the HomePage component
import HomePage from '@/pages/client/HomePage.vue';

// Import the LoginForm and SignupForm components
import LoginForm from '@/components/LoginForm.vue';
import SignupForm from '@/components/SignupForm..vue';
import RegistInfo from "@/components/RegistInfo.vue";


// Import pages for the client-side routes
import DeviceItem from '@/components/ItemComponents/DeviceItem.vue';



import Contact from '@/pages/client/User/Contact.vue';

Vue.use(Router);  // Ensure Vue Router is used

const router = new Router({
  mode: 'history',  // Use history mode to remove the hash (#)
  routes: [

    // Authentication routes
    {
      path: '/login',
      name: 'Login',
      component: LoginForm // Use LoginForm component for the login route
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignupForm // Use SignupForm component for the signup route
    },
    {
      path: '/regist-info',
      name: 'RegistInfo',
      component: RegistInfo // Use RegistInfo component for the registration info route
    },
    

    // User routes
    {
      path: '/',
      name: 'Home',
      component: HomePage // Use HomePage component for the root route
    },
    {
      path: '/devices',
      name: 'Devices',
      component: DeviceItem
    },
    {
      path: '/devices/:id',
      name: 'DeviceDetails',
      component: () => import('@/pages/client/Device/DeviceDetails.vue')
    },


    // Contact route
    { 
      path: '/contact',
      name: 'Contact',
      component: Contact // Use Contact component for the contact route

    }

    
  ]
});

export default router;
