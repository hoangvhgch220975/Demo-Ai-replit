<template>
    <div class="admin-packages container">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mt-5 mb-4">
        <h2 class="text-success font-weight-bold">📦 Manage Packages</h2>
        <button class="btn btn-success shadow-sm" @click="addPackage">➕ Add Package</button>
      </div>
  
      <!-- Search Bar -->
      <div class="input-group mb-4 shadow-sm">
        <input
          type="text"
          v-model="searchQuery"
          class="form-control"
          placeholder="🔍 Search by name..."
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" @click="clearSearch">Clear</button>
        </div>
      </div>
  
      <!-- Feedback Messages -->
      <div v-if="loading" class="text-center text-secondary py-3">Loading packages...</div>
      <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
  
      <!-- Packages Table -->
      <div v-else class="table-responsive">
        <table class="table table-hover table-bordered shadow-sm bg-white rounded">
          <thead class="thead-dark">
            <tr class="text-center">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(pkg, index) in filteredPackages"
              :key="pkg._id"
              class="text-center align-middle"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <img
                  v-if="pkg.image"
                  :src="getImageSrc(pkg.image)"
                  alt="package"
                  class="img-thumbnail mx-auto d-block"
                  style="max-width: 60px;"
                />
              </td>
              <td class="font-weight-bold">{{ pkg.name }}</td>
              <td>{{ pkg.stock }}</td>
              <td>
                <button class="btn btn-sm btn-primary mr-1" @click="viewPackage(pkg._id)">
                  👁 View
                </button>
                <button class="btn btn-sm btn-warning mr-1" @click="editPackage(pkg._id)">
                  ✏️ Edit
                </button>
                <button class="btn btn-sm btn-danger" @click="deletePackageById(pkg._id)">
                  🗑 Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { getAllPackages, deletePackage } from "@/api/PackageAPI"; // <-- Make sure this API file exists
  
  export default {
    name: "PackageManagement",
    data() {
      return {
        packages: [],
        loading: true,
        error: null,
        searchQuery: "",
      };
    },
    computed: {
      filteredPackages() {
        if (!this.searchQuery) return this.packages;
        return this.packages.filter((p) =>
          p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      async fetchPackages() {
        this.loading = true;
        this.error = null;
        try {
          const response = await getAllPackages();
          this.packages = response.data;
        } catch (err) {
          this.error = err.message || "Failed to load packages.";
        } finally {
          this.loading = false;
        }
      },
      async deletePackageById(id) {
        if (confirm("Are you sure you want to delete this package?")) {
          try {
            await deletePackage(id);
            alert("✅ Package deleted successfully!");
            this.fetchPackages();
          } catch (err) {
            alert("❌ Delete failed: " + err.message);
          }
        }
      },
      viewPackage(id) {
        this.$router.push(`/admin/packages/view/${id}`);
      },
      editPackage(id) {
        this.$router.push(`/admin/packages/edit/${id}`);
      },
      addPackage() {
        this.$router.push("/admin/packages/add");
      },
      clearSearch() {
        this.searchQuery = "";
      },
      getImageSrc(imagePath) {
        
        if (!imagePath) return "";
        if (imagePath.startsWith("http")) return imagePath;
        try {
          return require(`@/assets/imagepackage/${imagePath}`);
        } catch (err) {
          console.warn("Image not found:", imagePath);
        }
        try {
          return `http://localhost:3333/uploads/${imagePath}`;
          } catch (err) {
          console.warn("Image not found:", imagePath);
        }
      },
    },
    mounted() {
      this.fetchPackages();
    },
  };
  </script>
  
  <style scoped>
  .admin-packages {
    padding-top: 60px;
    padding-bottom: 40px;
    min-height: 100vh;
    background-color: #f4f6f9;
  }
  
  .admin-packages > .d-flex {
    position: sticky;
    top: 80px;
    background-color: #f4f6f9;
    z-index: 10;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  
  .input-group {
    position: sticky;
    top: 130px;
    background-color: #f4f6f9;
    z-index: 9;
    padding-bottom: 10px;
  }
  
  .table-responsive {
    max-height: 500px;
    overflow-y: auto;
    border-radius: 8px;
    margin: 0;
  }
  
  .table {
    margin-bottom: 0;
    background-color: #fff;
    border-collapse: separate;
    border-spacing: 0;
  }
  
  .table thead th {
    position: sticky;
    top: 0;
    z-index: 5;
    background-color: #343a40;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    height: 50px;
    padding: 12px;
    box-shadow: inset 0 -1px 0 #ccc;
  }
  
  .table tbody td {
    text-align: center;
    vertical-align: middle;
    padding: 12px;
    background-color: #fff;
  }
  
  .table tbody tr:first-child td {
    border-top: none;
  }
  
  .table tbody tr:hover {
    background-color: #f1f1f1;
  }
  
  .img-thumbnail {
    max-width: 100px;
    max-height: 100px;
    width: 60px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    display: block;
    margin: auto;
  }
  
  .table td button {
    min-width: 80px;
    min-height: 36px;
    padding: 8px 12px;
    font-size: 14px;
    border-radius: 6px;
    margin: 4px 12px;
    white-space: nowrap;
  }
  </style>
  