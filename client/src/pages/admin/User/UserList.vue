<template>
  <div class="user-list container mt-5 mb-5">
    <!-- Header -->
    <div class="header d-flex justify-content-between align-items-center mt-5 mb-4">
      <h2 class="text-success font-weight-bold">👥 Manage Users</h2>
      <button class="btn btn-success shadow-sm" @click="addUser">➕ Add User</button>
    </div>

    <!-- Search Bar -->
    <div class="input-group mb-4 shadow-sm">
      <input
        type="text"
        v-model="searchQuery"
        class="form-control"
        placeholder="🔍 Search by username or email..."
      />
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" @click="clearSearch">Clear</button>
      </div>
    </div>

    <!-- Feedback Messages -->
    <div v-if="loading" class="text-center text-secondary py-3">Loading users...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <!-- Users Table -->
    <div v-else class="table-responsive">
      <table class="table table-bordered table-hover shadow-sm bg-white rounded">
        <thead class="thead-dark">
          <tr class="text-center">
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="user._id" class="text-center align-middle">
            <td>{{ index + 1 }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button class="btn btn-sm btn-primary mr-1" @click="viewUser(user._id)">👁️ View</button>
              <button class="btn btn-sm btn-warning mr-1" @click="editUser(user._id)">✏️ Edit</button>
              <button class="btn btn-sm btn-danger" @click="deleteUser(user._id)">🗑️ Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination (optional) -->
    <div class="pagination d-flex justify-content-center mt-4">
      <button :disabled="page === 1" @click="goToPage(page - 1)">Previous</button>
      <span>Page {{ page }}</span>
      <button @click="goToPage(page + 1)">Next</button>
    </div>
  </div>
</template>

<script>
import { getAllUsers, deleteUserById } from "@/api/UserAPI"; // <-- Adjusted API import

export default {
  name: "UserList",
  data() {
    return {
      users: [],
      loading: true,
      error: null,
      searchQuery: "",
      page: 1,
      pageSize: 10,
    };
  },
  computed: {
    filteredUsers() {
      return this.users
        .filter(user => {
          const query = this.searchQuery.toLowerCase();
          return (
            user.username.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
          );
        })
        .slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
    },
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      try {
        const response = await getAllUsers();
        this.users = response.data;
      } catch (err) {
        this.error = err.message || "Failed to load users.";
      } finally {
        this.loading = false;
      }
    },
    async deleteUser(userId) {
      if (confirm("Are you sure you want to delete this user?")) {
        try {
          await deleteUserById(userId);
          alert("✅ User deleted successfully!");
          this.fetchUsers(); // Reload the users list
        } catch (err) {
          alert("❌ Delete failed: " + err.message);
        }
      }
    },
    viewUser(userId) {
      this.$router.push(`/admin/users/view/${userId}`);
    },
    editUser(userId) {
      this.$router.push(`/admin/users/edit/${userId}`);
    },
    goToPage(page) {
      if (page < 1) return;
      this.page = page;
    },
    clearSearch() {
      this.searchQuery = ""; // Clear the search input
    },
    addUser() {
      this.$router.push("/admin/users/add"); // Navigate to add user page
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
/* Container for the entire user list page */
.user-list {
    padding-top: 20px;
    padding-bottom: 40px;
    min-height: 100vh;
    background-color: #f4f6f9;
  }
  
  .user-list > .d-flex {
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
/* Pagination Styling */
.pagination {
  margin-top: 30px;
}

.pagination button {
  padding: 8px 15px;
  margin: 0 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  font-weight: bold;
  margin: 0 10px;
}
</style>
