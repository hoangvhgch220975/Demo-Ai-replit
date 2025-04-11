const express = require('express');
const port = process.env.PORT || 5000;
const host = '0.0.0.0';
const app = express();
const path = require("path");
require('dotenv').config(); // Load environment variables from .env file

// connect to mongodb
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://001343305:Hoang1910%40@mycluster.zopvl.mongodb.net/SmartStore';
mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB', err));

// Enable CORS
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:8080', 'http://0.0.0.0:8080'],
  credentials: true
}));

// Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "upload")));

// API Routes
var deviceRoute = require('./api/routes/DeviceRoute');
deviceRoute(app);

var packageRoute = require('./api/routes/PackageRoute');
packageRoute(app);

var comboRoute = require('./api/routes/ComboRoute');
comboRoute(app);

var userRoute = require('./api/routes/UserRoute');
userRoute(app);

// ⬇️ Upload Route
const uploadRoute = require('./api/routes/UploadRoute');
app.use('/api', uploadRoute); // ✅ use the router properly


// Home route
app.get('/', (req, res) => {
  res.send("<h1>This is homepage of backend side</h1>")
});

// Start server
app.listen(port, host, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
