<template>
    <div class="admin-combos container">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mt-5 mb-4">
        <h2 class="text-success font-weight-bold">🎁 Manage Combos</h2>
        <button class="btn btn-success shadow-sm" @click="addCombo">➕ Add Combo</button>
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
      <div v-if="loading" class="text-center text-secondary py-3">Loading combos...</div>
      <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
  
      <!-- Combos Table -->
      <div v-else class="table-responsive">
        <table class="table table-hover table-bordered shadow-sm bg-white rounded">
          <thead class="thead-dark">
            <tr class="text-center">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(combo, index) in filteredCombos" :key="combo._id" class="text-center align-middle">
              <td>{{ index + 1 }}</td>
              <td>
                <img
                  v-if="combo.image"
                  :src="getImageSrc(combo.image)"
                  alt="combo"
                  class="img-thumbnail mx-auto d-block"
                  style="max-width: 60px;"
                />
              </td>
              <td class="font-weight-bold">{{ combo.name }}</td>
              <td>{{ combo.price }}</td>
              <td>
                <button class="btn btn-sm btn-primary mr-1" @click="viewCombo(combo._id)">
                  👁 View
                </button>
                <button class="btn btn-sm btn-warning mr-1" @click="editCombo(combo._id)">
                  ✏️ Edit
                </button>
                <button class="btn btn-sm btn-danger" @click="deleteComboById(combo._id)">
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
  import { getAllCombos, deleteCombo } from "@/api/ComboAPI";
  
  export default {
    name: "CombosManagement",
    data() {
      return {
        combos: [],
        loading: true,
        error: null,
        searchQuery: "",
      };
    },
    computed: {
      filteredCombos() {
        if (!this.searchQuery) return this.combos;
        return this.combos.filter((c) =>
          c.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      async fetchCombos() {
        this.loading = true;
        this.error = null;
        try {
          const response = await getAllCombos();
          this.combos = response.data;
        } catch (err) {
          this.error = err.message || "Failed to load combos.";
        } finally {
          this.loading = false;
        }
      },
      async deleteComboById(id) {
        if (confirm("Are you sure you want to delete this combo?")) {
          try {
            await deleteCombo(id);
            alert("✅ Combo deleted successfully!");
            this.fetchCombos();
          } catch (err) {
            alert("❌ Delete failed: " + err.message);
          }
        }
      },
      viewCombo(id) {
        this.$router.push(`/admin/combos/view/${id}`);
      },
      editCombo(id) {
        this.$router.push(`/admin/combos/edit/${id}`);
      },
      addCombo() {
        this.$router.push("/admin/combos/add");
      },
      clearSearch() {
        this.searchQuery = "";
      },
      getImageSrc(imagePath) {
        
        if (!imagePath) return "";
        if (imagePath.startsWith("http")) return imagePath;
        try {
          return require(`@/assets/imagecombo/${imagePath}`);
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
      this.fetchCombos();
    },
  };
  </script>
  
  <style scoped>
  .admin-combos {
    padding-top: 60px;
    padding-bottom: 40px;
    min-height: 100vh;
    background-color: #f4f6f9;
  }
  
  .admin-combos > .d-flex {
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
  