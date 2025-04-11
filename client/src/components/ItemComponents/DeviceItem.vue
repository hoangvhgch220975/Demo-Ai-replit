<template>
    <div class="device-page">
      <div class="product-scroll-container">
        <!-- Left Arrow for scrolling -->
        <button @click="scrollLeft" class="scroll-btn left" :disabled="scrollPosition <= 0">
          &#10094;
        </button>

        <!-- Loop through the devices and display each device card -->
        <div
          v-for="device in devices.slice(scrollPosition, scrollPosition + 3)"
          :key="device._id"
          class="product-card"
          @click="goToDeviceDetail(device._id)"
        >
          <div class="device-image-container">
            <!-- Category on top-left of the image -->
            <div class="device-category-overlay">{{ device.category }}</div>
            <img
              v-if="device.image"
              :src="getImageSrc(device.image)"
              alt="device"
              class="device-image"
            />
          </div>
          <div class="device-info">
            <h3 class="device-name">{{ device.name }}</h3>
            <p class="device-description">{{ device.description }}</p>
          </div>
          <!-- Price and Availability section -->
          <div class="device-hover-overlay">
            <router-link :to="'/devices/' + device._id" class="view-details-btn">View Details</router-link>
          </div>
          <div class="device-info-bottom">
            <div class="price-cart-row">
              <p class="device-price">${{ device.price.toFixed(2) }}</p>
              <button class="add-to-cart-btn" @click.stop="addToCart(device)">
                <i class="fas fa-shopping-cart"></i> Add to Cart
              </button>
            </div>
            <p class="device-available">Available: {{ device.stock }}</p>
          </div>
        </div>

        <!-- Right Arrow for scrolling -->
        <button @click="scrollRight" class="scroll-btn right" :disabled="scrollPosition + 3 >= devices.length">
          &#10095;
        </button>
      </div>
    </div>
  </template>

  <script>
  import { getAllDevices } from '@/api/DeviceAPI';

  export default {
    name: "DeviceItem",
    data() {
      return {
        devices: [],
        scrollPosition: 0,
      };
    },
    created() {
      this.fetchDevices();
    },
    methods: {
      async fetchDevices() {
        try {
          const response = await getAllDevices();
          this.devices = response.data;
        } catch (error) {
          console.error("Error fetching devices: ", error);
        }
      },
      getImageSrc(imagePath) {
        if (!imagePath) return "";
        if (imagePath.startsWith("http")) return imagePath;
        try {
          return require(`@/assets/imagedevice/${imagePath}`);
        } catch (err) {
          console.warn("Image not found:", imagePath);
        }
        return `http://localhost:3333/uploads/${imagePath}`;
      },
      scrollLeft() {
        if (this.scrollPosition > 0) {
          this.scrollPosition -= 1;
        }
      },
      scrollRight() {
        if (this.scrollPosition + 3 < this.devices.length) {
          this.scrollPosition += 1;
        }
      },
      goToDeviceDetail(deviceId) {
        this.$router.push(`/devices/${deviceId}`);
      },
      addToCart(device) {
        // Add your add-to-cart logic here
        console.log('Added to cart:', device);
      }
    },
  };
  </script>

  <style scoped>
  .device-page {
    padding: 20px;
    text-align: center;
    background-color: #f0f0f0;
  }

  .product-scroll-container {
    display: flex;
    overflow-x: auto; /* Use auto for smoother scrolling */
    gap: 30px;
    padding: 60px; /* Updated padding */
    align-items: center;
    position: relative;
    justify-content: center;
    width: calc(3.8 * 350px + 60px); /* Show only 3 items at a time */
  }

  .scroll-btn {
    background-color: #333;
    color: white;
    border: none;
    padding: 12px;
    font-size: 18px;
    cursor: pointer;
    position: absolute;
    top: 50%;
    z-index: 10;
    border-radius: 50%;
    transition: background-color 0.3s ease, transform 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 50px;
    height: 50px;
  }

  .scroll-btn.left {
    left: 10px;
  }

  .scroll-btn.right {
    right: 10px;
  }

  .scroll-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .scroll-btn:hover:not(:disabled) {
    background-color: #7ecf2f;
    transform: scale(1.1);
  }

  .product-card {
    width: 350px;
    height: 500px;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    justify-content: space-between;
    border: 1px solid #ddd; /* Added border for better visual separation */
  }

  .product-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }

  .device-image-container {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden; /* Ensure no content spills out */
  }

  .device-category-overlay {
    position: absolute;
    top: 0px; /* Adjust this to ensure it stays above the image */
    left: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 5px;
    z-index: 2; /* Make sure category text stays above the image */
  }


  .device-image {
    max-width: 100%;
    height: auto;
    max-height: 250px;
    object-fit: cover;
  }

  .device-info {
    font-size: 16px;
    color: #333;
  }

  .device-name {
    font-size: 20px;
    font-weight: bold;
    color: #222;
    margin-bottom: 10px;
    text-transform: capitalize;
  }

  .device-description {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
    line-height: 1.5;
  }

  .device-price-stock {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; /* Ensures the content stays in place */
  }

  .device-price {
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    background-color: #7ecf2f;
    padding: 10px;
    border-radius: 5px;
    margin-right: 10px;
  }

  .device-available {
    color: #777;
    font-size: 14px;
  }

  .product-scroll-container::-webkit-scrollbar {
    height: 8px;
  }

  .product-scroll-container::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  .product-scroll-container::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  .device-hover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }

  .product-card:hover .device-hover-overlay {
    opacity: 1;
  }

  .view-details-btn {
    padding: 12px 24px;
    background-color: #7ecf2f;
    color: white;
    border: none;
    border-radius: 25px;
    font-weight: bold;
    text-decoration: none;
    transition: transform 0.2s ease;
  }

  .view-details-btn:hover {
    transform: scale(1.1);
  }

  .device-info-bottom {
    width: 100%;
    padding: 0 15px;
  }

  .price-cart-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 10px;
    width: 100%;
  }

  .device-price {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    background-color: #7ecf2f;
    padding: 8px 15px;
    border-radius: 25px;
    text-align: center;
    width: 100%;
  }

  .add-to-cart-btn {
    background-color: #000;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
  }

  .add-to-cart-btn:hover {
    background-color: #333;
  }

  .device-available {
    color: #666;
    margin: 5px 0;
    font-size: 14px;
    text-align: right;
    padding-right: 15px;
  }
  </style>