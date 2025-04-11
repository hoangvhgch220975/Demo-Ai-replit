<template>
    <div class="contact-page">
      <div class="contact-container">
        <!-- Left side: Contact Form -->
        <div class="contact-form-container">
          <h2>Contact Us</h2>
          <p>If you have any questions or concerns, feel free to reach out to us using the form below!</p>
          
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" v-model="form.name" required />
            </div>
  
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="form.email" required />
            </div>
  
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" v-model="form.message" required></textarea>
            </div>
  
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Submit</span>
              <span v-else>Submitting...</span>
            </button>
          </form>
  
          <!-- Loading Spinner -->
          <div v-if="isSubmitting" class="loading-spinner">
            <div class="spinner"></div>
          </div>
        </div>
  
        <!-- Right side: Shop Contact Information -->
        <div class="contact-info-container">
          <h2>Our Contact Info</h2>
          <div class="info-item">
            <i class="fas fa-envelope"></i>
            <p><strong>Email:</strong> support@smartshop.com</p>
          </div>
          
          <div class="info-item">
            <i class="fas fa-phone-alt"></i>
            <p><strong>Phone:</strong> +1 234 567 890</p>
          </div>
          
          <div class="info-item">
            <i class="fas fa-map-marker-alt"></i>
            <p><strong>Address:</strong> 1234 Main Street, Cityville, ST, 56789</p>
          </div>
          
          <div class="business-hours">
            <h3>Business Hours</h3>
            <p><strong>Monday to Friday:</strong> 9:00 AM - 6:00 PM</p>
            <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM</p>
            <p><strong>Sunday:</strong> Closed</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ContactPage",
    data() {
      return {
        form: {
          name: "",
          email: "",
          message: ""
        },
        isSubmitting: false // To track form submission state
      };
    },
    created() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        this.form.name = user.username || '';
        this.form.email = user.email || '';
      }
    },
    methods: {
      handleSubmit() {
        this.isSubmitting = true; // Set to true when the form is being submitted
  
        // Simulate a 3-second delay for form submission (you can replace this with an API call)
        setTimeout(() => {
          // Reset the form after submission
          this.form.name = "";
          this.form.email = "";
          this.form.message = "";
  
          // Display a success message or redirect after 3 seconds
          alert("Thank you for contacting us! We will get back to you soon.");
  
          // Redirect to the homepage after 3 seconds
          this.$router.push("/");
  
          // Set isSubmitting to false to hide the loading spinner
          this.isSubmitting = false;
        }, 3000);
      }
    }
  };
  </script>
  
  <style scoped>
  .contact-page {
    margin-top: 80px;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .contact-container {
    display: flex;
    justify-content: space-between;
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .contact-form-container,
  .contact-info-container {
    flex: 1;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .contact-form-container p,
  .contact-info-container p {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .contact-form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input,
  textarea {
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }
  
  textarea {
    resize: vertical;
    min-height: 100px;
  }
  
  .submit-btn {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #00b33c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .submit-btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .submit-btn:hover:not(:disabled) {
    background-color: #009933;
  }
  
  /* Loading Spinner */
  .loading-spinner {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #00b33c;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Contact Info Styles */
  .contact-info-container {
    background-color: #f9f9f9;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .info-item i {
    font-size: 20px;
    color: #00b33c;
    margin-right: 15px; /* Add more space between icon and text */
    margin-top: -18px;
    flex-shrink: 0; /* Prevents the icon from shrinking */
    
  }
  
  .info-item p {
    font-size: 16px; /* Adjust font size for better readability */
  }
  
  .business-hours h3 {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
  }
  
  .business-hours p {
    padding-top: 5px;
    margin: 5px 0;
    text-align: left;
  }
  
  /* Make sure the layout is responsive */
  @media (max-width: 768px) {
    .contact-container {
      flex-direction: column;
    }
  }
  </style>
  