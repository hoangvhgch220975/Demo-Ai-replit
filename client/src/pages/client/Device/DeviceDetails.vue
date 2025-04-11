
<template>
  <div class="device-details">
    <Navbar />
    <div class="container mt-5">
      <div v-if="device" class="card">
        <div class="card-body">
          <h2 class="card-title">{{device.name}}</h2>
          <div class="row">
            <div class="col-md-6">
              <img :src="device.image" class="img-fluid mb-3" alt="Device image" />
            </div>
            <div class="col-md-6">
              <p class="card-text"><strong>Category:</strong> {{device.category}}</p>
              <p class="card-text"><strong>Price:</strong> ${{device.price}}</p>
              <p class="card-text"><strong>Stock:</strong> {{device.stock}} units</p>
              <p class="card-text"><strong>Rating:</strong> {{device.rating}} / 5</p>
              <p class="card-text"><strong>Description:</strong> {{device.description}}</p>
              <router-link to="/" class="btn btn-primary">Back to Home</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { getDeviceById } from '@/api/DeviceAPI'

export default {
  name: 'DeviceDetails',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      device: null
    }
  },
  async created() {
    try {
      const response = await getDeviceById(this.$route.params.id)
      this.device = response.data
    } catch (error) {
      console.error('Error fetching device details:', error)
    }
  }
}
</script>

<style scoped>
.device-details {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.container {
  flex: 1;
  padding: 20px;
}
.card {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}
.card-body {
  padding: 2rem;
}
img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>
