<template>
    <div class="package-page">
      <div class="product-scroll-container">
        <!-- Left Arrow for scrolling -->
        <button @click="scrollLeft" class="scroll-btn left" :disabled="scrollPosition <= 0">
          &#10094;
        </button>
  
        <!-- Loop through the packages and display each package card -->
        <div
          v-for="packageItem in packages.slice(scrollPosition, scrollPosition + 3)"
          :key="packageItem._id"
          class="product-card"
          @click="goToPackageDetail(packageItem._id)"
        >
          <div class="package-image-container">
            <!-- Category on top-left of the image -->
            <div class="package-category-overlay">{{ packageItem.category }}</div>
            <img
              v-if="packageItem.image"
              :src="getImageSrc(packageItem.image)"
              alt="package"
              class="package-image"
            />
          </div>
          <div class="package-info">
            <h3 class="package-name">{{ packageItem.name }}</h3>
            <p class="package-description">{{ packageItem.description }}</p>
          </div>
          <!-- Price and Availability section -->
          <div class="package-price-stock">
            <p class="package-price">{{ packageItem.price.toFixed(2) }}</p>
            <p class="package-available">Available: {{ packageItem.stock }}</p>
          </div>
        </div>
  
        <!-- Right Arrow for scrolling -->
        <button @click="scrollRight" class="scroll-btn right" :disabled="scrollPosition + 3 >= packages.length">
          &#10095;
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { getAllPackages } from '@/api/PackageAPI';
  
  export default {
    name: "PackageItem",
    data() {
      return {
        packages: [],
        scrollPosition: 0,
      };
    },
    created() {
      this.fetchPackages();
    },
    methods: {
      async fetchPackages() {
        try {
          const response = await getAllPackages();
          this.packages = response.data;
        } catch (error) {
          console.error("Error fetching packages: ", error);
        }
      },
      getImageSrc(imagePath) {
        if (!imagePath) return "";
        if (imagePath.startsWith("http")) return imagePath;
        try {
          return require(`@/assets/imagepackage/${imagePath}`);
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
        if (this.scrollPosition + 3 < this.packages.length) {
          this.scrollPosition += 1;
        }
      },
      goToPackageDetail(packageId) {
        this.$router.push(`/packages/${packageId}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .package-page {
    padding: 20px;
    text-align: center;
    background-color: #f0f0f0;
  }
  
  .product-scroll-container {
    display: flex;
    overflow-x: hidden;
    gap: 30px;
    padding: 20px;
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
  }
  
  .product-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
  
  .package-image-container {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
  }
  
  .package-category-overlay {
    position: absolute;
    top: 0px;
    left: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 5px;
    z-index: 2;
  }
  
  .package-image {
    max-width: 100%;
    height: auto;
    max-height: 250px;
    object-fit: cover;
  }
  
  .package-info {
    font-size: 16px;
    color: #333;
  }
  
  .package-name {
    font-size: 20px;
    font-weight: bold;
    color: #222;
    margin-bottom: 10px;
    text-transform: capitalize;
  }
  
  .package-description {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
    line-height: 1.5;
  }
  
  .package-price-stock {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  .package-price {
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    background-color: #7ecf2f;
    padding: 10px;
    border-radius: 5px;
    margin-right: 10px;
  }
  
  .package-available {
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
  </style>
  