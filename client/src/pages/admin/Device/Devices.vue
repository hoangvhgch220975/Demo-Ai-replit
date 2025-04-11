<template>
    <div class="admin-devices container">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mt-5 mb-4">
        <h2 class="text-success font-weight-bold">📱 Manage Devices</h2>
        <button class="btn btn-success shadow-sm" @click="addDevice">➕ Add Device</button>
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
      <div v-if="loading" class="text-center text-secondary py-3">Loading devices...</div>
      <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
  
      <!-- Devices Table -->
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
            <tr v-for="(device, index) in filteredDevices" :key="device._id" class="text-center align-middle">
              <td>{{ index + 1 }}</td>
              <td>
                <img
                  v-if="device.image"
                  :src="getImageSrc(device.image)"
                  alt="device"
                  class="img-thumbnail mx-auto d-block"
                  style="max-width: 60px;"
                />
              </td>
              <td class="font-weight-bold">{{ device.name }}</td>
              <td>{{ device.stock }}</td>
              <td>
                <button class="btn btn-sm btn-primary mr-1" @click="viewDevice(device._id)">
                  👁 View
                </button>
                <button class="btn btn-sm btn-warning mr-1" @click="editDevice(device._id)">
                  ✏️ Edit
                </button>
                <button class="btn btn-sm btn-danger" @click="deleteDeviceById(device._id)">
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
  import { getAllDevices, deleteDevice } from "@/api/DeviceAPI";
  
  export default {
    name: "AdminDeviceList",
    data() {
      return {
        devices: [],
        loading: true,
        error: null,
        searchQuery: "",
      };
    },
    computed: {
      filteredDevices() {
        if (!this.searchQuery) return this.devices;
        return this.devices.filter((d) =>
          d.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      async fetchDevices() {
        this.loading = true;
        this.error = null;
        try {
          const response = await getAllDevices();
          this.devices = response.data;
        } catch (err) {
          this.error = err.message || "Failed to load devices.";
        } finally {
          this.loading = false;
        }
      },
      async deleteDeviceById(id) {
  if (confirm("Are you sure you want to delete this device?")) {
    try {
      await deleteDevice(id);
      alert("✅ Device deleted successfully!");
      this.fetchDevices();
    } catch (err) {
      alert("❌ Delete failed: " + err.message);
    }
  }
},   
      viewDevice(id) {
        this.$router.push(`/admin/devices/view/${id}`);
      },
      editDevice(id) {
        this.$router.push(`/admin/devices/edit/${id}`);
      },
      addDevice() {
        this.$router.push("/admin/devices/add");
      },
      clearSearch() {
        this.searchQuery = "";
      },
      getImageSrc(imagePath) {
        
        if (!imagePath) return "";
        if (imagePath.startsWith("http")) return imagePath;
        try {
          return require(`@/assets/imagedevice/${imagePath}`);
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
      this.fetchDevices();
    },
  };
  </script>
  
  <style scoped>

.admin-devices {
  padding-top: 60px; /* offset for sticky navbar */
  padding-bottom: 40px;
  min-height: 100vh;
  background-color: #f4f6f9;
}

/* Sticky title + Add button */
.admin-devices > .d-flex {
  position: sticky;
  top: 80px;
  background-color: #f4f6f9;
  z-index: 10;
  padding-top: 10px;
  padding-bottom: 10px;
}

/* Sticky search bar */
.input-group {
  position: sticky;
  top: 130px;
  background-color: #f4f6f9;
  z-index: 9;
  padding-bottom: 10px;
}

/* Scrollable table container */
.table-responsive {
  max-height: 500px;
  overflow-y: auto;
  border-radius: 8px;
  margin: 0;
}

/* Table styles */
.table {
  margin-bottom: 0;
  background-color: #fff;
  border-collapse: separate; /* avoid collapsing border glitches */
  border-spacing: 0;
}

/* Sticky table header - FULL WIDTH fix */
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
  box-shadow: inset 0 -1px 0 #ccc; /* remove content bleed through */
}

/* Table body */
.table tbody td {
  text-align: center;
  vertical-align: middle;
  padding: 12px;
  background-color: #fff;
}

/* Fix tiny gap above first row */
.table tbody tr:first-child td {
  border-top: none;
}

/* Row hover effect */
.table tbody tr:hover {
  background-color: #f1f1f1;
}

/* Device image styling */
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

/* Uniform square buttons */
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
  